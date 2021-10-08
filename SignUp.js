import { StatusBar } from 'expo-status-bar';

import { Email,PermContactCalendar, EmailOutlined,Lock, CalendarToday} from '@material-ui/icons';

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
  Icon,

  TouchableOpacity,
 Linking,
} from "react-native";

<Image /> 

  export default function App() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [BirthDate, setBirthDate] = useState();
    const [birthMonth, setBirthMonth] = useState("");
    const [birthYear, setBirthYear] = useState("");
   
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
         placeholder=  "First Name..."
         placeholderTextColor="#003f5c"
         onChangeText={(firstName) => setFirstName(firstName)}
       />
 </View>
 <View style ={styles.icons}>
     <PermContactCalendar/>
     </View>
     </View>
      <View style={styles.inputView}>
     <View >
       <TextInput
         style={styles.TextInput}
         placeholder=  "Last Name..."
         placeholderTextColor="#003f5c"
         onChangeText={(lastName) => setLastName(lastName)}
       />
 </View>
 <View style ={styles.icons}>
 <PermContactCalendar/>
     </View>
     </View>

     <View style={styles.inputView}>
     <View >
       <TextInput
         style={styles.TextInput}
         placeholder=  "DD/MM/YYYY..."
         placeholderTextColor="#003f5c"
         onChangeText={(BirthDate) => setBirthDate(BirthDate)}
       />
 </View>
 <View style ={styles.icons}>
     <CalendarToday/>
     </View>
     </View>
    
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
      
        <Text style={styles.loginText} >Register</Text>
      
      </TouchableOpacity>
  
    <TouchableOpacity>
    
         
   
    <Text style={styles.linkText}>
    Already Have an Account? Sign In Here!
      </Text>
  </TouchableOpacity>
</View>

      
    );
}
const validate = (text) => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
   if(expression.test(String(text).toLowerCase())){
    setEmail(text);
   }
 
}
let handleOnChange = ( text) => {

  // don't remember from where i copied this code, but this works.
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
  if ( re.test(text) ) {
      // this is a valid email address
      setEmail(text);
      // or update the data in redux store.
  }
  else {
      // invalid email, maybe show an error to the user.
      alert(text.value);
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#bf8085",
    
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#f8edeb",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,
    flexDirection:"row",
    
  },

  TextInput: {
    height: 40,
    flexDirection:"row",
    padding: 10,
    marginLeft: 50,
    alignItems: "right",
    justifyContent: "center",
    alignSelf: 'flex-start',
    backgroundColor: '#f8edeb',
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
    backgroundColor: "#724c4f",
  
    
  },
  loginText:{
    color: "#FFF0F3",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Cochin",

  },
  linkText: {
    color:"#FFF0F3",
    fontFamily: "Cochin",
  },
  icons:{
   marginTop:10,
   marginRight:10,
    
  },
});