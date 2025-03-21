"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateProduct from "@/components/editcom";
import { toast } from "react-toastify";
import BaseUrl from '@/utils/url'
type ParamsType = {
  params: Promise<{ id: string }>;
};

export type getFoodType = {
  data: {
    _id: string,
    name: string,
    actualPrice: string,
    price: string,
    image: string,
    contentType:string,
    fileData:string,
    fileName:string,
    __v: number;
  };
  msg?: string;
};

const Edit = ({ params }: ParamsType) => {
  const [getFoodOne, setGetFoodOne] = useState<getFoodType | undefined>(
    undefined
  );
  const [id, setId] = useState("");

  // Handle the params promise and set the ID
  useEffect(() => {
    let isMounted = true; // To prevent state updates after unmount
    params
      .then((data) => {
        if (isMounted) {
          setId(data.id); // Set the ID once the promise resolves
        }
      })
      .catch((e) => {
        console.error("Error unwrapping params:", e);
      });

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [params]); // Only run this effect when `params` changes

  // Fetch the data after the ID is set
  useEffect(() => {
    if (id) {
      // Only fetch data when ID is available
      axios
        .get(`${BaseUrl.food}/${id}`)
        .then((response) => {
          setGetFoodOne(response.data); // Update the food data
          console.log(response.data);
        })
        .catch((e) => {
          if (axios.isAxiosError(e)) {
            toast.error(e.response?.data?.message || "error");
          } else {
            toast.error("An unexpected error occurred");
          }
        })
    }
  }, [id]); // Run this effect whenever `id` changes

  return (
    <div className="h-full w-full flex justify-center mt-32">
      <UpdateProduct data={getFoodOne as getFoodType} />
    </div>
  );
};

export default Edit;
