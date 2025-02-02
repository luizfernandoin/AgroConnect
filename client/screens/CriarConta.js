import React, { useState, useEffect, use } from "react";
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, Dimensions, Alert } from "react-native";
import { RadioButton } from 'react-native-paper';
import { API_BASE_URL } from '@env';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from "@expo/vector-icons/AntDesign";

const { width } = Dimensions.get('window');

const CriarConta = ({ navigation, route }) => {
    const usuarioEdit = route.params?.usuario || null;
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
    const [description, setDescription ] = useState(null);
    const [prodution, setProduction ] = useState(null);

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

    useEffect(() => {
        if (usuarioEdit) {
            setNome(usuarioEdit.nome);
            setEmail(usuarioEdit.email);
            setTelefone(usuarioEdit.telefone);
            setCpf(usuarioEdit.cpf);
            setChecked(usuarioEdit.role);
            setDescription(usuarioEdit.description);
            setProduction(usuarioEdit.production);
        }
    }, [usuarioEdit]);

    const editarConta = () => {
        if (!validarCampos()) return;
        const formDataEdited = new FormData();
        formDataEdited.append('email', email);
        formDataEdited.append('name', nome);
        formDataEdited.append('phone', telefone);
        formDataEdited.append('password', senha);
        formDataEdited.append('cpf', cpf);
        formDataEdited.append('role', checked);
        formDataEdited.append('description', description);
        formDataEdited.append('production', prodution);

        if (image) {
            const imageType = image.endsWith('.png') ? 'image/png' : 'image/jpeg';
            formDataEdited.append('file', {
                uri: image,
                name: 'photo.jpg',
                type: imageType,
            });
            console.log("FormDataEdited após adicionar a imagem:", formDataEdited);
        }

        console.log("Usuário editado", formDataEdited);
        navigation.goBack();
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
            formData.append('file', {
                uri: image,
                name: 'photo.jpg',
                type: imageType,
            });
            console.log("FormData após adicionar a imagem:", formData);
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const responseText = await response.text();
            console.log("Resposta do backend:", responseText);

            if (response.ok) {
                Alert.alert("Sucesso", "Conta criada com sucesso!");
                navigation.navigate("Login");
            } else {
                try {
                    const errorData = JSON.parse(responseText);
                    Alert.alert("Erro", errorData.message || "Erro ao criar conta.");
                } catch (error) {
                    Alert.alert("Erro", "Erro inesperado. Por favor, tente novamente.");
                }
            }
        } catch (error) {
            console.error('Erro ao conectar com o backend:', error);
            Alert.alert("Erro", "Erro ao conectar com o backend.");
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image source={require("../assets/Agro Connect Verde PNG 1.png")} style={styles.logo} />
                    <Text style={styles.criarContaTitle}>{usuarioEdit ? 'Editar Usuário' : 'Cadastrar Usuário'}</Text>
                    <Text style={styles.insiraSeusDados}>Insira seus dados para {usuarioEdit ? 'editar' : 'criar'} sua conta</Text>
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
                {checked === "PRODUCER" && (
                    <>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Descrição da produção</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Digite uma descrição"
                                value={description}
                                onChangeText={setDescription}
                                maxLength={150}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Tipo de produção</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Digite um tipo de produção"
                                value={prodution}
                                onChangeText={setProduction}
                                maxLength={50}
                            />
                        </View>
                    </>
                )}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Crie sua {usuarioEdit ? 'nova' : ''} senha</Text>
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
                    <Text style={styles.inputLabel}>Confirme sua senha</Text>
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
                    <Text style={styles.inputLabel}>Escolha sua foto de perfil</Text>
                    <TouchableOpacity style={styles.fileInput} onPress={pickImage}>
                        <Text style={styles.fileInputText}>Escolher imagem</Text>
                        <Icon name="image" color="black" size={15}/>
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={styles.previewImage} />}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.createButton} onPress={usuarioEdit ? editarConta : criarConta}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fcfcfc",
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 80,
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: width * 0.3,
        height: width * 0.3,
        resizeMode: "contain",
        marginBottom: 10,
    },
    criarContaTitle: {
        fontSize: 25,
        fontWeight: "500",
        fontFamily: "Jost-Medium",
        color: "#181725",
        textAlign: "left",
        alignSelf: "flex-start",
    },
    insiraSeusDados: {
        fontSize: 15,
        color: "#7c7c7c",
        fontFamily: "Jost-Regular",
        textAlign: "left",
        alignSelf: "flex-start",
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
    radioGroup: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        justifyContent: 'space-evenly'
    },
    radioItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
    },
    radioLabel: {
        fontSize: 15,
        fontFamily: "Jost-Regular",
        color: "#181725",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    footer: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    createButton: {
        backgroundColor: "#53b175",
        borderRadius: 18,
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 10,
    },
    createButtonText: {
        fontSize: 18,
        color: "#fff",
        fontFamily: "Jost-Regular",
    },
    loginPrompt: {
        textAlign: "center",
        fontSize: 13,
        fontFamily: "Jost-Regular",
        color: "#181725",
    },
    loginLink: {
        color: "#53b175",
        fontSize: 15,
        fontFamily: "Jost-Regular",
    },
    fileInput: {
        borderWidth: 1,
        flexDirection: "row",
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    fileInputText: {
        fontSize: 16,
        fontFamily: "Jost-Regular",
        color: "#7c7c7c",
    },
    previewImage: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        marginTop: 10,
    },
});

export default CriarConta;
