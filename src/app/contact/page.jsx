'use client'

import { BsArrowRight } from "react-icons/bs";
// framer
import { motion } from "framer-motion";
//varient
// import { fadeIn } from "../.";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { fadeIn } from "../../../varients";

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const  [isOpen,setIsOpen]=useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      "service_9jvi53q",
      "template_iytaqnc",
      {
        from_name: form.name,
        to_name: "zain",
        from_email: form.email,
        to_email: "zain03172666@gmail.com",
        message: form.message,
      },
      "iPOtVxkHJb7k3D85k"
    );
    
  setLoading(false)
 
  setForm({
      name:'',
      email : '',
      message: ''
    })
     
    setIsOpen(true)

  };

  return (
    <section className="bg-white dark:bg-gray-900">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
      Contact Us
    </h2>
    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
      Got a technical issue? Want to send feedback about a beta feature? Need
      details about foods? Let us know.
    </p>
    <form action="#" className="space-y-8" onSubmit={handleSubmit}>
    <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Your name
        </label>
        <input
          type="name"
          onChange={handleChange}
          value={form.name}
          name="name"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="Enter your name"
          required
        />
      </div>
   
    <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Your email
        </label>
        <input
          type="email"
          value={form.email}
          onChange={handleChange}
          name="email"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="name@quikQuili.com"
          required
        />
      </div>

      
   
     
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Your message
        </label>
     <textarea
              name="message"
              placeholder="hi, Can i help you..."
              value={form.message}
              onChange={handleChange}
               className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
           
           ></textarea>

      </div>
      {
  isOpen ? (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-accent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  dark:hover:text-white"
            onClick={() => setIsOpen(false)} // Close modal on click
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            {/* Success Icon */}
            <svg
              className="mx-auto mb-4 text-green-400 w-12 h-12 m-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4M9 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Your message has been sent successfully!
            </h3>
          
          </div>
        </div>
      </div>
    </div>
  ) : (
    <button
        type="submit"
        className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-600 sm:w-fit hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 "
      >
        Send message
      </button>
  )
}
     
    </form>
  </div>
</section>

  );
};

export default Contact;
