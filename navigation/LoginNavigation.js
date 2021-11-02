import SignUp from '../screens/SignUpScreen';
import Questionnaire from '../screens/Questionnaire';
import LoginPage from '../screens/LoginScreen';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';

const LoginStack = createNativeStackNavigator();


const LoginNavigation = ({navigation, route}) =>
{


    return(
        <LoginStack.Navigator>
          

        {route.params.shownSplashScreen == false ? (
         <LoginStack.Screen
         name='SplashScreen'
         component={SplashScreen}
         options={{ headerShown: false }}
         initialParams={{setShownSplashScreen: route.params.setShownSplashScreen}}
       />
       ) : null}

        <LoginStack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ title: 'Login' }}
          initialParams={{setIsLoggedIn: route.params.setIsLoggedIn}}
        />
        <LoginStack.Screen 
        name="SignUp" 
        component={SignUp}
        initialParams={{setIsLoggedIn: route.params.setIsLoggedIn}} />
        <LoginStack.Screen 
        name="Questionnaire" 
        component={Questionnaire}
        initialParams={{setIsLoggedIn: route.params.setIsLoggedIn}} />


        </LoginStack.Navigator>
        
    );
}

export default LoginNavigation;