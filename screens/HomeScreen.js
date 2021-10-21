import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const HomeScreen = ({navigation, route}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    
      <Button title="Log me out" onPress={() => route.params.setIsLoggedIn(false)}/>
      <Text>Home!</Text>
    </View>
  );
}

export default HomeScreen;
