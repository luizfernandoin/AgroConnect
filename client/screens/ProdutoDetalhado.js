import React, { useState } from 'react';
import { Text, StyleSheet, Image, View, TextInput, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { height } = Dimensions.get('window');

const ProdutoDetalhado = ({ navigation }) => {
  const route = useRoute();
  const { product } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [proposeValue, setProposeValue] = useState(parseFloat(product.price.replace('R$', '').replace(',', '.')));
  const initialPrice = parseFloat(product.price.replace('R$', '').replace(',', '.'));

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  const handleProposeIncrement = () => {
    setProposeValue(prevValue => prevValue + 1);
  };

  const handleProposeDecrement = () => {
    setProposeValue(prevValue => Math.max(prevValue - 1, 1));
  };

  const formatValue = (value) => {
    const [integer, decimal] = value.toFixed(2).split('.');
    return `${integer},${decimal}`;
  };

  const handleProposeChange = (text) => {
    let formattedText = text.replace(',', '.').replace(/[^0-9.]/g, '');
    if (formattedText === '') {
      formattedText = '0.00';
    }
    const num = parseFloat(formattedText);
    if (!isNaN(num)) {
      setProposeValue(num);
    }
  };

  const handleQuantityChange = (text) => {
    const num = parseInt(text, 10);
    if (!isNaN(num) && num > 0) {
      setQuantity(num);
    }
  };

  const calculateTotalProposal = () => {
    return proposeValue + initialPrice * (quantity - 1);
  };

  const handleAddToCart = () => {
    const addedProduct = {
      id: product.id,
      name: product.title,
      price: initialPrice,
      proposeValue: calculateTotalProposal(),
      quantity: quantity,
      image: product.image,
      producer: product.producer,
      category: product.category,
    };
    navigation.navigate('Carrinho', { addedProduct });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={product.image} style={styles.productImage} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5 name="angle-left" size={30} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <TouchableOpacity onPress={handleFavoriteToggle} style={styles.heartButton}>
              <FontAwesome5 name="heart" size={25} color={isFavorite ? "#ff0000" : "#c4c4c4"} />
            </TouchableOpacity>
          </View>
          <View style={styles.quantityContainer}>
            <View style={styles.quantitySelector}>
              <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
                <FontAwesome5 name="minus" size={20} color="#b3b3b3" />
              </TouchableOpacity>
              <TextInput style={styles.quantityInput} keyboardType="numeric" value={String(quantity)} onChangeText={handleQuantityChange} />
              <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
                <FontAwesome5 name="plus" size={20} color="#52B175" />
              </TouchableOpacity>
            </View>
            <Text style={styles.productPrice}>{`R$ ${formatValue(initialPrice * quantity)}`}</Text>
          </View>
          <Text style={styles.h2}>Fazer proposta:</Text>
          <View style={styles.proposeContainer}>
            <TouchableOpacity onPress={handleProposeDecrement} style={styles.quantityButton}>
              <FontAwesome5 name="minus" size={20} color="#b3b3b3" />
            </TouchableOpacity>
            <View style={styles.proposeInputContainer}>
              <Text style={styles.proposeInputPrefix}>R$</Text>
              <TextInput style={styles.proposeInput} keyboardType="decimal-pad" value={formatValue(calculateTotalProposal())} onChangeText={handleProposeChange} />
            </View>
            <TouchableOpacity onPress={handleProposeIncrement} style={styles.quantityButton}>
              <FontAwesome5 name="plus" size={20} color="#52B175" />
            </TouchableOpacity>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.detailTitle}>Detalhes do Produto</Text>
            <Text style={styles.detailText}>{product.description}</Text>
          </View>
          <View style={styles.detailReview}>
            <Text style={styles.detailTitle}>Avaliações</Text>
            <View style={styles.starsContainer}>
              <Text style={styles.avaliacao}>{product.nota}</Text>
              {[...Array(5)].map((_, index) => (
                <MaterialIcons key={index} name={index < product.nota ? 'star' : 'star-border'} size={15} color={index < product.nota ? '#FFD700' : '#ccc'} />
              ))}
            </View>
            <View style={styles.reviewContainer}>
              {product.reviews && product.reviews.map(review => (
                <View key={review.id} style={styles.review}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewUser}>{review.user}</Text>
                    <View style={styles.reviewRating}>
                      {[...Array(5)].map((_, index) => (
                        <MaterialIcons key={index} name={index < review.rating ? 'star' : 'star-border'} size={15} color={index < review.rating ? '#FFD700' : '#ccc'} />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 5
  },
  avaliacao: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: 'bold'
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  productImage: {
    width: '100%',
    height: height * 0.42,
    resizeMode: 'cover',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Jost-Medium',
    color: '#181725',
    marginVertical: 10,
    flex: 1,
  },
  heartButton: {
    marginLeft: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 25,
    color: '#181725',
    fontFamily: 'Jost-Regular',
  },
  detailSection: {
    marginVertical: 20,
  },
  detailReview: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  detailTitle: {
    fontSize: 18,
    fontFamily: 'Jost-Medium',
    color: '#181725',
    marginBottom: 10,
    flexShrink: 1
  },
  detailText: {
    fontSize: 16,
    fontFamily: 'Jost-Regular',
    color: '#7c7c7c',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    borderRadius: 5,
    padding: 10,
  },
  quantityInput: {
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 10,
    borderColor: '#e2e2e2',
    borderWidth: 1,
    borderRadius: 16,
  },
  proposeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
  },
  proposeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e2e2e2',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  proposeInputPrefix: {
    fontSize: 20,
    marginRight: 5,
    fontFamily: 'Jost-Regular',
    color: '#181725',
  },
  proposeInput: {
    width: 100,
    height: 50,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Jost-Regular',
  },
  buttonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#e2e2e2',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addButton: {
    backgroundColor: '#53b175',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Jost-Regular',
  },
  h2: {
    marginTop: 15,
    fontSize: 15,
    lineHeight: 17,
    fontFamily: "Jost-Regular",
    color: "#7c7c7c",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    width: 103,
    height: 14,
  },
  reviewContainer: {
    marginTop: 15,
  },
  review: {
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewUser: {
    fontSize: 16,
    fontFamily: 'Jost-Bold',
    color: '#181725',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: 'Jost-Regular',
    color: '#7c7c7c',
  },
});

export default ProdutoDetalhado;
