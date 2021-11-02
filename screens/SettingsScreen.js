import * as React from "react";
import { Text, View, Button } from "react-native";

function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#009387",
      }}
    >
      <Text color="white">Settings!</Text>
    </View>
  );
}

export default SettingsScreen;
