import SignUp from './SignUpPage';
import LoginPage from './LoginPage';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const LoginStack = createNativeStackNavigator();


const LoginNavigation = ({navigation, route}) =>
{
    return(
        <LoginStack.Navigator>
        <LoginStack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ title: 'Login' }}
          initialParams={{setIsLoggedIn: route.params.setIsLoggedIn}}
        />
        <LoginStack.Screen name="SignUp" component={SignUp} />
        </LoginStack.Navigator>
    );
}

export default LoginNavigation;
