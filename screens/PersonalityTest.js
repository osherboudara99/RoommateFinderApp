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

  const testFunc = () => {
    console.log("test");
  };

  const personalityTestTaken = React.useState(true);

  const navigateBackToProfileScreen = () => {
    var total = 0;
    var personality = "";
    var descr = "";
    if (outgoing >= 7) {
      total += 2;
    } else if (outgoing < 7 && outgoing >= 4) {
      total += 1;
    }
    if (entertainment == 3) {
      total += 2;
    } else if (entertainment == 1) {
      total += 1;
    }
    if (friend_frequency == 3) {
      total += 2;
    } else if (friend_frequency == 2) {
      total += 1;
    }
    if (travel == 3) {
      total += 2;
    } else if (travel == 2) {
      total += 1;
    }
    if (!disappointed) {
      total += 1;
    }
    if (busy) {
      total += 1;
    }
    if (!conflict) {
      total += 1;
    }
    if (passionate) {
      total += 1;
    }
    if (!introvertExtrovert) {
      total += 2;
    }
    if (total <= 2) {
      personality = "The Observer";
      descr =
        "This person is a complete introvert. Being the observer, they observe the room before associating with others. They are self sufficient, non-demanding, thoughtful and unobtrusive.";
    } else if (total <= 5 && total >= 3) {
      personality = "The Sentinel";
      descr =
        "This person is a semi-introvert. Being sentinel, they are quiet and they are confident in who they are. They are self motivate beings, taking pride in their good character and competence.";
    } else if (total <= 8 && total >= 6) {
      personality = "The Architect";
      descr =
        "This person is between an extrovert and an introvert. Being the architect, they are intuitive, rational and quick-witted. They derive their self-esteem from their knowledge and mental acuity and are not afraid to speak up when required.";
    } else if (total <= 11 && total >= 9) {
      personality = "The Adventurer ";
      descr =
        " This person is a semi-extrovert. Being the adventurer, they are open-minded and approach life eager for new experiences. They are people with grounded warmth and durability to stay in the moment which helps them unlock exciting potential.";
    } else {
      personality = "The Entertainer ";
      descr =
        " This person is a complete extrovert. Being the entertainer, this person loves vibrant experiences, engaging in life eagerly and taking pleasure in discovering the unknown. They love the spotlight and the world is their stage.";
    }

    fetch("http://127.0.0.1:5000/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ personality, descr }),
    })
      .then((resp) => resp.text())
      .then((data) => {
        console.log(data);
        if (data === "executed") {
          console.log(route.params);
          //route.params.setIsLoggedIn(true);
        }
      })
      .catch((error) => console.log(error));
    navigation.navigate("ProfileScreen", personalityTestTaken);
  };

  const Submission = () => {
    handleSubmit(onSubmit);

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
  const [disappointed, setDisappointed_yes_no] = useState(0);
  const [busy, setBusy_yes_no] = useState(0);
  const [conflict, setConflict_yes_no] = useState(0);
  const [passionate, setPassionate_yes_no] = useState(0);
  const [introvertExtrovert, setIntrovertExtrovert_yes_no] = useState(0);
  const callbackDisappointed = useCallback((val) => {
    setDisappointed_yes_no(val);
  }, []);
  const callbackBusy = useCallback((val) => {
    setBusy_yes_no(val);
  }, []);
  const callbackConflict = useCallback((val) => {
    setConflict_yes_no(val);
  }, []);
  const callbackPassionate = useCallback((val) => {
    setPassionate_yes_no(val);
  }, []);
  const callbackIntrovertExtrovert = useCallback((val) => {
    setIntrovertExtrovert_yes_no(val);
  }, []);
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
              value={value}
              trueLabel={"Yes"}
              falseLabel={"No"}
              parentCallback={callbackDisappointed}
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
                  onValueChange={(sliderValue) =>
                    setFriendFrequency(sliderValue)
                  }
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
              parentCallback={callbackBusy}
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
              parentCallback={testFunc}
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
              parentCallback={callbackConflict}
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
              parentCallback={callbackPassionate}
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
              parentCallback={callbackIntrovertExtrovert}
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
