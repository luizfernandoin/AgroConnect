import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { API_BASE_URL } from '@env';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = ({ route, navigation }) => {
    const { usuario } = route.params;

    const [email, setEmail] = useState(usuario.email || '');
    const [nome, setNome] = useState(usuario.nome || '');
    const [telefone, setTelefone] = useState(usuario.telefone || '');
    const [senha, setSenha] = useState(usuario.password || '');
    const [image, setImage] = useState(usuario.image || null);

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
        }
    };

    useEffect(() => {
        requestPermission();
    }, []);

    //Chamar no botao de imagem
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const validarCampos = () => {
        if (!email || !nome || !telefone || !senha) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return false;
        }
        return true;
    };

    const updateConta = () =>{
        if(validarCampos()){
            const updatedAccount = {
                id: usuario.id,
                email,
                nome, 
                telefone, 
                senha, 
                image
            }
            Alert.alert("Atualizado", "Dados da conta atualizados");
            console.log(updatedAccount);
            navigation.goBack("Profile");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Editar Perfil</Text>
            <View style={styles.profileDetails}>
                <Image style={styles.imagem} resizeMode="center" source={image} />
                <TouchableOpacity style={styles.imageBt} onPress={pickImage}>
                    <Text style={styles.btTexto}>Alterar imagem</Text>
                    <AntDesign name="picture" color="#595959" size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.groupInput}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.item}>
                        <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} placeholderTextColor={styles.placeholder}></TextInput>
                    </View>
                </View>
                <View style={styles.groupInput}>
                    <Text style={styles.label}>Nome</Text>
                    <View style={styles.item}>
                        <TextInput value={nome} onChangeText={setNome} placeholder="Nome" style={styles.input} placeholderTextColor={styles.placeholder}></TextInput>
                    </View>
                </View>
                <View style={styles.groupInput}>
                    <Text style={styles.label}>Telefone</Text>
                    <View style={styles.item}>
                        <TextInput value={telefone} onChangeText={setTelefone} placeholder="Telefone" style={styles.input} placeholderTextColor={styles.placeholder}></TextInput>
                    </View>
                </View>
                <View style={styles.groupInput}>
                    <Text style={styles.label}>Senha</Text>
                    <View style={styles.item}>
                        <TextInput value={senha} onChangeText={setSenha} secureTextEntry={true} placeholder="Senha" style={styles.input} placeholderTextColor={styles.placeholder}></TextInput>
                    </View>
                </View>
            </View>
            <View style={styles.group}>
                <TouchableOpacity style={styles.buttonSave} onPress={updateConta}>
                    {/* Configurar para ao clicar em salvar fazer o update de usuario */}
                    {/* Mandar o usuário atualizado */}
                    <Text style={styles.texto}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCancel} onPress={() => navigation.goBack()}>
                    <Text style={styles.texto}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Jost-Bold",
        padding: 30,
    },
    profileDetails: {
        justifyContent: "center",
        alignItems: "center",
    },
    imageBt: {
        backgroundColor: "#d9d9d9",
        padding: 10,
        borderRadius: 4,
        margin: 10,
        borderColor: "#595959",
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        width: "40%"
    },
    btTexto: {
        marginRight: 5,
        fontFamily: "Jost-Regular"
    },
    content: {
        alignItems: "center"
    },
    group: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        marginTop: 50
    },
    buttonSave: {
        backgroundColor: "#53B175",
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 15,
        marginHorizontal: 10,
        width: 150,
    },
    buttonCancel: {
        backgroundColor: "#F3603F",
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 15,
        marginHorizontal: 10,
        width: 150
    },
    texto: {
        color: "white",
        textAlign: "center",
        fontFamily: "Jost-Bold"
    },
    imagem: {
        borderWidth: 5,
        borderColor: "#1A6836",
        borderRadius: 100,
        width: 100,
        height: 100,
    },
    input: {
        flex: 1,
        fontSize: 15,
        paddingLeft: 10,
        fontFamily: "Jost-Regular"
    },
    placeholder: {
        color: "#808080",
        fontFamily: "Jost-Regular"
    },
    groupInput: {
        marginTop: 28,
        textAlign: "left"
    },
    label: {
        fontSize: 15,
        color: "#7c7c7c",
        fontFamily: "Jost-Regular"
    },
    item: {
        width: "80%",
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E2E2",
    }
});

export default EditProfile;