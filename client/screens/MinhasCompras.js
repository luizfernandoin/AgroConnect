import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomBar from '../components/bottomBar';

const MinhasCompras = () => {
  const navigation = useNavigation();
  const [pedidos, setPedidos] = useState([
    {
      id: '1',
      title: 'Milho-Verde',
      category: 'Cereal',
      farm: 'Sabor da Terra',
      price: 'R$ 9,00',
      quantidade: '2',
      status: 'A caminho',
      image: require('../assets/produto.jpg'),
      showAvaliarButton: false,
    },
    {
        id: '2',
        title: 'Manga',
        category: 'Fruta',
        farm: 'Verde Campo',
        price: 'R$ 6,00',
        quantidade: '3',
        status: 'Entregue',
        image: require('../assets/produto.jpg'),
        showAvaliarButton: false,
      },
  ]);

  const marcarComoEntregue = (id) => {
    setPedidos(pedidos.map(pedido => pedido.id === id ? { ...pedido, status: 'Entregue', showAvaliarButton: true } : pedido));
  };

  const renderPedidoItem = ({ item }) => (
    <View style={styles.cardproduto}>
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <MaterialIcons name="storefront" size={16} color="#848484" style={styles.icon} />
          <Text style={styles.fazenda}>{item.farm} </Text>
        </View>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <View style={styles.cardBody}>
        <Image style={styles.produtoImagem} source={item.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.titulo}>{item.title}</Text>
          <Text style={styles.categoria}>{item.category}</Text>
          <View style={styles.rowBottom}>
            <View>
              <Text style={styles.valor}>{item.price}</Text>
              <Text style={styles.quantidade}>Total de {item.quantidade} item(ns)</Text>
            </View>
            {item.status !== 'Entregue' ? (
              <TouchableOpacity style={styles.entregueButton} onPress={() => marcarComoEntregue(item.id)}>
                <Text style={styles.entregueButtonText}>Entregue</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.avaliarButton} onPress={() => navigation.navigate('AvaliarProduto')}>
                <Text style={styles.avaliarButtonText}>Avaliar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minhas Compras</Text>
        <View style={styles.placeholder} />
      </View>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={renderPedidoItem}
        contentContainerStyle={styles.flatListContent}
      />
      <BottomBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingBottom: 60,
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
  flatListContent: {
    padding: 20,
  },
  cardproduto: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
  },
  fazenda: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'Jost-Regular',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  produtoImagem: {
    width: 70,
    height: 90,
    borderRadius: 8,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Jost-SemiBold',
  },
  categoria: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'Jost-Regular',
    marginBottom: 0,
  },
  rowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valor: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Jost-Medium',
  },
  quantidade: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Jost-Regular',
  },
  status: {
    fontSize: 13,
    fontWeight: '600',
    color: '#53b175',
  },
  entregueButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: "#53b175",
    borderWidth: 1,
  },
  entregueButtonText: {
    color: '#53b175',
    fontFamily: 'Jost-SemiBold',
    fontSize: 13,
  },
  avaliarButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: "#53b175",
    borderWidth: 1,
  },
  avaliarButtonText: {
    color: '#53b175',
    fontFamily: 'Jost-SemiBold',
    fontSize: 13,
  },
});

export default MinhasCompras;
