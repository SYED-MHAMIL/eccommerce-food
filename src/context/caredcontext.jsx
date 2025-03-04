 "use client"
import { foodType } from "@/app/page";
import { createContext, useContext, useEffect, useState } from "react";
const CardContext = createContext();

export default function CardConProvider({
  children,
}) {
  
  
  const [cardItem, setCardItem] = useState(() => {
    const data = localStorage.getItem("cardItem");
   return data  ? JSON.parse(data ) : []
  });
     

  const [token, setToken] = useState(() => {
    const data = localStorage.getItem("tokenno");
   return data  ? JSON.parse(data ) : null
  });

  useEffect(() => {
    localStorage.setItem("tokenno", JSON.stringify(token));
  }, [token]);

 const addToken=(token)=>{
   setToken(token)
  }



  useEffect(() => {
    localStorage.setItem("cardItem", JSON.stringify(cardItem));
  }, [cardItem]);

    
const addButtunToCard=(item,quan)=>{
  setCardItem((prev)=>{
    const cardInItem= prev.find(data => data._id === item._id)
    if(cardInItem){
          return prev.map( prevOne => prevOne._id === item._id ? {...prevOne , quantity :prevOne.quantity + quan } :prevOne )
    }else{
      
      return [...prev, {...item, quantity : quan}]
    }

})
     
}


   const addToCard=(item)=>{
        
    setCardItem((prev)=>{
            const cardInItem= prev.find(data => data._id === item._id)
            if(cardInItem){
                  return prev.map( prevOne => prevOne._id === item._id ? {...prevOne , quantity :prevOne.quantity +1 } :prevOne )
            }else{
              
              return [...prev, {...item, quantity : 1}]
            }

    })

   }
  const  minusToCard=(item)=>{
       setCardItem((prev)=>{
           const cardInItem= prev.find( data=> data._id  === item._id)        
           if(cardInItem) {
               return prev.map(prevone=>prevone._id === item._id ? {...prevone , quantity: prevone.quantity -1} : prevone)
           } else{
             return;
           }        

       })
  }


  return <CardContext.Provider value={{addToCard,addButtunToCard,addToken,cardItem,token,setCardItem,minusToCard}}>{children}</CardContext.Provider>;
}
export const useCardContext = () => useContext(CardContext);
