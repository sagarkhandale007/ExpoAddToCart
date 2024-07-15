import React, {createContext, useState} from 'react';
import { getProduct } from '../serviceData/ProductsService.js';


export const CartContext = createContext();

export function CartProvider(props) {
  const [items, setItems] = useState([]);
  
  async function addItemToCart(id,value) {

     const val= value;
    const product = await getProduct(id);
    setItems((prevItems) => {
      const item = prevItems.find((item) => (item.id == id));

      if(value =="add"){
        if(!item) {
          return [...prevItems, {
              id,
              qty: 1,
              product,
              totalPrice: product.price, 
              image:product.image
              
          }];
      }
      else { 
          return prevItems.map((item) => {
            if(item.id == id) {
              item.qty++;
              item.totalPrice += product.price;
            }
            return item;
          });
      }
    }else{
      
        return prevItems.map((item) => {
          if(item.id == id) {
            item.qty--;
            item.totalPrice -= product.price;
          }
          return item;
        });
    
    }
    });

  }

  function getItemsCount() {

    return items.reduce((sum, item) => (sum + item.qty), 0);

  }

  function getTotalPrice() {

    return items.reduce((sum, item) => (sum + item.totalPrice), 0);
      
  }  

  return (
    <CartContext.Provider 

     value={{items, setItems, getItemsCount,addItemToCart ,getTotalPrice}}>

      {props.children}
    </CartContext.Provider>
  );
}

