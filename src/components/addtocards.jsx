import React from 'react'

import SingleCard from './singleCard';
const Addtocards = ({food}) => {


      return (
    <>
   
      <div className="flex justify-center items-center w-full h-screen gap-1 mb-8 flex-wrap">
      {food?.length > 0 &&
          food.map(
            (product) => (
              <SingleCard key={product._id} food={product}/>
           )
        )}
      </div>
    </>
  )
}

export default Addtocards