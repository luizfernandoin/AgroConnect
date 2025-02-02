import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomBar from '../components/bottomBar';

const { width } = Dimensions.get('window');
const PRODUCTS = { // Apagar array futuramente
  grains: [
    { id: '1', image: require('../assets/produto.jpg'), title: 'Café', price: 'R$ 17,89', description: 'Café 100% arábica, torrado e moído, ideal para um café fresco e encorpado.', producer: 'Produtor A', nota: 4.6 },
    { id: '2', image: require('../assets/produto.jpg'), title: 'Feijão', price: 'R$ 12,50', description: 'Feijão carioca selecionado, rico em proteínas e perfeito para refeições saudáveis.', producer: 'Produtor B', nota: 3.9 },
    { id: '3', image: require('../assets/produto.jpg'), title: 'Arroz', price: 'R$ 4,99', description: 'Arroz branco tipo 1, grãos inteiros e soltinhos para suas receitas.', producer: 'Produtor C', nota: 4.2 },
    { id: '4', image: require('../assets/produto.jpg'), title: 'Aveia', price: 'R$ 4,99', description: 'Aveia em flocos, ideal para um café da manhã nutritivo.', producer: 'Produtor D', nota: 4.4 },
  ],
  fruits: [
    { id: '5', image: require('../assets/produto.jpg'), title: 'Jaca', price: 'R$ 13,50', description: 'Jaca madura e fresca, com sabor doce e polpa suculenta.', producer: 'Produtor E', nota: 4.5 },
    { id: '6', image: require('../assets/produto.jpg'), title: 'Manga', price: 'R$ 6,00', description: 'Manga doce e aromática, rica em vitamina C e fibras.', producer: 'Produtor F', nota: 4.7 },
    { id: '7', image: require('../assets/produto.jpg'), title: 'Goiaba', price: 'R$ 5,00', description: 'Goiaba fresca e nutritiva, ótima para consumo in natura ou em doces.', producer: 'Produtor G', nota: 4.6 },
    { id: '8', image: require('../assets/produto.jpg'), title: 'Banana', price: 'R$ 4,00', description: 'Banana prata, rica em potássio e ideal para um lanche saudável.', producer: 'Produtor H', nota: 4.8 },
  ],
  vegetables: [
    { id: '9', image: require('../assets/produto.jpg'), title: 'Cebola', price: 'R$ 5,50', description: 'Cebolas frescas, ideais para temperar e realçar o sabor das refeições.', producer: 'Produtor I', nota: 4.3 },
    { id: '10', image: require('../assets/produto.jpg'), title: 'Batata', price: 'R$ 6,00', description: 'Batatas selecionadas, versáteis e perfeitas para diversas receitas.', producer: 'Produtor J', nota: 4.4 },
    { id: '11', image: require('../assets/produto.jpg'), title: 'Cenoura', price: 'R$ 4,20', description: 'Cenouras frescas e crocantes, ricas em vitaminas e antioxidantes.', producer: 'Produtor K', nota: 4.5 },
    { id: '12', image: require('../assets/produto.jpg'), title: 'Alface', price: 'R$ 2,50', description: 'Alface fresca e crocante, ideal para saladas e sanduíches.', producer: 'Produtor L', nota: 4.1 },
  ],
};

const TelaProdutos = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Função simulada para buscar os produtos da categoria
    const fetchProducts = () => {
      // Comentar esta linha quando o backend estiver pronto
      setProducts(PRODUCTS[category]);
      
      // Descomentar e ajustar esta parte para consumir do backend quando estiver pronto
      /*
      fetch(`${API_BASE_URL}/api/auth/products?category=${category}`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Erro ao buscar os produtos:', error));
      */
    };

    fetchProducts();
  }, [category]);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProdutoDetalhado', { product: item })} style={styles.cardContainer}>
      <Image style={styles.cardImage} source={item.image} />
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
        <View style={styles.placeholder} />
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={renderProductItem}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContent}
      />
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    elevation: 3,
    width: '100%',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Jost-SemiBold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 24,
  },
  flatListContent: {
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    overflow: 'hidden',
    shadowColor: 'rgba(0, 0, 0, 0.50)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 1,
  },
  cardImage: {
    width: '100%',
    height: width / 2 - 40,
  },
  textContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  cardPrice: {
    fontSize: 14,
    fontFamily: 'Jost-Regular',
    color: '#000',
  },
});

export default TelaProdutos;
