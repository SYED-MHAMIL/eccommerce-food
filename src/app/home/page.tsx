"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Addtocards from '@/components/addtocards'
import { Spin } from 'antd';



const Home = () => {

    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:4000/food')
            .then((response) => {
                const foods = response.data.data.map((item: any) => ({
                    ...item,
                    fileData: Buffer.from(item.fileData.data).toString("base64"), // Convert Buffer to base64
                  }));
                  setFood(foods);
                
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, []);

  return (
      
    loading ? <div className="flex justify-center items-center h-screen">
    <Spin size="large" />
  </div>
    :


    <div className='p-4 max-w-[1400px] mx-auto mt-16'>

        <div className='grid sm:grid-cols-2 gap-4'>

            <img src={'/qdeli.png'} className='rounded-2xl h-full object-cover' />
            <img src={"/restaurant1.png"} className='rounded-2xl h-full object-cover' />
        </div>

        <div className='rounded-tr-lg rounded-bl-lg bg-gradient-to-l from-green-400 to-green-600 mt-8 h-[40px]
                        flex items-center justify-start my-8'>
            <h1 className='text-2xl my-8 font-bold pl-8 text-white'>Lunch Specials</h1>
        </div>

        <Addtocards food={food} />
    </div>
  )
}

export default Home