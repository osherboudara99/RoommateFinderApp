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
//import listings from "../src/consts/listings";
import roommates from "../src/consts/roommates";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CenterFocusWeakOutlined, CompareSharp } from "@material-ui/icons";
import ZIPCODES from "../src/consts/zipcodes";
import api_key from "../src/consts/api_key";

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

  const [listings, setListings] = React.useState([]);

  const [roommates, setRoomates] = React.useState([]);

  const [selfLocation, setSelfLocation] = React.useState(-1);

  const [word, setWord] = React.useState(false);

  const [buttonPressedSort, setButtonPressedSort] = React.useState(false);

  const [isMounted, setMounted] = React.useState(true);
  useEffect(() => {
    if (isMounted) {
      fetchListings();
      fetchRoomates();
      fetchProfileScreen();
      Promise.all([fetchListings,fetchRoomates,fetchProfileScreen]).then(data=>{
        // DATA IS AN ARRAY AND THEY ARE IN ORDER AS PLACED IN 
        })
    }
    return () => {
      setMounted(false);
    };
  }, []);

  const insertionSort = (arr) => {
    //Start from the second element.
    for(let i = 1; i < arr.length;i++){

        //Go through the elements behind it.
        for(let j = i - 1; j > -1; j--){
            
            //value comparison using ascending order.
            if(arr[j + 1].locationDistance < arr[j].locationDistance){

                //swap
                [arr[j+1],arr[j]] = [arr[j],arr[j + 1]];

            }
        }
    };

  return arr;
}

  const SortByZipcodeCombined = () => {
    var locationArray = [];
    var roommatesArray = [];
    for (var i = 0; i < listings.length; i++) {
      locationArray.push(listings[i].location)
    }

    var allLocationsStrings = locationArray[0];
    for (var i = 1; i < locationArray.length; i++) {
      allLocationsStrings = allLocationsStrings + "%2C" + locationArray[i];
    }
    console.log("locations tring:"+ allLocationsStrings);
    SortByZipcodeListings(selfLocation, allLocationsStrings);

    /* for (var i = 0; i < roommates.length; i++) {
      roommatesArray.push(roommates[i].location)
    }
    var allRoommatesStrings = roommatesArray[0];
    for (var i = 1; i < roommatesArray.length; i++) {
      allRoommatesStrings = allRoommatesStrings + "%2C" + roommatesArray[i];

    } 
    SortByZipcodeRoommates(selfLocation, allRoommatesStrings); */
    
    setButtonPressedSort(true);
    
    
 /*    var tempListings = insertionSort(listings);
    setListings(() => {
          return [...tempListings];
        });
    var tempRoomates = insertionSort(roommates);
    setRoomates(() => {
          return [...tempRoomates];
        }); */
  };

  const SortByZipcodeListings = (zipcode1, zipcode2) => {
    //var zipcode1 = 90403 //this should be user profile zipcode

    //var zipcode2 = 90405
    fetch(
      "https://app.zipcodebase.com/api/v1/distance?apikey=" + api_key + "&code=" +
        zipcode1 +
        "&compare=" +
        zipcode2 +
        "&country=us&unit=miles",
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((article) => {
        var tempListings = listings;
        for(var i = 0; i < listings.length; i++){
          tempListings[i].locationDistance = article.results[listings[i].location];
        }
        setListings(() => {
          return [...tempListings];
        });
        
      });
  };

  const SortByZipcodeRoommates = (zipcode1, zipcode2) => {
    //var zipcode1 = 90403 //this should be user profile zipcode

    //var zipcode2 = 90405
    fetch(
      "https://app.zipcodebase.com/api/v1/distance?apikey=" + api_key + "&code=" +
        zipcode1 +
        "&compare=" +
        zipcode2 +
        "&country=us&unit=miles",
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((article) => {
        var tempRoomates = roommates;
        for(var i = 0; i < roommates.length; i++){
          tempRoomates[i].locationDistance = article.results[roommates[i].location];
        }
        setRoomates(() => {
          return [...tempRoomates];
        });
      });
  };

  //const [listings, setListings] = React.useState([]);
  const fetchListings = () => {
    fetch("http://127.0.0.1:5000/listings_select", {
      method: "GET",
    })
      .then((resp) => resp.text())
      .then((article) => {
        console.log(article);
        var testStr = toString(article);
        console.log(article);

        if (testStr != "[]") {
          //const jsonValue = {}
          var object = article.replaceAll('"', "");
          var object = article.replaceAll("'", "");
          var object = article.replace("'gallery_pic': b", "'gallery_pic': ");
          console.log(object);
          var object = JSON.parse(article);
          // var array = [];
          // for (var i in object) {
          //   array.push(object[i]);
          // }
          // console.log(article);
          console.log(object);

          var allPerfect = [];
          for (var i = 0; i < object.length; i++) {
            var str = JSON.stringify(object[i]);
            var tok = str.replace("'gallery_pic': b", "'gallery_pic': ");
            tok = tok.replace("None", "null");
            tok = tok.replaceAll(/[']/g, '"');
            //tok = tok.replaceAll("'gallery_pic': b", "'gallery_pic': ");
            tok = tok.slice(1, -1);

            var jsonified = JSON.parse(tok);

            console.log(jsonified);
            allPerfect.push(jsonified);
          }

          console.log(allPerfect);
          //console.log(allPerfect[0].gallery_pic);


          var count;
          var amountOfListings = allPerfect.length / 4;
          var correctListing = [];
          for (var i = 0; i < allPerfect.length; i += 4) {
            if (allPerfect[i].personality_type === null) {
              allPerfect[i].personality_type =
                "This user has not taken the personality test.";
            }

            const singleListing = {
              id: allPerfect[i].listingid,
              title: allPerfect[i].title,
              total_occupants: allPerfect[i].total_occupants,
              location: allPerfect[i].location,
              total_rent: allPerfect[i].total_rent,
              image: { uri: allPerfect[i].gallery_pic },
              bedrooms: allPerfect[i].bedrooms,
              bathrooms: allPerfect[i].bathrooms,
              square_footage: allPerfect[i].square_footage,
              description: allPerfect[i].description,
              firstName: allPerfect[i].firstName,
              lastName: allPerfect[i].lastName,
              phone: allPerfect[i].phone,
              email: allPerfect[i].email,
              locationDistance: -1,
              personality_type: allPerfect[i].personality_type,
              interiors: [
                { uri: allPerfect[i + 1].gallery_pic },
                { uri: allPerfect[i + 2].gallery_pic },
                { uri: allPerfect[i + 3].gallery_pic },
              ],
            };

            correctListing.push(singleListing);
          }

          console.log(correctListing);
          setListings(correctListing);

          var allListingID = [];
        }
      });
  };


  const fetchRoomates = () => {
    fetch("http://127.0.0.1:5000/roommates_select", {
      method: "GET",
    })
      .then((resp) => resp.text())
      .then((article) => {
        console.log(article);
        var testStr = toString(article);
        console.log(article);

        if (testStr != "[]") {
          //const jsonValue = {}
          var object = article.replaceAll('"', "");
          var object = article.replaceAll("'", "");
          var object = article.replace("'profile_pic': b", "'profile_pic': ");
          console.log(object);
          var object = JSON.parse(article);
          // var array = [];
          // for (var i in object) {
          //   array.push(object[i]);
          // }
          // console.log(article);
          console.log(object);

          var allPerfect = [];
          for (var i = 0; i < object.length; i++) {
            var str = JSON.stringify(object[i]);
            var tok = str.replace("'profile_pic': b", "'profile_pic': ");
            tok = tok.replaceAll("None", "null");
            tok = tok.replaceAll(/[']/g, '"');
            //tok = tok.replaceAll("'gallery_pic': b", "'gallery_pic': ");
            tok = tok.slice(1, -1);

            var jsonified = JSON.parse(tok);

            console.log(jsonified);
            allPerfect.push(jsonified);
          }

          console.log(allPerfect);
          //console.log(allPerfect[0].gallery_pic);

          var count;
          var amountOfListings = allPerfect.length / 4;
          var correctRoommates = [];
          for (var i = 0; i < allPerfect.length; i++) {
            if (allPerfect[i].personality_type === null) {
              allPerfect[i].personality_type =
                "This user has not taken the personality test.";
            }

            if (allPerfect[i].profile_pic === null) {
              allPerfect[i].profile_pic =
                require("../src/assets/emotion_profile_pic.jpg");
            }

            const singleListing = {
              id: allPerfect[i].userid,
              title: allPerfect[i].firstName + ' ' + allPerfect[i].lastName,
              location: allPerfect[i].zipcode_location,
              student: allPerfect[i].student,
              roommateStatus: allPerfect[i].roommates_yes_no,
              workingProfessional: allPerfect[i].working_professional,
              jobTitle: allPerfect[i].job_title,
              guestsOften: allPerfect[i].guests_often,
              cleanliness: allPerfect[i].cleanliness,
              petFriendly: allPerfect[i].pets,
              smokingFriendly: allPerfect[i].smoker,
              zoomFriendly: allPerfect[i].zoom_friendly,
              image: { uri: allPerfect[i].profile_pic },
              phone: allPerfect[i].phone,
              email: allPerfect[i].email,
              budget: allPerfect[i].budget,
              locationDistance: -1,
              personalityTypeName: allPerfect[i].personality_type,
            

  
            };

            correctRoommates.push(singleListing);
          }

          console.log(correctRoommates);
          setRoomates(correctRoommates);

          var allListingID = [];
        }
      });
  };


  const fetchProfileScreen = () => {
    fetch("http://127.0.0.1:5000/profile_screen", {
      method: "GET",
    })
      .then((resp) => resp.text())
      .then((article) => {
        var data = article.split(" ");

        for (let i = 0; i < data.length; i++) {
          data[i] = data[i].replace(",", "");
          data[i] = data[i].replace(/[']/g, "");
        }

        
        setSelfLocation(data[4]);
        
         
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
                  <Pressable
                  style={{
                    marginLeft: 5,
                    paddingBottom: 5,
                    marginTop: 0,
                    fontSize: 18,
                  }}
                  onPress={() => {
                    navigation.navigate("ListingsIconHelper");
                  }}
                >
                  <Ionicons
                    name="ios-help-circle"
                    size={22}
                    color={COLORS.dark}
                  />
                </Pressable>
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
      <View>
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
                  ${house.total_rent}
                </Text>
              </View>

              {/* Location text */}

              <Text style={{ color: COLORS.green, fontSize: 14, marginTop: 5 }}>
                {ZIPCODES[house.location]}
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
                <View style={style.facility}>
              <FontAwesome5 name="house-user" size={18} />
              <Text style={style.facilityText}>{house.total_occupants}</Text>
            </View>
                {house.locationDistance != -1 && (
                  <View style={style.facility}>
                    <MaterialCommunityIcons
                      name="map-marker-distance"
                      size={24}
                      color="black"
                    />
                    <Text style={style.facilityText}>
                      {house.locationDistance} mi
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Pressable>
      </View>
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
                ${roommate.budget}
              </Text>
            </View>

            {/* Location text */}

            <Text style={{ color: COLORS.green, fontSize: 14, marginTop: 5 }}>
              {ZIPCODES[roommate.location]}
            </Text>

            {/* Facilities container */}
            <View style={{ marginTop: 10, flexDirection: "row" }}>
              <View style={style.facility}>
                <FontAwesome5 name="dog" size={18} color={COLORS.dark} />
                <Text> </Text>
                {roommate.petFriendly === 1 ? (
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
                {roommate.smokingFriendly === 1? (
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
              <FontAwesome5
              name="users"
              size={18}
              color={COLORS.dark}
            />
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
                )}{roommate.locationDistance != -1 && (
                  <View style={[style.facility, { marginLeft: 1 }]}>
                    <MaterialCommunityIcons
                      name="map-marker-distance"
                      size={24}
                      color="black"
                    />
                    <Text style={style.facilityText}>
                      {roommate.locationDistance} mi
                    </Text>
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
        <Image
        source={require('../src/assets/logo_rf.png')}
        style={style.tinyLogo}
      />
        </View>
         {/* Input and sort button container */}
         <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          {!buttonPressedSort &&(
          <View style={style.sortBtn}>
            <TouchableOpacity onPress={SortByZipcodeCombined}>
              <Icon name="tune" color={COLORS.white} size={25} />
            </TouchableOpacity>
          </View>
          )}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
       

        {/* Render list options 
        <ListOptions />*/}

        {/* Render categories */}
        <ListCategories />

        {/* Render Card */}
        {selectedCategoryIndex === 0 ? (
          <View>
            {roommates.length === 0 && (
              <View>
                <Text
                  style={{
                    color: COLORS.green,
                    fontSize: 22,
                    fontWeight: "bold",
                    alignSelf: "center",
                    textAlign:"center"
                  }}
                >
                  There are no roommates.
                </Text>
              </View>
            )}
            <FlatList
              snapToInterval={width - 20}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
              vertical
              data={roommates}
              renderItem={({ item }) => <CardRoommate roommate={item} />}
            />
          </View>
        ) : (
          <View>
            {listings.length === 0 && (
              <View>
                <Text
                  style={{
                    color: COLORS.green,
                    fontSize: 22,
                    fontWeight: "bold",
                    alignSelf: "center",
                    textAlign:"center"
                  }}
                >
                  There are no listings.
                </Text>
              </View>
            )}
            <FlatList
              snapToInterval={width - 20}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
              vertical
              data={listings}
              extraData={listings}
              renderItem={({ item }) => <Card house={item} />}
            />
          </View>
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
    height: 40,
    width: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row",
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
  tinyLogo: {
    width:200,
    height: 50,
    alignSelf:"center",
    justifyContent: "center",
    flexDirection:"row",
  },
});
export default HomeScreen;
