import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import CriarConta from './screens/CriarConta'; 
import { SplashScreen } from 'expo-splash-screen';

const loadFonts = async () => {
    await Font.loadAsync({
        'Jost-Medium': require('./assets/fonts/Jost-Medium.ttf'),
        'Jost-Regular': require('./assets/fonts/Jost-Regular.ttf'),
    });
};

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        loadFonts().then(() => {
            setFontsLoaded(true);
            SplashScreen.hideAsync();
        });
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#53B175" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <CriarConta />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
