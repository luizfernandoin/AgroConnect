import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { RadioButton } from 'react-native-paper';

const { width } = Dimensions.get('window');

const CriarConta = () => {
    const [email, setEmail] = React.useState('');
    const [nome, setNome] = React.useState('');
    const [telefone, setTelefone] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [confirmarSenha, setConfirmarSenha] = React.useState('');
    const [checked, setChecked] = React.useState('produtor');
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);

    const criarConta = async () => {
        const userData = {
            email: email,
            nome: nome,
            telefone: telefone,
            tipoUsuario: checked,
            senha: senha
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                console.log('Conta criada com sucesso');
            } else {
                const errorData = await response.json();
                console.error('Erro ao criar conta:', errorData);
            }
        } catch (error) {
            console.error('Erro ao conectar com o backend:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scroll}>
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
                    <Text style={styles.inputLabel}>Tipo de Usuário</Text>
                    <View style={styles.radioGroup}>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="produtor"
                                status={checked === 'produtor' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('produtor')}
                                color="#000"
                            />
                            <Text style={styles.radioLabel}>Produtor</Text>
                        </View>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="cliente"
                                status={checked === 'cliente' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('cliente')}
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
                            <Image source={require("../assets/Vector.png")} style={styles.vectorIcon} />
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
                            <Image source={require("../assets/Vector.png")} style={styles.vectorIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.createButton} onPress={criarConta}>
                    <Text style={styles.createButtonText}>Criar Conta</Text>
                </TouchableOpacity>
                <Text style={styles.loginPrompt}>
                    Já possui uma conta? <Text style={styles.loginLink}>Login</Text>
                </Text>
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
    vectorIcon: {
        width: 24,
        height: 24,
        marginLeft: 10,
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
    },
});

export default CriarConta;
