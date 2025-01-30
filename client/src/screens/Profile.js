import { View, Text, Image, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomBar from "../components/bottomBar";
import { useState, useEffect, useCallback } from "react";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { getProfile } from "../services/userService";
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

  // Atualiza os dados sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      <View style={styles.content}>
        {isLoading ? (
          <Text>Carregando...</Text>
        ) : usuario ? (
          <>
            <Image style={styles.image} resizeMode="center" source={{ uri: usuario.image }} />
            <View style={styles.profileDetails}>
              <Text style={styles.profileText}>{usuario.name}</Text>
              <TouchableOpacity style={styles.edit} onPress={() => navigation.navigate("EditProfile", { usuario })}>
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
          {/* Configurar para ao clicar fazer logout e retornar a página de login */}
          <Text style={styles.btTexto}>Sair</Text>
          <AntDesign name="logout" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <BottomBar />
    </View>
  );
};


export default Profile;
