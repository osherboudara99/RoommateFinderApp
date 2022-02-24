import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Avatar, Icon, Divider } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";

import COLORS from "../src/consts/colors";

const PersonalityHelper = ({ route, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <View style={styles.headerBtn}>
            <Icon
              style={{ marginLeft: 5 }}
              name="arrow-back-ios"
              size={20}
              onPress={navigation.goBack}
            />
          </View>
        </View>

        <View style={[styles.container, { alignSelf: "center" }]}>
          <Text style={[styles.text, { fontSize: 30, alignSelf: "center" }]}>
            The Observer
          </Text>
          <View style={[styles.personalityImage, { marginLeft: 75 }]}>
            <Image
              source={require("../src/assets/ProfileScreen/theArchitect.png")}
              resizeMode="center"
              style={styles.image}
            ></Image>
          </View>
          <Text style={styles.text}>
            {" "}
            This person is a complete introvert. Being the observer, they
            "observe" the room before associating with others. They are self
            sufficient, non-demanding, thoughtful and unobtrusive.
          </Text>
          <Divider
            orientation="horizontal"
            style={{ marginTop: 10, marginHorizontal: 25 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalityHelper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#fff",
  },
  personalityImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: "hidden",
  },

  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rowLineUp: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
