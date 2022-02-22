import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
//import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import BooleanQuestionnaireSwitch from "../src/components/BooleanQuestionnaireSwitch";
import Input from "../src/components/Input";
import Question from "../src/components/Question";
import Button from "../src/components/Button";

import Slider from "@react-native-community/slider";

export default function Questionnaire({ route, navigation }) {
  const window = useWindowDimensions();

  const [questionNumber, setQuestionNumber] = useState(1);

  const nextQuestion = () => {
    if (questionNumber < 12) {
      setQuestionNumber(questionNumber + 1);
    }
  };

  const prevQuestion = () => {
    if (questionNumber > 1) {
      setQuestionNumber(questionNumber - 1);
    }
  };

  const [data, setData] = React.useState({
    budgetValid: true,
    othersUsingZoom: false,
    cleanlinessValid: true,
    smokeOrNot: false,
    petsOrNot: false,
  });


  const personalityTestTaken = React.useState(true);

  const navigateBackToProfileScreen = () => {
    navigation.navigate("ProfileScreen", personalityTestTaken);
  };

 
  
  const Submission = () => {
    handleSubmit(onSubmit);

    console.log("loc:" + location);
    console.log("budget:" + budget);
    console.log("cleanliness:" + cleanliness);
    console.log("roommate:" + roommate);
    console.log("smoker:" + smoker);
    console.log("pets:" + pets);
    console.log("zoom friendly:" + zoom_friendly);
    console.log("zoom others using:" + zoom_others_using);

    //console.log("test");
    //console.log(errors);
    //console.log(route.params);

    //route.params.setIsLoggedIn(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  // implement submit once the Questionnaire API is finished
  console.log(errors);

  const [outgoing, setOutgoing] = useState(5);
  const [entertainment, setEntertainment] = useState(2);
  const [friend_frequency, setFriendFrequency] = useState(2);
  const [travel, setTravel] = useState(2);

  return (
    <View style={styles.container}>
      <View style={[styles.form, { width: window.width - 20 }]}>
        <Text style={styles.header}>Question {questionNumber}/10</Text>

        <Question
          question="How outgoing are you?"
          display={questionNumber == 1}
          control={control}
          rules={{ required: true, min: 5 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ flexDirection: "row", marginBottom: 25 }}>
              <View style={{ marginRight: "auto", marginTop: -8 }}>
                <Slider
                  maximumValue={10}
                  minimumValue={0}
                  minimumTrackTintColor="#5CD85E"
                  maximumTrackTintColor="#097969"
                  step={1}
                  value={outgoing}
                  onValueChange={(sliderValue) => setOutgoing(sliderValue)}
                  thumbTintColor="#1B5E20"
                  //style={{ alignSelf: "center" }}
                  style={{ width: 250, height: 40 }}
                />
              </View>
              <View style={{ marginLeft: "auto" }}>
                <Text style={{ fontSize: 18 }}>{outgoing}</Text>
              </View>
            </View>
          )}
          name="Outgoing"
          defaultValue=""
        />

        <Question
          question="What do you prefer: movie, book, or theatre play?"
          display={questionNumber == 2}
          control={control}
          rules={{ required: true, min: 5 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ flexDirection: "row", marginBottom: 25 }}>
              <View style={{ marginRight: "auto", marginTop: -8 }}>
                <Slider
                  maximumValue={3}
                  minimumValue={1}
                  minimumTrackTintColor="#5CD85E"
                  maximumTrackTintColor="#097969"
                  step={1}
                  value={entertainment}
                  onValueChange={(sliderValue) => setEntertainment(sliderValue)}
                  thumbTintColor="#1B5E20"
                  //style={{ alignSelf: "center" }}
                  style={{ width: 200, height: 40 }}
                />
              </View>
              <View style={{ marginLeft: "auto" }}>
                {entertainment === 1 ? (
                  <Text style={{ fontSize: 18 }}>Movie</Text>
                ) : (
                  <Text />
                )}
                {entertainment === 2 ? (
                  <Text style={{ fontSize: 18 }}>Book</Text>
                ) : (
                  <Text />
                )}
                {entertainment === 3 ? (
                  <Text style={{ fontSize: 18 }}>Theatre Play</Text>
                ) : (
                  <Text />
                )}
              </View>
            </View>
          )}
          name="Entertainment"
          defaultValue=""
        />

        <Question
          question="Are you easily disappointed?"
          display={questionNumber == 3}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              parentCallback={callbackRoomate}
              value={value}
              trueLabel={"Yes"}
              falseLabel={"No"}
            />
          )}
          defaultvalue={false}
          name="disappointment"
        />

        <Question
          question="How frequently do you make friends?"
          display={questionNumber == 4}
          control={control}
          rules={{ required: true, min: 2 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ flexDirection: "row", marginBottom: 25 }}>
              <View style={{ marginRight: "auto", marginTop: -8 }}>
                <Slider
                  maximumValue={3}
                  minimumValue={1}
                  minimumTrackTintColor="#5CD85E"
                  maximumTrackTintColor="#097969"
                  step={1}
                  value={friend_frequency}
                  onValueChange={(sliderValue) => setFriendFrequency(sliderValue)}
                  thumbTintColor="#1B5E20"
                  //style={{ alignSelf: "center" }}
                  style={{ width: 200, height: 40 }}
                />
              </View>
              <View style={{ marginLeft: "auto" }}>
                {friend_frequency === 1 ? (
                  <Text style={{ fontSize: 18 }}>Never</Text>
                ) : (
                  <Text />
                )}
                {friend_frequency === 2 ? (
                  <Text style={{ fontSize: 18 }}>Sometimes</Text>
                ) : (
                  <Text />
                )}
                {friend_frequency === 3 ? (
                  <Text style={{ fontSize: 18 }}>Frequently</Text>
                ) : (
                  <Text />
                )}
              </View>
            </View>
          )}
          name="friend_frequency"
          defaultValue=""
        />

        <Question
          question="Do you like to stay busy?"
          display={questionNumber == 5}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              value={value}
              trueLabel={"Yes"}
              falseLabel={"No"}
              parentCallback={callbackSmoker}
            />
          )}
          defaultvalue={false}
          name="busy"
        />

        <Question
          question="Is your go-to reaction in a problem to cheat your way out of it?"
          display={questionNumber == 6}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              value={value}
              trueLabel={"Yes"}
              falseLabel={"No"}
              parentCallback={callbackPets}
            />
          )}
          defaultvalue={false}
          name="cheat_or_not"
        />

        <Question
          question="Are you afraid of conflict?"
          display={questionNumber == 7}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              value={value}
              trueLabel={"Yes"}
              falseLabel={"No"}
              parentCallback={callbackZoomFriendly}
            />
          )}
          defaultvalue={false}
          name="conflict"
        />

        <Question
          question="Are you generally passionate about social causes?"
          display={questionNumber == 8}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              value={value}
              trueLabel={"Yes"}
              falseLabel={"No"}
              parentCallback={callbackZoomOthersUsing}
            />
          )}
          defaultvalue={false}
          name="social_causes"
        />

        <Question
          question="How often do you like to travel?"
          display={questionNumber == 9}
          control={control}
          rules={{ required: true, min: 2 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ flexDirection: "row", marginBottom: 25 }}>
              <View style={{ marginRight: "auto", marginTop: -8 }}>
                <Slider
                  maximumValue={3}
                  minimumValue={1}
                  minimumTrackTintColor="#5CD85E"
                  maximumTrackTintColor="#097969"
                  step={1}
                  value={travel}
                  onValueChange={(sliderValue) => setTravel(sliderValue)}
                  thumbTintColor="#1B5E20"
                  //style={{ alignSelf: "center" }}
                  style={{ width: 200, height: 40 }}
                />
              </View>
              <View style={{ marginLeft: "auto" }}>
                {travel === 1 ? (
                  <Text style={{ fontSize: 18 }}>Never</Text>
                ) : (
                  <Text />
                )}
                {travel === 2 ? (
                  <Text style={{ fontSize: 18 }}>Sometimes</Text>
                ) : (
                  <Text />
                )}
                {travel === 3 ? (
                  <Text style={{ fontSize: 18 }}>Frequently</Text>
                ) : (
                  <Text />
                )}
              </View>
            </View>
          )}
          name="Travel"
          defaultValue=""
        />

        <Question
          question="Would you consider yourself an introvert or extrovert?"
          display={questionNumber == 10}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              value={value}
              trueLabel={"Introvert"}
              falseLabel={"Extrovert"}
              parentCallback={callbackZoomOthersUsing}
            />
          )}
          defaultvalue={false}
          name="intro_extro_vert"
        />

        <View style={styles.formNavigation}>
          <Button
            title="Back"
            disabled={questionNumber == 1}
            onPress={prevQuestion}
            style={styles.buttonLeft}
          />

          {questionNumber < 10 && (
            <View>
              <Button
                title="Next"
                onPress={nextQuestion}
                style={styles.buttonRight}
              />
            </View>
          )}
          {questionNumber == 10 && (
            <Button
              title="Submit"
              onPress={() => {
                navigateBackToProfileScreen();
              }} //Cyrus code: handleSubmit(onSubmit)
              style={styles.buttonRight}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    marginBottom: 35,
  },
  container: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#009387",
    height: "100%",
    width: "100%",
  },
  form: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    maxWidth: 400,
    minHeight: 250,
    maxHeight: 500,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
  },
  textInput: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 16,
  },
  formNavigation: {
    flexDirection: "row",
    marginTop: "auto",
    marginBottom: 10,
    width: "100%",
  },
  buttonLeft: {
    marginLeft: "auto",
    marginRight: 5,
  },
  buttonRight: {
    marginLeft: 5,
    marginRight: "auto",
  },
});
