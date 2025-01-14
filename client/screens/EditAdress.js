import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import BottomBar from "../components/bottomBar";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const EditAdress = ({ route }) => {
    const { item } = route.params;

    const [nome, setNome] = useState(item.nome || '');
    const [rua, setRua] = useState(item.rua || '');
    const [numero, setNumero] = useState(item.numero || '');
    const [cep, setCep] = useState(item.cep || '');
    const [bairro, setBairro] = useState(item.bairro || '');
    const [cidade, setCidade] = useState(item.cidade || '');
    const [estado, setEstado] = useState(item.estado || '');
    const [pais, setPais] = useState(item.pais || '');
    const [telefone, setTelefone] = useState(item.telefone || '');
    const navigation = useNavigation();

    const validarCampos = () => {
        if (!nome || !rua || !numero || !cep || !bairro || !cidade || !estado || !pais || !telefone) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return false;
        }
        return true;
    };

    const atualizarEndereco = () =>{
        if (validarCampos()){
            const updatedAdress = {
                id: item.id,
                userId: item.userId,
                nome,
                rua, 
                numero,
                cep,
                bairro,
                cidade,
                estado,
                pais,
                telefone
            };
            Alert.alert("Atualizado", "Dados de endereço Atualizados")
            console.log(updatedAdress);
            navigation.goBack("MyAdress")
        }
    }

    return (
        <View content={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.title}>Alterar Endereço</Text>
                <View style={styles.content}>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>Nome Completo</Text>
                        <View style={styles.item}>
                            <TextInput value={nome} onChangeText={setNome} placeholder="Nome completo" style={styles.input} placeholderTextColor={styles.placeholder}/>
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>Endereço</Text>
                        <View style={styles.item}>
                            <TextInput value={rua} onChangeText={setRua} placeholder="Endereço" style={styles.input} placeholderTextColor={styles.placeholder}/>
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>Número da residência</Text>
                        <View style={styles.item}>
                            <TextInput value={numero} onChangeText={setNumero} placeholder="Número da residência" style={styles.input} placeholderTextColor={styles.placeholder}/>
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>CEP</Text>
                        <View style={styles.item}>
                            <TextInput value={cep} onChangeText={setCep} placeholder="CEP" style={styles.input} placeholderTextColor={styles.placeholder}/>
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>Bairro</Text>
                        <View style={styles.item}>
                            <TextInput value={bairro} onChangeText={setBairro} placeholder="Bairro" style={styles.input} placeholderTextColor={styles.placeholder}/>
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>Cidade</Text>
                        <View style={styles.item}>
                            <TextInput value={cidade} onChangeText={setCidade} placeholder="Cidade" style={styles.input} placeholderTextColor={styles.placeholder}/>
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>Estado</Text>
                        <View style={styles.item}>
                            <TextInput value={estado} onChangeText={setEstado} placeholder="Estado" style={styles.input} placeholderTextColor={styles.placeholder}/>
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>País</Text>
                        <View style={styles.item}>
                            <TextInput value={pais} onChangeText={setPais} placeholder="País" style={styles.input} placeholderTextColor={styles.placeholder}/>
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>Telefone</Text>
                        <View style={styles.item}>
                            <TextInput value={telefone} onChangeText={setTelefone} placeholder="Telefone" style={styles.input} placeholderTextColor={styles.placeholder}/>
                        </View>
                    </View>
                </View>
                <View style={styles.btBox}>
                    <TouchableOpacity style={styles.button} onPress={atualizarEndereco}>
                        <Text style={styles.btText}>Salvar Alterações</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <BottomBar />
        </View>
    );
};

const styles = StyleSheet.create({
    btBox: {
        alignItems: "center"
    },
    container: {
        flex: 1,
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Jost-Bold",
        padding: 30,
    },
    content: {
        marginHorizontal: 20
    },
    scroll: {
        paddingBottom: 100,
    },
    groupInput: {
        marginTop: 28,
        textAlign: "left"
    },
    label: {
        fontSize: 15,
        color: "#7c7c7c",
        fontFamily: "Jost-Regular"
    },
    item: {
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E2E2",
    },
    button: {
        backgroundColor: "#53b175",
        padding: 10,
        borderRadius: 18,
        width: "80%",
        margin: 10
    },
    btText: {
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
        padding: "3%"
    }
});

export default EditAdress;