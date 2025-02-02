import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TextInput, Animated, FlatList, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomBar from '../components/bottomBar';
import { getAllProducts } from '../services/productService';
import { styles } from '../styles/HomeStyles';
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const IMAGES = [
  require('../assets/animaisBanner.jpg'),
  require('../assets/bannerFrutas.jpg'),
  require('../assets/leguminosasBanner.jpg'),
];

const Home = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigation.navigate('ResultadoPesquisa', { query: searchQuery });
    }
  };

  const renderProductCard = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProdutoDetalhado', { product: item })}>
      <View style={styles.cardContainer}>
        <Image style={styles.cardImage} resizeMode="cover" source={{ uri: item.image }} />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardPrice}>R${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const formatCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  const getUniqueCategories = (products) => {
    if (!Array.isArray(products)) return [];
    const categoriesSet = new Set();
    products.forEach(product => {
      if (Array.isArray(product.categories)) {
        product.categories.forEach(category => {
          categoriesSet.add(category);
        });
      }
    });
    return Array.from(categoriesSet);
  };

  const filterByCategory = (category) => {
    return products.filter(product => product.categories && product.categories.includes(category));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#53B175" />
      </View>
    );
  }

  const uniqueCategories = getUniqueCategories(products);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={require('../assets/Agro Connect Verde PNG 1.png')} style={styles.logo} />
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBox}
            placeholder="Pesquisar..."
            placeholderTextColor="#7c7c7c"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Ionicons name="search" size={24} color="#7c7c7c" />
          </TouchableOpacity>
        </View>
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={IMAGES}
            horizontal
            pagingEnabled
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.carouselItem}>
                <Image source={item} style={styles.carouselImage} />
              </View>
            )}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            style={styles.carousel}
            contentContainerStyle={{ width: width * IMAGES.length }}
          />
        </View>

        {products.length === 0 ? (
          <View style={styles.emptyMessageContainer}>
            <Text style={styles.emptyMessageText}>Nenhum produto disponível.</Text>
          </View>
        ) : (
          uniqueCategories.map(category => (
            <View key={category}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{formatCategory(category)}</Text>
                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() => navigation.navigate('TelaProdutos', { category, products: filterByCategory(category) })}
                >
                  <Text style={styles.moreButtonText}>Ver Mais</Text>
                  <Ionicons name="chevron-forward" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                data={filterByCategory(category)}
                keyExtractor={(item) => item.id}
                renderItem={renderProductCard}
                contentContainerStyle={styles.cardList}
              />
            </View>
          ))
        )}
      </ScrollView>
      <BottomBar style={styles.bottomBar} />
    </View>
  );
};

export default Home;
