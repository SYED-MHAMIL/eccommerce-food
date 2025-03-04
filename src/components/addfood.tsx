"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("0");
  const [actualPrice, setActualPrice] = useState("0");  

  const [file, setFile] = useState<File | null | string>(null);
  // const {name}=data?.data
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };
 const router= useRouter()


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file || !productName || !price) {
      setMessage("All Field are Required");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Attach the file
    formData.append("name", productName); // Attach productName as 'name'
    formData.append("price", price); // Attach price
    formData.append("actualPrice", actualPrice); // Attach price

    try {
      const response = await axios.post("http://localhost:4000/food", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("File uploaded successfully!");
        router.push('/')
      }
    } catch (error) {
     toast.error("Error uploading file!");
    }


  };

  return (
    <section className="bg-white">
      <div className="max-w-3xl px-4 py-8 mx-auto">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Add Food Item
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
                  onChange={(e) => setPrice((e.target.value))}
                  placeholder="Type product price"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                />
              </div>   
               <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                 Actual Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={actualPrice}
                  onChange={(e) => setActualPrice((e.target.value))}
                  placeholder="Type product price"
                  required
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
                  id="image"
                  name="file"
                  onChange={handleImageChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  accept="image/*"
                />
              </div>
            </div>
            {message && <p>{message}</p>}
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

export default AddProduct;
