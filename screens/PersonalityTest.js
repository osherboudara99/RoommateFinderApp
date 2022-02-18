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
    zoomOrNot: false,
    okayWithZoom: false,
    locationValid: true,
    roommates_boolean: false,
    check_location: false,
    check_Budget: false,
    check_Cleanliness: false,
  });

  const [location, setLocation] = React.useState("");

  const [roommate, setRoommate_yes_no] = React.useState(false);
  const [smoker, setSmoker] = React.useState(false);
  const [pets, setPets] = React.useState(false);
  const [zoom_friendly, setZoom_friendly] = React.useState(false);
  const [zoom_others_using, setZoom_others_using] = React.useState(false);
  const [budget, setBudget] = React.useState("");
  const [cleanliness, setCleanliness] = React.useState("");
  const [temp, setTemp] = React.useState("");

  const personalityTestTaken = React.useState(true);

  const navigateBackToProfileScreen = () => {
    navigation.navigate("ProfileScreen", personalityTestTaken);
  };

  const insert_questionnaire_Data = () => {
    fetch("http://127.0.0.1:5000/questionnaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: location.location,
        budget: budget.budget,
        roommate,
        cleanliness: cleanliness.cleanliness,
        smoker,
        pets,
        zoom_friendly,
        zoom_others_using,
      }),
    })
      .then((resp) => resp.text())
      .then((data) => {
        console.log(data);
        if (data === "executed") {
          console.log(route.params);
          route.params.setIsLoggedIn(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const budgetValidation = (val) => {
    var rege = /^[0-9]+$/;

    if (rege.test(val)) {
      if (val.trim().length !== 0) {
        setBudget({ budget: val });
        setData({
          ...data,
          budgetValid: true,
          check_Budget: true,
        });
      } else {
        setBudget({ budget: val });
        setData({
          ...data,
          budgetValid: false,
          check_Budget: false,
        });
      }
    } else {
      setBudget({ budget: val });
      setData({
        ...data,
        budgetValid: false,
        check_Budget: false,
      });
    }
  };
  const locationValidation = (val) => {
    var rege = /^\d{5}$/;

    if (rege.test(val)) {
      if (val.trim().length == 5) {
        setLocation({ location: val });
        setData({
          ...data,
          locationValid: true,
          check_location: true,
        });
      } else {
        setLocation({ location: val });
        setData({
          ...data,
          locationValid: false,
          check_location: false,
        });
      }
    } else {
      setLocation({ location: val });
      setData({
        ...data,
        locationValid: false,
        check_location: false,
      });
    }
  };
  const cleanlinessValidation = (val) => {
    var rege = /^[0-9]+$/;

    if (rege.test(val)) {
      var temp = parseInt(val);
      if (temp <= 10 && temp != 0) {
        setCleanliness({ cleanliness: val });
        setData({
          ...data,
          cleanlinessValid: true,
          check_Cleanliness: true,
        });
      } else {
        setCleanliness({ cleanliness: val });
        setData({
          ...data,
          cleanlinessValid: false,
          check_Cleanliness: false,
        });
      }
    } else {
      setCleanliness({ cleanliness: val });
      setData({
        ...data,
        cleanlinessValid: false,
        check_Cleanliness: false,
      });
    }
  };

  const callbackRoomate = useCallback((val) => {
    setRoommate_yes_no(val);
  }, []);

  const callbackSmoker = useCallback((val) => {
    setSmoker(val);
  }, []);
  const callbackPets = useCallback((val) => {
    setPets(val);
  }, []);
  const callbackZoomFriendly = useCallback((val) => {
    setZoom_friendly(val);
  }, []);
  const callbackZoomOthersUsing = useCallback((val) => {
    setZoom_others_using(val);
  }, []);

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

  const [sliderData1, setSliderData1] = useState(5);
  const [sliderData2, setSliderData2] = useState(2);
  const [sliderData3, setSliderData3] = useState(2);
  const [sliderData4, setSliderData4] = useState(2);

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
                  value={sliderData1}
                  onValueChange={(sliderValue) => setSliderData1(sliderValue)}
                  thumbTintColor="#1B5E20"
                  //style={{ alignSelf: "center" }}
                  style={{ width: 250, height: 40 }}
                />
              </View>
              <View style={{ marginLeft: "auto" }}>
                <Text style={{ fontSize: 18 }}>{sliderData1}</Text>
              </View>
            </View>
          )}
          name="Location"
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
                  value={sliderData2}
                  onValueChange={(sliderValue) => setSliderData2(sliderValue)}
                  thumbTintColor="#1B5E20"
                  //style={{ alignSelf: "center" }}
                  style={{ width: 200, height: 40 }}
                />
              </View>
              <View style={{ marginLeft: "auto" }}>
                {sliderData2 === 1 ? (
                  <Text style={{ fontSize: 18 }}>Movie</Text>
                ) : (
                  <Text />
                )}
                {sliderData2 === 2 ? (
                  <Text style={{ fontSize: 18 }}>Book</Text>
                ) : (
                  <Text />
                )}
                {sliderData2 === 3 ? (
                  <Text style={{ fontSize: 18 }}>Theatre Play</Text>
                ) : (
                  <Text />
                )}
              </View>
            </View>
          )}
          name="Budget"
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
          name="othersUsingZoom"
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
                  value={sliderData3}
                  onValueChange={(sliderValue) => setSliderData3(sliderValue)}
                  thumbTintColor="#1B5E20"
                  //style={{ alignSelf: "center" }}
                  style={{ width: 200, height: 40 }}
                />
              </View>
              <View style={{ marginLeft: "auto" }}>
                {sliderData3 === 1 ? (
                  <Text style={{ fontSize: 18 }}>Never</Text>
                ) : (
                  <Text />
                )}
                {sliderData3 === 2 ? (
                  <Text style={{ fontSize: 18 }}>Sometimes</Text>
                ) : (
                  <Text />
                )}
                {sliderData3 === 3 ? (
                  <Text style={{ fontSize: 18 }}>Frequently</Text>
                ) : (
                  <Text />
                )}
              </View>
            </View>
          )}
          name="Cleanliness"
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
          name="smokerOrNot"
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
          name="petsOrNot"
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
          name="zoomOrNot"
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
          name="okayWithZoom"
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
                  value={sliderData4}
                  onValueChange={(sliderValue) => setSliderData4(sliderValue)}
                  thumbTintColor="#1B5E20"
                  //style={{ alignSelf: "center" }}
                  style={{ width: 200, height: 40 }}
                />
              </View>
              <View style={{ marginLeft: "auto" }}>
                {sliderData4 === 1 ? (
                  <Text style={{ fontSize: 18 }}>Never</Text>
                ) : (
                  <Text />
                )}
                {sliderData4 === 2 ? (
                  <Text style={{ fontSize: 18 }}>Sometimes</Text>
                ) : (
                  <Text />
                )}
                {sliderData4 === 3 ? (
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
          name="okayWithZoom1"
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
