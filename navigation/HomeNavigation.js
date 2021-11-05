import HomeScreen from '../screens/HomeScreen';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';

const HomeStack = createNativeStackNavigator();


const HomeNavigation = ({navigation, route}) =>
{


    return(
        <HomeStack.Navigator>
          


        <HomeStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'HomeScreen',  headerShown: false }}
        />
        <HomeStack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{ title: 'DetailsScreen',  headerShown: false }}
        />


        </HomeStack.Navigator>
        
    );
}

export default HomeNavigation;
