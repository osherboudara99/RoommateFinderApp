import SignUp from './SignUpPage';
import SignInScreen from './LoginPage';
import LoginNavigation from './LoginNavigation';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';

import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [shownSplashScreen, setShownSplashScreen] = useState(false)


  return (
  /*  <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen
          name='SplashScreen'
          component={SplashScreen}
          options={{ headerShown: false }}
          initialParams={{ isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>*/
    <NavigationContainer>
      <Stack.Navigator>

        {isLoggedIn == false ? (
         <Stack.Screen name="LoginNavigation" component={LoginNavigation} options={{ headerShown: false,
         }} initialParams={{ setIsLoggedIn: setIsLoggedIn, shownSplashScreen: shownSplashScreen, setShownSplashScreen: setShownSplashScreen }}/>
       ) : (
           <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} initialParams={{ setIsLoggedIn: setIsLoggedIn }}/>)}


      </Stack.Navigator>
    </NavigationContainer>
  );
}

