import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { API_BASE_URL } from '@env';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { updateUser } from "../services/userService";
import styles from "../styles/EditProfileStyles";


const EditProfile = ({ route, navigation }) => {
    const { usuario } = route.params;

    const [email, setEmail] = useState(usuario.email || '');
    const [nome, setNome] = useState(usuario.name || '');
    const [telefone, setTelefone] = useState(usuario.phone || '');
    const [senha, setSenha] = useState('');
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

    const updateConta = async () => {
        console.log("Atualizando conta...");

        if (validarCampos()) {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('name', nome);
            formData.append('phone', telefone);
            formData.append('password', senha);

            if (image) {
                const imageType = image.endsWith('.png') ? 'image/png' : 'image/jpeg';
                formData.append('image', {
                    uri: image,
                    name: 'photo.jpg',
                    type: imageType,
                });
                console.log("FormData após adicionar a imagem:", formData);
            }

            console.log("Form data:", formData);

            try {
                const userUpdated = await updateUser(formData);

                if (userUpdated) {
                    Alert.alert("Atualizado", "Perfil atualizado com sucesso!");
                    navigation.goBack();
                } else {
                    Alert.alert("Erro", "Não foi possível atualizar o perfil.");
                }
            } catch (error) {
                console.error("Erro ao atualizar perfil:", error);
                Alert.alert("Erro", "Ocorreu um erro ao atualizar o perfil.");
            }
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Editar Perfil</Text>
                <View style={styles.placeholder} />
            </View>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.profileDetails}>
                    <Image style={styles.imagem} resizeMode="center" source={{ uri: image }} />
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
                        <Text style={styles.texto}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCancel} onPress={() => navigation.goBack()}>
                        <Text style={styles.texto}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};


export default EditProfile;