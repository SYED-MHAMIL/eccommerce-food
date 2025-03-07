import React from "react";

import SingleCard from "./singleCard";
const Addtocards = ({ food }) => {
  return (
    <>
      <div className="mb-8 flex-wrap flex">
        {food?.length > 0 &&
          food.map((product, index) => (
            <SingleCard
              key={product._id}
              food={product}
              lastFood={true}
            />
          ))}
      </div>
    </>
  );
};

export default Addtocards;
