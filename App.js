import LoginNavigation from "./navigation/LoginNavigation";
import HomeNavigation from "./navigation/HomeNavigation";
import ProfileScreen from "./screens/ProfileScreen";

import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shownSplashScreen, setShownSplashScreen] = useState(false);

  return <ProfileScreen />;
}
