import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';



const Tab = createBottomTabNavigator();

const HomeNavigation = ({route}) => {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Home" 
          component={HomeScreen} 
         options={{ headerShown: false }} 
         initialParams={{ setIsLoggedIn: route.params.setIsLoggedIn }}/>
          <Tab.Screen name="Profile" 
          component={ProfileScreen} 
         options={{ headerShown: false }} />
          <Tab.Screen name="Settings" 
          component={SettingsScreen} 
         options={{ headerShown: false }} />
        </Tab.Navigator>
    );
  }

  export default HomeNavigation;