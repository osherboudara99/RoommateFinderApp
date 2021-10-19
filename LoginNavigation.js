import SignUp from './SignUpPage';
import LoginPage from './LoginPage';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const LoginStack = createNativeStackNavigator();


export default function LoginNavigation()
{
    return(
        <LoginStack.Navigator initialRouteName={"Initial"}>
        <LoginStack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: 'Login' }}
        />
        <LoginStack.Screen name="SignUp" component={SignUp} />
        </LoginStack.Navigator>
    );
}