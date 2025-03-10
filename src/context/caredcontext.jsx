 "use client"
import { createContext, useContext, useEffect, useState } from "react";
const CardContext = createContext();

export default function CardConProvider({
  children
}) {
  
  
  const [cardItem, setCardItem] = useState(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("cardItem");
      try {
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error("Error parsing cardItem from localStorage:", error);
        return [];
      }}
  });
     

  const [token, setToken] = useState(() => {if (typeof window !== "undefined") {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("tokenno");
      try {
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error("Error parsing cardItem from localStorage:", error);
        return [];
      }
    }
  }
  
  });


  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
    localStorage.setItem("tokenno", JSON.stringify(token));
    }
  }, [token,isClient]);

 const addToken=(token)=>{
   setToken(token)
  }



  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cardItem", JSON.stringify(cardItem));
    }
  }, [cardItem, isClient]);

    
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
               return prev.map(prevone=>prevone._id === item._id ? {...prevone , quantity: prevone.quantity -1} : prevone).filter((item) => item.quantity > 0)
           } else{
             return;
           }        

       })
  }


  return <CardContext.Provider value={{addToCard,addButtunToCard,addToken,cardItem,token,setCardItem,minusToCard}}>{children}</CardContext.Provider>;
}
export const useCardContext = () => useContext(CardContext);
