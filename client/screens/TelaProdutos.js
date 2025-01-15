import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const PRODUCTS = { // Apagar array futuramente
  grains: [
    { id: '1', image: require('../assets/produto.jpg'), title: 'Café', price: 'R$ 17,89' },
    { id: '2', image: require('../assets/produto.jpg'), title: 'Feijão', price: 'R$ 12,50' },
    { id: '3', image: require('../assets/produto.jpg'), title: 'Arroz', price: 'R$ 4,99' },
    { id: '4', image: require('../assets/produto.jpg'), title: 'Aveia', price: 'R$ 4,99' },
  ],
  fruits: [
    { id: '4', image: require('../assets/produto.jpg'), title: 'Jaca', price: 'R$ 13,50' },
    { id: '5', image: require('../assets/produto.jpg'), title: 'Manga', price: 'R$ 6,00' },
    { id: '6', image: require('../assets/produto.jpg'), title: 'Goiaba', price: 'R$ 5,00' },
  ],
  vegetables: [
    { id: '7', image: require('../assets/produto.jpg'), title: 'Cebola', price: 'R$ 5,50' },
    { id: '8', image: require('../assets/produto.jpg'), title: 'batata', price: 'R$ 6,00' },
    { id: '9', image: require('../assets/produto.jpg'), title: 'Cenoura', price: 'R$ 4,20' },
  ],
};

const TelaProdutos = () => {
  const route = useRoute();
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
    <View style={styles.cardContainer}>
      <Image style={styles.cardImage} source={item.image} />
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{category}</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={renderProductItem}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    padding: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#181725',
    fontFamily: 'Jost-Medium',
    textAlign: 'center',
    marginBottom: 20,
  },
  flatListContent: {
    paddingBottom: 20,
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
