import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { RadioButton } from 'react-native-paper';
import { API_BASE_URL } from '@env';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from "../styles/SignupStyles";
import { register } from "../services/authService";


const CriarConta = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [checked, setChecked] = useState('PRODUCER');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [image, setImage] = useState(null);

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
        }
    };

    useEffect(() => {
        requestPermission();
    }, []);

    const pickImage = async () => {
        console.log("Botão pressionado");  
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("Resultado da seleção de imagem:", result);  

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            console.log("Imagem selecionada:", result.assets[0].uri);  
        } else {
            console.log("Seleção de imagem cancelada");  
        }
    };

    const validarCampos = () => {
        if (!email || !nome || !telefone || !senha || !confirmarSenha || !cpf) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return false;
        }
        if (senha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return false;
        }
        if (!/^\d{11}$/.test(cpf)) {
            Alert.alert("Erro", "CPF inválido. Certifique-se de que possui 11 dígitos.");
            return false;
        }
        return true;
    };

    const criarConta = async () => {
        if (!validarCampos()) return;

        const formData = new FormData();
        formData.append('email', email);
        formData.append('name', nome);
        formData.append('phone', telefone);
        formData.append('password', senha);
        formData.append('cpf', cpf);
        formData.append('role', checked);

        if (image) {
            const imageType = image.endsWith('.png') ? 'image/png' : 'image/jpeg'; 
            formData.append('image', {
                uri: image,
                name: 'photo.jpg',
                type: imageType,
            });
            console.log("FormData após adicionar a imagem:", formData);
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
                    <Text style={styles.criarContaTitle}>Criar conta</Text>
                    <Text style={styles.insiraSeusDados}>Insira seus dados para criar sua conta</Text>
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
                    <Text style={styles.inputLabel}>Nome</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Digite seu nome"
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Telefone</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Digite seu telefone"
                        keyboardType="phone-pad"
                        value={telefone}
                        onChangeText={setTelefone}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>CPF</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Digite seu CPF"
                        keyboardType="numeric"
                        value={cpf}
                        onChangeText={setCpf}
                        maxLength={11}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Tipo de Usuário</Text>
                    <View style={styles.radioGroup}>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="PRODUCER"
                                status={checked === 'PRODUCER' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('PRODUCER')}
                                color="#000"
                            />
                            <Text style={styles.radioLabel}>Produtor</Text>
                        </View>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="CUSTOMER"
                                status={checked === 'CUSTOMER' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('CUSTOMER')}
                                color="#000"
                            />
                            <Text style={styles.radioLabel}>Cliente</Text>
                        </View>
                    </View>
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
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Icon
                                name={passwordVisible ? "visibility" : "visibility-off"}
                                size={24}
                                color="#7c7c7c"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Confirmar senha</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Confirme sua senha"
                            secureTextEntry={!confirmPasswordVisible}
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                        />
                        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                            <Icon
                                name={confirmPasswordVisible ? "visibility" : "visibility-off"}
                                size={24}
                                color="#7c7c7c"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Imagem</Text>
                    <TouchableOpacity style={styles.fileInput} onPress={pickImage}>
                        <Text style={styles.fileInputText}>Escolher imagem</Text>
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={styles.previewImage} />}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.createButton} onPress={criarConta}>
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
