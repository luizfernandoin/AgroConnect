import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import Login from './screens/Login'; 
import CriarConta from './screens/CriarConta'; 
import Home from './screens/Home';
import Carrinho from './screens/Carrinho';
import TelaProdutos from './screens/TelaProdutos';
import ProdutoDetalhado from './screens/ProdutoDetalhado';
import Favoritos from './screens/Favoritos';
import ResultadoPesquisa from './screens/ResultadoPesquisa';
import PedidoConcluido from './screens/PedidoConcluido';
import AdicionarProduto from './screens/AdicionarProduto';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MeusProdutos from './screens/MeusProdutos';
import MeusPedidos from './screens/MeusPedidos';
import AvaliarProduto from './screens/AvaliarProduto';
import DetalhesPedido from './screens/DetalhesPedido';

const Stack = createStackNavigator();

const loadFonts = async () => {
    await Font.loadAsync({
        'Jost-Medium': require('./assets/fonts/Jost-Medium.ttf'),
        'Jost-Regular': require('./assets/fonts/Jost-Regular.ttf'),
        'Jost-Bold': require('./assets/fonts/Jost-Bold.ttf'),
        'Jost-SemiBold': require('./assets/fonts/Jost-SemiBold.ttf'),
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
            <Stack.Navigator initialRouteName="DetalhesPedido">
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
                    options={{ title: 'Produtos' }}
                />
                <Stack.Screen 
                    name="ProdutoDetalhado" 
                    component={ProdutoDetalhado} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Carrinho" 
                    component={Carrinho} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Favoritos" 
                    component={Favoritos} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="ResultadoPesquisa" 
                    component={ResultadoPesquisa} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="PedidoConcluido" 
                    component={PedidoConcluido} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="AdicionarProduto" 
                    component={AdicionarProduto} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="MeusProdutos" 
                    component={MeusProdutos} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="MeusPedidos" 
                    component={MeusPedidos} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="AvaliarProduto" 
                    component={AvaliarProduto} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="DetalhesPedido" 
                    component={DetalhesPedido} 
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
