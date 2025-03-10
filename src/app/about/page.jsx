import React from "react";

const AboutQuickDeli = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-green-600">About Quick Deli</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to <strong className="text-green-400">Quick Deli</strong>, your ultimate destination for delicious and high-quality food! We specialize in providing a variety of mouthwatering meals, from sizzling burgers to crispy zingers, cheesy pizzas, refreshing beverages, and much more. Our mission is to serve fresh, tasty, and hygienic food that satisfies your cravings in no time.
        </p>
        <p className="text-lg text-gray-700 mt-4 leading-relaxed">
          At Quick Deli, we believe in fast service without compromising on quality. Whether you're dining in, taking out, or ordering online, we ensure that every bite is a delight. Join us and experience the best flavors, served with love!
        </p>
      </div>
    </div>
  );
};

export default AboutQuickDeli;
