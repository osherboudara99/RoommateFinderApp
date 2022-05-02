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
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
const { width } = Dimensions.get("screen"); //old code
//import listings from "../src/consts/listings";
import roommates from "../src/consts/roommates";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CompareSharp } from "@material-ui/icons";
import ZIPCODES from "../src/consts/zipcodes";


const ViewListingsScreen = ({ navigation }) => {
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
    fetch("http://127.0.0.1:5000/own_listings_select", {
      method: "GET",
    })
      .then((resp) => resp.text())
      .then((article) => {


        console.log(article);
        var testStr = toString(article);
        console.log(article);
        
        if(testStr != "[]"){
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

        setListings(allPerfect);

        var count;
        var amountOfListings = allPerfect.length / 4;
        var correctListing = [];
        for (var i = 0; i < allPerfect.length; i += 4) {

          if (allPerfect[i].personality_type === null){
            allPerfect[i].personality_type = "This user has not taken the personality test.";
          }


          const singleListing = {
            id: allPerfect[i].listingid,
            title: allPerfect[i].title,
            location: allPerfect[i].location,
            total_occupants: allPerfect[i].total_occupants,
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

        // for (var i = 0; i < allPerfect.length; i++)
        // {
        //   allListingID.push(allPerfect[i].lengthid)
        // }
        // var result = correctListing.filter(obj => {
        //   //for(var i = 0; allListingID.length; i++)
        //   //{
        //   return obj.lengthid === 2
        //   //}
        // })

        //console.log(result);

        // for (var i = 0; i < allPerfect.length; i++)
        //  {

        //   for (var k = -1; k < allPerfect.length; k++) {
        //     if ((k === -1) && correctListing[k].listingid === allPerfect[i].listingid)
        //      {
        //        //gallery pic is only difference here

        //     }
        //     if (correctListing[k].listingid = allPerfect[i].listingid)
        //      {
        //        //gallery pic is only difference here

        //     }
        //     else {
        //       //need to add a listing

        //       correctListing.push(allPerfect[i]);
        //     }
        //   }
        // }

        // var str = JSON.stringify(object[0]);

        // console.log(str);
        // var tok = str.replaceAll(/[']/g, '"');

        // tok = tok.slice(1, -1);
        // console.log(tok);

        // console.log(JSON.parse(tok));
        // var jsonified = JSON.parse(tok);
        // console.log(jsonified);
        // console.log(jsonified.bedrooms);

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
      }
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
        onPress={() => navigation.navigate("DetailsViewListingScreen", house)}
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
                <Text style={style.facilityText}>{house.square_footage} ft sq</Text>
              </View>
              <View style={style.facility}>
              <FontAwesome5 name="house-user" size={18} />
              <Text style={style.facilityText}>{house.total_occupants}</Text>
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
      <View style={style.headerBtn}>
                <Icon
                  style={{ marginLeft: 5 }}
                  name="arrow-back-ios"
                  size={20}
                  onPress={navigation.goBack}
                />
              </View>
    
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
         

     
        </View>

        {/* Render list options 
        <ListOptions />*/}

        {/* Render categories */}
  

        
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
                  No listings have been created.
                </Text>
              </View>
            )}
            {/* Render Card */}
          <FlatList
            snapToInterval={width - 20}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingVertical: 20 }}
            vertical
            data={listings}
            renderItem={({ item }) => <Card house={item} />}
          />
        
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
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
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
export default ViewListingsScreen;