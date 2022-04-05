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
import * as ImagePicker from "expo-image-picker"

const updateProfilePicScreen = ({ route, navigation }) => {
    const [profile_pic, setProfilePic] = React.useState(null);
    useEffect(() => {
        pickImage();
      }, []);

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
        
        console.log("look: "+ result.uri);
        console.log("this is image: " + profile_pic);
        updatePicture();
        navigation.navigate("ProfileScreen")

        console.log("look: "+ result.uri);
        
    };


    return ( <View style = {{backgroundColor: "#009387"}}> </View>);
};

export default updateProfilePicScreen;