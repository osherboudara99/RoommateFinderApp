import * as React from "react";
import { Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const HomeScreen = ({ navigation, route }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#009387",
      }}
    >
      <Button
        title="Log me out"
        onPress={() => route.params.setIsLoggedIn(false)}
      />
      <Text color="white">Home!</Text>
    </View>
  );
};

export default HomeScreen;
