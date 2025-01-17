import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RadioButton } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const FinalizarCompra = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cartItems, enderecoSelecionado } = route.params || {};

  const [metodoPagamento, setMetodoPagamento] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const calcularTotal = cartItems.reduce((acc, produto) => acc + produto.proposeValue, 0);
      setTotal(calcularTotal);
    }
  }, [cartItems]);

  // Função para passar o endereço selecionado de volta
  const handleEnderecoSelecionado = (endereco) => {
    // Aqui você pode enviar o endereço de volta para a tela anterior, se necessário
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finalizar Compra</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.contentPadding}>
          {/* Card de endereço de entrega */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Endereço de Entrega</Text>
            <TouchableOpacity
              style={styles.enderecoContainer}
              onPress={() => navigation.navigate('MyAdress')}
            >
              <View style={styles.enderecoTextContainer}>
                <Text style={styles.cardInfoLocation}>
                  <Icon name="location-outline" size={20} color="#53b175" style={styles.iconLocation}/> 
                  <Text style={styles.cardInfo}>{enderecoSelecionado ? `${enderecoSelecionado.usuario} - ${enderecoSelecionado.telefone}` : 'Selecione um endereço'}</Text>
                </Text>
                <View style={styles.addressText}>
                  <Text style={styles.cardInfo}>{enderecoSelecionado ? enderecoSelecionado.rua : ''}</Text>
                  <Text style={styles.cardInfo}>
                    {enderecoSelecionado ? `${enderecoSelecionado.bairro}, ${enderecoSelecionado.cidade} - ${enderecoSelecionado.estado}` : ''}
                  </Text>
                  <Text style={styles.cardInfo}>{enderecoSelecionado ? `CEP: ${enderecoSelecionado.cep}` : ''}</Text>
                </View>
              </View>
              <Icon name="chevron-forward" size={20} color="#848484" style={styles.arrowIcon} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <Text style={styles.cardTitle}><FontAwesome name="id-card-o" size={18} color="#53b175" /> CPF</Text>
            <TextInput style={styles.input} placeholder="Digite seu CPF" keyboardType="numeric" />
          </View>

          {/* Card de produtos */}
          {cartItems.map((produto, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.produtoContainer}>
                <MaterialIcons name="storefront" size={16} color="#848484" />
                <Text style={styles.produtorText}>{produto.producer}</Text>
              </View>
              <View style={styles.produtoContainer}>
                <Image style={styles.produtoImagem} source={produto.image} />
                <View style={styles.produtoInfo}>
                  <Text style={styles.produtoTitulo}>{produto.name}</Text>
                  <Text style={styles.produtoCategoria}>{produto.category}</Text>
                  <Text style={styles.produtoQuantidade}>Quantidade: {produto.quantity}</Text>
                  <Text style={styles.produtoPreco}>R$ {produto.proposeValue.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Card de métodos de pagamento */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Método de Pagamento</Text>

            {/* Cartão de crédito */}
            <View style={styles.radioContainer}>
              <View style={styles.radioContent}>
                <Icon name="card" size={24} color="#1B0ADE" />
                <Text style={styles.radioLabel}>Cartão de Crédito</Text>
              </View>
              <RadioButton
                value="credito"
                status={metodoPagamento === 'credito' ? 'checked' : 'unchecked'}
                onPress={() => setMetodoPagamento('credito')}
                color="#000"
              />
            </View>

            {metodoPagamento === 'credito' && (
              <View style={styles.paymentInfo}>
                <TextInput style={styles.input} placeholder="Número do Cartão" keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Nome no Cartão" />
                <TextInput style={styles.input} placeholder="Data de Validade" keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="CVV" keyboardType="numeric" />
              </View>
            )}

            {/* Cartão de débito */}
            <View style={styles.radioContainer}>
              <View style={styles.radioContent}>
                <Icon name="card-outline" size={24} color="#FFBF00" />
                <Text style={styles.radioLabel}>Cartão de Débito</Text>
              </View>
              <RadioButton
                value="debito"
                status={metodoPagamento === 'debito' ? 'checked' : 'unchecked'}
                onPress={() => setMetodoPagamento('debito')}
                color="#000"
              />
            </View>

            {metodoPagamento === 'debito' && (
              <View style={styles.paymentInfo}>
                <TextInput style={styles.input} placeholder="Número do Cartão" keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Nome no Cartão" />
                <TextInput style={styles.input} placeholder="Data de Validade" keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="CVV" keyboardType="numeric" />
              </View>
            )}

            {/* Boleto bancário */}
            <View style={styles.radioContainer}>
              <View style={styles.radioContent}>
                <Icon name="barcode" size={24} color="#333" />
                <Text style={styles.radioLabel}>Boleto Bancário</Text>
              </View>
              <RadioButton
                value="boleto"
                status={metodoPagamento === 'boleto' ? 'checked' : 'unchecked'}
                onPress={() => setMetodoPagamento('boleto')}
                color="#000"
              />
            </View>

            {metodoPagamento === 'boleto' && (
              <View style={styles.paymentInfo}>
                <Text>O boleto será gerado no próximo passo.</Text>
              </View>
            )}

            {/* PIX */}
            <View style={styles.radioContainer}>
              <View style={styles.radioContent}>
                <MaterialIcons name="pix" size={24} color="#51eccd" />
                <Text style={styles.radioLabel}>PIX</Text>
              </View>
              <RadioButton
                value="pix"
                status={metodoPagamento === 'pix' ? 'checked' : 'unchecked'}
                onPress={() => setMetodoPagamento('pix')}
                color="#000"
              />
            </View>

            {metodoPagamento === 'pix' && (
              <View style={styles.paymentInfo}>
                <Text>Chave PIX: seu_email@example.com</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.finalizarButton} onPress={() => navigation.navigate("PedidoConcluido")}>
          <Text style={styles.finalizarButtonText}>Finalizar Compra</Text>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  contentPadding: {
    paddingTop: 80,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
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
  footer: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  totalText: {
    fontSize: 18,
    fontFamily: 'Jost-SemiBold',
    color: '#333',
  },
  finalizarButton: {
    backgroundColor: '#53b175',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  finalizarButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Jost-SemiBold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Jost-SemiBold',
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'Jost-Regular',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 14,
    fontFamily: 'Jost-Regular',
    color: '#333',
    marginBottom: 10,
  },
  produtoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  produtoImagem: {
    width: 70,
    height: 90,
    borderRadius: 8,
    marginRight: 15,
  },
  produtoInfo: {
    flex: 1,
  },
  produtoTitulo: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Jost-SemiBold',
    marginBottom: 5,
  },
  produtoCategoria: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'Jost-Regular',
    marginBottom: 5,
  },
  produtoQuantidade: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Jost-Regular',
    marginBottom: 5,
  },
  produtoPreco: {
    fontSize: 14,
    color: '#53b175',
    fontFamily: 'Jost-SemiBold',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  radioContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Jost-Regular',
  },
  paymentInfo: {
    marginTop: 10,
  },
  buttonWrapper: {
    position: 'static',
    bottom: 10,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#53b175',
    padding: 15,
    borderRadius: 5,
    width: width - 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Jost-SemiBold',
  },
  enderecoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  enderecoTextContainer: {
    flex: 1,
  },
  addressText: {
    marginTop: 5,
  },
  iconLocation: {
    marginRight: 5,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  produtorText: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'Jost-Regular',
    marginBottom: 1,
    marginLeft: 5,
  },
});

export default FinalizarCompra;
