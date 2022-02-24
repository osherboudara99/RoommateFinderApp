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

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />
        <View style={[styles.container, { alignSelf: "center" }]}>
          <Text style={[styles.text, { fontSize: 30, marginLeft: 5 }]}>
            The Observer
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={[styles.personalityImage, { alignSelf: "center" }]}>
              <Image
                source={require("../src/assets/ProfileScreen/theObserver.png")}
                resizeMode="center"
                style={styles.image}
              ></Image>
            </View>
            <Text style={[styles.text, { fontSize: 18, color: "#eef5eb" }]}>
              {" "}
              This person is a complete introvert. Being the observer, they
              "observe" the room before associating with others. They are self
              sufficient, non-demanding, thoughtful and unobtrusive.
            </Text>
          </View>
        </View>

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />
        <View style={[styles.container, { alignSelf: "center" }]}>
          <Text style={[styles.text, { fontSize: 30, marginLeft: 5 }]}>
            The Sentinel
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={[styles.personalityImage, { alignSelf: "center" }]}>
              <Image
                source={require("../src/assets/ProfileScreen/theSentinel.png")}
                resizeMode="center"
                style={styles.image}
              ></Image>
            </View>
            <Text style={[styles.text, { fontSize: 18, color: "#eef5eb" }]}>
              {" "}
              This person is a semi-introvert. Being sentinel, they are quiet
              and they are confident in who they are. They are self motivated
              beings, taking pride in their good character and competence.
            </Text>
          </View>
        </View>

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />
        <View style={[styles.container, { alignSelf: "center" }]}>
          <Text style={[styles.text, { fontSize: 30, marginLeft: 5 }]}>
            The Architect
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={[styles.personalityImage, { alignSelf: "center" }]}>
              <Image
                source={require("../src/assets/ProfileScreen/theArchitect.png")}
                resizeMode="center"
                style={styles.image}
              ></Image>
            </View>
            <Text style={[styles.text, { fontSize: 17, color: "#eef5eb" }]}>
              {" "}
              This person is between an extrovert and an introvert. Being the
              architect, they are intuitive, rational and quick-witted. They
              derive their self-esteem from their knowledge and mental acuity
              and are not afraid to speak up when required.
            </Text>
          </View>
        </View>

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />
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
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});
