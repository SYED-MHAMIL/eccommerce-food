"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type foodType = {
  _id: string;
  name: string;
  price: number;
  image: string;
  contentType: String;
  fileData: string;
  __v: number;
};



export default function admin() {
  const [food, setFood] = useState<foodType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    axios
      .get("http://localhost:4000/food")
      .then((response) => {
        console.log(response);
        if (isMounted) {
          const foods = response.data.data.map((item: any) => ({
            ...item,
            fileData: Buffer.from(item.fileData.data).toString("base64"), // Convert Buffer to base64
          }));
          setFood(foods);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false); // Request complete hone ke baad loading false
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteBtn = async (id: string) => {
    await axios.delete(`http://localhost:4000/food/${id}`);
    const data = food.filter((data) => data._id !== id);
    setFood(data);
  };

  return (
    <>
      {" "}
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <h1>laoding...</h1>
        </div>
      ) : (
        <>
          <Link href="/addfooditem">
            <button
              type="button"
              className="flex items-center absolute z-10 bottom-0 right-0 m-2 rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-neutral-50 shadow-lg transition-all duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-md focus:bg-neutral-700 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-600 active:bg-neutral-900 active:shadow-md motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-lg dark:focus:shadow-lg dark:active:shadow-lg"
            >
              Add <span className="ml-2 text-2xl font-bold">+</span>
            </button>
          </Link>
          <div className="">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3">
                      image
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {food.map((item, i) => {
                    return (
                      <tr className="bg-white border-b " key={i}>
                        <td className="px-6 py-4">{i + 1}</td>
                        <td className="px-6 py-4">{item?.name}</td>
                        <td className="px-6 py-4">{item?.price}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <span className="px-2 py-1 rounded-lg  bg-red-600 hover:bg-red-700 text-white">
                              <Link href={`/edit/${item._id}`}>Edit</Link>
                            </span>
                            <span
                              className="px-2 py-1  rounded-lg cursor-pointer bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => {
                                deleteBtn(item._id);
                              }}
                            >
                              delete
                            </span>
                          </div>
                        </td>
                        <td>
                          <img
                            src={`data:${item?.contentType};base64,${item.fileData}`}
                            alt="hhh"
                            height={100}
                            width={100}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
