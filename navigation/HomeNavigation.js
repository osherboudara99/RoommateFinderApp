import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const HomeNavigation = ({route}) => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-sharp' : 'ios-list-outline';
            }
            else if (route.name === 'Profile') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}
        
        >
          <Tab.Screen name="Home" 
          component={HomeScreen} 
         options={{ headerShown: false }} 
         initialParams={{ setIsLoggedIn: route.params.setIsLoggedIn }}
         />
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