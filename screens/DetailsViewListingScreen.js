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
  TouchableOpacity
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../src/consts/colors";
import ZIPCODES from "../src/consts/zipcodes";
import { Avatar, Divider } from "react-native-elements";
const { width } = Dimensions.get("screen");
const DetailsViewListingScreen = ({ navigation, route }) => {
  const house = route.params;

  const InteriorCard = ({ interior }) => {
    return <Image source={interior} style={style.interiorImage} />;
  };

  const fetchListingsDelete = () => {
    console.log("id:"+ house.id);
    console.log("id:"+ house.id.toString());
    var listingid =  house.id;
    fetch("http://127.0.0.1:5000/listing_deletion", {
      method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({ listingid:house.id}),
        })
      .then((resp) => resp.text())
      .then((data) => {
        if (data === "executed") {
          navigation.navigate("deleteListingMessage");
        }
      
    });
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* House image */}

        <View style={style.backgroundImageContainer}>
          <ImageBackground style={style.backgroundImage} source={house.image}>
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
                <TouchableOpacity style={{ marginLeft: 5 }}
                onPress={() => fetchListingsDelete()} >
                <Icon name="delete" size={40} color={COLORS.green} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
          <View style={style.virtualTag}>
            <Text style={{ color: COLORS.white, alignItems: "center", alignSelf: "center", justifyContent: "center"}}> {house.title}</Text>
          </View>
        </View>
      

        
          {/* Name and rating view container */}

          <View
          style={{
            marginTop: 25,
            marginBottom: -25,
            alignSelf: "center",
            flexDirection: "column",
          }}
        >
          {/* Location text */}
          <Text style={{ fontSize: 16, color: COLORS.dark, marginTop: 10, alignSelf:"center"}}>
            {ZIPCODES[house.location]}
          </Text>

          {/* Facilities container */}
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <View style={style.facility}>
              <Icon name="hotel" size={18} />
              <Text style={style.facilityText}>{house.bedrooms}</Text>
            </View>
            <View style={style.facility}>
              <Icon name="bathtub" size={18} />
              <Text style={style.facilityText}>{house.bathrooms}</Text>
            </View>
            <View style={style.facility}>
              <Icon name="aspect-ratio" size={18} />
              <Text style={style.facilityText}>{house.square_footage} ft sq</Text>
            </View>
            <View style={style.facility}>
              <FontAwesome5 name="house-user" size={18} />
              <Text style={style.facilityText}>{house.total_occupants}</Text>
            </View>
          </View>
          </View>
          <View style={style.detailsContainer}>
          <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
          />
          <Text style={{ marginTop: 20, color: COLORS.dark }}>
            {house.description} 
          </Text>

        

          <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />
        <View style={style.footer2}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Contact Information
            </Text>
          <Text style={{ marginTop: 20, color: COLORS.green }}>
          {house.firstName} {house.lastName}
          </Text>
          <Text style={{ marginTop: 20, color: COLORS.green }}>
          {house.email} 
          </Text>
          <Text style={{ marginTop: 20, color: COLORS.green }}>
          {house.phone}
          </Text>
          <Text style={{ marginTop: 20, color: COLORS.green }}>
          {house.personality_type}
          <TouchableOpacity
                style={{ marginLeft: 5 }}
                onPress={() => navigation.navigate("PersonalityHelper")}
              >
                <Ionicons name="ios-help-circle" size={14} color={COLORS.green} />
          </TouchableOpacity>
          </Text>
          </View>
          <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25, color: COLORS.green }}
        />

          {/* Interior list */}
          <FlatList
            contentContainerStyle={{ marginTop: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={house.interiors}
            renderItem={({ item }) => <InteriorCard interior={item} />}
          />

          {/* footer container */}
          <View style={style.footer}>
            <View>
              <Text
                style={{ color: COLORS.green, fontWeight: "bold", fontSize: 18 }}
              >
                ${house.total_rent}
              </Text>
              <Text
                style={{ fontSize: 12, color: COLORS.dark, fontWeight: "bold" }}
              >
                Total Price
              </Text>
            </View>
            
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
    width: 300,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.green,
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
  facilityText: { marginLeft: 5, color: COLORS.green },
  footer2: {
    height: 180,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 5,
    flexDirection: "column",
    marginVertical: 10,
    marginBottom: 5
  },
});

export default DetailsViewListingScreen;
