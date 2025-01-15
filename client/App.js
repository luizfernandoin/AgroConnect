import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import Login from './screens/Login'; 
import CriarConta from './screens/CriarConta'; 
import Profile from './screens/Profile';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyAdress from './screens/MyAdress';
import EditProfile from './screens/EditProfile';
import EditAdress from './screens/EditAdress';
import AddAdress from './screens/AddAdress';
import LoadingPage from './screens/LoadingPage';
import BancoDeOportunidades from './screens/BancoDeOportunidades';

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
            <Stack.Navigator initialRouteName="Profile">
                <Stack.Screen
                    name="Loading"
                    component={LoadingPage}
                    options={{headerShown: false}}
                />
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
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyAdress"
                    component={MyAdress}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EditAdress"
                    component={EditAdress}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='AddAdress'
                    component={AddAdress}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Oportunidades'
                    component={BancoDeOportunidades}
                    options={{ headerShown: false }}
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
