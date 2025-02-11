import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const MinhasPropostas = () => {
  const navigation = useNavigation();
  const [filtro, setFiltro] = useState('Pendentes');
  const [propostas, setPropostas] = useState([
    {
      id: '1',
      produto: 'Tomate Orgânico',
      valorOriginalUnitario: 5.00,
      quantidade: '5',
      valorProposto: 15.00,
      imagem: require('../assets/produtotomate.jpg'),
      status: 'Pendente',
      customer: 'Gustavo da Cruz',
    },
    {
      id: '2',
      produto: 'Cenoura Fresca',
      valorOriginalUnitario: 3.33,
      quantidade: '3',
      valorProposto: 8.00,
      imagem: require('../assets/produtocenourafresca.jpeg'),
      status: 'Aceita',
      customer: 'Islan Pereira',
    },
    {
      id: '3',
      produto: 'Alface',
      valorOriginalUnitario: 3.50,
      quantidade: '2',
      valorProposto: 5.00,
      imagem: require('../assets/produtoalface.png'),
      status: 'Recusada',
      customer: 'Luzia Rocha'
    },
  ]);

  const aceitarProposta = (id) => {
    setPropostas(
      propostas.map((proposta) =>
        proposta.id === id ? { ...proposta, status: 'Aceita' } : proposta
      )
    );
    Alert.alert('Proposta Aceita', 'Você aceitou a proposta.');
  };

  const recusarProposta = (id) => {
    setPropostas(
      propostas.map((proposta) =>
        proposta.id === id ? { ...proposta, status: 'Recusada' } : proposta
      )
    );
    Alert.alert('Proposta Recusada', 'Você recusou a proposta.');
  };

  const filtrarPropostas = () => {
    return propostas.filter((proposta) => {
      if (filtro === 'Todas') return true;
      if (filtro === 'Pendentes') return proposta.status === 'Pendente';
      if (filtro === 'Aceitas') return proposta.status === 'Aceita';
      if (filtro === 'Recusadas') return proposta.status === 'Recusada';
    });
  };

  const renderPropostaItem = ({ item }) => {
    const valorOriginalTotal = item.valorOriginalUnitario * item.quantidade;

    return (
      <View style={styles.cardProposta}>
        <Text style={styles.customerName}>{item.customer} fez uma proposta:</Text>
        <View style={styles.cardContent}>
          <Image style={styles.produtoImagem} source={item.imagem} />
          <View style={styles.infoContainer}>
            <Text style={styles.produtoTitulo}>{item.produto}</Text>
            <Text style={styles.produtoPreco}>Valor Original: R$ {valorOriginalTotal.toFixed(2)}</Text>
            <Text style={styles.valorProposto}>Proposta: R$ {item.valorProposto.toFixed(2)}</Text>
            <Text style={styles.quantidade}>Quantidade: {item.quantidade}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
            {item.status === 'Pendente' && (
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.recusarButton}
                  onPress={() => recusarProposta(item.id)}
                >
                  <Text style={styles.recusarButtonText}>Recusar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.aceitarButton}
                  onPress={() => aceitarProposta(item.id)}
                >
                  <Text style={styles.aceitarButtonText}>Aceitar</Text>
                </TouchableOpacity>
              </View>
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
        <Text style={styles.headerTitle}>Minhas Propostas</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.filterContainer}>
        {['Pendentes', 'Aceitas', 'Recusadas', 'Todas'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filtro === status && styles.activeFilterButton,
            ]}
            onPress={() => setFiltro(status)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filtro === status && styles.activeFilterButtonText,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtrarPropostas()}
        keyExtractor={(item) => item.id}
        renderItem={renderPropostaItem}
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
  cardProposta: {
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
  customerName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#696969',
    marginBottom: 10,
    fontFamily: 'Jost-SemiBold',
    textAlign: 'left',
  },
  produtoTitulo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Jost-SemiBold',
  },
  produtoPreco: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'Jost-Regular',
    marginBottom: 5,
  },
  valorProposto: {
    fontSize: 14,
    color: '#53b175',
    fontFamily: 'Jost-Regular',
    marginBottom: 10,
  },
  quantidade: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Jost-Regular',
    marginBottom: 10,
  },
  status: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Jost-Regular',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  aceitarButton: {
    backgroundColor: '#53b175',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 5,
  },
  aceitarButtonText: {
    color: '#fff',
    fontFamily: 'Jost-SemiBold',
    fontSize: 13,
  },
  recusarButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 5,
  },
  recusarButtonText: {
    color: '#fff',
    fontFamily: 'Jost-SemiBold',
    fontSize: 13,
  },
});

export default MinhasPropostas;
