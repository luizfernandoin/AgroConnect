import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { RadioButton, Snackbar } from "react-native-paper";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomBar from "../components/bottomBar";
import AntDesign from "@expo/vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Ionicons";

const MyAdress = () => {
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
    const route = useRoute();
    const { origem, cartItems = [] } = route.params || {};
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const userId = 1;

    useEffect(() => {
        const fetchEnderecos = async () => {
            try {
                const data = adress.filter((endereco) => endereco.userId === userId);
                setEnderecos(data);
                
                const enderecoPadraoId = await AsyncStorage.getItem('enderecoPadraoId');
                if (enderecoPadraoId) {
                    setEnderecoPadrao(parseInt(enderecoPadraoId));
                } else {
                    setEnderecoPadrao(data.length > 0 ? data[0].id : null);
                }
            } catch (error) {
                console.error("Erro ao buscar endereços:", error);
                setEnderecos(adress);
                setEnderecoPadrao(adress.length > 0 ? adress[0].id : null);
            }
        };
        fetchEnderecos();
    }, [userId]);

    useEffect(() => {
        if (origem === 'checkout') {
            navigation.setOptions({
                onEnderecoSelecionado: handleSelectAddress,
            });
        }
    }, [origem]);

    const handleExcluir = async (id) => {
        try {
            setEnderecos((prev) => prev.filter((endereco) => endereco.id !== id));
            setSnackbarMessage("Endereço excluído!");
            setSnackbarVisible(true);
        } catch (error) {
            console.error("Erro ao excluir endereço:", error);
            Alert.alert("Erro", "Não foi possível excluir o endereço.");
        }
    };

    const handleSelectAddress = async (item) => {
        setEnderecoPadrao(item.id);
        await AsyncStorage.setItem('enderecoPadraoId', item.id.toString());

        if (origem === 'checkout') {
            navigation.navigate('FinalizarCompra', { enderecoSelecionado: item, cartItems });
        }
    };

    const renderEndereco = ({ item }) => (
        <View style={styles.box}>
            <View style={styles.radio}>
                <RadioButton
                    value={item.id}
                    status={enderecoPadrao === item.id ? "checked" : "unchecked"}
                    onPress={() => handleSelectAddress(item)}
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
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon style={styles.backButton} name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meus Endereços</Text>
                <View style={styles.placeholder} />
            </View>

            {enderecos.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>Você ainda não possui endereços cadastrados!</Text>
                </View>
            ) : (
                <FlatList
                    data={enderecos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderEndereco}
                    contentContainerStyle={{ paddingBottom: 120 }}
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
                    onPress: () => setSnackbarVisible(false),}
                }
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        elevation: 3,
        width: '100%',
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
    snackbarText: {
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
        marginBottom: '15%',
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
        marginBottom: 10,
        marginTop: 20,
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
        fontFamily: "Jost-Medium",
        fontSize: 17,
    },
    adressInfo: {
        fontFamily: "Jost-Regular",
        fontSize: 15
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
        textAlign: "center",
        fontSize: 15,
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
        paddingVertical: 15,
        width: "85%",
        alignSelf: "center",
    },    
    empty: {
        marginTop: 20,
        alignItems: "center",
        width: "85%",
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
        fontFamily: "Jost-Regular",
        textAlign: "center",
        fontSize: 20
    },
    backButton: {
        padding: 5,
    },
});

export default MyAdress;
