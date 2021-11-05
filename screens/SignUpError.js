import React, { useEffect, useState, useRef } from "react";
import { View, Animated, Text, StyleSheet } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



// This is where we will connect to the server.
// It is set to a timeout since we don't have
// that much data to load yet
let connectToBackend = () =>
    new Promise((resolve) => setTimeout(resolve, 100));

let SignUpError = ({ route, navigation }) => {
    let [bootSplashIsVisible, setBootSplashIsVisible] = useState(true);
    let [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] = useState(true);
    let opacity = useRef(new Animated.Value(1));
    let translateY = useRef(new Animated.Value(0));

    let init = async () => {
        // You can uncomment this line to add a delay on app startup
        await connectToBackend();

        try {
            await BootSplash.hide();

            Animated.stagger(250, [
                Animated.spring(translateY.current, {
                    useNativeDriver: true,
                    toValue: -50,
                }),
                Animated.spring(translateY.current, {
                    useNativeDriver: true,
                    toValue: Dimensions.get("window").height,
                }),
            ]).start();

            Animated.timing(opacity.current, {
                useNativeDriver: true,
                toValue: 0,
                duration: 50,
                delay: 0,
            }).start(() => {
                setBootSplashIsVisible(false);
            });
        } catch (error) {
            setBootSplashIsVisible(false);
        }
        // Allow welcome text to display
        await new Promise((resolve) => setTimeout(resolve, 4000));
        
       
        // Redirect to Log In/Sign In using the Stack Navigator
        navigation.replace('LoginScreen');
    };


    useEffect(() => {
        bootSplashLogoIsLoaded && init();
    }, [bootSplashLogoIsLoaded]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>  <FontAwesome 
                    name="exclamation-circle"
                    color=""
                    size={40}
                />  Email or Phone Number Already Exists. Must Be Unique.</Text>

            {bootSplashIsVisible && (
                <Animated.View
                    style={[
                        StyleSheet.absoluteFill,
                        styles.bootsplash,
                        { opacity: opacity.current },
                    ]}
                >
                   
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#009387",
    },
    text: {
        fontSize: '2rem',
        fontWeight: "500",
        margin: 20,
        lineHeight: '2rem',
        color: "#FFFFFF",
        textAlign: "center",
    },
    bootsplash: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#009387",
    },
    logo: {
        flex: 1,
        height: 250,
        width: 250,
        resizeMode: 'contain'
    },
});


export default SignUpError;
