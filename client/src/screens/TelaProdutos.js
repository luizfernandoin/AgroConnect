import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomBar from '../components/bottomBar';
import { styles } from '../styles/TelaProdutosStyles';


const TelaProdutos = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category, products } = route.params;

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProdutoDetalhado', { product: item })}>
      <View style={styles.cardContainer}>
        <Image style={styles.cardImage} source={{ uri: item.image }} />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardPrice}>R${item.price.toFixed(2)}</Text>
        </View>
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


export default TelaProdutos;
