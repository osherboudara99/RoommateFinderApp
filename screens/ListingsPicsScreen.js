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
  const [galleryMainPic, setImage] = useState(null);
  const [gallery_image1, setGalleryImage1] = useState(null);
  const [gallery_image2, setGalleryImage2] = useState(null);
  const [gallery_image3, setGalleryImage3] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickGalleryImage = async (imageNumber) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      if (imageNumber == 1) setGalleryImage1(result.uri);
      if (imageNumber == 2) setGalleryImage2(result.uri);
      if (imageNumber == 3) setGalleryImage3(result.uri);
    }
  };

  const insertPictureData = (image) => {
    fetch("http://127.0.0.1:5000/gallery_insertion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ galleryMainPic: image }),
    })
      .then((resp) => resp.text())
      .then((data) => {
        console.log(data);
        if (data === "executed") {
          console.log("data: " + image);
          console.log(route.params);
          route.params.setIsLoggedIn(true);
          //navigation.navigate("Questionnaire");
        } else if (data === "not executed") {
          //navigation.navigate("SignUpError");
          console.log(
            "Not executed, no picture was able to be inserted into db"
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const submitAllImages = () => {
    insertPictureData(galleryMainPic);
    if (gallery_image1 != null) insertPictureData(gallery_image1);
    if (gallery_image2 != null) insertPictureData(gallery_image2);
    if (gallery_image3 != null) insertPictureData(gallery_image3);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#009387" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              {!galleryMainPic && (
                <Image
                  source={require("../src/assets/genericHouse.jpg")}
                  style={styles.image}
                  resizeMode="center"
                ></Image>
              )}
              {galleryMainPic && (
                <Image
                  source={{ uri: galleryMainPic }}
                  style={{ width: 200, height: 200 }}
                />
              )}
            </View>

            <Button title="Change listings picture" onPress={pickImage} />
          </View>

          <View
            style={{
              alignItems: "center",
            }}
          >
            <View style={{ marginTop: 25 }}>
              <View>
                <View style={[styles.galleryImage]}>
                  {!gallery_image1 && (
                    <Image
                      source={require("../src/assets/genericHouse.jpg")}
                      style={{ width: 100, height: 100 }}
                      resizeMode="center"
                    ></Image>
                  )}
                  {gallery_image1 && (
                    <Image
                      source={{ uri: gallery_image1 }}
                      style={{ width: 100, height: 100 }}
                    />
                  )}
                </View>

                <Button
                  title="Add 1st listing picture"
                  onPress={() => pickGalleryImage(1)}
                />
              </View>
              <View>
                <View style={[styles.galleryImage]}>
                  {!gallery_image2 && (
                    <Image
                      source={require("../src/assets/genericHouse.jpg")}
                      style={{ width: 100, height: 100 }}
                      resizeMode="center"
                    ></Image>
                  )}
                  {gallery_image2 && (
                    <Image
                      source={{ uri: gallery_image2 }}
                      style={{ width: 100, height: 100 }}
                    />
                  )}
                </View>

                <Button
                  title="Add 2nd listing picture"
                  onPress={() => pickGalleryImage(2)}
                />
              </View>
              <View>
                <View style={[styles.galleryImage]}>
                  {!gallery_image3 && (
                    <Image
                      source={require("../src/assets/genericHouse.jpg")}
                      style={{ width: 100, height: 100 }}
                      resizeMode="center"
                    ></Image>
                  )}
                  {gallery_image3 && (
                    <Image
                      source={{ uri: gallery_image3 }}
                      style={{ width: 100, height: 100 }}
                    />
                  )}
                </View>

                <Button
                  title="Add 3rd listing picture"
                  onPress={() => pickGalleryImage(3)}
                />
              </View>
            </View>
          </View>
          {galleryMainPic != null && (
            <View
              style={{
                alignSelf: "flex-end",
                marginRight: 10,
              }}
            >
              <TouchableOpacity onPress={submitAllImages}>
                <FontAwesome5
                  name="arrow-circle-right"
                  size={50}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{ marginTop: 100 }}></View>
      </ScrollView>
    </SafeAreaView>
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
  galleryImage: {
    marginLeft: 45,
    marginTop: 5,
    width: 100,
    height: 100,
    borderRadius: 5,
    overflow: "hidden",
  },
});
