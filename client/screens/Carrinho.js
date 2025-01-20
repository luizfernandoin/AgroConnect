import React, { useState, useEffect } from 'react';
import { Text, Image, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

const Carrinho = ({ navigation }) => {
  const route = useRoute();
  const { addedProduct } = route.params || {};

  const [quantity, setQuantity] = useState(addedProduct ? addedProduct.quantity : 1);
  const [total, setTotal] = useState(0);
  const [productTotal, setProductTotal] = useState(addedProduct ? addedProduct.proposeValue : 0);
  const [cartItems, setCartItems] = useState(addedProduct ? [addedProduct] : []);

  useEffect(() => {
    if (addedProduct) {
      const initialTotal = addedProduct.proposeValue;
      const additionalUnits = quantity - addedProduct.quantity;
      const additionalCost = additionalUnits * addedProduct.price;
      setProductTotal(initialTotal + additionalCost);
    }
  }, [quantity, addedProduct]);

  useEffect(() => {
    if (addedProduct) {
      const totalValue = quantity * addedProduct.price;
      const currentTotal = productTotal;
      if (productTotal === totalValue) {
        setTotal(currentTotal);
      } else {
        setTotal(0);
      }
    }
  }, [productTotal, addedProduct]);

  if (!addedProduct) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carrinho vazio</Text>
        <Icon
          name="arrow-back"
          size={24}
          color="#333"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > addedProduct.quantity ? prevQuantity - 1 : addedProduct.quantity));
  };

  const handleRemove = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    alert('Item removido do carrinho!');
  };

  const calculateTotalValue = () => {
    const initialTotal = addedProduct.proposeValue;
    const additionalUnits = quantity - addedProduct.quantity;
    const additionalCost = additionalUnits * addedProduct.price;
    return initialTotal + additionalCost;
  };

  const status = calculateTotalValue() === quantity * addedProduct.price ? 'Aprovado' : 'Aguardando';

  const handleCheckout = () => {
    if (status === 'Aprovado') {
      navigation.navigate('FinalizarCompra', { cartItems });
    } else {
      alert('O produto ainda não está aprovado!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
        <View style={styles.placeholder} />
      </View>

      {cartItems.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Image style={styles.itemImage} source={item.image} />
          <View style={styles.itemDetails}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>R$ {productTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
                <FontAwesome5 name="minus" size={18} color="#b3b3b3" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
                <FontAwesome5 name="plus" size={18} color="#52B175" />
              </TouchableOpacity>
            </View>
            <Text style={[styles.status, status === 'Aprovado' ? styles.aprovado : styles.aguardando]}>
              Status: {status}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeButton}>
            <FontAwesome5 name="times" size={20} color="#b3b3b3" />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
        <TouchableOpacity onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Finalizar compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
  title: {
    fontSize: 20,
    fontFamily: 'Jost-Medium',
    color: '#181725',
    marginVertical: 16,
    textAlign: 'center',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#e2e2e2',
    paddingVertical: 16,
    paddingTop: 40,
    alignItems: 'center',
    marginBottom: 25,
    marginHorizontal: 20,
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
    marginLeft: '4%',
  },
  itemPrice: {
    fontSize: 18,
    fontFamily: 'Jost-Medium',
    color: '#000000',
    marginRight: '3%',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  quantityButton: {
    borderRadius: 15,
    padding: 3,
    marginHorizontal: 8,
    borderColor: '#e2e2e2',
    borderWidth: 1,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'Jost-Medium',
    fontSize: 22,
    marginHorizontal: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e2e2',
  },
  totalText: {
    fontSize: 20,
    fontFamily: 'Jost-Medium',
    color: '#181725',
    marginBottom: 10,
  },
  checkoutText: {
    backgroundColor: '#52B175',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 12,
    textAlign: 'center',
    borderRadius: 8,
  },
  backIcon: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 10,
  },
  status: {
    fontSize: 16,
    fontFamily: 'Jost-Regular',
    marginTop: 8,
    marginLeft: '3%',
  },
  aprovado: {
    color: '#4CAF50',
  },
  aguardando: {
    color: '#FF9800',
  },
});

export default Carrinho;
