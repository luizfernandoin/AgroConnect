import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomBar from '../components/bottomBar';
import PRODUCTS from '../static/products'; // Atualize o caminho conforme necessário

const { width } = Dimensions.get('window');

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
