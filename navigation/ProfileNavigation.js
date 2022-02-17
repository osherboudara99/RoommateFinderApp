import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";
import PersonalityTest from "../screens/PersonalityTest";

const ProfileStack = createNativeStackNavigator();

const ProfileNavigation = ({ navigation, route }) => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "ProfileScreen", headerShown: false }}
      />
      <ProfileStack.Screen
        name="PersonalityTest"
        component={PersonalityTest}
        options={{ title: "PersonalityTest", headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;
