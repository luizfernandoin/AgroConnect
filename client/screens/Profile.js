import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomBar from "../components/bottomBar";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_BASE_URL } from "@env"; 

const Profile = () => {
  const [usuario, setUsuario] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  const userId = route.params;//adiconar o id

  useEffect(() => {
    const fetchUser = async () => {
        if (!userId) {
            // Remover quando o backend estiver finalizado
            setUsuario({
                id: "1",
                nome: "João da Silva",
                email: "joaodasilva@gmail.com",
                telefone: "(83)991042162",
                role: "PRODUCTOR", 
                image: require("../assets/Agro Connect Verde PNG 1.png"),
                password: "123"
            });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/users/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setUsuario(data);
        } catch (error) {
            console.error("Erro ao buscar usuário", error);
            setUsuario(null);
        }
    };

    fetchUser();
}, [userId]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      <View style={styles.content}>
        {usuario ? (
          <>
            <Image style={styles.image} resizeMode="center" source={usuario.image}/>
            <View style={styles.profileDetails}>
              <Text style={styles.profileText}>{usuario.nome}</Text>
              <TouchableOpacity style={styles.edit} onPress={() => navigation.navigate("EditProfile", {usuario})}>
                <Text style={styles.text}>Editar perfil</Text>
                <AntDesign name="edit" size={15} color="#595959" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text>Carregando...</Text>
        )}
      </View>
      <View style={styles.list}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btTexto}>Meus Pedidos</Text>
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyAdress", { usuario })}>
          <Text style={styles.btTexto}>Meus Endereços</Text>
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
        {usuario?.role === "PRODUCTOR" && (
                <>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.btTexto}>Minhas propostas</Text>
                        <AntDesign name="right" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.btTexto}>Meus produtos</Text>
                        <AntDesign name="right" size={24} color="white" />
                    </TouchableOpacity>
                </>
            )}
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Login")}>
            {/* Configurar para ao clicar fazer logout e retornar a página de login */}
          <Text style={styles.btTexto}>Sair</Text>
          <AntDesign name="logout" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    padding: 30,
    fontFamily: "Jost-Bold",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginLeft: 40,
  },
  profileText: {
    fontWeight: "medium",
    fontSize: 24,
    fontFamily: "Jost-Regular",
  },
  profileDetails: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
  },
  edit: {
    borderRadius: 18,
    marginTop: 5,
    flexDirection: "row",
    marginRight: 5,
  },
  text: {
    fontSize: 10,
    fontFamily: "Jost-Regular",
  },
  list: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#53b175",
    padding: 10,
    borderRadius: 18,
    width: "80%",
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  btTexto: {
    color: "white",
    flex: 1,
    paddingHorizontal: 10,
    padding: "3%",
  },
  image: {
    borderWidth: 5,
    borderColor: "#1A6836",
    borderRadius: 100,
    width: 100,
    height: 100,
  },
});

export default Profile;
