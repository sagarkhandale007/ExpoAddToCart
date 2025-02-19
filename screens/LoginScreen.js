import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import * as loginAction from '../loginState/store/actions/UserSession.js';


import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getApiProduct } from '../serviceData/ProductsService.js';

export default function LoginScreen({navigation}) {

 

   async function getLogin() {
    

    try {

        const response = await fetch('https://reactauthentication-8df42-default-rtdb.firebaseio.com/data.json',

            {
                method: 'GET',
            });

        if (!response.ok) {

            const errorRes = await response.json();
            console.log("error"+response);

            throw new Error(errorRes.error.message);

        }
        const LoginAuthenticationData = await response.json();
        for (const key in LoginAuthenticationData) {

            if(email ==LoginAuthenticationData[key].email && password ==LoginAuthenticationData[key].password){

            dispatch(loginAction.loginUser(true));

            navigation.navigate('ProductsList');

            }else{
              Alert.alert(
                "Authentication",
                "invalid username or password")}     
                }

        return LoginAuthenticationData;

    } catch (error) {

        throw new Error(error);

    }

};


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/shopp.png')} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn} onPress={()=>getLogin()}>
        <Text style={styles.loginText} onPress={()=>getLogin()}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});


