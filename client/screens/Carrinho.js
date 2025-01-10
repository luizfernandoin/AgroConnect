import React, { useState, useEffect } from 'react';
import { Text, Image, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRoute } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const Carrinho = ({ navigation }) => {
  const route = useRoute();
  const { addedProduct } = route.params || {};

  // Estado para a quantidade do produto
  const [quantity, setQuantity] = useState(addedProduct ? addedProduct.quantity : 1);
  const [total, setTotal] = useState(addedProduct ? addedProduct.proposeValue * addedProduct.quantity : 0);

  // Atualiza o total sempre que a quantidade ou o preço mudarem
  useEffect(() => {
    setTotal(addedProduct.proposeValue * quantity); // Total atualizado com base no preço da unidade e quantidade
  }, [quantity, addedProduct.proposeValue]);

  // Se não houver produto adicionado, exibe mensagem de carrinho vazio
  if (!addedProduct) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carrinho vazio</Text>
        <FontAwesome5
          name="arrow-left"
          size={24}
          color="#000"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }

  // Funções para manipular a quantidade
  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1); // Incrementa a quantidade
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Decrementa a quantidade, mas não pode ser menor que 1
  };

  const handleRemove = () => {
    // Lógica para remover o item do carrinho
    alert('Item removido do carrinho!');
  };

  // Status de acordo com o valor aprovado
  const status = Number(addedProduct.proposeValue) === Number(addedProduct.originalValue) ? 'Aprovado' : 'Aguardando';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu carrinho</Text>
      <View style={styles.itemContainer}>
        <Image style={styles.itemImage} source={addedProduct.image} />
        <View style={styles.itemDetails}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemName}>{addedProduct.name}</Text>
            <Text style={styles.itemPrice}>R$ {addedProduct.proposeValue.toFixed(2)}</Text>
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
        <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
          <FontAwesome5 name="times" size={20} color="#b3b3b3" />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
        <TouchableOpacity onPress={() => alert('Compra finalizada!')}>
          <Text style={styles.checkoutText}>Finalizar compra</Text>
        </TouchableOpacity>
      </View>
      <FontAwesome5
        name="arrow-left"
        size={24}
        color="#000"
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    paddingHorizontal: 16,
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
    fontWeight: '500',
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
