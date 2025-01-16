import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const PRODUCTS = [
  { id: '1', image: require('../assets/produto.jpg'), title: 'Café', price: 'R$ 17,89' },
  { id: '2', image: require('../assets/produto.jpg'), title: 'Feijão', price: 'R$ 12,50' },
  { id: '3', image: require('../assets/produto.jpg'), title: 'Arroz', price: 'R$ 4,99' },
  { id: '4', image: require('../assets/produto.jpg'), title: 'Aveia', price: 'R$ 4,99' },
  { id: '5', image: require('../assets/produto.jpg'), title: 'Manga', price: 'R$ 6,00' },
  { id: '6', image: require('../assets/produto.jpg'), title: 'Jaca', price: 'R$ 6,00' },
];

const MeusProdutos = () => {
  const navigation = useNavigation();

  const handleAddProduct = () => {
    navigation.navigate('AdicionarProduto');
  };

  const handleEditProduct = (product) => {
    navigation.navigate('AdicionarProduto', { product });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer} onPress={() => handleEditProduct(item)}>
      <Image style={styles.cardImage} source={item.image} />
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
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
        <Text style={styles.headerTitle}>Meus Produtos</Text>
        <View style={styles.placeholder} />
      </View>
      
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonText}>Cadastrar Produto</Text>
      </TouchableOpacity>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
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
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    elevation: 3,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Jost-SemiBold',
    color: '#333',
  },
  placeholder: {
    width: 24,
  },
  addButton: {
    backgroundColor: '#53b175',
    padding: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Jost-Medium'
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 5,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: width / 2.5,
  },
  textContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Jost-SemiBold',
    color: '#333',
  },
  cardPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    fontFamily: 'Jost-Regular'
  },
});

export default MeusProdutos;
