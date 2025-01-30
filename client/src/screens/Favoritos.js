import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import BottomBar from '../components/bottomBar';

const Favoritos = ({ navigation }) => {
  const [favoriteItems, setFavoriteItems] = useState([
    {
      id: '1',
      name: 'Produto 1',
      price: 20.00,
      image: require('../assets/produto.jpg'),
    },
    {
      id: '2',
      name: 'Produto 2',
      price: 30.00,
      image: require('../assets/produto.jpg'),
    },
    {
      id: '3',
      name: 'Produto 3',
      price: 50.00,
      image: require('../assets/produto.jpg'),
    },
    {
      id: '4',
      name: 'Produto 1',
      price: 20.00,
      image: require('../assets/produto.jpg'),
    },
    {
      id: '5',
      name: 'Produto 2',
      price: 30.00,
      image: require('../assets/produto.jpg'),
    },
    {
      id: '6',
      name: 'Produto 3',
      price: 50.00,
      image: require('../assets/produto.jpg'),
    },
  ]);

  // const handleNavigateToDetails = (id) => {
  //   navigation.navigate('ProdutoDetalhado', { id });
  // };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image style={styles.itemImage} source={item.image} />
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.navigateButton}
          onPress={() => handleNavigateToDetails(item.id)}
        >
          <FontAwesome5 name="chevron-right" size={20} color="#b3b3b3" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favoritos</Text>
        <View style={styles.placeholder} />
      </View>

      {favoriteItems.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhum produto favoritado.</Text>
      ) : (
        <FlatList
          data={favoriteItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    paddingBottom: 60,
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
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  itemName: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Jost-Medium',
    maxWidth: '60%',
  },
  itemPrice: {
    fontSize: 18,
    fontFamily: 'Jost-Medium',
    color: '#000000',
    marginRight: '15%',
  },
  navigateButton: {
    position: 'absolute',
    top: 2,
    right: 10,
  },
  backIcon: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 10,
  },
});

export default Favoritos;
