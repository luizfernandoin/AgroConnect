import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { RadioButton } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const CriarConta = () => {
    const [checked, setChecked] = React.useState('produtor');
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);

    return (
        <View style={styles.criarConta}>
            <View style={[styles.text, styles.textPosition]}>
                <Text style={[styles.criarConta1, styles.email1Typo]}>Criar conta</Text>
                <Text style={[styles.insiraSeusDados, styles.senhaTypo]}>Insira seus dados para criar sua conta</Text>
            </View>
            <ScrollView style={[styles.emailParent, styles.textPosition]}>
                <View style={styles.email}>
                    <Text style={[styles.email1, styles.senhaTypo]}>Email</Text>
                    <TextInput
                        style={styles.inputLine}
                        placeholder="Digite seu email"
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.email}>
                    <Text style={[styles.email1, styles.senhaTypo]}>Nome</Text>
                    <TextInput
                        style={styles.inputLine}
                        placeholder="Digite seu nome"
                    />
                </View>
                <View style={styles.email}>
                    <Text style={[styles.email1, styles.senhaTypo]}>Telefone</Text>
                    <TextInput
                        style={styles.inputLine}
                        placeholder="Digite seu telefone"
                        keyboardType="phone-pad"
                    />
                </View>
                <View style={styles.tipousuario}>
                    <Text style={[styles.email1, styles.senhaTypo]}>Tipo de Usuário</Text>
                    <View style={styles.radioGroup}>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="produtor"
                                status={ checked === 'produtor' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('produtor')}
                            />
                            <Text style={[styles.radioLabel, styles.clienteTypo]}>Produtor</Text>
                        </View>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="cliente"
                                status={ checked === 'cliente' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('cliente')}
                            />
                            <Text style={[styles.radioLabel, styles.clienteTypo]}>Cliente</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.email}>
                    <Text style={[styles.senha, styles.senhaTypo]}>Senha</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputLine}
                            placeholder="Digite sua senha"
                            secureTextEntry={!passwordVisible}
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Image source={require("../assets/Vector.png")} style={styles.vectorIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.email}>
                    <Text style={[styles.senha, styles.senhaTypo]}>Confirmar senha</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputLine}
                            placeholder="Confirme sua senha"
                            secureTextEntry={!confirmPasswordVisible}
                        />
                        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                            <Image source={require("../assets/Vector.png")} style={styles.vectorIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Text style={styles.jPossuiUmaContainer}>
                <Text style={styles.jPossuiUma}>{`Já possui uma conta? `}</Text>
                <Text style={styles.login}>Login</Text>
            </Text>
            <View style={styles.criarContaChild} />
            <View style={[styles.frase1, styles.frase1Layout]}>
                <Text style={[styles.criarConta2, styles.frase1Layout]}>Criar Conta</Text>
            </View>
            <View style={styles.criarContaItem} />
            <Image style={styles.agroConnectVerdePng2} resizeMode="cover" source={require("../assets/Agro Connect Verde PNG 1.png")} />
        </View>
    );
};

const styles = StyleSheet.create({
    textPosition: {
        left: 21,
        right: 21,
        position: "absolute",
    },
    email1Typo: {
        fontFamily: "Jost-Medium",
        fontWeight: "500",
        lineHeight: 28,
        top: 0,
    },
    senhaTypo: {
        color: "#7c7c7c",
        fontSize: 15,
        textAlign: "left",
        left: 0,
        position: "absolute",
    },
    groupItemLayout: {
        height: 0,
        width: width - 42,
        left: 0,
        position: "absolute",
    },
    clienteTypo: {
        fontSize: 18,
        textAlign: "left",
        fontFamily: "Jost-Regular",
        color: "#181725",
        lineHeight: 28,
        top: 0,
        position: "absolute",
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'none',
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioLabel: {
        marginLeft: -30,
    },
    frase1Layout: {
        height: 35,
        width: 107,
        position: "absolute",
    },
    criarConta1: {
        fontSize: 25,
        textAlign: "center",
        color: "#181725",
        left: 0,
        position: "absolute",
    },
    insiraSeusDados: {
        top: 38,
        lineHeight: 14,
        textAlign: "left",
        fontFamily: "Jost-Regular",
    },
    text: {
        top: 169,
        width: width - 42,
        height: 53,
    },
    emailChild: {
        top: 75,
    },
    email1: {
        textAlign: "left",
        fontFamily: "Jost-Medium",
        fontWeight: "500",
        lineHeight: 28,
        top: 0,
    },
    email: {
        height: 75,
        width: width - 42,
    },
    tipousuario: {
        width: width - 42,
        marginTop: 20,
    },
    senha: {
        textAlign: "left",
        fontFamily: "Jost-Regular",
        lineHeight: 28,
        fontSize: 15,
        top: 0,
    },
    inputLine: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        padding: 10,
        fontSize: 15,
        marginTop: 10,
        flex: 1,
    },
    emailParent: {
        top: 254,
        gap: 20,
        maxWidth: width - 42,
        width: width - 42,
        flex: 1,
    },
    jPossuiUma: {
        color: "#181725",
    },
    login: {
        color: "#53b175",
    },
    jPossuiUmaContainer: {
        top: 807,
        left: 93,
        fontSize: 13,
        letterSpacing: 0.7,
        lineHeight: 14,
        width: 217,
        height: 13,
        textAlign: "left",
        fontFamily: "Jost-Regular",
        position: "absolute",
    },
    criarContaChild: {
        top: 727,
        borderRadius: 18,
        backgroundColor: "#53b175",
        height: 64,
        left: 28,
        width: width - 56,
        position: "absolute",
    },
    criarConta2: {
        fontSize: 21,
        color: "#fff",
        textAlign: "left",
        fontFamily: "Jost-Regular",
        left: 0,
        top: 0,
    },
    frase1: {
        top: 744,
        left: 148,
    },
    criarContaItem: {
        top: 712,
        width: width,
        height: 140,
        left: 0,
        position: "absolute",
    },
    agroConnectVerdePng2: {
        top: 72,
        left: (width - 135) / 2,
        width: 135,
        height: 73,
        position: "absolute",
    },
    criarConta: {
        borderRadius: 24,
        backgroundColor: "#fcfcfc",
        width: "100%",
        height: height,
        overflow: "hidden",
        flex: 1,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vectorIcon: {
        marginLeft: 10,
        width: 24,
        height: 24,
    },
});

export default CriarConta;
