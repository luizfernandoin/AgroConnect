import React, { useState } from "react";
import { Text, View, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { login } from "../services/authService";
import { styles } from "../styles/LoginStyles";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleLogin = async () => {
        console.log('Fazendo login...');
        const result = await login(email, senha);

        if (result.success) {
            navigation.navigate('Home');
        } else {
            Alert.alert("Erro", result.error || "Erro ao fazer login.");
        }
    }

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
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
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


export default Login;
