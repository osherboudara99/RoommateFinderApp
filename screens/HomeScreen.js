import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import COLORS from "../src/consts/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
const { width } = Dimensions.get("screen"); //old code
import listings from "../src/consts/listings";
import roommates from "../src/consts/roommates";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CompareSharp } from "@material-ui/icons";

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const optionsList = [
    {
      title: "Need a roommate",
      img: require("../src/assets/homescreen/roommate1.jpg"),
    },
    {
      title: "Find a roommate",
      img: require("../src/assets/homescreen/roommate2.jpg"),
    },
  ];
  const categoryList = ["Roommates ", "Listings"];

  const [isMounted, setMounted] = React.useState(true);
  useEffect(() => {
    if (isMounted) {
      fetchListings();
    }
    return () => {
      setMounted(false);
    };
  }, []);

  //const [listings, setListings] = React.useState([]);

  const fetchListings = () => {
    fetch("http://127.0.0.1:5000/listings_select", {
      method: "GET",
    })
      .then((resp) => resp.text())
      .then((article) => {
        console.log("article:", article);
        console.log(article[1]);
        //const jsonValue = {}

        var object = JSON.parse(article);
        // var array = [];
        // for (var i in object) {
        //   array.push(object[i]);
        // }
        
        console.log("object:", object);

        console.log("object at 0:", object.total_rent);

        var str = JSON.stringify(object[0]);
        //var testStr = str.replace(/([a-zA-Z0-9_]+)/g, '"$1"')
        //var testStr = str.replace("'", '"')
        console.log("string: ", str);
        console.log()
        
        //console.log(object[0].bedrooms)
        // console.log(array[1].bedrooms);
        // console.log(array[1]["bedrooms"]);

        // console.log(array[1]);

        // var strArray = JSON.stringify(array[1]);
        // strArray.replace("'", '");

        // const objTest = JSON.parse(strArray);

        // console.log(objTest);
        // //console.log(JSON.parse(objTest));

        // console.log(object);
        // console.log(object[0]);
        // var testObj = object[0];
        // console.log(testObj["bedrooms"]);

        // console.log("testStr");
        // var testStr = JSON.stringify(object[0]);
        // var newStr = testStr.replace("'total_rent'", "total_rent");
        // console.log(newStr);
        // console.log(testStr[13]);
      });
  };

  const ListCategories = () => {
    return (
      <View style={style.categoryListContainer}>
        {categoryList.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedCategoryIndex(index)}
          >
            <Text
              style={[
                style.categoryListText,
                index == selectedCategoryIndex && style.activeCategoryListText,
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                {category}
                {category != "Listings" ? (
                  <Pressable
                    style={{
                      marginLeft: 5,
                      paddingBottom: 5,
                      marginTop: 0,
                      fontSize: 18,
                    }}
                    onPress={() => {
                      navigation.navigate("RoommateIconsHelper");
                    }}
                  >
                    <Ionicons
                      name="ios-help-circle"
                      size={22}
                      color={COLORS.dark}
                    />
                  </Pressable>
                ) : (
                  <View></View>
                )}
              </View>
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const ListOptions = () => {
    return (
      <View style={style.optionListsContainer}>
        {optionsList.map((option, index) => (
          <View style={style.optionsCard} key={index}>
            {/* House image */}
            <Image source={option.img} style={style.optionsCardImage} />

            {/* Option title */}
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              {option.title}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  const Card = ({ house }) => {
    return (
      <Pressable
        activeOpacity={0.8}
        style={{ size: 22, color: COLORS.dark }}
        onPress={() => navigation.navigate("DetailsListingScreen", house)}
      >
        <View style={style.card}>
          {/* House image */}
          <Image source={house.image} style={style.cardImage} />
          <View style={{ marginTop: 10 }}>
            {/* Title and total_rent container */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {house.title}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: COLORS.green,
                  fontSize: 16,
                }}
              >
                {house.total_rent}
              </Text>
            </View>

            {/* Location text */}

            <Text style={{ color: COLORS.green, fontSize: 14, marginTop: 5 }}>
              {house.location}
            </Text>

            {/* Facilities container */}
            <View style={{ marginTop: 10, flexDirection: "row" }}>
              <View style={style.facility}>
                <Icon name="hotel" size={18} />
                <Text style={style.facilityText}>{house.bedrooms}</Text>
              </View>
              <View style={style.facility}>
                <Icon name="bathtub" size={18} />
                <Text style={style.facilityText}>{house.bathrooms}</Text>
              </View>
              <View style={style.facility}>
                <Icon name="aspect-ratio" size={18} />
                <Text style={style.facilityText}>{house.square_footage}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const CardRoommate = ({ roommate }) => {
    return (
      <Pressable
        activeOpacity={0.8}
        style={{ size: 22, color: COLORS.dark }}
        onPress={() => navigation.navigate("DetailsRoommateScreen", roommate)}
      >
        <View style={style.card}>
          {/* House image */}
          <Image source={roommate.image} style={style.cardImage} />
          <View style={{ marginTop: 10 }}>
            {/* Title and total_rent container */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {roommate.title}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: COLORS.green,
                  fontSize: 16,
                }}
              >
                {roommate.budget}
              </Text>
            </View>

            {/* Location text */}

            <Text style={{ color: COLORS.green, fontSize: 14, marginTop: 5 }}>
              {roommate.location}
            </Text>

            {/* Facilities container */}
            <View style={{ marginTop: 10, flexDirection: "row" }}>
              <View style={style.facility}>
                <FontAwesome5 name="dog" size={18} color={COLORS.dark} />
                <Text> </Text>
                {roommate.petFriendly ? (
                  <FontAwesome5 name="check" size={18} color="green" />
                ) : (
                  <MaterialCommunityIcons
                    name="close-thick"
                    size={18}
                    color="red"
                  />
                )}
              </View>
              <View style={style.facility}>
                <FontAwesome5 name="smoking" size={18} color={COLORS.dark} />
                <Text> </Text>
                {roommate.smokingFriendly ? (
                  <FontAwesome5 name="check" size={18} color="green" />
                ) : (
                  <MaterialCommunityIcons
                    name="close-thick"
                    size={18}
                    color="red"
                  />
                )}
              </View>
              <View style={style.facility}>
                <FontAwesome5 name="desktop" size={18} color={COLORS.dark} />
                <Text> </Text>
                {roommate.zoomFriendly ? (
                  <FontAwesome5 name="check" size={18} color="green" />
                ) : (
                  <MaterialCommunityIcons
                    name="close-thick"
                    size={18}
                    color="red"
                  />
                )}
              </View>

              <View style={style.facility}>
                <FontAwesome5
                  name="user-graduate"
                  size={18}
                  color={COLORS.dark}
                />
                <Text> </Text>
                {roommate.student ? (
                  <FontAwesome5 name="check" size={18} color="green" />
                ) : (
                  <MaterialCommunityIcons
                    name="close-thick"
                    size={18}
                    color="red"
                  />
                )}
              </View>
              <View style={style.facility}>
                <FontAwesome5 name="user-tie" size={18} color={COLORS.dark} />
                <Text> </Text>
                {roommate.workingProfessional ? (
                  <FontAwesome5 name="check" size={18} color="green" />
                ) : (
                  <MaterialCommunityIcons
                    name="close-thick"
                    size={18}
                    color="red"
                  />
                )}
              </View>
              <View style={style.facility}>
                <FontAwesome5 name="house-user" size={18} color={COLORS.dark} />
                <Text> </Text>
                {roommate.guestsOften === 0 && (
                  <MaterialCommunityIcons
                    name="close-thick"
                    size={18}
                    color="red"
                  />
                )}

                {roommate.guestsOften === 1 && (
                  <View style={{ marginTop: 5 }}>
                    <FontAwesome5
                      style={{ marginRight: 1 }}
                      name="user-alt"
                      size={12}
                      color="green"
                    />
                  </View>
                )}
                {roommate.guestsOften === 2 && (
                  <View
                    style={{ flex: 1, flexDirection: "row", paddingTop: 4 }}
                  >
                    <FontAwesome5
                      style={{ marginRight: -1 }}
                      name="user-alt"
                      size={12}
                      color="green"
                    />
                    <FontAwesome5
                      style={{ marginRight: 1 }}
                      name="user-alt"
                      size={12}
                      color="green"
                    />
                  </View>
                )}
                {roommate.guestsOften === 3 && (
                  <View
                    style={{ flex: 1, flexDirection: "row", paddingTop: 4 }}
                  >
                    <FontAwesome5
                      style={{ marginRight: 1 }}
                      name="user-alt"
                      size={12}
                      color="green"
                    />
                    <FontAwesome5
                      style={{ marginRight: -5, marginTop: 1, marginLeft: -5 }}
                      name="user-alt"
                      size={12}
                      color="green"
                    />
                    <FontAwesome5 name="user-alt" size={12} color="green" />
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      {/* Customise status bar */}
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
      {/* Header container */}
      <View style={style.header}>
        <View>
          <Text style={{ color: COLORS.light }}>Location</Text>
          <Text
            style={{ color: COLORS.white, fontSize: 20, fontWeight: "bold" }}
          >
            USA
          </Text>
        </View>
        <Image
          style={style.profileImage}
          source={require("../src/assets/homescreen/person.jpg")}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Input and sort button container */}
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <View style={style.searchInputContainer}>
            <Icon name="search" color={COLORS.grey} size={25} />
            <TextInput placeholder="Search address, city, location" />
          </View>

          <View style={style.sortBtn}>
            <Icon name="tune" color={COLORS.white} size={25} />
          </View>
        </View>

        {/* Render list options 
        <ListOptions />*/}

        {/* Render categories */}
        <ListCategories />

        {/* Render Card */}
        {selectedCategoryIndex === 0 ? (
          <FlatList
            snapToInterval={width - 20}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
            vertical
            data={roommates}
            renderItem={({ item }) => <CardRoommate roommate={item} />}
          />
        ) : (
          <FlatList
            snapToInterval={width - 20}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
            vertical
            data={listings}
            renderItem={({ item }) => <Card house={item} />}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: COLORS.green,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS.dark,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  optionsCard: {
    height: 210,
    width: width / 2 - 30,
    elevation: 15,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionsCardImage: {
    height: 140,
    borderRadius: 10,
    width: "100%",
  },
  optionListsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryListText: {
    fontSize: 16,
    marginLeft: "auto",
    fontWeight: "bold",
    paddingBottom: 5,
    color: COLORS.grey,
  },
  activeCategoryListText: {
    color: COLORS.dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 40,
  },
  card: {
    height: 250,
    backgroundColor: COLORS.white,
    elevation: 10,
    width: width - 40,
    marginRight: 20,
    padding: 15,
    borderRadius: 20,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 15,
  },
  facility: { flexDirection: "row", marginRight: 15, size: 22 },
  facilityText: { marginLeft: 5, color: COLORS.green },
});
export default HomeScreen;
