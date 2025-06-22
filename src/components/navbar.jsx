"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import { useCardContext } from '@/context/caredcontext';
import Link from 'next/link';
function Navbar() {
   const [isOpen , setIsOpen]=useState(false)
  const {cardItem}=useCardContext() 
  const total=cardItem?.length  > 0 && cardItem.reduce((acc,item)=> acc+ item.quantity ,0)
 const {addToken,token}=useCardContext()

  return (
    <div><>
    {/* component */}
    <nav className="relative px-4 py-4 flex justify-between items-center bg-white border-b-2 ">
      <Link className="text-3xl font-bold leading-none" href="/home">
      
        <Image src={'/logoQdeli.png'} height={150} width={150} alt='queli' />
      </Link>


{/* hamburger with shop */}

    <div className='flex items-center lg:hidden'>
      
    <Link href={'/my-shop'} className="relative scale-75  hover:bg-gray-100 p-2 hover:rounded-full hover:scale-90 transition-all  ">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="h-8 w-8 text-gray-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
 { cardItem?.length > 0 && <span className="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">
       {total}
  </span>}
</Link>


      <div >
        <button onClick={()=>{
               setIsOpen(true)
        }} className="navbar-burger flex items-center text-blue-600 p-3">
          <svg
            className="block h-4 w-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

    </div>


      
      <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto  lg:items-center lg:w-auto lg:space-x-6">
      <li  href={'/home'}>
          <Link className="text-sm text-gray-400 hover:text-gray-500" href="/home">
            Home
          </Link>
        </li>
        <li className="text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4 current-fill"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </li>
        <li>
          <Link className="text-sm text-blue-600 font-bold" href="/about">
            About Us
          </Link>
        </li>
        <li className="text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4 current-fill"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </li>
        <li>
          <Link className="text-sm text-gray-400 hover:text-gray-500" href="/services">
            Services
          </Link>
        </li>
       
        <li className="text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4 current-fill"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </li>
        <li>
          <Link className="text-sm text-gray-400 hover:text-gray-500" href="/contact">
            Contact
          </Link>
        </li>
      </ul>

      {!token ? <Link href={'/login'} className={` ${ "block"} lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200`}>
      Sign In
      </Link> : <Link href={'/login'} className={` ${ "block"} lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-transparent hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200`}>
      
      </Link> }
     
  { token  ? <Link onClick={()=>{
        setIsOpen(false)
        addToken(null)
      }}
        className="hidden lg:inline-block py-2 px-6 bg-red-500 hover:bg-red-600 text-sm text-white font-bold rounded-xl lg:mr-3 transition duration-200"
        href="/login"
      >
        Log out
      </Link>
      
     
     : <Link
        className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
        href="/register"
        // onClick={}
      >
        Sign up
      </Link>

    }
      <Link href={'/my-shop'} className="relative scale-75 hidden lg:inline-block hover:bg-gray-100 p-2 hover:rounded-full hover:scale-90 transition-all ">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="h-8 w-8 text-gray-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
  { cardItem?.length > 0 && <span className="absolute -top-1 left-6 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">
       {total}
  </span>}
</Link>

      
    </nav>
    
   {isOpen && <div className="navbar-menu relative z-50">
      <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25" />
      <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
        <div className="flex items-center mb-8">
          <Link className="mr-auto text-3xl font-bold leading-none" href="#">
        
        <Image src={'/logoQdeli.png'} height={150} width={150} alt='queli2' />

          </Link>
          <button onClick={()=>{
             setIsOpen(false)
          }} className="navbar-close">
            <svg
              className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>
          <ul>
            <li className="mb-1" href={'/home'}>
              <Link
                className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                href="/home"
              >
                Home
              </Link>
            </li>
            <li className="mb-1">
              <Link
                className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                href="/about"
              >
                About Us
              </Link>
            </li>
            <li className="mb-1">
              <Link
                className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                href="/services"
              >
                Services
              </Link>
            </li>
        
            <li className="mb-1">
              <Link
                className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                href="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-auto">
          <div className="pt-6">
            {/* <Link
              className={`${token ? "hidden" : "block"} px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold  bg-gray-50 hover:bg-gray-100 rounded-xl`}
              href="/login"
            >
                <button onClick={()=>{setIsOpen(false)}}>
                Sign in
                </button>
            
            </Link> */}

            {token ? <Link
              className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-red-600 hover:bg-red-700  rounded-xl"
              href="/login"
            >
              <button onClick={()=>{
                setIsOpen(false)
                addToken(null)
               
                }}>
              Log Out
              </button>
              
            </Link>

           : <Link
              className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"
              href="/register"
            >
              <button onClick={()=>{setIsOpen(false)}}>
              Sign Up
              </button>
              
            </Link>
}
          </div>
          <p className="my-4 text-xs text-center text-gray-400">
            <span>Copyright © 2021</span>
          </p>
        </div>
      </nav>
    </div>}



    
  </>
  </div>
  )
}

export default Navbar