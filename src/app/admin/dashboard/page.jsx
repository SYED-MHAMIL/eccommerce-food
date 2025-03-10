"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import BaseUrl from "../../../utils/url";
const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const storedToken = localStorage.getItem("tokenno");
      setToken(storedToken ? JSON.parse(storedToken) : null);
    }
  }, [isClient]);


const fetchOrder=()=>{
    

    setLoading(true);

    axios
      .get(`${BaseUrl.order}`)
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Internet Error");
        setLoading(false);
      });
}


  useEffect(() => {
    if (token) {
        fetchOrder()
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (!token) {
      return toast.error("you dont have login");
    }

    try {
      await axios.delete(`${BaseUrl.orderdelete}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchOrder()



    } catch (error) {
      console.log(error);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto ">
      <h1 className="mb-8 text-3xl text-center font-extrabold leading-none tracking-tight text-green-600 md:text-5xl lg:text-5xl">
        Order{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-green-400 ">
          Management
        </span>
      </h1>
      <div className="shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                #order
              </th>
              <th scope="col" className="py-3 px-6">
                Food
              </th>
              <th scope="col" className="py-3 px-6">
                Quantity
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Street
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order._id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{order.items[0].name}</td>
                <td className="py-4 px-6">{order.items[0].quantity}</td>
                <td className="py-4 px-6">{order.customerEmail}</td>
                <td className="py-4 px-6">{order.address.line1}</td>
                <td className="py-4 px-6">
                  <div>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-500 hover:bg-red-900 text-white py-2 px-4 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
