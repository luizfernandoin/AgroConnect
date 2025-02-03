import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { filterProducts } from '../services/productService';
import { styles } from '../styles/ResultadoPesquisaStyles';

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

  const handleSearch = async () => {
    try {
      const filters = {
        name: searchQuery,
        category: selectedCategory.length > 0 ? selectedCategory.join(',') : null,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null
      };

      const response = await filterProducts(filters);

      if (response.error) {
        console.error(response.error);
        return;
      }

      setFilteredProducts(response);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };


  useEffect(() => {
    handleSearch();
  }, [searchQuery, minPrice, maxPrice, selectedCategory]);

  const renderProductCard = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProdutoDetalhado', { product: item })}>
      <View style={styles.cardContainer}>
        <Image style={styles.cardImage} source={{ uri: item.image }} resizeMode="cover" />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardPrice}>R$ {item.price || 'Indisponível'}</Text>
          <Text style={styles.cardUser}>Produtor: {item.producer ? item.producer.name : 'Desconhecido'}</Text>
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
                  label="Grãos e cereais"
                  isChecked={selectedCategory.includes('Grãos e cereais')}
                  onChange={() => handleCheckboxChange('Grãos e cereais', !selectedCategory.includes('Grãos e cereais'))}
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


export default ResultadoPesquisa;
