import { StatusBar } from 'expo-status-bar';
import {SignUp} from './SignUp';

import { Email,Lock } from '@material-ui/icons';
import React from 'react';
import { useState } from "react";
import {StackNavigator} from 'react-navigation';
//import SignUp from "C:\\Users\\lexif\\AppProject\\SignUp.js";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
 Linking,
} from "react-native";
<Image /> 

  export default function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const NavigationApp = StackNavigator({
      //SignUp:{screen:SignUpScreen},
     
      
    //});
    return (
      <View style={styles.container}>
      <Image
      style={{height:'12%', width:'25%', marginTop:'2%', alignItems: "center",marginBottom:"15%"}}
source={{uri:'https://th.bing.com/th/id/R.09cd898d6be677558e64bb03d9170c1c?rik=HMz2tjfY%2fYsWhA&riu=http%3a%2f%2fimg1.wikia.nocookie.net%2f__cb20140622151800%2fcharacters%2fimages%2f6%2f66%2fKirby_(KRTDL).png&ehk=JY3ai18E3va2F2vMaU%2bg0stZvApIyb3rtm5WIsm1iBw%3d&risl=&pid=ImgRaw&r=0'}}
      />
      <StatusBar style="auto" />
        
      <View style={styles.inputView}>
     
      <View >
     
        <TextInput
          style={styles.TextInput}
          placeholder=  "Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
         
        />
  </View>
  <View style ={styles.icons}>
      <Email/>
      </View>
      </View>
      <View style={styles.inputView}>
     <View >
       <TextInput
         style={styles.TextInput}
         placeholder=  "Password..."
         placeholderTextColor="#003f5c"
         onChangeText={(password) => setPassword(password)}
       />
 </View>
 <View style ={styles.icons}>
    <Lock/>
     </View>
     </View>
    

      <TouchableOpacity style={styles.loginBtn}>
      
        <Text style={styles.loginText}>LOGIN</Text>
      
      </TouchableOpacity>
  
    <TouchableOpacity>
    
         
   
    <Text style={styles.loginText}>
    No Account? Signup Here!
      </Text>
  </TouchableOpacity>
</View>

      
    );
}

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
    marginLeft: 25,
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 30,
    backgroundColor: "#FF1493",
    
  },
});