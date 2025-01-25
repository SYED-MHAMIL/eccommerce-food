"use client";

import React, { useEffect, useState } from "react";
import { getFoodType } from "@/app/edit/[id]/page";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UpdateProduct = ({ data }: { data: getFoodType }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null | string>(null);
  const router = useRouter();
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };

  useEffect(() => {
    let mount = true;
    if (mount && data?.data) {
      setProductName(data?.data?.name);
      setPrice(data?.data?.price);
      setFile(data?.data?.fileName);
    }

    return () => {
      mount = false;
    };
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
   
    const formData = new FormData();
    formData.append("file", file as File); // Attach the file
    formData.append("name", productName); // Attach productName as 'name'
    formData.append("price", price); // Attach price
  


    axios
      .put(`http://localhost:4000/food/${data?.data._id}`,formData,{
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((resolve) => {
        if (resolve.data) {
          router.push("/");
          toast.success("Food Item Sucessfully Updated");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.response?.data?.message);
      });

  };

  return (
    <section className="bg-white">
      <div className="max-w-3xl px-4 py-8 mx-auto">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Update Product
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-6 sm:grid-cols-2 sm:gap-6">
              {/* Product Name Input */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="productName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Type product name"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                />
              </div>

              {/* Price Input */}
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Type product price"
                  // required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                />
              </div>

              {/* Image Picker */}
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Upload Product Image
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleImageChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  accept="image/*"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between space-x-4">
              <button
                type="submit"
                className="w-full sm:w-auto text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-400 hover:bg-green-600 "
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateProduct;
