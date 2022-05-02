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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Icon, Divider } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";

import COLORS from "../src/consts/colors";

const ListingsIconHelper = ({ route, navigation }) => {
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
            Rooms Icon
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10, marginLeft:10, marginRight: 10 }}>
            <View style={[styles.personalityImage]}>
            <Icon name="hotel" size={70} marginRight={20} color={COLORS.dark} />
            </View>
            <Text style={[styles.text, { fontSize: 18, color: "#eef5eb" }]}>
              {" "}
              This icon will have a number next to it to indicate how many bedrooms the property has.
            </Text>
          </View>
        </View>

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />
        <View style={[styles.container, { alignSelf: "left" }]}>
          <Text style={[styles.text, { fontSize: 30, marginLeft: 5 }]}>
            Bathtub Icon
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10, marginLeft:10, marginRight: 10  }}>
            <View style={[styles.personalityImage]}>
            <Icon name="bathtub"  size={70} marginRight={20} color={COLORS.dark} />
            </View>
            <Text style={[styles.text, { fontSize: 18, color: "#eef5eb" }]}>
              {" "}
              This icon will have a number next to it to indicate how many bathrooms are on the property.
            </Text>
          </View>
        </View>

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />
       <View style={[styles.container, { alignSelf: "left" }]}>
          <Text style={[styles.text, { fontSize: 30, marginLeft: 5 }]}>
            Square Footage Icon
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10, marginLeft:10, marginRight:10 }}>
            <View style={[styles.personalityImage]}>
            <Icon name="aspect-ratio" size={65} marginRight={10} color={COLORS.dark} />
            </View>
            <Text style={[styles.text, { fontSize: 18, color: "#eef5eb" }]}>
              {" "}
              This icon will have a number beside it displaying the square footage of the entire property.
            </Text>
          </View>
        </View>

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />

      <View style={[styles.container, { alignSelf: "left" }]}>
          <Text style={[styles.text, { fontSize: 30, marginLeft: 5 }]}>
            Occupants Icon
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10, marginLeft:10, marginRight:10 }}>
            <View style={[styles.personalityImage]}>
            <FontAwesome5 name="house-user" size={65} marginRight={10} color={COLORS.dark} />
            </View>
            <Text style={[styles.text, { fontSize: 18, color: "#eef5eb" }]}>
              {" "}
              This icon will have a number next to it indictating the total occupants they wish to have in the listing.
            </Text>
          </View>
        </View>

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />

      <View style={[styles.container, { alignSelf: "left" }]}>
          <Text style={[styles.text, { fontSize: 30, marginLeft: 5 }]}>
            Distance Icon
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10, marginLeft:10, marginRight:10 }}>
            <View style={[styles.personalityImage]}>
            <MaterialCommunityIcons
                      name="map-marker-distance"
                      size={65}
                      marginRight={10} color={COLORS.dark}
                    />
            </View>
            <Text style={[styles.text, { fontSize: 18, color: "#eef5eb" }]}>
              {" "}
              When toggled, this icon will have a number next to it indictating the distance in miles from you to the listing.
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

export default ListingsIconHelper;

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
