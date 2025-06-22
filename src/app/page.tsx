"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Result, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import BaseUrl from "@/utils/url";
export type foodType = {
  _id: string;
  name: string;
  price: number;
  image: string;
  contentType: string;
  fileData:{data : string};
  __v: number;
};



export default function Admin() {
  const [food, setFood] = useState<foodType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    axios
      .get(`${BaseUrl.food}`)
      .then((response) => {
        console.log(response);
        if (isMounted) {
          const foods = response.data.data.map((item: foodType) => ({
            ...item,
            fileData: Buffer.from(item.fileData.data).toString("base64"), // Convert Buffer to base64
          }));
          setFood(foods);
        }
      })
      .catch((e) => {
        setError(e.message);
        

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
    await axios.delete(`${BaseUrl.food}/${id}`);
    const data = food.filter((data) => data._id !== id);
    setFood(data);
  };

  return (
    <>
      {" "}
      

      {loading ? (
        <div className="flex justify-center items-center h-screen">
        <Spin size="large"  />
      </div>
      ) : (
           error ? <Result
    status="500"
    title="500"
    subTitle="Sorry, Something went wrong network error"
    
  />  
           : 
            food.length > 0 ?  <div>
             <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl text-center mt-4 lg:text-4xl dark:text-white">Admin <mark className="px-2 text-white bg-blue-600 rounded-sm dark:bg-blue-500">Panel</mark></h1>
          <Link href="/addfooditem">
            <div
              
              className="flex items-center absolute z-10 bottom-0 right-0 m-2 rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-neutral-50 shadow-lg transition-all duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-md focus:bg-neutral-700 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-600 active:bg-neutral-900 active:shadow-md motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-lg dark:focus:shadow-lg dark:active:shadow-lg"
            >
              Add <span className="ml-2 text-2xl font-bold">+</span>
            </div>
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
          <Link className="bg-blue-600 active:opacity-75 text-white px-2 py-1 rounded-md" href={`/edit/${item._id}`}>
           <div>  <EditOutlined /> Edit</div>

          </Link>
          <Button icon={<DeleteOutlined />} type="default" danger onClick={() => deleteBtn(item._id)}>Delete</Button>
        </div>
                        </td>
                        <td>
                          <Image
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
        </div> :   <Result
    status="500"
    title="500"
    subTitle="Sorry,No Data Found"
    
    extra={<Link href={'/addfooditem'}><Button>Add data</Button></Link>}
  />
      )}
    </>
  );
}
