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
        <View style={{ marginLeft: 10, marginTop: 10,    flexDirection: "row",
    alignItems: "center",}}>
          <View style={styles.headerBtn}>
            <Icon
              style={{ marginLeft: 5 }}
              name="arrow-back-ios"
              size={20}
              onPress={navigation.goBack}
            />
           
          </View>
          <Text style={[styles.text_header, { alignSelf: "center" }]}> Icon Meanings </Text>
        </View>

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />
        <View style={[styles.container, { alignSelf: "left" }]}>
          <Text style={[styles.text, { fontSize: 30, marginLeft: 5 }]}>
            Dog Icon
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10, marginLeft:10, marginRight: 10 }}>
            <View style={[styles.personalityImage]}>
            <FontAwesome5 name="dog" size={70} marginRight={20} color={COLORS.dark} />
            </View>
            <Text style={[styles.text, { fontSize: 18, color: "#eef5eb" }]}>
              {" "}
              This icon will have a green check beside it to let you know this person is pet friendly or not pet friendly.
            </Text>
          </View>
        </View>

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />
        <View style={[styles.container, { alignSelf: "left" }]}>
          <Text style={[styles.text, { fontSize: 30, marginLeft: 5 }]}>
            Smoking Icon
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10, marginLeft:10, marginRight: 10  }}>
            <View style={[styles.personalityImage]}>
            <FontAwesome5 name="smoking" size={60} marginRight={20} color={COLORS.dark} />
            </View>
            <Text style={[styles.text, { fontSize: 18, color: "#eef5eb" }]}>
              {" "}
              This icon will have a green check beside it to let you know this person smokes or does not smoke.
            </Text>
          </View>
        </View>

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />
       <View style={[styles.container, { alignSelf: "left" }]}>
          <Text style={[styles.text, { fontSize: 30, marginLeft: 5 }]}>
            Computer Icon
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10, marginLeft:10, marginRight:10 }}>
            <View style={[styles.personalityImage]}>
            <FontAwesome5 name="desktop" size={65} marginRight={10} color={COLORS.dark} />
            </View>
            <Text style={[styles.text, { fontSize: 18, color: "#eef5eb" }]}>
              {" "}
              This icon will have a green check beside it to let you know this person is zoom friendly 
              and uses zoom or does not mind zoom being used around them.
            </Text>
          </View>
        </View>

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />

      <View style={[styles.container, { alignSelf: "left" }]}>
          <Text style={[styles.text, { fontSize: 30, marginLeft: 5 }]}>
            Student Icon
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10, marginLeft:10, marginRight:10 }}>
            <View style={[styles.personalityImage]}>
            <FontAwesome5    name="user-graduate" size={70} marginRight={10} color={COLORS.dark} />
            </View>
            <Text style={[styles.text, { fontSize: 18, color: "#eef5eb" }]}>
              {" "}
              This icon will have a green check beside it to let you know this person is a student.
            </Text>
          </View>
        </View>

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />
        <View style={[styles.container, { alignSelf: "left" }]}>
          <Text style={[styles.text, { fontSize: 30, marginLeft: 5 }]}>
            Working Professional Icon
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10, marginLeft:10, marginRight:10 }}>
            <View style={[styles.personalityImage]}>
            <FontAwesome5  name="user-tie" size={70} marginRight={10} color={COLORS.dark} />
            </View>
            <Text style={[styles.text, { fontSize: 18, color: "#eef5eb" }]}>
              {" "}
              This icon will have a green check beside it to let you know this person is a working professional.
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
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    flex:2, alignItems:'center'
  },
});
