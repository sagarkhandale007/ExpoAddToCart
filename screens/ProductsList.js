
import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { getProducts } from '../serviceData/ProductsService.js';
import { Product } from '../components/Product.js';

import { getApiProduct } from '../serviceData/ProductsService.js';


export function ProductsList ({navigation}) {

    const [products, setProducts] = useState([]);

async function showData(){

const data = await getProducts();
setProducts(data);

}
  
  function renderProduct({item: product}) {
    return (
      <Product {...product} 
      onPress={() => {
        navigation.navigate('ProductDetails', {
          productId: product.id,
          
        });
      }}
      />
    );
  }
  
  
  useEffect(() => {
    showData();
  });
  
  return (
    <FlatList
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      keyExtractor={(item) => item.id.toString()}
      data={products}
      renderItem={renderProduct}
    />
  );
}

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#eeeeee',
  },
  productsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});

export default ProductsList;

