import SignUp from "../screens/SignUpScreen";
import Questionnaire from "../screens/Questionnaire";
import LoginScreen from "../screens/LoginScreen";
import OnBoardScreen from "../screens/OnBoardScreen";
import LoginError from "../screens/SignInError";
import SignUpError from "../screens/SignUpError";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/Questionnaire";

const LoginStack = createNativeStackNavigator();

const LoginNavigation = ({ navigation, route }) => {
  return (
    <LoginStack.Navigator>
      {route.params.shownSplashScreen == false ? (
        <LoginStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
          initialParams={{
            setShownSplashScreen: route.params.setShownSplashScreen,
          }}
        />
      ) : null}

      <LoginStack.Screen
        name="OnBoardScreen"
        component={OnBoardScreen}
        options={{ title: "OnBoardScreen", headerShown: false }}
      />

      <LoginStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "LoginScreen", headerShown: false }}
        initialParams={{ setIsLoggedIn: route.params.setIsLoggedIn }}
      />
      <LoginStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
        initialParams={{ setIsLoggedIn: route.params.setIsLoggedIn }}
      />
      <LoginStack.Screen
        name="Questionnaire"
        component={Questionnaire}
        options={{ headerShown: false }}
        initialParams={{ setIsLoggedIn: route.params.setIsLoggedIn }}
      />
      <LoginStack.Screen
        name="SignInError"
        component={LoginError}
        options={{ headerShown: false }}
        initialParams={{ setIsLoggedIn: route.params.setIsLoggedIn }}
      />
      <LoginStack.Screen
        name="SignUpError"
        component={SignUpError}
        options={{ headerShown: false }}
        initialParams={{ setIsLoggedIn: route.params.setIsLoggedIn }}
      />
    </LoginStack.Navigator>
  );
};

export default LoginNavigation;
