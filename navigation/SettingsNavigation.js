import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "../screens/SettingsScreen";
import CreateListingsScreen from "../screens/CreateListingsScreen";
import PersonalityHelper from "../screens/PersonalityHelper";

const SettingsStack = createNativeStackNavigator();

const SettingsNavigation = ({ navigation, route }) => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: "SettingsScreen", headerShown: false }}
      />
      <SettingsStack.Screen
        name="CreateListingsScreen"
        component={CreateListingsScreen}
        options={{ title: "PersonalityTest", headerShown: false }}
      />
    
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigation;