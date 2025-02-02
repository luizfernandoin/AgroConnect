import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomCheckbox = ({ label, isChecked, onChange }) => (
  <View style={styles.checkboxItem}>
    <TouchableOpacity
      style={[styles.checkbox, isChecked && styles.checkboxChecked]}
      onPress={onChange}
    >
      {isChecked && (
        <Text style={styles.checkmark}>✓</Text>
      )}
    </TouchableOpacity>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const ResultadoPesquisa = ({ route, navigation }) => {
  const { query } = route.params;
  const [searchQuery, setSearchQuery] = useState(query);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Dados simulados dos produtos
  const allProducts = [
    { id: '1', image: require('../assets/produto.jpg'), title: 'Café', price: 'R$ 17,89', description: 'Café 100% arábica, torrado e moído, ideal para um café fresco e encorpado.', producer: 'Produtor A', category: 'Bebidas', nota: 4.6 },
    { id: '2', image: require('../assets/produto.jpg'), title: 'Feijão', price: 'R$ 12,50', description: 'Feijão carioca selecionado, rico em proteínas e perfeito para refeições saudáveis.', producer: 'Produtor B', category: 'Grãos', nota: 3.9 },
    { id: '3', image: require('../assets/produto.jpg'), title: 'Arroz', price: 'R$ 4,99', description: 'Arroz branco tipo 1, grãos inteiros e soltinhos para suas receitas.', producer: 'Produtor C', category: 'Grãos', nota: 4.2 },
    { id: '4', image: require('../assets/produto.jpg'), title: 'Milho', price: 'R$ 3,50', description: 'Milho seco para pipoca ou uso em receitas diversas.', producer: 'Produtor J', category: 'Grãos', nota: 4.3 },
    { id: '5', image: require('../assets/produto.jpg'), title: 'Jaca', price: 'R$ 13,50', description: 'Jaca madura e fresca, com sabor doce e polpa suculenta.', producer: 'Produtor D', category: 'Frutas', nota: 4.5 },
    { id: '6', image: require('../assets/produto.jpg'), title: 'Manga', price: 'R$ 6,00', description: 'Manga doce e aromática, rica em vitamina C e fibras.', producer: 'Produtor E', category: 'Frutas', nota: 4.7 },
    { id: '7', image: require('../assets/produto.jpg'), title: 'Goiaba', price: 'R$ 5,00', description: 'Goiaba fresca e nutritiva, ótima para consumo in natura ou em doces.', producer: 'Produtor F', category: 'Frutas', nota: 4.6 },
    { id: '8', image: require('../assets/produto.jpg'), title: 'Banana', price: 'R$ 4,00', description: 'Banana prata, rica em potássio e ideal para um lanche saudável.', producer: 'Produtor K', category: 'Frutas', nota: 4.8 },
    { id: '9', image: require('../assets/produto.jpg'), title: 'Cebola', price: 'R$ 5,50', description: 'Cebolas frescas, ideais para temperar e realçar o sabor das refeições.', producer: 'Produtor G', category: 'Vegetais', nota: 4.3 },
    { id: '10', image: require('../assets/produto.jpg'), title: 'Batata', price: 'R$ 6,00', description: 'Batatas selecionadas, versáteis e perfeitas para diversas receitas.', producer: 'Produtor H', category: 'Vegetais', nota: 4.4 },
    { id: '11', image: require('../assets/produto.jpg'), title: 'Cenoura', price: 'R$ 4,20', description: 'Cenouras frescas e crocantes, ricas em vitaminas e antioxidantes.', producer: 'Produtor I', category: 'Vegetais', nota: 4.5 },
    { id: '12', image: require('../assets/produto.jpg'), title: 'Alface', price: 'R$ 2,50', description: 'Alface fresca e crocante, ideal para saladas e sanduíches.', producer: 'Produtor L', category: 'Vegetais', nota: 4.1 },
  ];

  const handleSearch = () => {
    // Lógica para filtrar os produtos com base nos filtros e na consulta de pesquisa
    const filtered = allProducts.filter(item => {
      let isValid = true;

      // Verifica se a consulta de pesquisa corresponde ao título do produto
      if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        isValid = false;
      }

      // preço
      if (minPrice && parseFloat(item.price.replace('R$', '').replace(',', '.')) < parseFloat(minPrice)) {
        isValid = false;
      }
      if (maxPrice && parseFloat(item.price.replace('R$', '').replace(',', '.')) > parseFloat(maxPrice)) {
        isValid = false;
      }

      // categoria
      if (selectedCategory.length > 0 && !selectedCategory.includes(item.category)) {
        isValid = false;
      }

      return isValid;
    });

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, minPrice, maxPrice, selectedCategory]);

  const renderProductCard = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProdutoDetalhado', { product: item })}>
      <View style={styles.cardContainer}>
        <Image style={styles.cardImage} source={item.image} resizeMode="cover" />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardPrice}>{item.price}</Text>
          <Text style={styles.cardUser}>Produtor: {item.producer}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleCheckboxChange = (category, isChecked) => {
    if (isChecked) {
      setSelectedCategory(prev => [...prev, category]);
    } else {
      setSelectedCategory(prev => prev.filter(item => item !== category));
    }
  };

  return (
    <View style={styles.container}>
      {/* Modal do filtro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Ionicons name="close" size={30} color="#181725" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filtrar por:</Text>

            <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.scrollViewContent}>
              {/* Filtros de preço */}
              <Text style={styles.filterSectionTitle}>Preço</Text>
              <View style={styles.priceFilter}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Preço Mínimo"
                  placeholderTextColor="#7c7c7c"
                  keyboardType="numeric"
                  value={minPrice}
                  onChangeText={setMinPrice}
                />
                <TextInput
                  style={styles.priceInput}
                  placeholder="Preço Máximo"
                  placeholderTextColor="#7c7c7c"
                  keyboardType="numeric"
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                />
              </View>

              {/* Filtro de categoria */}
              <Text style={styles.filterSectionTitle}>Categoria</Text>
              <View style={styles.checkboxContainer}>
                <CustomCheckbox
                  label="Bebidas"
                  isChecked={selectedCategory.includes('Bebidas')}
                  onChange={() => handleCheckboxChange('Bebidas', !selectedCategory.includes('Bebidas'))}
                />
                <CustomCheckbox
                  label="Grãos"
                  isChecked={selectedCategory.includes('Grãos')}
                  onChange={() => handleCheckboxChange('Grãos', !selectedCategory.includes('Grãos'))}
                />
                <CustomCheckbox
                  label="Frutas"
                  isChecked={selectedCategory.includes('Frutas')}
                  onChange={() => handleCheckboxChange('Frutas', !selectedCategory.includes('Frutas'))}
                />
                                <CustomCheckbox
                  label="Vegetais"
                  isChecked={selectedCategory.includes('Vegetais')}
                  onChange={() => handleCheckboxChange('Vegetais', !selectedCategory.includes('Vegetais'))}
                />
                <CustomCheckbox
                  label="Laticínios"
                  isChecked={selectedCategory.includes('Laticínios')}
                  onChange={() => handleCheckboxChange('Laticínios', !selectedCategory.includes('Laticínios'))}
                />
              </View>
            </ScrollView>

            {/* Botão aplicar filtro */}
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                setIsModalVisible(false);
                handleSearch();
              }}
            >
              <Text style={styles.applyButtonText}>Aplicar Filtro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchBox}
          placeholder="Pesquisar..."
          placeholderTextColor="#7c7c7c"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Ionicons name="filter" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Lista dos produtos filtrados */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProductCard}
        contentContainerStyle={styles.cardList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 28,
    backgroundColor: "#d9d9d9",
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    color: "#181725",
    fontFamily: "Jost-Regular",
  },
  cardList: {
    paddingBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 7,
    marginBottom: 15,
    padding: 10,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Jost-Medium",
    color: "#181725",
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 16,
    fontFamily: "Jost-Medium",
    color: "#28a745",
    marginVertical: 5,
  },
  cardUser: {
    fontSize: 14,
    fontFamily: "Jost-Regular",
    color: "#7c7c7c",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '90%',
    backgroundColor: '#f2f3f2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'flex-start',
    paddingBottom: 30,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Jost-Medium",
    marginBottom: 15,
    textAlign: 'center',
    alignSelf: 'center',
  },
  filterSectionTitle: {
    color: '#181725',
    textAlign: 'left',
    fontFamily: 'Jost-SemiBold',
    fontSize: 23,
    marginVertical: 10,
  },
  checkboxContainer: {
    width: '100%',
    marginVertical: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: 'Jost-Medium'
  },
  checkbox: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: '#b1b1b1',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.30)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    borderWidth: 0,
    backgroundColor: '#53b175',
  },
  checkmark: {
    fontSize: 18,
    color: 'white',
  },
  priceFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  priceInput: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    borderRadius: 28,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    marginHorizontal: 5,
    color: '#181725',
  },
  locationInput: {
    width: '100%',
    backgroundColor: '#d9d9d9',
    borderRadius: 28,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    marginVertical: 10,
    color: '#181725',
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 70,
  },
  applyButton: {
    width: '99%', 
    backgroundColor: '#53B175',
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },  
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Jost-Regular',
  },
});

export default ResultadoPesquisa;
