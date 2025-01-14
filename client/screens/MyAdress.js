import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ToastAndroid } from "react-native";
import { RadioButton, Snackbar } from "react-native-paper";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "../components/bottomBar";
import AntDesign from "@expo/vector-icons/AntDesign";

const MyAdress = () => {
    // Valores estáticos para teste
    const adress = [
        {
            id: 1,
            userId: 1,
            nome: "João da Silva",
            rua: "Rua Ferreira Campos",
            numero: "65",
            bairro: "Centro",
            cidade: "Campinas",
            estado: "SP",
            cep: "12345-678",
            pais: "Brasil",
            telefone: "(11) 98765-4321",
        },
        {
            id: 2,
            userId: 1,
            nome: "Maria de Souza",
            rua: "Rua das Flores",
            numero: "123",
            bairro: "Centro",
            cidade: "São Paulo",
            estado: "SP",
            cep: "12345-678",
            pais: "Brasil",
            telefone: "(11) 98835-7654",
        },
        {
            id: 3,
            userId: 1,
            nome: "João da Silva",
            rua: "Rua João Guedes",
            numero: "245",
            bairro: "Centro",
            cidade: "São Paulo",
            estado: "SP",
            cep: "12345-678",
            pais: "Brasil",
            telefone: "(11) 98765-4321",
        },
    ];
    
    const [enderecos, setEnderecos] = useState([]);
    const [enderecoPadrao, setEnderecoPadrao] = useState(null);
    const navigation = useNavigation();
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const userId = 1;
    
    useEffect(() => {
        const fetchEnderecos = async () => {
            try {
                // Descomentar a linha abaixo quando a rota estiver disponível
                // const response = await fetch(`${API_BASE_URL}/api/user/{userID}/enderecos`);
                // const data = await response.json();
    
                const data = adress.filter((endereco) => endereco.userId === userId);
    
                setEnderecos(data);
                setEnderecoPadrao(data.length > 0 ? data[0].id : null);
            } catch (error) {
                console.error("Erro ao buscar endereços:", error);
    
                const data = adress.filter((endereco) => endereco.userId === userId);
                setEnderecos(adress);
                setEnderecoPadrao(adress.length > 0 ? adress[0].id : null);
            }
        };
    
        fetchEnderecos();
    }, [userId]);

    const handleExcluir = async (id) => {
        try {
            // Descomentar essa linha quando as rotas estiverem finalizadas
            // await fetch(`${API_BASE_URL}/api/enderecos/${id}`, { method: "DELETE" });

            setEnderecos((prev) => prev.filter((endereco) => endereco.id !== id));
            setSnackbarMessage("Endereço excluído!");
            setSnackbarVisible(true);
        } catch (error) {
            console.error("Erro ao excluir endereço:", error);
            Alert.alert("Erro", "Não foi possível excluir o endereço.");
        }
    };
    

    const renderEndereco = ({ item }) => (
        <View style={styles.box}>
            <View style={styles.radio}>
                <RadioButton
                    value={item.id}
                    status={enderecoPadrao === item.id ? "checked" : "unchecked"}
                    onPress={() => setEnderecoPadrao(item.id)}
                    color="#000"
                />
            </View>
            <View style={styles.adress}>
                <Text style={styles.user}>{item.nome}</Text>
                <Text style={styles.adressInfo}>{item.rua}, {item.numero}</Text>
                <Text style={styles.adressInfo}>{item.bairro}</Text>
                <Text style={styles.adressInfo}>{item.cidade}, {item.estado} - {item.cep}</Text>
                <Text style={styles.adressInfo}>{item.pais}</Text>
                <Text style={styles.adressInfo}>Telefone {item.telefone}</Text>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditAdress", { item })}>
                    <Text style={styles.btTexto}>Alterar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleExcluir(item.id)}>
                    <Text style={styles.btTexto}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meus Endereços</Text>
            {enderecos.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>Você ainda não possui endereços cadastrados!</Text>
                </View>
            ) : (
                <FlatList
                    data={enderecos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderEndereco}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}
            <BottomBar/>
            <TouchableOpacity style={styles.addAdress}>
                <Text style={styles.btTexto} onPress={() => navigation.navigate("AddAdress")}>Adicionar novo endereço</Text>
            </TouchableOpacity>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                action={{
                    onPress: () => setSnackbarVisible(false),
                }}
                style={styles.alerta}
            >
                <View style={styles.snackbar}>
                <AntDesign style={styles.icon} name="checkcircleo" size={20} color="#ffff" />
                    <Text style={styles.snackbarText}>{snackbarMessage}</Text>
                </View>
                
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    snackbarText:{
        color: "#ffff",
        fontSize: 14,
        fontFamily: "Jost-Bold"
    },
    icon:{
        marginRight: 10
    },
    snackbar:{
        flexDirection: "row",
        alignItems: "center"
    },
    alerta:{
        backgroundColor: "#53b175",
        padding: 8,
    },
    container: {
        flex: 1,
        alignItems: "center"
    },
    box: {
        borderWidth: 3,
        borderColor: "#000",
        borderRadius: 8,
        marginHorizontal: 30,
        position: "relative",
        marginBottom: 10
    },
    adress: {
        paddingHorizontal: 15,
        alignItems: "flex-start"
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        alignItems: "center",
        alignSelf: "center",
        gap: 10
    },
    user: {
        fontFamily: "Jost-Medium"
    },
    adressInfo: {
        fontFamily: "Jost-Regular"
    },
    button: {
        backgroundColor: "#53b175",
        paddingVertical: 6,
        paddingHorizontal: 45,
        borderRadius: 8,
        alignItems: "center",
    },
    btTexto: {
        color: "#ffff",
        fontFamily: "Jost-Bold",
        textAlign: "center"
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        padding: 30,
        marginTop: 10,
        fontFamily: "Jost-Bold"
    },
    radio: {
        alignItems: "flex-end"
    },
    addAdress: {
        position: "absolute",
        bottom: 70,
        backgroundColor: "#53b175",
        fontFamily: "Jost-Bold",
        borderRadius: 11,
        paddingVertical: 8,
        width: "85%",
        alignSelf: "center",
    },    
    empty: {
        marginTop: 20,
        alignItems: "center",
        width: "80%",
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
        fontFamily: "Jost-Regular",
        textAlign: "center",
        fontSize: 20
    },
});

export default MyAdress;
