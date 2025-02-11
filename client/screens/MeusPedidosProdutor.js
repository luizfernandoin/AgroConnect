import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const MeusPedidosProdutor = () => {
  const navigation = useNavigation();
  const [filtro, setFiltro] = useState('Pendentes');
  const [pedidos, setPedidos] = useState([
    {
      id: '1',
      produto: 'Tomate Orgânico',
      valorTotal: 25.00,
      quantidade: '5',
      dataPedido: '10-01-2025',
      imagem: require('../assets/produtotomate.jpg'),
      status: 'Pendente',
      cliente: 'Luiz Fernando',
      endereco: 'Rua Exemplo, 123, Bairro XYZ'
    },
    {
      id: '2',
      produto: 'Cenoura Fresca',
      valorTotal: 15.00,
      quantidade: '3',
      dataPedido: '11-01-2025',
      imagem: require('../assets/produtocenourafresca.jpeg'),
      status: 'Concluído',
      cliente: 'Maria Oliveira',
      endereco: 'Rua do Comércio, 456, Bairro ABC'
    },
  ]);

  const filtrarPedidos = () => {
    return pedidos.filter((pedido) => {
      if (filtro === 'Todos') return true;
      if (filtro === 'Pendentes') return pedido.status === 'Pendente';
      if (filtro === 'Concluídos') return pedido.status === 'Concluído';
    });
  };

  const marcarComoEntregue = (id) => {
    setPedidos(pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, status: 'Concluído' } : pedido
    ));
    Alert.alert('Pedido Concluído', 'O pedido foi marcado como entregue.');
  };

  const renderPedidoItem = ({ item }) => {
    return (
      <View style={styles.cardPedido}>
        <Text style={styles.clienteNome}>{item.cliente} fez um pedido:</Text>
        <View style={styles.cardContent}>
          <Image style={styles.produtoImagem} source={item.imagem} />
          <View style={styles.infoContainer}>
            <Text style={styles.produtoTitulo}>{item.produto}</Text>
            <Text style={styles.valorTotal}>Valor Total: R$ {item.valorTotal.toFixed(2)}</Text>
            <Text style={styles.quantidade}>Quantidade: {item.quantidade}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
            <Text style={styles.endereco}>Endereço: {item.endereco}</Text>
            <Text style={styles.dataPedido}>Data do Pedido: {item.dataPedido}</Text>

            {item.status === 'Pendente' && (
              <TouchableOpacity
                style={styles.entregarButton}
                onPress={() => marcarComoEntregue(item.id)}
              >
                <Text style={styles.buttonText}>Marcar como Entregue</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Pedidos - Produtor</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.filterContainer}>
        {['Pendentes', 'Concluídos', 'Todos'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[styles.filterButton, filtro === status && styles.activeFilterButton]}
            onPress={() => setFiltro(status)}
          >
            <Text style={[styles.filterButtonText, filtro === status && styles.activeFilterButtonText]}>
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtrarPedidos()}
        keyExtractor={(item) => item.id}
        renderItem={renderPedidoItem}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
  },
  activeFilterButton: {
    backgroundColor: '#53b175',
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: 'Jost-Regular',
    color: '#848484',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  flatListContent: {
    padding: 20,
  },
  cardPedido: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 15,
  },
  cardContent: {
    flexDirection: 'row',
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
  clienteNome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#696969',
    marginBottom: 10,
    fontFamily: 'Jost-Regular',
  },
  produtoTitulo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Jost-SemiBold',
  },
  valorTotal: {
    fontSize: 14,
    color: '#53b175',
    fontFamily: 'Jost-Regular',
    marginBottom: 5,
  },
  quantidade: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Jost-Regular',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Jost-Regular',
    marginBottom: 5,
  },
  endereco: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'Jost-Regular',
    marginBottom: 5,
  },
  dataPedido: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'Jost-Regular',
    marginBottom: 5,
  },
  entregarButton: {
    backgroundColor: '#53b175',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MeusPedidosProdutor;
