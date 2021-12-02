import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../src/consts/colors";
const { width } = Dimensions.get("screen");

import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DetailsScreen = ({ navigation, route }) => {
  const roommate = route.params;

  const InteriorCard = ({ interior }) => {
    return <Image source={interior} style={style.interiorImage} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Roommate image */}

        <View style={style.backgroundImageContainer}>
          <ImageBackground
            style={style.backgroundImage}
            source={roommate.image}
          >
            <View style={style.header}>
              <View style={style.headerBtn}>
                <Icon
                  style={{ marginLeft: 5 }}
                  name="arrow-back-ios"
                  size={20}
                  onPress={navigation.goBack}
                />
              </View>
              <View style={style.headerBtn}>
                <Icon name="favorite" size={20} color={COLORS.red} />
              </View>
            </View>
          </ImageBackground>

          {/* Virtual Tag View */}
          <View style={style.virtualTag}>
            <Text style={{ color: COLORS.white }}>Profile</Text>
          </View>
        </View>

        <View style={style.detailsContainer}>
          {/* Name and rating view container */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {roommate.title}
            </Text>
            {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={style.ratingTag}>
                <Text style={{color: COLORS.white}}>4.8</Text>
              </View>
              <Text style={{fontSize: 13, marginLeft: 5}}>155 ratings</Text>
            </View>*/}
          </View>

          {/* Location text */}
          <Text style={{ fontSize: 16, color: COLORS.grey }}>
            {roommate.location}
          </Text>

          {/* Facilities container */}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={style.facility}>
              <FontAwesome5 name="dog" size={18} color="#dae4d6" />
              <Text> </Text>
              <FontAwesome5 name="check" size={18} color="green" />
            </View>
            <View style={style.facility}>
              <FontAwesome5 name="smoking" size={18} color="#dae4d6" />
              <Text> </Text>
              <MaterialCommunityIcons
                name="close-thick"
                size={18}
                color="red"
              />
            </View>
            <View style={style.facility}>
              <FontAwesome5 name="desktop" size={18} color="#dae4d6" />
              <Text> </Text>
              <FontAwesome5 name="check" size={18} color="green" />
            </View>
          </View>
          <Text style={{ marginTop: 20, color: COLORS.grey }}>
            {roommate.details}
          </Text>

          {/* Interior list */}
          <FlatList
            contentContainerStyle={{ marginTop: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={roommate.interiors}
            renderItem={({ item }) => <InteriorCard interior={item} />}
          />

          {/* footer container */}
          <View style={style.footer}>
            <View>
              <Text
                style={{ color: COLORS.blue, fontWeight: "bold", fontSize: 18 }}
              >
                {roommate.budget}
              </Text>
              <Text
                style={{ fontSize: 12, color: COLORS.grey, fontWeight: "bold" }}
              >
                Total Price
              </Text>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate("chatScreen");
              }}
            >
              <View style={style.bookNowBtn}>
                <Text style={{ color: COLORS.white }}>Contact now</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    height: 350,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dark,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: { flex: 1, paddingHorizontal: 20, marginTop: 40 },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: COLORS.grey },
});

export default DetailsScreen;
