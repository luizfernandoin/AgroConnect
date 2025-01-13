import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Dimensions, Image, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

const AdicionarProduto = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [unidade, setUnidade] = useState('');
    const [categoria, setCategoria] = useState('');
    const [ceps, setCeps] = useState(['']);
    const [imagem, setImagem] = useState(null);

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
        }
    };

    useEffect(() => {
        requestPermission();
    }, []);

    const adicionarCep = () => {
        setCeps([...ceps, '']);
    };

    const handleCepChange = (text, index) => {
        const newCeps = [...ceps];
        newCeps[index] = text;
        setCeps(newCeps);
    };

    const adicionarProduto = () => {
        console.log({ nome, descricao, preco, quantidade, unidade, categoria, ceps, imagem });
    };

    const selecionarImagem = async () => {
        console.log("Botão pressionado");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("Resultado da seleção de imagem:", result);

        if (!result.canceled) {
            setImagem(result.assets[0].uri);
            console.log("Imagem selecionada:", result.assets[0].uri);
        } else {
            console.log("Seleção de imagem cancelada");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Adicionar Produto</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Nome do Produto</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Digite o nome do produto"
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Descrição</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Descreva o produto"
                        value={descricao}
                        onChangeText={setDescricao}
                        multiline
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Preço</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Digite o preço"
                        keyboardType="numeric"
                        value={preco}
                        onChangeText={setPreco}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Quantidade Disponível</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Digite a quantidade"
                        keyboardType="numeric"
                        value={quantidade}
                        onChangeText={setQuantidade}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Unidade de Medida</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={unidade}
                            onValueChange={(itemValue) => setUnidade(itemValue)}>
                            <Picker.Item label="Selecione a unidade" value="" />
                            <Picker.Item label="Kg" value="kg" />
                            <Picker.Item label="Litros" value="litros" />
                            <Picker.Item label="Unidades" value="unidades" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Categoria</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={categoria}
                            onValueChange={(itemValue) => setCategoria(itemValue)}>
                            <Picker.Item label="Selecione a categoria" value="" />
                            <Picker.Item label="Frutas" value="frutas" />
                            <Picker.Item label="Verduras" value="verduras" />
                            <Picker.Item label="Legumes" value="legumes" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Imagem do produto</Text>
                    <TouchableOpacity style={styles.imageButton} onPress={selecionarImagem}>
                        <Text style={styles.imageButtonText}>Adicionar Imagem do Produto</Text>
                    </TouchableOpacity>
                    {imagem && (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: imagem }} style={styles.imagePreview} />
                        </View>
                    )}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>CEP(s) Disponível(is)</Text>
                    {ceps.map((cep, index) => (
                        <TextInput
                            key={index}
                            style={styles.inputField}
                            placeholder={`Adicione o CEP ${index + 1}`}
                            value={cep}
                            onChangeText={(text) => handleCepChange(text, index)}
                        />
                    ))}
                    <TouchableOpacity style={styles.addCepButton} onPress={adicionarCep}>
                        <Text style={styles.addCepButtonText}>Adicionar outro CEP</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={adicionarProduto}>
                    <Text style={styles.submitButtonText}>Adicionar Produto</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fcfcfc",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: 'Jost-Medium',
        color: '#181725',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 15,
        color: "#7c7c7c",
        marginBottom: 8,
        fontFamily: "Jost-Medium",
    },
    inputField: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 8,
        fontSize: 15,
        fontFamily: "Jost-Regular",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        overflow: "hidden",
    },
    imageButton: {
        backgroundColor: "#ccc",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    imageButtonText: {
        color: "#000",
        fontSize: 15,
        fontFamily: "Jost-Regular",
    },
    imageContainer: {
        marginTop: 10,
        alignItems: "center",
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: "cover",
    },
    addCepButton: {
        backgroundColor: "#ccc",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    addCepButtonText: {
        color: "#181725",
        fontSize: 15,
        fontFamily: "Jost-Regular",
    },
    submitButton: {
        backgroundColor: "#53b175",
        paddingVertical: 15,
        borderRadius: 18,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "Jost-Regular",
    },
});

export default AdicionarProduto;
