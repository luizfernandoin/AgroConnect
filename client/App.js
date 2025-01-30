import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screens from './src/screens';

const Stack = createStackNavigator();

const loadFonts = async () => {
    await Font.loadAsync({
        'Jost-Medium': require('./src/assets/fonts/Jost-Medium.ttf'),
        'Jost-Regular': require('./src/assets/fonts/Jost-Regular.ttf'),
        'Jost-Bold': require('./src/assets/fonts/Jost-Bold.ttf'),
        'Jost-SemiBold': require('./src/assets/fonts/Jost-SemiBold.ttf'),
    });
};

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const prepareApp = async () => {
            try {
                await loadFonts();
            } catch (e) {
                console.warn(e);
            } finally {
                setFontsLoaded(true);
                SplashScreen.hideAsync();
            }
        };

        prepareApp();
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#53B175" />
            </View>
        );
    }

    const screens = Object.keys(Screens).map((screenName) => ({
        name: screenName,
        component: Screens[screenName],
    }));

    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Stack.Navigator initialRouteName="Home">
                {screens.map(({ name, component }) => (
                    <Stack.Screen
                        key={name}
                        name={name}
                        component={component}
                        options={{ headerShown: false }}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
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
