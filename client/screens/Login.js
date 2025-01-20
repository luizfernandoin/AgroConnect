import React, { useState } from "react";
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const fazerLogin = async () => {
        const loginData = {
            email: email,
            senha: senha,
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Login realizado com sucesso:', responseData);
            } else {
                const errorData = await response.json();
                console.error('Erro ao fazer login:', errorData);
            }
        } catch (error) {
            console.error('Erro ao conectar com o backend:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image
                        source={require("../assets/Agro Connect Verde PNG 1.png")}
                        style={styles.logo}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.loginTitle}>Login</Text>
                        <Text style={styles.insiraSeusDados}>
                            Insira suas credenciais para acessar sua conta
                        </Text>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Digite seu email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Senha</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Digite sua senha"
                            secureTextEntry={!passwordVisible}
                            value={senha}
                            onChangeText={setSenha}
                        />
                        <TouchableOpacity
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            <Icon
                                name={passwordVisible ? "visibility" : "visibility-off"}
                                size={24}
                                color="#7c7c7c"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={fazerLogin}>
                    <Text style={styles.loginButtonText}>Entrar</Text>
                </TouchableOpacity>
                <Text style={styles.signupPrompt}>
                    Não tem uma conta?{" "}
                    <Text
                        style={styles.signupLink}
                        onPress={() => navigation.navigate("CriarConta")}
                    >
                        Criar Conta
                    </Text>
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fcfcfc",
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    header: {
        alignItems: "center", 
        marginBottom: 30,
    },
    textContainer: {
        alignItems: "flex-start", 
        width: '100%',
    },
    logo: {
        width: width * 0.3,
        height: width * 0.3,
        resizeMode: "contain",
        marginBottom: 20, 
    },
    loginTitle: {
        fontSize: 25,
        fontWeight: "500",
        fontFamily: "Jost-Medium",
        color: "#181725",
        marginBottom: 10, 
    },
    insiraSeusDados: {
        fontSize: 15,
        color: "#7c7c7c",
        fontFamily: "Jost-Regular",
        marginTop: 5,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 15,
        fontFamily: "Jost-Medium",
        color: "#7c7c7c",
        marginBottom: 8,
    },
    inputField: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 8,
        fontSize: 15,
        fontFamily: "Jost-Regular",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    loginButton: {
        backgroundColor: "#53b175",
        borderRadius: 18,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    loginButtonText: {
        fontSize: 18,
        color: "#fff",
        fontFamily: "Jost-Regular",
    },
    signupPrompt: {
        textAlign: "center",
        fontSize: 13,
        fontFamily: "Jost-Regular",
        color: "#181725",
        marginTop: 10,
    },
    signupLink: {
        color: "#53b175",
        textDecorationLine: "underline",
    },
});

export default Login;
