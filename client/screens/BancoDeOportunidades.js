import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomBar from "../components/bottomBar"

const oportunidades = [
    {
        id: "1",
        userName: "Leandro Carvalho",
        descricao: "Ralar milho e separar sabugo",
        local: "Fazenda Feliz",
        valor: "100",
        imagem: require("../assets/Agro Connect Verde PNG 1.png"),
    },
    {
        id: "2",
        userName: "Natalia Abreu",
        descricao: "Operação de máquinas agrícolas",
        local: "Fazenda do Sol",
        valor: "150",
        imagem: require("../assets/Agro Connect Verde PNG 1.png"),
    },
    {
        id: "3",
        userName: "Natalia Abreu",
        descricao: "Colheita de Cana-de-Açúcar",
        local: "Fazenda do Sol",
        valor: "300",
        imagem: require("../assets/Agro Connect Verde PNG 1.png"),
    }
]

const BancoDeOportunidades = () => {

    const renderOportunity = ({ item }) => (
        <View style={styles.oportunityBox}>
            <View style={styles.imageBox}>
                <Image style={styles.image} source={item.imagem} />
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.user}>{item.userName}</Text>
                <Text style={styles.oportunity} numberOfLines={2}>{item.descricao}</Text>
                <View style={styles.oportunityInfo}>
                    <View style={styles.info}>
                        <AntDesign name="enviromento" size={20} color="black" />
                        <Text>{item.local}</Text>
                    </View>
                    <View style={styles.info}>
                        <FontAwesome name="dollar" size={20} color="black" />
                        <Text style={styles.infoText} numberOfLines={1} ellipsizeMode="tail">R${item.valor}/dia</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Oportunidades</Text>
            <FlatList
                data={oportunidades}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderOportunity}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
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
        marginTop: 10,
        fontFamily: "Jost-Bold"
    },
    oportunityBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginHorizontal: 20,
        gap: 15,
        marginVertical: 10,
    },
    user: {
        fontFamily: "Jost-Regular",
        color: "#7c7c7c"
    },
    oportunity: {
        color: "#009b38",
        fontFamily: "Jost-Medium",
        fontSize: 18,
        maxWidth: "100%"
    },
    oportunityInfo: {
        marginTop: 10,
    },
    info: {
        flexDirection: "row",
        alignItems: "center",
    },
    infoText: {
        marginLeft: 5,
        fontFamily: "Jost-Regular",
        fontSize: 14,
        color: "#333",
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 15
    },
    infoBox: {
        flex: 1,
        marginRight: 10
    },
    imageBox:{
        justifyContent: "center"
    }
});

export default BancoDeOportunidades;