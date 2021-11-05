import React, { useEffect, useState, useRef } from "react";
import { View, Animated, Text, StyleSheet } from 'react-native';
import BootSplash from 'react-native-bootsplash';

let splash = require('../assets/logo_copy.png')

// This is where we will connect to the server.
// It is set to a timeout since we don't have
// that much data to load yet
let connectToBackend = () =>
    new Promise((resolve) => setTimeout(resolve, 3000));

let SplashScreen = ({ route, navigation }) => {
    let [bootSplashIsVisible, setBootSplashIsVisible] = useState(true);
    let [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] = useState(false);
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
                duration: 150,
                delay: 350,
            }).start(() => {
                setBootSplashIsVisible(false);
            });
        } catch (error) {
            setBootSplashIsVisible(false);
        }
        // Allow welcome text to display
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        route.params.setShownSplashScreen(true);
        // Redirect to Log In/Sign In using the Stack Navigator
        navigation.replace('OnBoardScreen');
    };


    useEffect(() => {
        bootSplashLogoIsLoaded && init();
    }, [bootSplashLogoIsLoaded]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Roommate Finder!</Text>

            {bootSplashIsVisible && (
                <Animated.View
                    style={[
                        StyleSheet.absoluteFill,
                        styles.bootsplash,
                        { opacity: opacity.current },
                    ]}
                >
                    <Animated.Image
                        source={splash}
                        fadeDuration={0}
                        onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
                        style={[
                            styles.logo,
                            { transform: [{ translateY: translateY.current }] },
                        ]}
                    />
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
        fontWeight: "700",
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


export default SplashScreen;