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
import { grey } from "@mui/material/colors";

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
    jobTitleValid:true,
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
    check_WorkingProfessional: false,
  });

  const [location, setLocation] = React.useState("");
  const [student, setStudent] = React.useState(false);
  const [workingProfessional, setWorkingProfessional] = React.useState(false);
  const [jobTitle, setJobTitle] = React.useState("");
  const [guestsOften, setGuestsOften] = React.useState(false);

  const [roommate, setRoommate_yes_no] = React.useState(false);

  const [smoker, setSmoker] = React.useState(false);
  const [pets, setPets] = React.useState(false);
  const [zoom_friendly, setZoom_friendly] = React.useState(false);
  const [zoom_others_using, setZoom_others_using] = React.useState(false);
  const [budget, setBudget] = React.useState("");
  const [cleanliness, setCleanliness] = React.useState("");
  const [temp, setTemp] = React.useState("");

  const insert_questionnaire_Data = () => {
    fetch("http://127.0.0.1:5000/questionnaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: location.location,
        budget: budget.budget,
        student,
        workingProfessional,
        jobTitle: jobTitle.jobTitle,
        guestsOften,
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
  
  const workingValidation = (val) => {
      if (val.trim().length !== 0) {
      setJobTitle({jobTitle: val });
        setData({
          ...data,
          jobTitleValid:true,
          check_WorkingProfessional: true,
        });
      } else {
        setJobTitle({jobTitle: val });
        setData({
          ...data,
        jobTitleValid:false,
          check_WorkingProfessional: false,
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

  const callbackStudent = useCallback((val) => {
    setStudent(val);
  }, []);
  const callbackWorkingProfessional = useCallback((val) => {
    setWorkingProfessional(val);
  }, []);
  const callbackGuestsOften = useCallback((val) => {
    setGuestsOften(val);
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

  const getZipcodeNames = () => {};

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
        <Text style={styles.header}>Question {questionNumber}/11</Text>

        <Question
          question="What is your location?"
          display={questionNumber == 1}
          control={control}
          rules={{ required: true, min: 5 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={{ width: 250, marginLeft: 5, marginRight: "auto" }}
                  onChange={onChange}
                  onChangeText={(val) => locationValidation(val)}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="number-pad"
                  placeholder="Enter Zip Code"
                />

                <View style={{ marginLeft: "auto" }}>
                  {data.check_location ? (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={25} />
                    </Animatable.View>
                  ) : null}
                  {data.locationValid ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>
                        {" "}
                        <FontAwesome
                          name="exclamation-circle"
                          color="red"
                          size={25}
                        />{" "}
                      </Text>
                    </Animatable.View>
                  )}
                </View>
              </View>
              <View>
                {data.locationValid ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text
                      style={{
                        flexDirection: "column",
                        marginBottom: "auto",
                        color: "#ae0700",
                      }}
                    >
                      {" "}
                      Zip code is invalid, please try again.
                    </Text>
                  </Animatable.View>
                )}
              </View>
            </View>
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
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={{ width: 250, marginLeft: 5, marginRight: "auto" }}
                  onChange={onChange}
                  onChangeText={(val) => budgetValidation(val)}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="number-pad"
                  placeholder="Price range in $"
                />

                <View style={{ marginLeft: "auto" }}>
                  {data.check_Budget ? (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={25} />
                    </Animatable.View>
                  ) : null}
                  {data.budgetValid ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>
                        {" "}
                        <FontAwesome
                          name="exclamation-circle"
                          color="red"
                          size={25}
                        />{" "}
                      </Text>
                    </Animatable.View>
                  )}
                </View>
              </View>
              <View>
                {data.budgetValid ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text
                      style={{
                        flexDirection: "column",
                        marginBottom: "auto",
                        color: "#ae0700",
                      }}
                    >
                      {" "}
                      Budget amount is invalid, please try again.
                    </Text>
                  </Animatable.View>
                )}
              </View>
            </View>
          )}
          name="Budget"
          defaultValue=""
        />

        <Question
          question="Are you a student?"
          display={questionNumber == 3}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
        
              parentCallback={callbackStudent}
              value={value}
              trueLabel={"Yes"}
              falseLabel={"No"}
            />
          )}
          defaultvalue={false}
          name="isStudent"
        />

        <Question
          question="Are you a working professional?"
          display={questionNumber == 4}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <BooleanQuestionnaireSwitch
                parentCallback={callbackWorkingProfessional}
                value={value}
                trueLabel={"Yes"}
                falseLabel={"No"}
              />
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
              {workingProfessional ? (
                <TextInput
                style={{ width: 250, marginLeft: 5, marginRight: "auto",  marginBottom: 10, marginTop: 10,}}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => workingValidation(value)}
                  keyboardType="number-pad"
                  placeholder="Job title"
                />
              ) : null}
             <View style={{ marginLeft: "auto",flexDirection :"row" }}>
                  {data.check_WorkingProfessional ? (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={25} />
                    </Animatable.View>
                  ) : null}
                  {data.jobTitleValid? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>
                        {" "}
                        <FontAwesome
                          name="exclamation-circle"
                          color="red"
                          size={25}
                        />{" "}
                      </Text>
                    </Animatable.View>
                  )}
             </View>
       
            </View>
              <View>
                {data.jobTitleValid ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text
                      style={{
                        flexDirection: "column",
                        color: "#ae0700",
                        marginBottom: 10,
                      }}
                    >
                      {" "}
                     Job title is invalid. Try Again
                    </Text>
                  </Animatable.View>
                )}
             </View>
            </View>
          
            </View>
          )}
          defaultvalue={false}
          name="isWorking"
        />

        <Question
          question="Do you have guests often?"
          display={questionNumber == 5}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              parentCallback={callbackGuestsOften}
              value={value}
              trueLabel={"Yes"}
              falseLabel={"No"}
            />
          )}
          defaultvalue={false}
          name="guestsOften"
        />

        <Question
          question="Are you seeking roommates for a place or do you need to join a place with roommates?"
          display={questionNumber == 6}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              parentCallback={callbackRoomate}
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
          display={questionNumber == 7}
          control={control}
          rules={{ required: true, min: 2 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={{ width: 250, marginLeft: 5, marginRight: "auto" }}
                  onChange={onChange}
                  onChangeText={(value) => cleanlinessValidation(value)}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="number-pad"
                  placeholder="Anywhere from 1-10"
                />

                <View style={{ marginLeft: "auto" }}>
                  {data.check_Cleanliness ? (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={25} />
                    </Animatable.View>
                  ) : null}
                  {data.cleanlinessValid ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>
                        {" "}
                        <FontAwesome
                          name="exclamation-circle"
                          color="red"
                          size={25}
                        />{" "}
                      </Text>
                    </Animatable.View>
                  )}
                </View>
              </View>
              <View>
                {data.cleanlinessValid ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text
                      style={{
                        flexDirection: "column",
                        marginBottom: "auto",
                        color: "#ae0700",
                      }}
                    >
                      {" "}
                      Cleanliness number is invalid, please try again.
                    </Text>
                  </Animatable.View>
                )}
              </View>
            </View>
          )}
          name="Cleanliness"
          defaultValue=""
        />

        <Question
          question="Would you consider yourself a smoker or non-smoker?"
          display={questionNumber == 8}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              value={value}
              trueLabel={"Smoker"}
              falseLabel={"Non-smoker"}
              parentCallback={callbackSmoker}
            />
          )}
          defaultvalue={false}
          name="smokerOrNot"
        />

        <Question
          question="Would you consider yourself pet-friendly or not pet-friendly?"
          display={questionNumber == 9}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BooleanQuestionnaireSwitch
              value={value}
              trueLabel={"Pet-friendly"}
              falseLabel={"Not Pet-friendly"}
              parentCallback={callbackPets}
            />
          )}
          defaultvalue={false}
          name="petsOrNot"
        />

        <Question
          question="Zoom Related: Do you use zoom?"
          display={questionNumber == 10}
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
          question="Zoom Related: Are you okay with others using Zoom?"
          display={questionNumber == 11}
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

        <View style={styles.formNavigation}>
          <Button
            title="Back"
            disabled={questionNumber == 1}
            onPress={prevQuestion}
            style={styles.buttonLeft}
          />

          {questionNumber === 4 && !workingProfessional ? (
            <Button
              title="Next"
              onPress={nextQuestion}
              style={styles.buttonRight}
            />
          ) : null}

          {questionNumber === 4 && workingProfessional && data.jobTitleValid ? (
            <Button
              title="Next"
              onPress={nextQuestion}
              style={styles.buttonRight}
            />
          ) : null}

          {questionNumber < 11 && (
            <View>
              {data.locationValid &&
              data.check_location &&
              questionNumber == 1 ? (
                <Button
                  title="Next"
                  onPress={nextQuestion}
                  style={styles.buttonRight}
                />
              ) : null}
              {data.budgetValid && data.check_Budget && questionNumber == 2 ? (
                <Button
                  title="Next"
                  onPress={nextQuestion}
                  style={styles.buttonRight}
                />
              ) : null}
              {data.cleanlinessValid &&
              data.check_Cleanliness &&
              questionNumber == 7 ? (
                <Button
                  title="Next"
                  onPress={nextQuestion}
                  style={styles.buttonRight}
                />
              ) : null}
              {questionNumber == 3 ||
              (questionNumber >= 5 && questionNumber <= 6) ||
              (questionNumber >= 8 && questionNumber < 11) ? (
                <Button
                  title="Next"
                  onPress={nextQuestion}
                  style={styles.buttonRight}
                />
              ) : null}
            </View>
          )}

          {questionNumber == 11 && (
            <Button
              title="Submit"
              onPress={() => {
                insert_questionnaire_Data();
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
   // marginLeft: "auto",
   marginLeft:65,
    marginRight: 5,
    justifyContent: "center",
  },
  buttonRight: {
    marginLeft: 5,
    justifyContent: "center",
    //marginRight: "auto",
  },
});
