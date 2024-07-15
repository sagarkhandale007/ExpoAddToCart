import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import { CartIcon } from '../components/CartIcon.js';
import { CartContext } from '../context/CartContext.js';


export function Cart ({navigation}) {

  const {items, getItemsCount,getItemsCountSub,getTotalPrice} = useContext(CartContext);
  const { SubtractItemToCart } = useContext(CartContext);

  const { addItemToCart } = useContext(CartContext);
  const [itemData, setitemData] = useState([]);


 
  function onAddToCart(id,value) {
    
    addItemToCart(id,value);

  }

  function Totals() {

    let [total, setTotal] = useState(0);
    useEffect(() => {
      setTotal(getTotalPrice());

    });

    return (
       <View style={styles.cartLineTotal}>
          <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
          <Text style={styles.lineRight}>$ {total}</Text>
       </View>
    );
  }

  function renderItem({item}) {
    value="sub"

    let total = item.qty;
  
    if (total < 0)
        total = 0;
    console.log("ccccc",total);

    return (
      
      <View>
              
        {total > 0 &&   <Image style={styles.image} 
         source={{uri:item.product.image}}/>}

        {total > 0 &&   <Button style={styles.button}
           
             onPress={()=>{
              onAddToCart(item.product.id,value)
              if(item.qty==0){
               
              }
             }}

            title="Remove From Cart"
            />}
         
         {total > 0 &&   <View style={styles.cartLine}>
         <Text style={styles.lineLeft}>{item.product.name} x {item.qty}</Text>
         <Text style={styles.lineRight}>$ {item.totalPrice}</Text>
        
       </View>}
       </View>
    );
  }
  
  return (
    <FlatList
      style={styles.itemsList}
      contentContainerStyle={styles.itemsListContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.product.id.toString()}
      ListFooterComponent={Totals}
    />
  );
}

const styles = StyleSheet.create({
  cartLine: { 
    flexDirection: 'row',
  },
 
  cartLineTotal: { 
    flexDirection: 'row',
    borderTopColor: '#dddddd',
    borderTopWidth: 1
  },
  lineTotal: {
    fontWeight: 'bold',    
  },
  lineLeft: {
    fontSize: 20, 
    lineHeight: 40, 
    color:'#333333' 
  },
  lineRight: { 
    flex: 1,
    fontSize: 20, 
    fontWeight: 'bold',
    lineHeight: 40, 
    color:'#333333', 
    textAlign:'right',
  },
  itemsList: {
    backgroundColor: '#eeeeee',
  },
  itemsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  image: {
    height: 200,
    width: '100%'
  },
  button:{
    marginTop:50
  }
});
