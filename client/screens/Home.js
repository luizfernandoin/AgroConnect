import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TextInput, StyleSheet, Animated, Dimensions, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const IMAGES = [
  require('../assets/animaisBanner.jpg'),
  require('../assets/bannerFrutas.jpg'),
  require('../assets/leguminosasBanner.jpg'),
];

const PRODUCTS = { // Apagar array futuramente
  grains: [
    { id: '1', image: require('../assets/Produtocafe.png'), title: 'Café', price: 'R$ 17,89', description: 'Café 100% arábica, torrado e moído, ideal para um café fresco e encorpado.Café 100% arábica, torrado e moído, ideal para um café fresco e encorpado.Café 100% arábica, torrado e moído, ideal para um café fresco e encorpado.Café 100% arábica, torrado e moído, ideal para um café fresco e encorpado.' },
    { id: '2', image: require('../assets/produto.jpg'), title: 'Feijão', price: 'R$ 12,50', description: 'Feijão carioca selecionado, rico em proteínas e perfeito para refeições saudáveis.' },
    { id: '3', image: require('../assets/produto.jpg'), title: 'Arroz', price: 'R$ 4,99', description: 'Arroz branco tipo 1, grãos inteiros e soltinhos para suas receitas.' },
  ],
  fruits: [
    { id: '4', image: require('../assets/produto.jpg'), title: 'Jaca', price: 'R$ 13,50', description: 'Jaca madura e fresca, com sabor doce e polpa suculenta.' },
    { id: '5', image: require('../assets/produto.jpg'), title: 'Manga', price: 'R$ 6,00', description: 'Manga doce e aromática, rica em vitamina C e fibras.' },
    { id: '6', image: require('../assets/produto.jpg'), title: 'Goiaba', price: 'R$ 5,00', description: 'Goiaba fresca e nutritiva, ótima para consumo in natura ou em doces.' },
  ],
  vegetables: [
    { id: '7', image: require('../assets/produto.jpg'), title: 'Cebola', price: 'R$ 5,50', description: 'Cebolas frescas, ideais para temperar e realçar o sabor das refeições.' },
    { id: '8', image: require('../assets/produto.jpg'), title: 'Batata', price: 'R$ 6,00', description: 'Batatas selecionadas, versáteis e perfeitas para diversas receitas.' },
    { id: '9', image: require('../assets/produto.jpg'), title: 'Cenoura', price: 'R$ 4,20', description: 'Cenouras frescas e crocantes, ricas em vitaminas e antioxidantes.' },
  ],
};

const Home = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState(PRODUCTS);

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
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
      }
    };

    // fetchData(); // Descomentar esta linha quando o backend estiver pronto
  }, []);

  const renderProductCard = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProdutoDetalhado', { product: item })}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.cardImage}
          resizeMode="cover"
          source={item.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardPrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Agro Connect Verde PNG 1.png')} style={styles.logo} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Pesquisar..."
          placeholderTextColor="#7c7c7c"
        />
        <Ionicons name="search" size={24} color="#7c7c7c" />
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
      
      {/* Grãos e Cereais */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Grãos e Cereais</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigation.navigate('TelaProdutos', { category: 'grains' })}
        >
          <Text style={styles.moreButtonText}>Ver Mais</Text>
          <Ionicons name="chevron-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={products.grains}
        keyExtractor={(item) => item.id}
        renderItem={renderProductCard}
        contentContainerStyle={styles.cardList}
      />
      
      {/* Frutas */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Frutas</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigation.navigate('TelaProdutos', { category: 'fruits' })}
        >
          <Text style={styles.moreButtonText}>Ver Mais</Text>
          <Ionicons name="chevron-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={products.fruits} 
        keyExtractor={(item) => item.id}
        renderItem={renderProductCard}
        contentContainerStyle={styles.cardList}
      />

      {/* Vegetais */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Vegetais</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigation.navigate('TelaProdutos', { category: 'vegetables' })}
        >
          <Text style={styles.moreButtonText}>Ver Mais</Text>
          <Ionicons name="chevron-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={products.vegetables}
        keyExtractor={(item) => item.id}
        renderItem={renderProductCard}
        contentContainerStyle={styles.cardList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28,
    backgroundColor: "#d9d9d9",
    paddingHorizontal: 15,
    width: "100%",
    height: 50,
  },
  searchBox: {
    flex: 1,
    fontSize: 16,
    color: "#181725",
    fontFamily: "Jost-Regular",
  },
  carouselContainer: {
    marginTop: 20,
    width: '100%',
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flexDirection: 'row',
  },
  carouselItem: {
    width,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sectionContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 25,
    color: '#181725',
    fontFamily: "Jost-Medium",
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    padding: 6,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 5,
  },
  moreButtonText: {
    color: '#fff',
    marginRight: 5,
    fontFamily: "Jost-Regular",
  },
  cardList: {
    marginTop: 20,
    paddingHorizontal: 10,
    marginLeft: -17,
  },
  cardContainer: {
    shadowColor: "rgba(0, 0, 0, 0.50)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    width: 150,
    height: 230,
    overflow: "hidden",
    margin: 10,
  },
  cardImage: {
    width: "100%",
    height: "70%",
  },
  textContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  cardPrice: {
    fontSize: 14,
    fontFamily: "Jost-Regular",
    color: "#000",
  },
});

export default Home;
