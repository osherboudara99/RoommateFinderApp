import LoginNavigation from "./navigation/LoginNavigation";
import AppNavigation from "./navigation/AppNavigation";
import Questionnaire from "./screens/Questionnaire";

import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shownSplashScreen, setShownSplashScreen] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn == false ? (
          <Stack.Screen
            name="LoginNavigation"
            component={LoginNavigation}
            options={{ headerShown: false }}
            initialParams={{
              setIsLoggedIn: setIsLoggedIn,
              shownSplashScreen: shownSplashScreen,
              setShownSplashScreen: setShownSplashScreen,
            }}
          />
        ) : (
          <Stack.Screen
            name="AppNavigation"
            component={AppNavigation}
            options={{ headerShown: false }}
            initialParams={{ setIsLoggedIn: setIsLoggedIn }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
