import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Avatar } from "react-native-elements";
//import { auth } from '../firebase';
import { GiftedChat } from "react-native-gifted-chat";

import Icon from "react-native-vector-icons/MaterialIcons";

const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const signOut = () => {
    //auth.signOut().then(() => {
    // Sign-out successful.
    //  navigation.replace("Login");
    // }).catch((error) => {
    // An error happened.
    //  });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 100 }}>
          <Avatar
            source={{
              avatar: "https://placeimg.com/140/140/any",
            }}
          />
        </View>
      ),
      headerRight: () => (
        <Text
          style={{
            backgroundColor: "#009387",
          }}
        ></Text>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello, would you like to talk?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Icon
        style={{ marginLeft: 20, marginTop: 20 }}
        name="arrow-back-ios"
        size={25}
        onPress={navigation.goBack}
      />
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          // _id: auth?.currentUser?.email,
          name: "Alexis".displayName,
          avatar: "https://placeimg.com/140/140/any",
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({});
export default Chat;
