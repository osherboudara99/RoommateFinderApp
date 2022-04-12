import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
    ImageBackground,
    SafeAreaView,
    Text,
    FlatList,
    Dimensions,
    Pressable,
    ScrollView,
  } from "react-native";
export default function ListingsPicScreen({ route, navigation }) {
  const [profile_pic, setImage] = useState(null);
  const [gallery_pic, setImages] = useState([]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
     
    });

    //console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }

    //console.log("look: "+ result.uri);

  };
  const pickImages = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
     
    });

    //console.log(result);

    if (!result.cancelled) {
     gallery_pic[0]=(result.uri);
    }

    //console.log("look: "+ result.uri);

  };

  const insertPictureData = () => {
    fetch("http://127.0.0.1:5000/profile_pic", {
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
          route.params.setIsLoggedIn(true);
          //navigation.navigate("Questionnaire");
        } else if (data === "not executed") {
          navigation.navigate("SignUpError");
        }
      })
      .catch((error) => console.log(error));
  };


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#009387",
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        
        <View
          style={[styles.profileImage, { marginTop: 75, marginBottom: 15 }]}
        >
          {!profile_pic && (
            <Image
              source={require("../src/assets/profile-pic.jpg")}
              style={styles.image}
              resizeMode="center"
            ></Image>
          )}
          {profile_pic && (
            <Image
              source={{ uri: profile_pic }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>

        <Button title="Change profile picture" onPress={pickImage} />
      </View>
      {profile_pic != null && (
        <View
          style={{
            alignSelf: "flex-end",
            marginRight: 10,
            marginTop: 200,
          }}
        >
          
          <TouchableOpacity onPress={insertPictureData}>
            <FontAwesome5 name="arrow-circle-right" size={50} color="white" />
          </TouchableOpacity>
        </View>
      )}
        <View>
            <FlatList
            contentContainerStyle={{ marginTop: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={gallery_pic}
            renderItem={({ item }) => <InteriorCard interior={item} />}
          />
                </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
});