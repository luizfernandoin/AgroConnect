import React, { useState, useEffect, useReducer } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { styles } from "../styles/SignupStyles";
import { register } from "../services/authService";
import Input from "../components/Input";
import { inputStyles } from "../styles/InputStyles";
import Icon from 'react-native-vector-icons/Ionicons';
import { updateUser } from "../services/userService";

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

const CriarConta = ({ navigation, route }) => {
    const usuarioEdit = route.params?.usuario || null;
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

    useEffect(() => {
        if (usuarioEdit) {
            dispatch({ type: 'SET_FIELD', field: 'name', value: usuarioEdit.name });
            dispatch({ type: 'SET_FIELD', field: 'email', value: usuarioEdit.email });
            dispatch({ type: 'SET_FIELD', field: 'phone', value: usuarioEdit.phone });
            dispatch({ type: 'SET_FIELD', field: 'cpf', value: usuarioEdit.cpf });
            dispatch({ type: 'SET_FIELD', field: 'role', value: usuarioEdit.role });
            dispatch({ type: 'SET_FIELD', field: 'description', value: usuarioEdit.description });
            dispatch({ type: 'SET_FIELD', field: 'productionType', value: usuarioEdit.productionType });
        }
    }, [usuarioEdit]);

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

    const editarConta = async () => {
        if (!validateFields(true)) return;

        const formDataEdited = new FormData();
        formDataEdited.append('email', email);
        formDataEdited.append('name', name);
        formDataEdited.append('phone', phone);
        formDataEdited.append('cpf', cpf);
        formDataEdited.append('role', role);
        formDataEdited.append('description', description);
        formDataEdited.append('productionType', productionType);

        if (image) {
            const imageType = image.endsWith('.png') ? 'image/png' : 'image/jpeg';
            formDataEdited.append('file', {
                uri: image,
                name: 'photo.jpg',
                type: imageType,
            });
            console.log("FormDataEdited após adicionar a imagem:", formDataEdited);
        }

        try {
            const result = await updateUser(formDataEdited);

            console.log("Resultado da atualização do usuário:", result);

            if (result && !result.error) {
                Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
                navigation.goBack();
            } else {
                Alert.alert("Erro", "Erro ao atualizar usuário. Mensagem: " + (result.error || "Erro desconhecido"));
            }
        } catch (error) {
            console.error("Erro capturado na atualização do usuário:", error);
            Alert.alert("Erro", `Erro ao atualizar usuário: ${error.message}`);
        }
    };

    const validateFields = (isEditing = false) => {
        if (!email || !name || !phone || !cpf) {
            Alert.alert("Erro", "Por favor, preencha os campos obrigatórios.");
            return false;
        }
        if (!isEditing) {
            if (!password || !confirmPassword) {
                Alert.alert("Erro", "Por favor, preencha os campos de senha.");
                return false;
            }
            if (password !== confirmPassword) {
                Alert.alert("Erro", "As senhas não coincidem.");
                return false;
            }
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
                    <Text style={styles.criarContaTitle}>
                        {usuarioEdit ? 'Editar Usuário' : 'Cadastrar Usuário'}
                    </Text>
                    <Text style={styles.insiraSeusDados}>
                        Insira seus dados para {usuarioEdit ? 'editar' : 'criar'} sua conta
                    </Text>
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

                {!usuarioEdit && (
                    <>
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
                    </>
                )}

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
                    <Text style={inputStyles.inputLabel}>Escolha sua foto de perfil</Text>
                    <TouchableOpacity style={styles.fileInput} onPress={pickImage}>
                        <Text style={styles.fileInputText}>Escolher imagem</Text>
                        <Icon name="image" color="black" size={15} />
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={styles.previewImage} />}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.createButton} onPress={usuarioEdit ? editarConta : createAccount}>
                    <Text style={styles.createButtonText}>{usuarioEdit ? 'Editar' : 'Criar'} Conta</Text>
                </TouchableOpacity>
                {!usuarioEdit && (
                    <Text style={styles.loginPrompt}>
                        Já possui uma conta?{" "}
                        <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>
                            Login
                        </Text>
                    </Text>
                )}
            </View>
        </View>
    );
};

export default CriarConta;
