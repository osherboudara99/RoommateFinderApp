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

import { Divider } from "react-native-elements";
import ZIPCODES from "../src/consts/zipcodes";
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
            <Text style={{ color: COLORS.white }}> {roommate.title}</Text>
          </View>
        </View>

        {/* Facilities container */}
        <View
          style={{
            marginTop: 25,
            marginBottom: -25,
            alignSelf: "center",
            flexDirection: "row",
          }}
        >
          <View style={style.facility}>
            <FontAwesome5 name="dog" size={18} color={COLORS.dark} />
            <Text> </Text>
            {roommate.petFriendly ? (
              <FontAwesome5 name="check" size={18} color="green" />
            ) : (
              <MaterialCommunityIcons
                name="close-thick"
                size={18}
                color="red"
              />
            )}
          </View>
          <View style={style.facility}>
            <FontAwesome5 name="smoking" size={18} color={COLORS.dark} />
            <Text> </Text>
            {roommate.smokingFriendly ? (
              <FontAwesome5 name="check" size={18} color="green" />
            ) : (
              <MaterialCommunityIcons
                name="close-thick"
                size={18}
                color="red"
              />
            )}
          </View>
          <View style={style.facility}>
            <FontAwesome5 name="desktop" size={18} color={COLORS.dark} />
            <Text> </Text>
            {roommate.zoomFriendly ? (
              <FontAwesome5 name="check" size={18} color="green" />
            ) : (
              <MaterialCommunityIcons
                name="close-thick"
                size={18}
                color="red"
              />
            )}
          </View>

          <View style={style.facility}>
            <FontAwesome5 name="user-graduate" size={18} color={COLORS.dark} />
            <Text> </Text>
            {roommate.student ? (
              <FontAwesome5 name="check" size={18} color="green" />
            ) : (
              <MaterialCommunityIcons
                name="close-thick"
                size={18}
                color="red"
              />
            )}
          </View>
          <View style={style.facility}>
            <FontAwesome5 name="user-tie" size={18} color={COLORS.dark} />
            <Text> </Text>
            {roommate.workingProfessional ? (
              <FontAwesome5 name="check" size={18} color="green" />
            ) : (
              <MaterialCommunityIcons
                name="close-thick"
                size={18}
                color="red"
              />
            )}
          </View>
          <View style={style.facility}>
            <FontAwesome5 name="house-user" size={18} color={COLORS.dark} />
            <Text> </Text>
            {roommate.guestsOften === 0 && (
              <MaterialCommunityIcons
                name="close-thick"
                size={18}
                color="red"
              />
            )}

            {roommate.guestsOften === 1 && (
              <View style={{ marginTop: 5 }}>
                <FontAwesome5
                  style={{ marginRight: 1 }}
                  name="user-alt"
                  size={12}
                  color="green"
                />
              </View>
            )}
            {roommate.guestsOften === 2 && (
              <View style={{ flex: 1, flexDirection: "row", paddingTop: 4 }}>
                <FontAwesome5
                  style={{ marginRight: -1 }}
                  name="user-alt"
                  size={12}
                  color="green"
                />
                <FontAwesome5
                  style={{ marginRight: 1 }}
                  name="user-alt"
                  size={12}
                  color="green"
                />
              </View>
            )}
            {roommate.guestsOften === 3 && (
              <View style={{ flex: 1, flexDirection: "row", paddingTop: 4 }}>
                <FontAwesome5
                  style={{ marginRight: 1 }}
                  name="user-alt"
                  size={12}
                  color="green"
                />
                <FontAwesome5
                  style={{ marginRight: -5, marginTop: 1, marginLeft: -5 }}
                  name="user-alt"
                  size={12}
                  color="green"
                />
                <FontAwesome5 name="user-alt" size={12} color="green" />
              </View>
            )}
          </View>
        </View>
        {/* end of facilities container */}

        <View style={style.detailsContainer}>
          {/* Name and rating view container */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={style.ratingTag}>
                <Text style={{color: COLORS.white}}>4.8</Text>
              </View>
              <Text style={{fontSize: 13, marginLeft: 5}}>155 ratings</Text>
            </View>*/}
          </View>

          {/* Location text */}
          <Text style={{ fontSize: 16, color: COLORS.green, alignSelf: "center" }}>
            {ZIPCODES[roommate.location]} {roommate.location}
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
          {roommate.email} 
          </Text>
          <Text style={{ marginTop: 20, color: COLORS.green }}>
          {roommate.phone}
          </Text>
          </View>
          


          <Divider
            orientation="horizontal"
            style={{ marginTop: 10, marginHorizontal: 25 }}
          />

          <Text
            style={[
              style.text,
              {
                marginTop: 10,
                marginBottom: -5,
                fontSize: 30,
                color: "black",
              },
            ]}
          >
            {roommate.personalityTypeName}
          </Text>

          

          {roommate.personalityTypeName === "The Architect" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <View style={[style.personalityImage, { alignSelf: "center" }]}>
                  <ImageBackground
                    source={require("../src/assets/ProfileScreen/theArchitect.png")}
                    resizeMode="center"
                    style={style.backgroundImage}
                  ></ImageBackground>
                </View>
                <Text style={[style.text, { fontSize: 17, color: "black" }]}>
                  {" "}
                  This person is between an extrovert and an introvert. Being
                  the architect, they are intuitive, rational and quick-witted.
                  They derive their self-esteem from their knowledge and mental
                  acuity and are not afraid to speak up when required.
                </Text>
              </View>
            </View>
          )}
          {roommate.personalityTypeName === "The Adventurer" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <View style={[style.personalityImage, { alignSelf: "center" }]}>
                  <ImageBackground
                    source={require("../src/assets/ProfileScreen/theAdventurer.png")}
                    resizeMode="center"
                    style={style.backgroundImage}
                  ></ImageBackground>
                </View>
                <Text style={[style.text, { fontSize: 17, color: "black" }]}>
                  {" "}
                  This person is a semi-extrovert. Being the adventurer, they
                  are open-minded and approach life eager for new experiences.
                  They are people with grounded warmth and durability to stay in
                  the moment which helps them unlock exciting potential.
                </Text>
              </View>
            </View>
          )}
          {roommate.personalityTypeName === "The Entertainer" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <View style={[style.personalityImage, { alignSelf: "center" }]}>
                  <ImageBackground
                    source={require("../src/assets/ProfileScreen/theEntertainer.png")}
                    resizeMode="center"
                    style={style.backgroundImage}
                  ></ImageBackground>
                </View>
                <Text style={[style.text, { fontSize: 17, color: "black" }]}>
                  {" "}
                  This person is a complete extrovert. Being the entertainer,
                  this person loves vibrant experiences, engaging in life
                  eagerly and taking pleasure in discovering the unknown. They
                  love the spotlight and the world is their stage.
                </Text>
              </View>
            </View>
          )}
          {roommate.personalityTypeName === "The Observer" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <View style={[style.personalityImage, { alignSelf: "center" }]}>
                  <ImageBackground
                    source={require("../src/assets/ProfileScreen/theObserver.png")}
                    resizeMode="center"
                    style={style.backgroundImage}
                  ></ImageBackground>
                </View>
                <Text style={[style.text, { fontSize: 17, color: "black" }]}>
                  {" "}
                  This person is a complete introvert. Being the observer, they
                  "observe" the room before associating with others. They are
                  self sufficient, non-demanding, thoughtful and unobtrusive.
                </Text>
              </View>
            </View>
          )}
          {roommate.personalityTypeName === "The Sentinel" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <View style={[style.personalityImage, { alignSelf: "center" }]}>
                  <ImageBackground
                    source={require("../src/assets/ProfileScreen/theSentinel.png")}
                    resizeMode="center"
                    style={style.backgroundImage}
                  ></ImageBackground>
                </View>
                <Text style={[style.text, { fontSize: 17, color: "black" }]}>
                  {" "}
                  This person is a semi-introvert. Being sentinel, they are
                  quiet and they are confident in who they are. They are self
                  motivated beings, taking pride in their good character and
                  competence.
                </Text>
              </View>
            </View>
          )}
          <Divider
            orientation="horizontal"
            style={{ marginTop: 15, marginHorizontal: 25, marginBottom: 5 }}
          />

          <View style={{ margin: 5 }}>
            
            <View style={style.QuestionnaireAnswers}>
              <FontAwesome5
                name="user-graduate"
                size={24}
                color="#212F24"
                style={{ marginRight: 10 }}
              />
              <Text style={[style.text, style.subText]}>Student? </Text>
              <Text style={[style.text, style.subTextRight]}>
                {roommate.student === 1 && "Yes"}
                {roommate.student === 0 && "No"}
              </Text>
            </View>
            <View style={style.QuestionnaireAnswers}>
              <FontAwesome5
                name="user-tie"
                size={24}
                color="#212F24"
                style={{ marginRight: 10 }}
              />
              <Text style={[style.text, style.subText]}>
                Working Professional?{" "}
              </Text>
              <Text style={[style.text, style.subTextRight]}>
                {roommate.workingProfessional === 1 && "Yes"}
                {roommate.workingProfessional === 0 && "No"}
              </Text>
            </View>
            {roommate.workingProfessional === 1 && (
              <View style={style.QuestionnaireAnswers}>
                <FontAwesome5
                  name="address-card"
                  size={24}
                  color="#212F24"
                  style={{ marginRight: 10 }}
                />
                <Text style={[style.text, style.subText]}>Job Title: </Text>
                <Text style={[style.text, style.subTextRight]}>
                  {roommate.jobTitle}
                </Text>
              </View>
            )}
            <View style={style.QuestionnaireAnswers}>
              <FontAwesome5
                name="users"
                size={24}
                color="#212F24"
                style={{ marginRight: 10 }}
              />
              <Text style={[style.text, style.subText]}>Guests Often? </Text>
              <Text style={[style.text, style.subTextRight]}>
                {roommate.guestsOften === 0 && "Not Often"}
                {roommate.guestsOften === 1 && "Often"}
              </Text>
            </View>
            <View style={style.QuestionnaireAnswers}>
              <FontAwesome5
                name="user-friends"
                size={24}
                color="#212F24"
                style={{ marginRight: 10 }}
              />
              <Text style={[style.text, style.subText]}>Roommate Status: </Text>
              <Text style={[style.text, style.subTextRight]}>
                {roommate.roommateStatus === 1 && "Seeking"}
                {roommate.roommateStatus === 0 && "Joining"}
              </Text>
            </View>
            <View style={style.QuestionnaireAnswers}>
              <FontAwesome5
                name="smoking"
                size={24}
                color="#212F24"
                style={{ marginRight: 10 }}
              />
              <Text style={[style.text, style.subText]}>Smoking Status: </Text>
              <Text style={[style.text, style.subTextRight]}>
                {roommate.smokingFriendly === 1 && "Yes"}
                {roommate.smokingFriendly === 0 && "No"}
              </Text>
            </View>
            <View style={style.QuestionnaireAnswers}>
              <FontAwesome5
                name="hands-wash"
                size={24}
                color="#212F24"
                style={{ marginRight: 10 }}
              />
              <Text style={[style.text, style.subText]}>Cleanliness: </Text>
              <Text style={[style.text, style.subTextRight]}>
                {roommate.cleanliness}/10
              </Text>
            </View>

            <View style={style.QuestionnaireAnswers}>
              <FontAwesome5
                name="desktop"
                size={24}
                color="#212F24"
                style={{ marginRight: 10 }}
              />
              <Text style={[style.text, style.subText]}>Zoom Friendly: </Text>
              <Text style={[style.text, style.subTextRight]}>
                {roommate.zoomFriendly === 1 && "Yes"}
                {roommate.zoomFriendly === 0 && "No"}
              </Text>
            </View>
            <View style={style.QuestionnaireAnswers}>
              <FontAwesome5
                name="dog"
                size={24}
                color="#212F24"
                style={{ marginRight: 10 }}
              />
              <Text style={[style.text, style.subText]}>Pet Friendly:</Text>{" "}
              <Text style={[style.text, style.subTextRight]}>
                {" "}
                {roommate.petFriendly === 1 && "Yes"}
                {roommate.petFriendly === 0 && "No"}
              </Text>
            </View>
          </View>

          <Divider
            orientation="horizontal"
            style={{ marginTop: 10, marginHorizontal: 25 }}
          />

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
                style={{ color: COLORS.green, fontWeight: "bold", fontSize: 18 }}
              >
                ${roommate.budget}
              </Text>
              <Text
                style={{ fontSize: 12, color: COLORS.grey, fontWeight: "bold" }}
              >
                Total Budget
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
  rowLineUp: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  QuestionnaireAnswers: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 18,
    color: "#212F24",
    fontWeight: "500",
  },
  subTextRight: {
    fontSize: 18,
    color: "#1A331F",
    fontWeight: "750",
  },
  detailsContainer: { flex: 1, paddingHorizontal: 20, marginTop: 40 },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: COLORS.grey },
  footer2: {
    height: 100,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 5,
    flexDirection: "column",
    marginVertical: 10,
    marginBottom: 5
  },
});

export default DetailsScreen;
