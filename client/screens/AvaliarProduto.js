import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AvaliarProduto = ({ route }) => {
  const navigation = useNavigation();
  const { produto } = route.params;
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');

  const enviarAvaliacao = () => {
    console.log('Avaliação enviada:', { nota, comentario });
    navigation.goBack();
  };

  const handleStarPress = (index) => {
    setNota(index + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Avaliar Produto</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.cardProduto}>
        <View style={styles.row}>
          <Image style={styles.produtoImagem} source={produto.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.titulo}>{produto.title}</Text>
            <Text style={styles.categoria}>{produto.category}</Text>
          </View>
        </View>
        <View style={styles.avaliacaoContainer}>
          <Text style={styles.label}>Avaliação</Text>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
                <MaterialIcons
                  name={index < nota ? 'star' : 'star-border'}
                  size={30}
                  color={index < nota ? '#FFD700' : '#ccc'}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Comentário</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Escreva seu comentário sobre o produto"
            value={comentario}
            onChangeText={setComentario}
            multiline
          />
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={enviarAvaliacao}>
          <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
      </TouchableOpacity>
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
  cardProduto: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  produtoImagem: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Jost-SemiBold',
  },
  categoria: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'Jost-Regular',
    marginTop: 5,
  },
  avaliacaoContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Jost-SemiBold',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textarea: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    height: 150,
    textAlignVertical: 'top',
    fontSize: 16,
    fontFamily: 'Jost-Regular',
  },
  submitButton: {
    backgroundColor: '#53b175',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Jost-SemiBold',
  },
});

export default AvaliarProduto;
