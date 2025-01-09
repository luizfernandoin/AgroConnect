import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomBar from "../components/bottomBar";

const Profile = () =>{
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Meu Perfil</Text>
            <View style={styles.content}>
                <Image style={styles.image} resizeMode="center" source={require("../assets/Agro Connect Verde PNG 1.png")}/>
                <View style={styles.profileDetails}>
                    <Text style={styles.profileText}>Joao</Text>
                    <TouchableOpacity style={styles.edit} >
                        <Text style={styles.text}>Editar perfil</Text>
                        <AntDesign name="edit" size={15} color="#595959"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.list}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btTexto}>Meus Pedidos</Text>
                    <AntDesign name="right" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btTexto}>Meus Endereços</Text>
                    <AntDesign name="right" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btTexto}>Sair</Text>
                    <AntDesign name="logout" size={24} color="red" />
                </TouchableOpacity>
            </View>
            <BottomBar/>
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
        fontFamily: "Jost-Bold"
    },
    content:{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginLeft: 40
    },
    profileText: {
        fontWeight:"medium",
        fontSize: 24,
        fontFamily: "Jost-Regular"
    },
    profileDetails:{
        flex:1,
        flexDirection: "collum",
        marginLeft: 10
    },
    edit: {
        borderRadius: 18,
        marginTop: 5,
        flexDirection: "row",
        marginRight: 5,
    },
    text: {
        fontSize: 10,
        fontFamily: "Jost-Regular"
    },
    list: {
        width: "100%",
        alignItems: "center"
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
        // marginRight: "70%",
        flex: 1,
        paddingHorizontal: 10,
        padding: "3%"
    },
    image: {
        borderWidth: 5,
        borderColor: "#1A6836",
        borderRadius: 100,
        width: 100,
        height: 100
    }
});

export default Profile;
