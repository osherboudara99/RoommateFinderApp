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
import { Avatar, Icon, Divider } from "react-native-elements";
//import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import BooleanQuestionnaireSwitch from "../src/components/BooleanQuestionnaireSwitch";
import Input from "../src/components/Input";
import Question from "../src/components/Question";
import COLORS from "../src/consts/colors";
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
    rentValid: true,
    bedroomsValid: true,
    bathroomsValid: true,
    titleValid: true,
    totalOccupantsValid: true,
    squarefootageValid: true,
    descrValid: true,
    check_Squarefootage: false,
    check_Rent: false,
    check_Title: false,
    check_Bedrooms: false,
    check_Bathrooms: false,
    check_Descr: false,
    check_TotalOccupants: false,
  });

  const [squareFootage, setSquarefootage] = React.useState("");
  const [bedrooms, setBedrooms] = React.useState("");
  const [bathrooms, setBathrooms] = React.useState("");
  const [title, setTitle] = React.useState("");

  const [totalOccupants, setTotalOccupants] = React.useState("");

  const [rent, setRent] = React.useState("");
  const [descr, setDescr] = React.useState("");

  const insert_Listing_Data = () => {
    fetch("http://127.0.0.1:5000/listings_insertion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        squareFootage: squareFootage.squareFootage,
        rent: rent.rent,
        bedrooms: bedrooms.bedrooms,
        bathrooms: bathrooms.bathrooms,
        title: title.title,
        descr: descr.descr,
        totalOccupants: totalOccupants.totalOccupants,
      }),
    })
      .then((resp) => resp.text())
      .then((data) => {
        console.log(data);
        if (data === "executed") {
          console.log(route.params);
          navigation.navigate("ListingsPicsScreen");
          //route.params.setIsLoggedIn(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const rentValidation = (val) => {
    var rege = /^[0-9]+$/;

    if (rege.test(val)) {
      if (val.trim().length !== 0) {
        setRent({ rent: val });
        setData({
          ...data,
          rentValid: true,
          check_Rent: true,
        });
      } else {
        setRent({ rent: val });
        setData({
          ...data,
          rentValid: false,
          check_Rent: false,
        });
      }
    } else {
      setRent({ rent: val });
      setData({
        ...data,
        rentValid: false,
        check_Rent: false,
      });
    }
  };

  const bedroomsValidation = (val) => {
    var rege = /^[0-9]+$/;

    if (rege.test(val)) {
      if (val.trim().length > 0 && val.trim().length < 5) {
        setBedrooms({ bedrooms: val });
        setData({
          ...data,
          bedroomsValid: true,
          check_Bedrooms: true,
        });
      } else {
        setBedrooms({ bedrooms: val });
        setData({
          ...data,
          bedroomsValid: false,
          check_Bedrooms: false,
        });
      }
    } else {
      setBedrooms({ bedrooms: val });
      setData({
        ...data,
        bedroomsValid: false,
        check_Bedrooms: false,
      });
    }
  };

  const bathroomsValidation = (val) => {
    var r = /^(?:\d*\.(?:5|0?|00?)|\d+\.?)$/;

    if (r.test(val)) {
      if (val.trim().length > 0 && val.trim().length < 6) {
        setBathrooms({ bathrooms: val });
        setData({
          ...data,
          bathroomsValid: true,
          check_Bathrooms: true,
        });
      } else {
        setBathrooms({ bathrooms: val });
        setData({
          ...data,
          bathroomsValid: false,
          check_Bathrooms: false,
        });
      }
    } else {
      setBathrooms({ bathrooms: val });
      setData({
        ...data,
        bathroomsValid: false,
        check_Bathrooms: false,
      });
    }
  };
  const squarefootageValidation = (val) => {
    var rege = /^[0-9]+$/;

    if (rege.test(val)) {
      if (val.trim().length > 2) {
        setSquarefootage({ squareFootage: val });
        setData({
          ...data,
          squarefootageValid: true,
          check_Squarefootage: true,
        });
      } else {
        setSquarefootage({ squareFootage: val });
        setData({
          ...data,
          squarefootageValid: false,
          check_Squarefootage: false,
        });
      }
    } else {
      setSquarefootage({ squareFootage: val });
      setData({
        ...data,
        squarefootageValid: false,
        check_Squarefootage: false,
      });
    }
  };
  const titleValidation = (val) => {
    if (val.trim().length > 5 && val.trim().length < 51) {
      setTitle({
        title: val,
      });
      setData({
        ...data,
        titleValid: true,
        check_Title: true,
      });
    } else {
      setTitle({
        title: val,
      });
      setData({
        ...data,
        titleValid: false,
        check_Title: false,
      });
    }
  };
  const descrValidation = (val) => {
    if (val.trim().length > 10 && val.trim().length < 251) {
      setDescr({
        descr: val,
      });
      setData({
        ...data,
        descrValid: true,
        check_Descr: true,
      });
    } else {
      setDescr({
        descr: val,
      });
      setData({
        ...data,
        descrValid: false,
        check_Descr: false,
      });
    }
  };

  const totalOccupantsValidation = (val) => {
    var rege = /^[0-9]+$/;

    if (rege.test(val)) {
      if (val.trim().length !== 0) {
        setTotalOccupants({ totalOccupants: val });
        setData({
          ...data,
          totalOccupantsValid: true,
          check_TotalOccupants: true,
        });
      } else {
        setTotalOccupants({ totalOccupants: val });
        setData({
          ...data,
          totalOccupantsValid: false,
          check_TotalOccupants: false,
        });
      }
    } else {
      setTotalOccupants({ totalOccupants: val });
      setData({
        ...data,
        totalOccupantsValid: false,
        check_TotalOccupants: false,
      });
    }
  };

  const callbackGuestsOften = useCallback((val) => {
    setGuestsOften(val);
  }, []);

  const Submission = () => {
    //handleSubmit(onSubmit);
    console.log("squareF:" + squareFootage);
    console.log("rent:" + rent);
    console.log(rent);
    console.log(rent.rent);
    //console.log("cleanliness:" + cleanliness);

    insert_Listing_Data();

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
    <View style={styles.outsideContainer}>
      <View
        style={{
          marginLeft: 10,
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.headerBtn}>
          <Icon
            style={{ marginLeft: 5 }}
            name="arrow-back-ios"
            size={20}
            onPress={navigation.goBack}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={[styles.form, { width: window.width - 20 }]}>
          <Text style={styles.header}>Question {questionNumber}/7</Text>

          <Question
            question="What is the square footage of the entire property?"
            display={questionNumber == 1}
            control={control}
            rules={{ required: true, min: 5 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{ width: 250, marginLeft: 5, marginRight: "auto" }}
                    onChange={onChange}
                    onChangeText={(val) => squarefootageValidation(val)}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="number-pad"
                    placeholder="Enter Square Footage"
                  />

                  <View style={{ marginLeft: "auto" }}>
                    {data.check_Squarefootage ? (
                      <Animatable.View animation="bounceIn">
                        <Feather name="check-circle" color="green" size={25} />
                      </Animatable.View>
                    ) : null}
                    {data.squarefootageValid ? null : (
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
                  {data.squarefootageValid ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text
                        style={{
                          flexDirection: "column",
                          marginBottom: "auto",
                          color: "#ae0700",
                        }}
                      >
                        {" "}
                        Square Footage is invalid, please try again.
                      </Text>
                    </Animatable.View>
                  )}
                </View>
              </View>
            )}
            name="Square Footage"
            defaultValue=""
          />

          <Question
            question="How much is it to rent?"
            display={questionNumber == 2}
            control={control}
            rules={{ required: true, min: 5 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{ width: 250, marginLeft: 5, marginRight: "auto" }}
                    onChange={onChange}
                    onChangeText={(val) => rentValidation(val)}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="number-pad"
                    placeholder="Price range in $"
                  />

                  <View style={{ marginLeft: "auto" }}>
                    {data.check_Rent ? (
                      <Animatable.View animation="bounceIn">
                        <Feather name="check-circle" color="green" size={25} />
                      </Animatable.View>
                    ) : null}
                    {data.rentValid ? null : (
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
                  {data.rentValid ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text
                        style={{
                          flexDirection: "column",
                          marginBottom: "auto",
                          color: "#ae0700",
                        }}
                      >
                        {" "}
                        Rent amount is invalid, please try again.
                      </Text>
                    </Animatable.View>
                  )}
                </View>
              </View>
            )}
            name="Rent"
            defaultValue=""
          />

          <Question
            question="How many bedrooms are on the property?"
            display={questionNumber == 3}
            control={control}
            rules={{ required: true, min: 5 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{ width: 250, marginLeft: 5, marginRight: "auto" }}
                    onChange={onChange}
                    onChangeText={(val) => bedroomsValidation(val)}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="number-pad"
                    placeholder="Number of bedrooms"
                  />

                  <View style={{ marginLeft: "auto" }}>
                    {data.check_Bedrooms ? (
                      <Animatable.View animation="bounceIn">
                        <Feather name="check-circle" color="green" size={25} />
                      </Animatable.View>
                    ) : null}
                    {data.bedroomsValid ? null : (
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
                  {data.bedroomsValid ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text
                        style={{
                          flexDirection: "column",
                          marginBottom: "auto",
                          color: "#ae0700",
                        }}
                      >
                        {" "}
                        Number of Bedrooms is invalid, please try again.
                      </Text>
                    </Animatable.View>
                  )}
                </View>
              </View>
            )}
            name="Bedrooms"
            defaultValue=""
          />
          <Question
            question="How many bathrooms are on the property?"
            display={questionNumber == 4}
            control={control}
            rules={{ required: true, min: 5 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{ width: 250, marginLeft: 5, marginRight: "auto" }}
                    onChange={onChange}
                    onChangeText={(val) => bathroomsValidation(val)}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="number-pad"
                    placeholder="Number of bathrooms"
                  />

                  <View style={{ marginLeft: "auto" }}>
                    {data.check_Bathrooms ? (
                      <Animatable.View animation="bounceIn">
                        <Feather name="check-circle" color="green" size={25} />
                      </Animatable.View>
                    ) : null}
                    {data.bathroomsValid ? null : (
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
                  {data.bathroomsValid ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text
                        style={{
                          flexDirection: "column",
                          marginBottom: "auto",
                          color: "#ae0700",
                        }}
                      >
                        {" "}
                        Number of Bathrooms is invalid, please try again.
                      </Text>
                    </Animatable.View>
                  )}
                </View>
              </View>
            )}
            name="Bathrooms"
            defaultValue=""
          />

          <Question
            question="Please Create a Title for Your Listing."
            display={questionNumber == 5}
            control={control}
            rules={{ required: true, min: 5 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{ width: 250, marginLeft: 5, marginRight: "auto" }}
                    onChange={onChange}
                    onChangeText={(val) => titleValidation(val)}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Title potential roomates will see"
                  />

                  <View style={{ marginLeft: "auto" }}>
                    {data.check_Title ? (
                      <Animatable.View animation="bounceIn">
                        <Feather name="check-circle" color="green" size={25} />
                      </Animatable.View>
                    ) : null}
                    {data.titleValid ? null : (
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
                  {data.titleValid ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text
                        style={{
                          flexDirection: "column",
                          marginBottom: "auto",
                          color: "#ae0700",
                        }}
                      >
                        {" "}
                        Title is invalid, please try again.
                      </Text>
                    </Animatable.View>
                  )}
                </View>
              </View>
            )}
            name="Title"
            defaultValue=""
          />

          <Question
            question="How many total occupants?"
            display={questionNumber == 6}
            control={control}
            rules={{ required: true, min: 5 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{ width: 250, marginLeft: 5, marginRight: "auto" }}
                    onChange={onChange}
                    onChangeText={(val) => totalOccupantsValidation(val)}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="number-pad"
                    placeholder="Total occupants"
                  />

                  <View style={{ marginLeft: "auto" }}>
                    {data.check_TotalOccupants ? (
                      <Animatable.View animation="bounceIn">
                        <Feather name="check-circle" color="green" size={25} />
                      </Animatable.View>
                    ) : null}
                    {data.totalOccupantsValid ? null : (
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
                  {data.totalOccupantsValid ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text
                        style={{
                          flexDirection: "column",
                          marginBottom: "auto",
                          color: "#ae0700",
                        }}
                      >
                        {" "}
                        Total occupants is invalid, please try again.
                      </Text>
                    </Animatable.View>
                  )}
                </View>
              </View>
            )}
            name="TotalOccupants"
            defaultValue=""
          />

          <Question
            question="Please Create a Description for Your Listing."
            display={questionNumber == 7}
            control={control}
            rules={{ required: true, min: 5 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{
                      width: 250,
                      height: 250,
                      marginLeft: 5,
                      marginRight: "auto",
                    }}
                    onChange={onChange}
                    onChangeText={(val) => descrValidation(val)}
                    onBlur={onBlur}
                    value={value}
                    multiline={true}
                    numberOfLines={5}
                    placeholder="Description potential roomates will see"
                  />

                  <View style={{ marginLeft: "auto" }}>
                    {data.check_Descr ? (
                      <Animatable.View animation="bounceIn">
                        <Feather name="check-circle" color="green" size={25} />
                      </Animatable.View>
                    ) : null}
                    {data.descrValid ? null : (
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
                  {data.descrValid ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text
                        style={{
                          flexDirection: "column",
                          marginBottom: "auto",
                          color: "#ae0700",
                        }}
                      >
                        {" "}
                        Description is invalid, please try again.
                      </Text>
                    </Animatable.View>
                  )}
                </View>
              </View>
            )}
            name="Description"
            defaultValue=""
          />

          <View style={styles.formNavigation}>
            {questionNumber > 1 ? (
              <Button
                title="Back"
                disabled={questionNumber == 1}
                onPress={prevQuestion}
                style={styles.buttonLeft}
              />
            ) : null}

            {questionNumber < 7 && (
              <View>
                {data.squarefootageValid &&
                data.check_Squarefootage &&
                questionNumber == 1 ? (
                  <Button
                    title="Next"
                    onPress={nextQuestion}
                    style={styles.buttonRight}
                  />
                ) : null}
                {data.rentValid && data.check_Rent && questionNumber == 2 ? (
                  <Button
                    title="Next"
                    onPress={nextQuestion}
                    style={styles.buttonRight}
                  />
                ) : null}
                {data.bedroomsValid &&
                data.check_Bedrooms &&
                questionNumber == 3 ? (
                  <Button
                    title="Next"
                    onPress={nextQuestion}
                    style={styles.buttonRight}
                  />
                ) : null}
                {data.bathroomsValid &&
                data.check_Bathrooms &&
                questionNumber == 4 ? (
                  <Button
                    title="Next"
                    onPress={nextQuestion}
                    style={styles.buttonRight}
                  />
                ) : null}
                {data.titleValid && data.check_Title && questionNumber == 5 ? (
                  <Button
                    title="Next"
                    onPress={nextQuestion}
                    style={styles.buttonRight}
                  />
                ) : null}

                {data.totalOccupantsValid &&
                data.check_TotalOccupants &&
                questionNumber == 6 ? (
                  <Button
                    title="Next"
                    onPress={nextQuestion}
                    style={styles.buttonRight}
                  />
                ) : null}
              </View>
            )}
            {data.descrValid && data.check_Descr && questionNumber == 7 ? (
              <Button
                title="Submit"
                onPress={() => {
                  Submission();
                }}
                style={styles.buttonRight}
              />
            ) : null}
          </View>
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
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  outsideContainer: {
    backgroundColor: "#009387",
    height: "100%",
    width: "100%",
  },
  container: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#009387",
    height: "100%",
    width: "100%",
  },
  form: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
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
    marginLeft: 65,
    marginRight: 5,
    justifyContent: "center",
  },
  buttonRight: {
    marginLeft: 5,
    justifyContent: "center",
    //marginRight: "auto",
  },
});
