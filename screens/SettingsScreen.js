import * as React from "react";
import COLORS from '../src/consts/colors';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Avatar, Icon, Divider } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
const SettingsScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView style={style.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{backgroundColor: COLORS.green}}>
       
    <View
    style={{
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 40,
    }}>
  
      <TouchableOpacity onPress={() => navigation.navigate('CreateListingsScreen')}>
      <View style={style.btn}>
        <Text style={[style.text_header]}>Create A Listing!</Text>
      </View>
    </TouchableOpacity>
  </View>
  <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal:25}}
        />
         <View
    style={{
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 40,
    }}>
  
      <TouchableOpacity onPress={() => navigation.navigate('CreateListingsScreen')}>
      <View style={style.btn}>
        <Text style={[style.text_header]}>Update A Listing!</Text>
      </View>
    </TouchableOpacity>
  </View>
  <Divider
          orientation="horizontal"
          style={{ marginTop: 10, marginHorizontal:25}}
        />
     <View
    style={{
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 40,
    }}>
 
      <TouchableOpacity onPress={() => route.params.setIsLoggedIn(false)}>
      <View style={style.btn}>
        <Text style={[style.text_header]}>Log Out</Text>
      </View>
    </TouchableOpacity>
  </View>
  

  </View>
  </ScrollView>
    </SafeAreaView>
  );
}
export default SettingsScreen;
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  image: {
    height: 420,
    width: '100%',
    borderBottomLeftRadius: 100,
  },
  text_header: {
    color: COLORS.green,
    fontWeight: "bold",
    fontSize: 20,
     alignItems:'center'
  },
  indicatorContainer: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  indicator: {
    height: 3,
    width: 30,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  indicatorActive: {
    backgroundColor: COLORS.dark,
  },
  btn: {
    height: 60,
    marginTop:70,
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {fontSize: 32, fontWeight: 'bold'},
  textStyle: {fontSize: 16, color: COLORS.grey},
});

