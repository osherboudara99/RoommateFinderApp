import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CreateListingsScreen from "../screens/CreateListingsScreen";
import ViewListingsScreen from "../screens/ViewListingsScreen";
import DetailsViewListingScreen from "../screens/DetailsViewListingScreen";

const SettingsStack = createNativeStackNavigator();

const SettingsNavigation = ({ navigation, route }) => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: "SettingsScreen", headerShown: false }}
        initialParams={{ setIsLoggedIn: route.params.setIsLoggedIn }}
      />
      <SettingsStack.Screen
        name="CreateListingsScreen"
        component={CreateListingsScreen}
        options={{ title: "CreateListingsScreen", headerShown: false }}
      />
      <SettingsStack.Screen
        name="ViewListingsScreen"
        component={ViewListingsScreen}
        options={{ title: "ViewListingsScreen", headerShown: false }}
      />
      <SettingsStack.Screen
        name="DetailsViewListingScreen"
        component={DetailsViewListingScreen}
        options={{ title: "DetailsViewListingScreen", headerShown: false }}
      />
      <SettingsStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "LoginScreen", headerShown: false }}
        initialParams={{ setIsLoggedIn: route.params.setIsLoggedIn }}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigation;
