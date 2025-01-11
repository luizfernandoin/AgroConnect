import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";

const EditProfile = ({ route, navigation}) =>{
    const { usuario } = route.params;

    //Configurar acesso para imagem
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Editar Perfil</Text>
            <View style={styles.profileDetails}>
                <Image style={styles.imagem} resizeMode="center" source={usuario.image}/>
                <TouchableOpacity style={styles.imageBt}>
                    <Text style={styles.btTexto}>Alterar imagem</Text>
                    <AntDesign name="picture" color="#595959" size={20}/>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.groupInput}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.item}>
                        <TextInput placeholder="Email" style={styles.input} placeholderTextColor={styles.placeholder}>{usuario.email}</TextInput>
                    </View>
                </View>
                <View style={styles.groupInput}>
                    <Text style={styles.label}>Nome</Text>
                    <View style={styles.item}>
                        <TextInput placeholder="Nome" style={styles.input} placeholderTextColor={styles.placeholder}>{usuario.nome}</TextInput>
                    </View>
                </View>
                <View style={styles.groupInput}>
                    <Text style={styles.label}>Telefone</Text>
                    <View style={styles.item}>
                        <TextInput placeholder="Telefone" style={styles.input} placeholderTextColor={styles.placeholder}>{usuario.telefone}</TextInput>
                    </View>
                </View>
                <View style={styles.groupInput}>
                    <Text style={styles.label}>Senha</Text>
                    <View style={styles.item}>
                        <TextInput secureTextEntry={true} placeholder="Senha" style={styles.input} placeholderTextColor={styles.placeholder}>{usuario.password}</TextInput>
                    </View>
                </View>
            </View>
            <View style={styles.group}>
                <TouchableOpacity style={styles.buttonSave}>
                    {/* Configurar para ao clicar em salvar fazer o update de usuario */}
                    {/* Mandar o usuário atualizado */}
                    <Text style={styles.texto} onPress={() => navigation.navigate("Profile")}>Salvar</Text> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCancel}>
                    <Text style={styles.texto} onPress={() => navigation.goBack()}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Jost-Bold",
        padding: 30,
    },
    profileDetails:{
        justifyContent: "center", 
        alignItems: "center", 
    },
    imageBt:{
        backgroundColor: "#d9d9d9",
        padding: 10,
        borderRadius: 4,
        margin: 10,
        borderColor: "#595959",
        borderWidth: 2,
        flexDirection:"row",
        alignItems: "center",
        width: "40%"
    },
    btTexto:{
        marginRight: 5,
        fontFamily: "Jost-Regular"
    },
    content:{
        alignItems: "center"
    },
    group:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        marginTop: 50
    },
    buttonSave: {
        backgroundColor: "#53B175",
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 15,
        marginHorizontal: 10,
        width: 150,
    },
    buttonCancel: {
        backgroundColor: "#F3603F",
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 15,
        marginHorizontal: 10,
        width: 150
    },
    texto:{
        color: "white",
        textAlign: "center",
        fontFamily: "Jost-Bold"
    },
    imagem: {
        borderWidth: 5,
        borderColor: "#1A6836",
        borderRadius: 100,
        width: 100,
        height: 100,
    },
    input:{
        flex: 1,
        fontSize: 15,
        paddingLeft:10,
        fontFamily: "Jost-Regular"
    },
    placeholder: {
        color: "#808080",
        fontFamily: "Jost-Regular"
    },
    groupInput:{
        marginTop: 28,
        textAlign: "left"
    },
    label: {
        fontSize: 15,
        color: "#7c7c7c",
        fontFamily: "Jost-Regular"
    },
    item:{
        width: "80%",
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: "black",
    }
});

export default EditProfile;