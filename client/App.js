import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import Login from './screens/Login'; 
import CriarConta from './screens/CriarConta'; 
import Home from './screens/Home';
import TelaProdutos from './screens/TelaProdutos';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const loadFonts = async () => {
    await Font.loadAsync({
        'Jost-Medium': require('./assets/fonts/Jost-Medium.ttf'),
        'Jost-Regular': require('./assets/fonts/Jost-Regular.ttf'),
        'Jost-Bold': require('./assets/fonts/Jost-Bold.ttf'),
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

    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="CriarConta" 
                    component={CriarConta} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Home" 
                    component={Home} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="TelaProdutos" 
                    component={TelaProdutos} 
                    options={{ title: 'Produtos' }} // Opcionalmente ajuste o título
                />
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
