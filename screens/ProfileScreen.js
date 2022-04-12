import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Blob,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Avatar, Icon, Divider } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

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

  const [profile_pic, setProfilePic] = React.useState(null);

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
        console.log("fulldata" + data);
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

        console.log("data8: " + data[8]);
        setJobTitle(data[8]);
        console.log("jobTitle: " + jobTitle);

        var runLoop = true;
        var k = 9;
        var jobTitleTemp = data[8];
        while (runLoop) {
          if (data[k] != 0 && data[k] != 1) {
            //setJobTitle(jobTitle + " " + data[k]);
            //setJobTitle(jobTitle + " " + data[k]);
            jobTitleTemp = jobTitleTemp + " " + data[k];
            
            
            k++;
          } else {
            runLoop = false;
          }
        }
        setJobTitle(jobTitleTemp);
        console.log("new jobtitle" + jobTitle);

        var i = k;

        if (data[i] == 1) {
          data[i] = "Yes";
          setGuestsOften(data[i]);
        } else {
          data[i] = "No";
          setGuestsOften(data[i]);
        }
        if (data[i + 1] == 1) {
          data[i + 1] = "Seeking roommates for a place";
          setRoommate_yes_no(data[i + 1]);
        } else {
          data[i + 1] = "Joining a place with roommates";
          setRoommate_yes_no(data[i + 1]);
        }
        if (data[i + 2] == 1) {
          data[i + 2] = "Smoker";
          setSmoker(data[i + 2]);
        } else {
          data[i + 2] = "Non-Smoker";
          setSmoker(data[i + 2]);
        }
        if (data[i + 3] == 1) {
          data[i + 3] = "Pet-Friendly";
          setPets(data[i + 3]);
        } else {
          data[i + 3] = "Not Pet-Friendly";
          setPets(data[i + 3]);
        }
        setCleanliness(data[i + 4]);
        data[i + 5] = data[i + 5].replace(")", "");
        data[i + 5] = data[i + 5].replace("]", "");
        if (data[i + 5] == 1) {
          data[i + 5] = "Zoom-Friendly";
          setZoom_friendly(data[i + 5]);
        } else {
          data[i + 5] = "Not Zoom-Friendly";
          setZoom_friendly(data[i + 5]);
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

  const [isMounted, setMounted] = React.useState(true);
  useEffect(() => {
    functionCombined();
    return () => {
      setMounted(false);
    };
  }, []);

  const functionCombined = () => {
    //console.log(profile_pic)
    if (isMounted) {
      fetchProfileScreen();
      fetchPersonality();
      fetchPicture();
    }
  };

  const fetchPicture = () => {
    fetch("http://127.0.0.1:5000/profile_pic_select", {
      method: "GET",
    })
      .then((resp) => resp.text())
      .then((article) => {
        article = article.slice(4);
        article = article.slice(0, -4);
        //console.log("pictureFetch: " + article);
        console.log(article);
        if (isMounted && article != "n") setProfilePic(article);

        console.log("profilepic " + profile_pic);
        console.log(profile_pic);
      });
  };

  const updatePicture = () => {
    fetch("http://127.0.0.1:5000/profile_pic_update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profile_pic: profile_pic }),
    })
      .then((resp) => resp.text())
      .then((data) => {
        console.log(data);
        if (data === "executed") {
          console.log("data: " + profile_pic);
          console.log(route.params);
          //navigation.navigate("Questionnaire");
        }
      })
      .catch((error) => console.log(error));
  };

  const funcCombinedPickImage = () => {
    if (isMounted) {
      pickImage();
      updatePicture();
      navigation.navigate("ProfileScreen");
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    setProfilePic(result.uri);

    console.log("look: " + result.uri);
    console.log("this is image: " + profile_pic);

    console.log("look: " + result.uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            {profile_pic === null && (
              <Image
                //source={require(profile_pic)}
                source={require("../src/assets/profile-pic.jpg")}
                style={styles.image}
                resizeMode="center"
              ></Image>
            )}
            {profile_pic != null && (
              <Image
                //source={require(profile_pic)}
                source={{ uri: profile_pic }}
                style={styles.image}
                resizeMode="center"
              ></Image>
            )}
          </View>

          <View style={styles.add}>
            <TouchableOpacity onPress={funcCombinedPickImage}>
              <Ionicons
                name="ios-add"
                size={48}
                color="#DFD8C8"
                style={{ marginTop: 6, marginLeft: 2 }}
              ></Ionicons>
            </TouchableOpacity>
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
            <View>
              {" "}
              <Text style={[styles.text, styles.subText]}>
                Take the personality test to find out your personality type and
                match with others!
              </Text>
            </View>
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
            <View>
              {" "}
              <Text style={[styles.text, styles.subText]}>
                {personalityTypeDescription}
              </Text>
            </View>
          ) : (
            <View>
              {" "}
              <Text style={[styles.text, styles.subText]}>
                I am a new user wanting to do good in life
              </Text>
            </View>
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
