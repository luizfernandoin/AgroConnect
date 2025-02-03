import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomBar from "../components/bottomBar";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getProfile } from "../services/userService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../styles/ProfileStyles";

const Profile = () => {
  const [usuario, setUsuario] = useState(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const profileResponse = await getProfile();
      setUsuario(profileResponse.data);
    } catch (error) {
      console.error("Erro ao buscar usuário", error);
      setUsuario(null);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao sair da conta.');
    }
  };

  if (isLoading) {
    return (
      <View style={loadingStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#53B175" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      <View style={styles.content}>
        {usuario ? (
          <>
            <Image style={styles.image} resizeMode="center" source={{ uri: usuario.image }} />
            <View style={styles.profileDetails}>
              <Text style={styles.profileText}>{usuario.name}</Text>
              <TouchableOpacity style={styles.edit} onPress={() => navigation.navigate("CriarConta", {usuario})}>
                <Text style={styles.text}>Editar perfil</Text>
                <AntDesign name="edit" size={15} color="#595959" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text>Erro ao carregar perfil.</Text>
        )}
      </View>
      <View style={styles.list}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MinhasCompras")}>
          <Text style={styles.btTexto}>Minhas Compras</Text>
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyAdress", { usuario })}>
          <Text style={styles.btTexto}>Meus Endereços</Text>
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
        {usuario?.role === "PRODUCER" && (
          <>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MinhasPropostas")}>
              <Text style={styles.btTexto}>Minhas propostas</Text>
              <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MeusProdutos")}>
              <Text style={styles.btTexto}>Meus produtos</Text>
              <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MeusPedidosProdutor")}>
              <Text style={styles.btTexto}>Meus pedidos</Text>
              <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.btTexto}>Sair</Text>
          <AntDesign name="logout" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <BottomBar />
    </View>
  );
};

const loadingStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
