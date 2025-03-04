
"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useCardContext } from '../context/caredcontext';


const SingleCard = ({food}) => {
    
    const {addButtunToCard} =useCardContext()
  const [quantity,setQuantity]=useState([]);
  const quant=quantity.length > 0 && quantity.find(q => q.id === food._id)?.quantity
       
  const addCard = (id) => {
    setQuantity(prev => {
      const exists = prev?.find(data => data.id === id);
      if (exists) {
        return prev.map(data => 
          data.id === id ? { ...data, quantity: data.quantity + 1 } : data
        );   
      } else {
        return [...prev, { id, quantity: 1 }];
      }
    });
  };
  
  const minusCard = (id) => {
    setQuantity(prev => {
      const exists = prev?.find(data => data.id === id);
      if (exists) {
        return prev.map(data => 
          data.id === id ? { ...data, quantity: data.quantity - 1 } : data
        );   
      } else {
        return [...prev, { id, quantity: 1 }];
      }
    });
  };

useEffect(()=>{
    console.log(quantity.length > 0 && quantity.find(q => q.id === food._id)?.quantity,"quantity");
    
},[quantity])

  return (
<div className="relative m-10 flex w-full max-w-sm  mx-auto flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-transform duration-300 hover:scale-105">
  <div
    className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
    href="#"
  >
    <Image className='object-cover w-full h-full '
       src={`data:${food?.contentType};base64,${food.fileData}`}
        alt="hhh"
          height={100}
        width={100}
    />
    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
      { Math.ceil((food.price / food.actualPrice) * 100)}% OFF
    </span>
  </div>
  <div className="mt-4 px-5 pb-5">
    <a href="#">
      <h5 className="text-xl tracking-tight text-slate-900">
        {food.name}
      </h5>
    </a>
    <div className="mt-2 mb-5 flex items-center justify-between">
      <p className='block'>
        <span className="text-3xl font-bold text-slate-900">${(food.price/280).toFixed(2)}</span>
        <span className="text-sm text-slate-900 line-through">${ (food.actualPrice/280).toFixed(1)}</span>
      </p>
         <div>
   <div className=''>

   </div>
       </div>
      {/* <div className="flex items-center">
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
          5.0
        </span>
      </div> */} 
        <div className="sm:order-1 block">
  <div className="mx-auto flex h-8 items-stretch text-gray-600 b">
    {/* Minus Button */}
    <button 
      className={`flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white ${
        quant <= 0 ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={quant <= 0}
      onClick={() => {
        if (quantity.length > 0 && quant > 0) minusCard(food._id);
      }}
    >
      -
    </button>

    {/* Quantity Display */}
    <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
    { quantity.length > 0 ? quantity.find(q => q.id === food._id)?.quantity || 0 : 0 }

    </div>

    {/* Plus Button */}
    <button  
      className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
      onClick={() => addCard(food._id)}
    >
      +
    </button>
  </div>
</div>



                      
    </div>
    <button onClick={()=>{
   if( quantity.find(q => q.id === food._id)?.quantity > 0){

     addButtunToCard(food,quant)
    }
    setQuantity([])
    }
      
    }
      
      className="flex items-center w-full justify-center rounded-md bg-gradient-to-l cursor-pointer from-green-400 to-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:scale-95 hover:transition focus:outline-none focus:ring-4 focus:ring-green-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      Add to cart
    </button>
  </div>
</div>

  )
}

export default SingleCard