"use client";
import { useCardContext } from "@/context/caredcontext";
import { useEffect, useMemo,useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import BaseUrl from "@/utils/url";
export const ShopingCards = () => {
  const { cardItem, addToCard, minusToCard, setCardItem,token } = useCardContext();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    setIsClient(true);
  }, []);

  const total = useMemo(() => {
    return (
      cardItem?.length > 0 &&
      cardItem.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  }, [cardItem]);

  const strepiPromise = loadStripe(
    "pk_test_51Qs0jvQvjDTMUcY0ibk5hc6ASFPNNhi8y7GsNXb7g647dOWZ87lCkBUd3imGwEzeL5wz35i8mshmEaewRCM3pJNG00BLlKK3og"
  );
   
  useEffect(() => { 
    console.log(token);
    
    if (!token) {
      router.push("/login");  

    }
    
}, [token])
    
  

  const handleCheckOut = async () => {
    const stripe = await strepiPromise;
    console.log(token, "token");
    
    if (token == null) {
      toast.error("You must be logged in to checkout");
      return;
    }

    if (!stripe) {
      toast.error("Stripe failed to load");
      return;
    }

    const transformedItems = cardItem?.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    try {
      const response = await axios.post(
        `${BaseUrl.stripe}`,
        {
          products: transformedItems,
        }
      );

      if (response.data.id) {
        await stripe.redirectToCheckout({
          sessionId: response.data.id,
        });
        if (isClient) {
          localStorage.removeItem("cardItem");
        }
      } else {
        throw new Error("Session ID missing in response");
      }
    } catch (error) {
      console.error("There was an error processing the checkout: ", error);
    }
  };

  const cancleFood = (id) => {
    const cancle = cardItem?.filter((data) => data._id !== id);
   
    setCardItem(cancle);
  };

  if (!isClient) {
    return null;
  }

  return (
    <section className="h-screen bg-white py-12 sm:py-16 lg:py-20 ">
      {cardItem?.length > 0 ? (
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-semibold text-green-500">Your Carts</h1>
          </div>
          <div className="mx-auto mt-8 max-w-2xl md:mt-12">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8">
                    {cardItem?.map((food) => {
                      return (
                        <li
                          key={food._id}
                          className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                        >
                          <div className="shrink-0">
                            <Image
                              className="h-24 w-24 max-w-full rounded-lg object-cover"
                              src={`data:${food?.contentType};base64,${food.fileData}`}
                              alt="hhh"
                              height={100}
                              width={100}
                            />
                          </div>
                          <div className="relative flex flex-1 flex-col justify-between">
                            <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                              <div className="pr-8 sm:pr-5">
                                <p className="text-base font-semibold text-gray-900">
                                  {food.name}
                                </p>
                                <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                  quantity:{food.quantity}
                                </p>
                              </div>
                              <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                  ${(food.price / 280).toFixed(2)}
                                </p>
                                <div className="sm:order-1">
                                  <div
                                    className={`mx-auto flex h-8 items-stretch text-gray-60`}
                                  >
                                    <button
                                      onClick={() =>
                                        food?.quantity > 1 && minusToCard(food)
                                      }
                                      className={`flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white ${
                                        food?.quantity === 1
                                          ? "opacity-30 cursor-not-allowed"
                                          : ""
                                      }`}
                                    >
                                      -
                                    </button>
                                    <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                      {food?.quantity}
                                    </div>
                                    <button
                                      onClick={() => addToCard(food)}
                                      className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                              <button
                                onClick={() => cancleFood(food._id)}
                                type="button"
                                className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                              >
                                <svg
                                  className="h-5 w-5"
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
                                    className=""
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
          
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    <span className="text-xs font-normal text-gray-400">
                      USD
                    </span>{" "}
                    ${(total / 280).toFixed(2)}
                  </p>
                </div>
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    className="group inline-flex w-full items-center justify-center rounded-md bg-gradient-to-l cursor-pointer from-green-400 to-green-600 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:opacity-95"
                    onClick={handleCheckOut}
                  >
                    Proceed to Checkout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6">
          <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
            <h2 className="text-xl  text-gray-800">
              There are no items in this cart
            </h2>
            <Link
              href="/home"
              className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShopingCards;
