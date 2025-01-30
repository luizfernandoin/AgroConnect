import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/Ionicons'; 
import * as ImagePicker from 'expo-image-picker';
import { styles } from "../styles/CreateProductStyles";
import { createProduct } from "../services/productService";


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

    const validarCampos = () => {

    };

    const adicionarProduto = async () => {
        const produtoData = new FormData();
        produtoData.append('name', nome);
        produtoData.append('description', descricao);
        produtoData.append('price', preco);
        produtoData.append('quantity', quantidade);
        produtoData.append('unitMeasure', unidade);
        produtoData.append('status', true);

        if (imagem) {
            const imageType = imagem.endsWith('.png') ? 'image/png' : 'image/jpeg'; 
            produtoData.append('image', {
                uri: imagem,
                name: 'photo.jpg',
                type: imageType,
            });
        }

        const result = await createProduct(produtoData);

        if (result.success) {
            Alert.alert("Sucesso", "Produto criado com sucesso!");
            navigation.navigate("Home");
        } else {
            Alert.alert("Erro", result.error || "Erro ao criar produto.");
        }
    };

    const selecionarImagem = async () => {
        console.log("Botão pressionado");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


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
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Adicionar Produto</Text>
                <View style={styles.placeholder} />
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


export default AdicionarProduto;
