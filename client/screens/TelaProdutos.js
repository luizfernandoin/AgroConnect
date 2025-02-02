import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomBar from '../components/bottomBar';

const { width } = Dimensions.get('window');
const PRODUCTS = { // Apagar array futuramente
  grãos: [
    { id: '1', image: require('../assets/Produtocafe.png'), title: 'Café', price: 'R$ 17,89', description: 'Café 100% arábica, torrado e moído, ideal para um café fresco e encorpado.', producer: 'Produtor A', category: "Grãos e cereais", nota: 4.5, reviews: [
      { id: '1', user: 'João', rating: 5, comment: 'Ótimo café, sabor excelente!' },
      { id: '2', user: 'Maria', rating: 4, comment: 'Muito bom, mas achei um pouco caro.' },
    ]},
    { id: '2', image: require('../assets/produto.jpg'), title: 'Feijão', price: 'R$ 12,50', description: 'Feijão carioca selecionado, rico em proteínas e perfeito para refeições saudáveis.', producer: 'Produtor B', category: "Grãos e cereais", nota: 3.5, reviews: [
      { id: '1', user: 'Carlos', rating: 4, comment: 'Feijão muito bom, bem selecionado.' },
      { id: '2', user: 'Ana', rating: 3, comment: 'Bom, mas podia ser mais barato.' },
    ]},
    { id: '3', image: require('../assets/produto.jpg'), title: 'Arroz', price: 'R$ 4,99', description: 'Arroz branco tipo 1, grãos inteiros e soltinhos para suas receitas.', producer: 'Produtor C', category: "Grãos e cereais", nota: 4.5, reviews: [
      { id: '1', user: 'Lucas', rating: 4, comment: 'Arroz de ótima qualidade.' },
      { id: '2', user: 'Fernanda', rating: 5, comment: 'Muito bom, sempre compro desse.' },
    ]},
    { id: '10', image: require('../assets/produto.jpg'), title: 'Milho', price: 'R$ 3,50', description: 'Milho seco para pipoca ou uso em receitas diversas.', producer: 'Produtor J', category: "Grãos e cereais", nota: 4.5, reviews: [
      { id: '1', user: 'Paulo', rating: 5, comment: 'Milho perfeito para pipoca!' },
      { id: '2', user: 'Juliana', rating: 4, comment: 'Bom, mas achei que alguns grãos não estouraram.' },
    ]},
  ],
  vegetais: [
    { id: '4', image: require('../assets/produto.jpg'), title: 'Jaca', price: 'R$ 13,50', description: 'Jaca madura e fresca, com sabor doce e polpa suculenta.', producer: 'Produtor D', category: "Frutas", nota: 4.5, reviews: [
      { id: '1', user: 'Joana', rating: 4, comment: 'Jaca deliciosa, bem fresca.' },
      { id: '2', user: 'Felipe', rating: 5, comment: 'Excelente qualidade, muito doce.' },
    ]},
    { id: '5', image: require('../assets/produto.jpg'), title: 'Manga', price: 'R$ 6,00', description: 'Manga doce e aromática, rica em vitamina C e fibras.', producer: 'Produtor E', category: "Frutas", nota: 4.5, reviews: [
      { id: '1', user: 'Marcela', rating: 5, comment: 'Manga deliciosa, super doce.' },
      { id: '2', user: 'Ricardo', rating: 4, comment: 'Muito boa, mas podia ser maior.' },
    ]},
    { id: '6', image: require('../assets/produto.jpg'), title: 'Goiaba', price: 'R$ 5,00', description: 'Goiaba fresca e nutritiva, ótima para consumo in natura ou em doces.', producer: 'Produtor F', category: "Frutas", nota: 4.5, reviews: [
      { id: '1', user: 'Ana Paula', rating: 5, comment: 'Goiaba perfeita, muito saborosa.' },
      { id: '2', user: 'Cláudio', rating: 4, comment: 'Boa, mas achei algumas duras.' },
    ]},
    { id: '11', image: require('../assets/produto.jpg'), title: 'Banana', price: 'R$ 4,00', description: 'Banana prata, rica em potássio e ideal para um lanche saudável.', producer: 'Produtor K', category: "Frutas", nota: 5, reviews: [
      { id: '1', user: 'Beatriz', rating: 5, comment: 'Banana maravilhosa, muito boa.' },
      { id: '2', user: 'Jorge', rating: 5, comment: 'Excelente, bem doce.' },
    ]},
  ],
  vegetais: [
    { id: '7', image: require('../assets/produto.jpg'), title: 'Cebola', price: 'R$ 5,50', description: 'Cebolas frescas, ideais para temperar e realçar o sabor das refeições.', producer: 'Produtor G', category: "Vegetais", nota: 4, reviews: [
      { id: '1', user: 'Roberta', rating: 4, comment: 'Cebolas frescas e de boa qualidade.' },
      { id: '2', user: 'Bruno', rating: 4, comment: 'Muito boas, mas algumas estavam pequenas.' },
    ]},
    { id: '8', image: require('../assets/produto.jpg'), title: 'Batata', price: 'R$ 6,00', description: 'Batatas selecionadas, versáteis e perfeitas para diversas receitas.', producer: 'Produtor H', category: "Vegetais", nota: 4.5, reviews: [
      { id: '1', user: 'Marcos', rating: 4, comment: 'Batatas boas, bem selecionadas.' },
      { id: '2', user: 'Laura', rating: 5, comment: 'Perfeitas para fritar e cozinhar.' },
    ]},
    { id: '9', image: require('../assets/produto.jpg'), title: 'Cenoura', price: 'R$ 4,20', description: 'Cenouras frescas e crocantes, ricas em vitaminas e antioxidantes.', producer: 'Produtor I', category: "Vegetais", nota: 4.5, reviews: [
      { id: '1', user: 'Gustavo', rating: 5, comment: 'Cenouras ótimas, bem frescas.' },
      { id: '2', user: 'Fernanda', rating: 4, comment: 'Boa qualidade, mas algumas estavam finas.' },
    ]},
    { id: '12', image: require('../assets/produto.jpg'), title: 'Alface', price: 'R$ 2,50', description: 'Alface fresca e crocante, ideal para saladas e sanduíches.', producer: 'Produtor L', category: "Vegetais", nota: 4, reviews: [
      { id: '1', user: 'José', rating: 4, comment: 'Alface muito boa, bem crocante.' },
      { id: '2', user: 'Luciana', rating: 4, comment: 'Gostei, mas algumas folhas estavam murchas.' },
    ]},
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
