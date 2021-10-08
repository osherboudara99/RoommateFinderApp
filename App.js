import SignUp from './SignUpPage';
import LoginPage from './LoginPage';
import LoginNavigation from './LoginNavigation';
import HomeScreen from './screens/HomeScreen';

import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator>

        {isLoggedIn == false ? (
          <Stack.Screen name="LoginNavigation" component={LoginNavigation} options={{
            headerShown: false,
          }} initialParams={{ setIsLoggedIn: setIsLoggedIn }} />
        ) : (
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} initialParams={{ setIsLoggedIn: setIsLoggedIn }} />)}


      </Stack.Navigator>
    </NavigationContainer>
  );
}
