import React, { useState, useEffect, useReducer } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { styles } from "../styles/SignupStyles";
import { register } from "../services/authService";
import Input from "../components/Input";
import { inputStyles } from "../styles/InputStyles";

const initialState = {
    email: '',
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    role: 'PRODUCER',
    image: null,
    productionType: '',
    description: ''
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

const CriarConta = ({ navigation }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { email, name, phone, password, confirmPassword, cpf, role, image, productionType, description } = state;

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            dispatch({ type: 'SET_FIELD', field: 'image', value: result.assets[0].uri });
        }
    };

    const validateFields = () => {
        if (!email || !name || !phone || !password || !confirmPassword || !cpf) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return false;
        }
        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return false;
        }
        if (!/^\d{11}$/.test(cpf)) {
            Alert.alert("Erro", "CPF inválido. Certifique-se de que possui 11 dígitos.");
            return false;
        }
        if (role === 'PRODUCER' && (!productionType || !description)) {
            Alert.alert("Erro", "Por favor, preencha os campos de tipo de produção e descrição.");
            return false;
        }
        return true;
    };

    const createAccount = async () => {
        if (!validateFields()) return;

        const formData = new FormData();
        formData.append('email', email);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('cpf', cpf);
        formData.append('role', role);

        if (role === 'PRODUCER') {
            formData.append('productionType', productionType);
            formData.append('description', description);
        }

        if (image) {
            const imageType = image.endsWith('.png') ? 'image/png' : 'image/jpeg'; 
            formData.append('image', {
                uri: image,
                name: 'photo.jpg',
                type: imageType,
            });
        }

        const result = await register(formData);

        if (result.success) {
            Alert.alert("Sucesso", result.message);
            navigation.navigate("Login");
        } else {
            Alert.alert("Erro", result.message);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image source={require("../assets/Agro Connect Verde PNG 1.png")} style={styles.logo} />
                    <Text style={styles.criarContaTitle}>Criar Conta</Text>
                    <Text style={styles.insiraSeusDados}>Insira seus dados para criar sua conta</Text>
                </View>

                <Input 
                    label="Email" 
                    placeholder="Digite seu email" 
                    keyboardType="email-address" 
                    value={email} 
                    onChangeText={text => dispatch({ type: 'SET_FIELD', field: 'email', value: text })} 
                />
                <Input 
                    label="Nome" 
                    placeholder="Digite seu nome" 
                    value={name} 
                    onChangeText={text => dispatch({ type: 'SET_FIELD', field: 'name', value: text })} 
                />
                <Input 
                    label="Telefone" 
                    placeholder="Digite seu telefone" 
                    keyboardType="phone-pad" 
                    value={phone} 
                    onChangeText={text => dispatch({ type: 'SET_FIELD', field: 'phone', value: text })} 
                />
                <Input 
                    label="CPF" 
                    placeholder="Digite seu CPF" 
                    keyboardType="numeric" 
                    value={cpf} 
                    onChangeText={text => dispatch({ type: 'SET_FIELD', field: 'cpf', value: text })} 
                    maxLength={11} 
                />

                <View style={inputStyles.inputGroup}>
                    <Text style={inputStyles.inputLabel}>Tipo de Usuário</Text>
                    <View style={styles.radioGroup}>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="PRODUCER"
                                status={role === 'PRODUCER' ? 'checked' : 'unchecked'}
                                onPress={() => dispatch({ type: 'SET_FIELD', field: 'role', value: 'PRODUCER' })}
                                color="#000"
                            />
                            <Text style={styles.radioLabel}>Produtor</Text>
                        </View>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="CUSTOMER"
                                status={role === 'CUSTOMER' ? 'checked' : 'unchecked'}
                                onPress={() => dispatch({ type: 'SET_FIELD', field: 'role', value: 'CUSTOMER' })}
                                color="#000"
                            />
                            <Text style={styles.radioLabel}>Cliente</Text>
                        </View>
                    </View>
                </View>

                <Input 
                    label="Senha" 
                    placeholder="Digite sua senha" 
                    isPassword={true} 
                    value={password} 
                    onChangeText={text => dispatch({ type: 'SET_FIELD', field: 'password', value: text })} 
                />
                <Input 
                    label="Confirmar Senha" 
                    placeholder="Confirme sua senha" 
                    isPassword={true} 
                    value={confirmPassword} 
                    onChangeText={text => dispatch({ type: 'SET_FIELD', field: 'confirmPassword', value: text })} 
                />

                {role === 'PRODUCER' && (
                    <>
                        <Input 
                            label="Tipo de Produção" 
                            placeholder="Digite o tipo de produção" 
                            value={productionType} 
                            onChangeText={text => dispatch({ type: 'SET_FIELD', field: 'productionType', value: text })} 
                        />
                        <Input 
                            label="Descrição" 
                            placeholder="Digite a descrição" 
                            value={description} 
                            onChangeText={text => dispatch({ type: 'SET_FIELD', field: 'description', value: text })} 
                        />
                    </>
                )}

                <View style={inputStyles.inputGroup}>
                    <Text style={inputStyles.inputLabel}>Imagem</Text>
                    <TouchableOpacity style={styles.fileInput} onPress={pickImage}>
                        <Text style={styles.fileInputText}>Escolher imagem</Text>
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={styles.previewImage} />}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.createButton} onPress={createAccount}>
                    <Text style={styles.createButtonText}>Criar Conta</Text>
                </TouchableOpacity>
                <Text style={styles.loginPrompt}>
                    Já possui uma conta?{" "}
                    <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>
                        Login
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default CriarConta;
