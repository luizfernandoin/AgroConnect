import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { getProductsByUser } from '../services/productService';
import styles from '../styles/MyProducts';


const MeusProdutos = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const userProducts = await getProductsByUser();
      setProducts(userProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigation.navigate('AdicionarProduto');
  };

  const handleEditProduct = (product) => {
    console.log(product);
    navigation.navigate('AdicionarProduto', { product });
  };

  const renderProductItem = ({ item }) => (
    console.log(item.title, item.price),
    <TouchableOpacity style={styles.cardContainer} onPress={() => handleEditProduct(item)}>
      <Image style={styles.cardImage} source={{ uri: item.image }} />
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardPrice}>{`RS ${item.price.toFixed(2)}`}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#53b175" style={styles.loading} />;
  }

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

      {products.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhum produto encontrado.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={renderProductItem}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
};


export default MeusProdutos;
