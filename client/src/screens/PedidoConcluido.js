import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ConcluidoImage from '../assets/ConcluidoImage.png'; 

const PedidoConcluido = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.pedidoConcluido}>
      <Image source={ConcluidoImage} style={styles.pedidoConcluidoChild} />
      <Text style={styles.seuPedidoFoi}>Seu pedido foi finalizado</Text>

      <Text style={styles.h2}>
        Seu pedido foi realizado com sucesso e está sendo processado.
      </Text>

      <TouchableOpacity style={styles.botaoverpedido} onPress={() => navigation.navigate('MinhasCompras')}>
        <View style={styles.botaosalvar}>
          <Text style={styles.verPedido}>Ver pedido</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaovoltaraoinicio}
        onPress={() => navigation.navigate('Home')}
      >
        <View style={styles.botaosalvar1}>
          <Text style={styles.voltarAoInicio}>Voltar ao inicio</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pedidoConcluido: {
    borderRadius: 24,
    backgroundColor: '#fcfcfc',
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pedidoConcluidoChild: {
    marginTop: 20,
    width: 269,
    height: 240,
    marginRight: '8%',
  },
  seuPedidoFoi: {
    marginTop: 30,
    fontSize: 28,
    fontFamily: 'Jost-SemiBold',
    color: '#181725',
    width: 221,
    textAlign: 'center',
  },
  h2: {
    fontSize: 16,
    lineHeight: 21,
    color: '#7c7c7c',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Jost-Medium',
  },
  botaoverpedido: {
    height: 66,
    width: 364,
    marginTop: 20,
  },
  botaosalvar: {
    backgroundColor: '#53b175',
    borderRadius: 15,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verPedido: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Jost-Medium',
  },
  botaovoltaraoinicio: {
    height: 66,
    width: 364,
    marginTop: 20,
  },
  botaosalvar1: {
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voltarAoInicio: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Jost-Medium',
  },
});

export default PedidoConcluido;
