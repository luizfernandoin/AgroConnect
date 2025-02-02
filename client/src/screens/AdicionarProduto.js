import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/Ionicons'; 
import * as ImagePicker from 'expo-image-picker';
import { styles } from "../styles/CreateProductStyles";
import { createProduct, addCategoriesToProduct, getAllCategories } from "../services/productService";
import Input from "../components/Input/index";
import Button from "../components/Button/Button";
import PickerInput from "../components/Input/PickerInput/PickerInput";

const AdicionarProduto = ({ navigation, route }) => {
    const { product } = route.params || {};
    console.log(product);

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [unidade, setUnidade] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
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

    useEffect(() => {
        if (product) {
            setNome(product.name);
            setDescricao(product.description);
            setPreco(product.price.toString());
            setQuantidade(product.quantity.toString());
            setUnidade(product.unitMeasure);
            setCategoria(product.category);
            setImagem(product.image);
        }
    }, [product]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categorias = await getAllCategories();
                setCategorias(categorias.map(categoria => ({ label: categoria, value: categoria })));
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchCategories();
    }, []);

    const validarCampos = () => {
        const camposObrigatorios = [nome, descricao, preco, quantidade, unidade, categoria];
        if (camposObrigatorios.some(campo => !campo)) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return false;
        }
        return true;
    };

    const adicionarOuEditarProduto = async () => {
        if (!validarCampos()) return;

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

        let result;
        if (product) {
            result = await editProduct(product.id, produtoData);
        } else {
            result = await createProduct(produtoData);
            if (result.success) {
                console.log(result);
                const categoryResult = await addCategoriesToProduct(result.productId, [categoria]);
                if (!categoryResult.success) {
                    Alert.alert("Erro", categoryResult.message);
                }
            }
        }
    
        if (result.success) {
            Alert.alert("Sucesso", product ? "Produto atualizado com sucesso!" : "Produto criado com sucesso!");
            navigation.navigate("Home");
        } else {
            Alert.alert("Erro", result.error || (product ? "Erro ao atualizar produto." : "Erro ao criar produto."));
        }
    };

    const selecionarImagem = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImagem(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{product ? "Editar Produto" : "Adicionar Produto"}</Text>
                <View style={styles.placeholder} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Input 
                    label="Nome do Produto" 
                    placeholder="Digite o nome do produto" 
                    value={nome} 
                    onChangeText={setNome} 
                />
                <Input 
                    label={"Descrição"} 
                    placeholder={"Descreva o produto"} 
                    value={descricao} 
                    onChangeText={setDescricao} 
                    multiline 
                />
                <Input 
                    label={"Preço"} 
                    placeholder={"Digite o preço"} 
                    value={preco} 
                    onChangeText={setPreco} 
                    keyboardType={"numeric"} 
                />
                <Input 
                    label={"Quantidade Disponível"} 
                    placeholder={"Digite a quantidade"} 
                    value={quantidade} 
                    onChangeText={setQuantidade} 
                    keyboardType={"numeric"} 
                />
                <PickerInput 
                    label="Unidade de Medida" 
                    selectedValue={unidade} 
                    onValueChange={(itemValue) => setUnidade(itemValue)} 
                    items={[
                        { label: 'Kg', value: 'kg' },
                        { label: 'Litros', value: 'litros' },
                        { label: 'Unidades', value: 'unidades' }
                    ]}
                />
                <PickerInput 
                    label="Categoria" 
                    selectedValue={categoria} 
                    onValueChange={(itemValue) => setCategoria(itemValue)} 
                    items={[
                        { label: 'Frutas', value: 'frutas' },
                        { label: 'Verduras', value: 'verduras' },
                        { label: 'Legumes', value: 'legumes' },
                        { label: 'Grãos e Cereais', value: 'grãos e cereais' },
                        { label: 'Laticínios', value: 'laticínios' },
                        { label: 'Carnes', value: 'carnes' },
                        { label: 'Pescados', value: 'pescados' },
                        { label: 'Ervas e Especiarias', value: 'ervas e especiarias' },
                        { label: 'Flores', value: 'flores' },
                        { label: 'Outros', value: 'outros' }
                    ]}
                />
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Imagem do produto</Text>
                    <Button 
                        label="Adicionar Imagem do Produto" 
                        onPress={selecionarImagem}
                        buttonStyle={styles.imageButton}
                        textStyle={styles.imageButtonText}
                    />
                    {imagem && (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: imagem }} style={styles.imagePreview} />
                        </View>
                    )}
                </View>
                <Button 
                    label={product ? "Editar Produto" : "Adicionar Produto"} 
                    onPress={adicionarOuEditarProduto} 
                    buttonStyle={styles.submitButton}
                    textStyle={styles.submitButtonText}
                />
            </ScrollView>
        </View>
    );
};

export default AdicionarProduto;
