import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextInput,
} from "react-native";

import BooleanQuestionnaireSwitch from "../src/components/BooleanQuestionnaireSwitch";
import Input from "../src/components/Input";
import Question from "../src/components/Question";
import Button from "../src/components/Button";

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
    budget: "",
    othersUsingZoom: false,
    cleanliness: "",
    smokeOrNot: false,
    petsOrNot: false,
    zoomOrNot: false,
    okayWithZoom: false,
    roommates_boolean: false
  });

  const [location, setLocation] = React.useState("");


  const changeLocationData = (value) => {
    if (value.trim() != "") {
      setLocation({ location: value });
    }
  };


  const callback = useCallback((val) => {
    setRoommate_yes_no(val);
  }, []);


  console.log("Roommate: " + data.roommates_boolean);
  };
  const [roommate_yes_no, setRoomate_yes_no] = React.useState(boolVal);
  const [smoker, setSmoker] = React.useState("");
  const [pets, setPets] = React.useState("");
  const [zoom_friendly, setZoom_friendly] = React.useState("");
  const [zoom_others_using, setZoom_others_using] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [cleanliness, setCleanliness] = React.useState("");

  const [roommate, setRoommate_yes_no] = React.useState(false);

  const Submission = () => {
    handleSubmit(onSubmit);

    console.log("loc:" + location);
    console.log("budget:" + budget);
    console.log("cleanliness:" + cleanliness);

    console.log("roommate:" + roommate);

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

  return (
    <View style={styles.container}>
      <View style={[styles.form, { width: window.width - 20 }]}>
        <Text style={styles.header}>Question {questionNumber}/8</Text>

        <Question
          question="What is your location?"
          display={questionNumber == 1}
          control={control}
          rules={{ required: true, min: 5 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ width: window.width - 10 }}
              onChange={onChange}
              onChangeText={(val) => setLocation(val)}
              onBlur={onBlur}
              value={value}
              keyboardType="number-pad"
              placeholder="Enter Location/Zip Code"
            />
          )}
          name="Location"
          defaultValue=""
        />

        <Question
          question="What is your budget amount?"
          display={questionNumber == 2}
          control={control}
          rules={{ required: true, min: 5 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ width: window.width - 10 }}
              onChange={onChange}
              onChangeText={(val) => setBudget(val)}
              onBlur={onBlur}
              value={value}
              keyboardType="number-pad"
              placeholder="Price range in $"
            />
          )}
          name="Budget"
          defaultValue=""
        />

        <Question
          question="Are you seeking roommates for a place or do you need to join a place with roommates?"
          display={questionNumber == 3}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              parentCallback={callback}
              value={value}
              trueLabel={"Seeking"}
              falseLabel={"Joining"}
            />
          )}

          defaultvalue={false}
          name="othersUsingZoom"
        />

        <Question
          question="On a scale of 1 to 10, how clean would you consider yourself?"
          display={questionNumber == 4}
          control={control}
          rules={{ required: true, min: 2 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ width: window.width - 10 }}
              onChange={onChange}
              onChangeText={(val) => setCleanliness(val)}
              onBlur={onBlur}
              value={value}
              keyboardType="number-pad"
              placeholder="Anywhere from 1-10"
            />
          )}
          name="Cleanliness"
          defaultValue=""
        />

        <Question
          question="Would you consider yourself a smoker or non-smoker?"
          display={questionNumber == 5}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              value={value}
              trueLabel={"Smoker"}
              falseLabel={"Non-smoker"}
            />
          )}
          defaultvalue={false}
          name="smokerOrNot"
        />

        <Question
          question="Would you consider yourself pet-friendly or not pet-friendly?"
          display={questionNumber == 6}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              value={value}
              trueLabel={"Pet-friendly"}
              falseLabel={"Not Pet-friendly"}
            />
          )}
          defaultvalue={false}
          name="petsOrNot"
        />

        <Question
          question="Zoom Related: Do you use zoom?"
          display={questionNumber == 7}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              value={value}
              trueLabel={"Yes"}
              falseLabel={"No"}
            />
          )}
          defaultvalue={false}
          name="zoomOrNot"
        />

        <Question
          question="Zoom Related: Are you okay with others using Zoom?"
          display={questionNumber == 8}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              value={value}
              trueLabel={"Yes"}
              falseLabel={"No"}
            />
          )}
          defaultvalue={false}
          name="okayWithZoom"
        />

        <View style={styles.formNavigation}>
          <Button
            title="Back"
            disabled={questionNumber == 1}
            onPress={prevQuestion}
            style={styles.buttonLeft}
          />
          {questionNumber < 8 && (
            <Button
              title="Next"
              onPress={nextQuestion}
              style={styles.buttonRight}
            />
          )}
          {questionNumber == 8 && (
            <Button
              title="Submit"
              onPress={() => Submission()} //Cyrus code: handleSubmit(onSubmit)
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
