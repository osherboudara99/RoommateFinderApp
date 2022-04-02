import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Blob
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Avatar, Icon, Divider } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";

import ZIPCODES from "../src/consts/zipcodes";

const ProfileScreen = ({ route, navigation }) => {
  //const [personalityTestTaken, setPersonalityTestTaken] = React.useState(false)

  const personalityTestTaken = route.params;

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [roommate, setRoommate_yes_no] = React.useState(false);
  const [smoker, setSmoker] = React.useState(false);
  const [pets, setPets] = React.useState(false);
  const [zoom_friendly, setZoom_friendly] = React.useState(false);
  //const [zoom_others_using, setZoom_others_using] = React.useState(false);
  const [budget, setBudget] = React.useState("");
  const [cleanliness, setCleanliness] = React.useState("");
  const [student, setStudent] = React.useState(false);
  const [workingProfessional, setWorkingProfessional] = React.useState(false);
  const [jobTitle, setJobTitle] = React.useState("");
  const [guestsOften, setGuestsOften] = React.useState(false);

  const [personalityTypeName, setPersonalityTypeName] = React.useState("");
  const [personalityTypeDescription, setPersonalityTypeDescription] =
    React.useState("");

  const [profile_pic, setProfilePic] = React.useState([]);

  const fetchProfileScreen = () => {
    fetch("http://127.0.0.1:5000/profile_screen", {
      method: "GET",
    })
      .then((resp) => resp.text())
      .then((article) => {
        var data = article.split(" ");

        for (let i = 0; i < data.length; i++) {
          data[i] = data[i].replace(",", "");
          data[i] = data[i].replace(/[']/g, "");
        }
        console.log("profileArticle: ", article);
        //console.log(data);
        setFirstName(data[2]);
        setLastName(data[3]);
        setLocation(data[4]);
        setBudget(data[5]);
        if (data[6] == 1) {
          data[6] = "Yes";
          setStudent(data[6]);
        } else {
          data[6] = "No";
          setStudent(data[6]);
        }
        if (data[7] == 1) {
          data[7] = "Yes";
          setWorkingProfessional(data[7]);
        } else {
          data[7] = "No";
          setWorkingProfessional(data[7]);
        }

        setJobTitle(data[8]);

        if (data[9] == 1) {
          data[9] = "Yes";
          setGuestsOften(data[9]);
        } else {
          data[9] = "No";
          setGuestsOften(data[9]);
        }
        if (data[10] == 1) {
          data[10] = "Seeking roommates for a place";
          setRoommate_yes_no(data[10]);
        } else {
          data[10] = "Joining a place with roommates";
          setRoommate_yes_no(data[10]);
        }
        if (data[11] == 1) {
          data[11] = "Smoker";
          setSmoker(data[11]);
        } else {
          data[11] = "Non-Smoker";
          setSmoker(data[11]);
        }
        if (data[12] == 1) {
          data[12] = "Pet-Friendly";
          setPets(data[12]);
        } else {
          data[12] = "Not Pet-Friendly";
          setPets(data[12]);
        }
        setCleanliness(data[13]);
        data[14] = data[14].replace(")", "");
        data[14] = data[14].replace("]", "");
        if (data[14] == 1) {
          data[14] = "Zoom-Friendly";
          setZoom_friendly(data[14]);
        } else {
          data[14] = "Not Zoom-Friendly";
          setZoom_friendly(data[14]);
        }
      });
  };

  const fetchPersonality = () => {
    fetch("http://127.0.0.1:5000/personality_test_select", {
      method: "GET",
    })
      .then((resp) => resp.text())
      .then((article) => {
        var data = article.split("', '", 2);

        console.log("article: ", article);
        console.log("data: ", data);
        data[0] = data[0].replace("(", "");
        data[0] = data[0].replace("[", "");
        data[0] = data[0].replace("'", "");

        setPersonalityTypeName(data[0]);
        setPersonalityTypeDescription(data[1]);

        console.log("personalityTypeDesc: ", personalityTypeDescription);
      });
  };

  useEffect(() => {
    fetchProfileScreen();
    fetchPersonality();
    //fetchPicture();
  }, []);

  const functionCombined = () => {
    fetchProfileScreen();
    fetchPersonality();
    //fetchPicture();
  };

  const fetchPicture = () => {
    fetch("http://127.0.0.1:5000/profile_pic_select", {
      method: "GET",
    })
      .then((article) => {
        
        const blobToImage = (blob) => {
          return new Promise(resolve => {
            var binaryData = [];
            binaryData.push(blob);
            const url = URL.createObjectURL(binaryData)
            let img = new Image()
            img.onload = () => {
              URL.revokeObjectURL(url)
              resolve(img)
            }
            img.src = url
          })
        }

        Blob = blobToImage(article);
        
        setProfilePic(Blob);

        console.log("Blob: ", profile_pic);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              //source={require(profile_pic)}
              source={require("../src/assets/profile-pic.jpg")}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>

          <TouchableOpacity
            style={{ marginTop: 5, marginLeft: 5 }}
            onPress={functionCombined()}
          >
            <Ionicons name="refresh" size={22} color="#dce3da" />
          </TouchableOpacity>

          <View style={styles.active}></View>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#DFD8C8"
              style={{ marginTop: 6, marginLeft: 2 }}
            ></Ionicons>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
            {firstName} {lastName}
          </Text>
          <Text style={[styles.text, { color: "#ffffffb2", fontSize: 14 }]}>
            {ZIPCODES[location]}
          </Text>
        </View>

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />
        <View style={{ margin: 25 }}>
          <View style={[styles.rowLineUp, { marginBottom: 10 }]}>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.text, { fontSize: 25 }]}>
                Personality Type
              </Text>
              <TouchableOpacity
                style={{ marginTop: 5, marginLeft: 5 }}
                onPress={() => navigation.navigate("PersonalityHelper")}
              >
                <Ionicons name="ios-help-circle" size={22} color="#dce3da" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("PersonalityTest")}
            >
              <Ionicons name="newspaper-outline" size={22} color="#dae4d6" />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }} />
          {personalityTypeName != "]" ? (
            <View style={{ alignSelf: "center" }}>
              <Text style={[styles.text, { fontSize: 45, color: "#ffffffb2" }]}>
                {personalityTypeName}
              </Text>

              {personalityTypeName === "The Architect" && (
                <View style={[styles.personalityImage, { marginLeft: 75 }]}>
                  <Image
                    source={require("../src/assets/ProfileScreen/theArchitect.png")}
                    resizeMode="center"
                    style={styles.image}
                  ></Image>
                </View>
              )}
              {personalityTypeName === "The Adventurer" && (
                <View style={[styles.personalityImage, { marginLeft: 75 }]}>
                  <Image
                    source={require("../src/assets/ProfileScreen/theAdventurer.png")}
                    resizeMode="center"
                    style={styles.image}
                  ></Image>
                </View>
              )}
              {personalityTypeName === "The Entertainer" && (
                <View style={[styles.personalityImage, { marginLeft: 75 }]}>
                  <Image
                    source={require("../src/assets/ProfileScreen/theEntertainer.png")}
                    resizeMode="center"
                    style={styles.image}
                  ></Image>
                </View>
              )}
              {personalityTypeName === "The Observer" && (
                <View style={[styles.personalityImage, { marginLeft: 75 }]}>
                  <Image
                    source={require("../src/assets/ProfileScreen/theObserver.png")}
                    resizeMode="center"
                    style={styles.image}
                  ></Image>
                </View>
              )}
              {personalityTypeName === "The Sentinel" && (
                <View style={[styles.personalityImage, { marginLeft: 75 }]}>
                  <Image
                    source={require("../src/assets/ProfileScreen/theSentinel.png")}
                    resizeMode="center"
                    style={styles.image}
                  ></Image>
                </View>
              )}
            </View>
          ) : (
            <Text style={[styles.text, styles.subText]}>
              Take the personality test to find out your personality type and
              match with others!
            </Text>
          )}
        </View>

        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />
        <View style={{ margin: 25 }}>
          <View style={[styles.rowLineUp, { marginBottom: 10 }]}>
            <Text style={[styles.text, { fontSize: 25 }]}>About me</Text>
            <TouchableOpacity onPress={() => console.log("editing about me")}>
              <FontAwesome5 name="edit" size={22} color="#dae4d6" />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 15 }} />

          {personalityTypeDescription != undefined ? (
            <Text style={[styles.text, styles.subText]}>
              {personalityTypeDescription}
            </Text>
          ) : (
            <Text style={[styles.text, styles.subText]}>
              I am a new user wanting to do good in life
            </Text>
          )}
        </View>
        <Divider
          orientation="horizontal"
          style={{ marginTop: 5, marginHorizontal: 25 }}
        />
        <View style={{ margin: 25 }}>
          <View style={[styles.rowLineUp, { marginBottom: 10 }]}>
            <Text style={[styles.text, { fontSize: 25 }]}>Questionnaire</Text>
          </View>
          <View style={{ marginTop: 15 }} />
          <View style={styles.QuestionnaireAnswers}>
            <FontAwesome5
              name="location-arrow"
              size={24}
              color="#dae4d6"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.text, styles.subText]}>Zipcode: </Text>
            <Text style={[styles.text, styles.subTextRight]}>{location}</Text>
          </View>
          <View style={styles.QuestionnaireAnswers}>
            <FontAwesome5
              name="money-bill"
              size={24}
              color="#dae4d6"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.text, styles.subText]}>Budget: </Text>
            <Text style={[styles.text, styles.subTextRight]}>${budget}</Text>
          </View>
          <View style={styles.QuestionnaireAnswers}>
            <FontAwesome5
              name="user-graduate"
              size={24}
              color="#dae4d6"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.text, styles.subText]}>Student? </Text>
            <Text style={[styles.text, styles.subTextRight]}>{student}</Text>
          </View>
          <View style={styles.QuestionnaireAnswers}>
            <FontAwesome5
              name="user-tie"
              size={24}
              color="#dae4d6"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.text, styles.subText]}>
              Working Professional?{" "}
            </Text>
            <Text style={[styles.text, styles.subTextRight]}>
              {workingProfessional}
            </Text>
          </View>
          {workingProfessional != "No" && (
            <View style={styles.QuestionnaireAnswers}>
              <FontAwesome5
                name="address-card"
                size={24}
                color="#dae4d6"
                style={{ marginRight: 10 }}
              />
              <Text style={[styles.text, styles.subText]}>Job Title: </Text>
              <Text style={[styles.text, styles.subTextRight]}>{jobTitle}</Text>
            </View>
          )}
          <View style={styles.QuestionnaireAnswers}>
            <FontAwesome5
              name="users"
              size={24}
              color="#dae4d6"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.text, styles.subText]}>Guests Often? </Text>
            <Text style={[styles.text, styles.subTextRight]}>
              {guestsOften}
            </Text>
          </View>
          <View style={styles.QuestionnaireAnswers}>
            <FontAwesome5
              name="user-friends"
              size={24}
              color="#dae4d6"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.text, styles.subText]}>Roommate Status: </Text>
            <Text style={[styles.text, styles.subTextRight]}>{roommate}</Text>
          </View>
          <View style={styles.QuestionnaireAnswers}>
            <FontAwesome5
              name="smoking"
              size={24}
              color="#dae4d6"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.text, styles.subText]}>Smoking Status: </Text>
            <Text style={[styles.text, styles.subTextRight]}>{smoker}</Text>
          </View>
          <View style={styles.QuestionnaireAnswers}>
            <FontAwesome5
              name="hands-wash"
              size={24}
              color="#dae4d6"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.text, styles.subText]}>Cleanliness: </Text>
            <Text style={[styles.text, styles.subTextRight]}>
              {cleanliness}/10
            </Text>
          </View>

          <View style={styles.QuestionnaireAnswers}>
            <FontAwesome5
              name="desktop"
              size={24}
              color="#dae4d6"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.text, styles.subText]}>Zoom preference: </Text>
            <Text style={[styles.text, styles.subTextRight]}>
              {zoom_friendly}
            </Text>
          </View>
          <View style={styles.QuestionnaireAnswers}>
            <FontAwesome5
              name="dog"
              size={24}
              color="#dae4d6"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.text, styles.subText]}>Pet preference:</Text>{" "}
            <Text style={[styles.text, styles.subTextRight]}> {pets}</Text>
          </View>
        </View>
        <Divider
          orientation="horizontal"
          style={{ marginTop: 5, marginHorizontal: 25 }}
        />
        {/*<View style={{ marginTop: 32 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require("../src/assets/media1.jpg")}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require("../src/assets/media2.jpg")}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require("../src/assets/media3.jpg")}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
          </ScrollView>
          <View style={styles.mediaCount}>
            <Text
              style={[
                styles.text,
                { fontSize: 24, color: "#DFD8C8", fontWeight: "300" },
              ]}
            >
              70
            </Text>
            <Text
              style={[
                styles.text,
                { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" },
              ]}
            >
              Photos
            </Text>
          </View>
        </View>*/}
        <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal: 25 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#398F79",
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#fff",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 18,
    color: "#dae4d6",
    fontWeight: "500",
  },
  subTextRight: {
    fontSize: 18,
    color: "#ecf1ea",
    fontWeight: "750",
  },
  personalityImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: "hidden",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "left",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
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
});
