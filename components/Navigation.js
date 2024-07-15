import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen.js';
import {ProductsList} from '../screens/ProductsList.js';
import { ProductDetails } from '../screens/ProductDetails.js';
import { Cart } from '../screens/Cart.js';
import { CartIcon } from '../components/CartIcon.js';
import HeaderButton from './HeaderButton';
import * as loginAction from '../loginState/store/actions/UserSession.js';
import { useSelector, useDispatch,Provider } from 'react-redux';
const Stack = createNativeStackNavigator();


function Navigation() {
 const dispatch = useDispatch();
 const loginStatus = useSelector(state => state.login.loginStatus);
 const logout = require('../assets/images.png');
 console.log("loginStatus",loginStatus);
 
  const loginScreenList = <Stack.Screen name='LoginScreen' component={LoginScreen}
    options={({ navigation }) => ({
      title: 'Login Screen',
      headerTitleStyle: styles.headerTitle
    })} />
    
    const productListScreenDrawer=<Stack.Screen name='ProductsList' component={ProductsList}
      options={({ navigation }) => ({
        title: 'Products',
        headerTitleStyle: styles.headerTitle,
        headerRight: () => <CartIcon navigation={navigation} />,
        headerLeft: () => (
          <HeaderButton onPress={() => {
            Alert.alert("Logout", "Are your sure you want to logout.",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "OK", onPress: () => { dispatch(loginAction.loginUser(false)); }
                }
              ]
            );
          } } image={logout}>
          </HeaderButton>
        )
      })} />

  return (

      <NavigationContainer>
        <Stack.Navigator>

      {!loginStatus && loginScreenList}
      {loginStatus && productListScreenDrawer}
      {loginStatus === undefined && productListScreenDrawer}

          <Stack.Screen name='ProductDetails' component={ProductDetails} 
          options={({ navigation }) => ({
            title: 'Product Details',
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation}/>,
          })} />
          <Stack.Screen name='Cart' component={Cart} 
          options={({ navigation }) => ({
            title: 'My Cart',
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation}/>,
          })} />

        </Stack.Navigator>
      </NavigationContainer>

  );
}
const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20
  }
});
export default Navigation;