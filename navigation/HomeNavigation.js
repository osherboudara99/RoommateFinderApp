import HomeScreen from "../screens/HomeScreen";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsListingScreen from "../screens/DetailsListingScreen";
import DetailsRoommateScreen from "../screens/DetailsRoommateScreen";
import RoommateIconsHelper from "../screens/RoommateIconsHelper";
import PersonalityHelper from "../screens/PersonalityHelper";
import ListingsIconHelper from "../screens/ListingsIconHelper";

import chatScreen from "../screens/chatScreen";

const HomeStack = createNativeStackNavigator();

const HomeNavigation = ({ navigation, route }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "HomeScreen", headerShown: false }}
      />
      <HomeStack.Screen
        name="DetailsListingScreen"
        component={DetailsListingScreen}
        options={{ title: "DetailsListingScreen", headerShown: false }}
      />
      <HomeStack.Screen
        name="DetailsRoommateScreen"
        component={DetailsRoommateScreen}
        options={{ title: "DetailsRoommateScreen", headerShown: false }}
      />
      <HomeStack.Screen
        name="chatScreen"
        component={chatScreen}
        options={{ title: "chatScreen", headerShown: false }}
      />
        <HomeStack.Screen
        name="RoommateIconsHelper"
        component={RoommateIconsHelper}
        options={{ title: "RoommateIconsHelper", headerShown: false }}
      />
          <HomeStack.Screen
        name="ListingsIconHelper"
        component={ListingsIconHelper}
        options={{ title: "ListingsIconsHelper", headerShown: false }}
      />
      <HomeStack.Screen
        name="PersonalityHelper"
        component={PersonalityHelper}
        options={{ title: "PersonalityHelper", headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigation;
