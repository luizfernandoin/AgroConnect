import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MINHAS_COMPRAS from '../static/MinhasCompras';

const DetalhesPedido = ({ route }) => {
  const navigation = useNavigation();
  const { pedidoId } = route.params;
  const pedido = MINHAS_COMPRAS.find(item => item.id === pedidoId);

  if (!pedido) {
    return (
      <View style={styles.container}>
        <Text>Pedido não encontrado!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Pedido</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Card de Entrega */}
      <View style={[styles.card, styles.cardWithStatus]}>
        {pedido.status && (
          <View style={styles.statusBar}>
            <Text style={styles.statusText}>{pedido.status}</Text>
          </View>
        )}
        <Text style={[styles.cardTitle, pedido.status && styles.titleWithStatus]}>Informações de Envio</Text>
        <View style={styles.infoContainer}>
          <Icon name="cube" size={24} color="#53b175" />
          <Text style={styles.deliveryType}>Entrega {pedido.entrega.tipoEntrega}</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.cardTitle}>Informações da Entrega</Text>
        <View style={styles.infoContainer}>
          <Icon name="location-outline" size={24} color="#53b175" style={styles.iconLocation} />
          <View style={styles.addressContainer}>
            <Text style={styles.deliveryInfo}>{pedido.entrega.usuario} - {pedido.entrega.telefone}</Text>
            <Text style={styles.cardInfo}>{pedido.entrega.endereco}</Text>
          </View>
        </View>
      </View>

      {/* Card do Produto */}
      <View style={styles.card}>
        <View style={styles.produtoContainer}>
          <MaterialIcons name="storefront" size={16} color="#848484" />
          <Text style={styles.produtorText}>{pedido.farm}</Text>
        </View>
        <View style={styles.produtoContainer}>
          <Image style={styles.produtoImagem} source={pedido.image} />
          <View style={styles.produtoInfo}>
            <Text style={styles.produtoTitulo}>{pedido.title}</Text>
            <Text style={styles.produtoCategoria}>{pedido.category}</Text>
            <Text style={styles.produtoQuantidade}>Quantidade: {pedido.quantidade}</Text>
            <Text style={styles.produtoPreco}>{pedido.price}</Text>
          </View>
        </View>
      </View>

      {/* Card de Pagamento */}
      <View style={styles.card}>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabelBold}>ID do Pedido:</Text>
          <Text style={styles.paymentValueBold}>{pedido.id}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Tipo de Pagamento:</Text>
          <Text style={styles.paymentValue}>{pedido.pagamento.tipo}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Pedido realizado em:</Text>
          <Text style={styles.paymentValue}>{pedido.pagamento.dataPedido}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Data do pagamento:</Text>
          <Text style={styles.paymentValue}>{pedido.pagamento.dataPagamento}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Data de Entrega:</Text>
          <Text style={styles.paymentValue}>{pedido.pagamento.dataEntrega}</Text>
        </View>
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
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 5,
  },
  cardWithStatus: {
    paddingTop: 35,
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#53b175',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 7,
    alignItems: 'left',
    zIndex: 1,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Jost-SemiBold',
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Jost-SemiBold',
    marginBottom: 10,
  },
  titleWithStatus: {
    marginTop: 10,
  },
  cardInfo: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'Jost-Regular',
    marginBottom: 5,
  },
  produtoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
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
    marginBottom: 0,
  },
  produtorText: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'Jost-Regular',
    marginBottom: 1,
    marginLeft: 5,
  },
  produtoCategoria: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'Jost-Regular',
    marginBottom: 0,
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
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deliveryType: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Jost-Regular',
    marginLeft: 10,
  },
  addressContainer: {
    marginLeft: 10,
    flex: 1,
  },
  deliveryInfo: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Jost-Regular',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    marginVertical: 10,
  },
  iconLocation: {
    marginTop: -35,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  paymentLabelBold: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Jost-SemiBold',
    marginBottom: 5,
  },
  paymentValueBold: {
    fontSize: 15,
    color: '#333',
    fontFamily: 'Jost-SemiBold',
    marginBottom: 5,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'Jost-Regular',
  },
  paymentValue: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'Jost-Regular',
  },
});

export default DetalhesPedido;
