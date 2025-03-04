"use client"
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, {useState, useEffect, use } from 'react'
import Link from 'next/link'
import {useCardContext} from "../../context/caredcontext"

const Success = () => {
   
  const [orderDetails, setOrderDetails] = useState(null);
  const {setCardItem}= useCardContext()
   const session_id = useSearchParams().get('session_id')
   
const placeOrderToDatabse= async(postData)=>{
     

  try {
  let response=await axios.post('http://localhost:4000/order',postData)
    console.log("Order saved in to Database ",response);

  } catch (error) {
    console.log('Error parsing order to the database',error)
  }
  

  
}

useEffect(()=>{

  const FetchSessionDetail=async()=>{

    try {
      const  response=await axios.get(`http://localhost:4000/stripe/api/session/${session_id}`)
        console.log(response);
        
        setOrderDetails(response.data)
      placeOrderToDatabse(response.data)
      localStorage.removeItem('cardItem')
      setCardItem([])
    } catch (error) { 
        console.log(error);   
    }
    
    
  }
  if (session_id) {
    FetchSessionDetail()
  }


 },[session_id])



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl w-full bg-green-100 rounded-lg shadow-lg p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800 text-center">
          Payment Successful 🎉
        </h1>

        {orderDetails ? (
          <div className="mt-6">
            <p className="text-center text-gray-700">
              Thank you, <span className="font-semibold">{orderDetails.customerEmail}</span>, for your purchase.
            </p>

            <div className="mt-4">
              <h2 className="text-lg font-semibold text-green-700">Order Details:</h2>
              <ul className="mt-2 space-y-2">
                {orderDetails.items.map((item, index) => (
                  <li key={index} className="bg-white p-3 rounded-lg shadow-sm">
                    <span className="font-medium">{item.name}</span> - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-green-700">Shipping Address:</h2>
              <p className="text-gray-700">{orderDetails.address.line1}</p>
              {orderDetails.address.line2 && <p className="text-gray-700">{orderDetails.address.line2}</p>}
              <p className="text-gray-700">
                {orderDetails.address.city}, {orderDetails.address.state}, {orderDetails.address.postal_code}
              </p>
              <p className="text-gray-700">{orderDetails.address.country}</p>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-center text-gray-500">Loading order details...</p>
        )}

        <div className="mt-6 text-center">
          <Link href="/home">
            <button className="w-full md:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all">
              Go Back to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>

  )
}

export default Success