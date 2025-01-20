import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import BottomBar from "../components/bottomBar";
import { useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons';

const AddAdress = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [endereço, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');
    const [telefone, setTelefone] = useState('');

    const validarCampos = () => {
        if (!nome || !endereço || !numero || !cep || !bairro || !cidade || !estado || !pais || !telefone) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return false;
        }
        return true;
    };

    const createAdress = async () => {
        if(validarCampos()){
            const newAdress = {
                nome,
                endereço,
                numero,
                cep,
                bairro,
                cidade, 
                estado, 
                pais,
                telefone
            }
            Alert.alert("Criado", "Novo endereço criado com sucesso");
            console.log(newAdress);
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Adicionar Endereço</Text>
                <View style={styles.placeholder} />
            </View>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.content}>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>Nome Completo</Text>
                        <View style={styles.item}>
                            <TextInput value={nome} onChangeText={setNome} placeholder="Nome completo" style={styles.input} placeholderTextColor={styles.placeholder} />
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>Endereço</Text>
                        <View style={styles.item}>
                            <TextInput value={endereço} onChangeText={setEndereco} placeholder="Endereço" style={styles.input} placeholderTextColor={styles.placeholder} />
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>Número da residência</Text>
                        <View style={styles.item}>
                            <TextInput value={numero} onChangeText={setNumero} placeholder="Número da residência" style={styles.input} placeholderTextColor={styles.placeholder} />
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>CEP</Text>
                        <View style={styles.item}>
                            <TextInput value={cep} onChangeText={setCep} placeholder="CEP" style={styles.input} placeholderTextColor={styles.placeholder} />
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>Bairro</Text>
                        <View style={styles.item}>
                            <TextInput value={bairro} onChangeText={setBairro} placeholder="Bairro" style={styles.input} placeholderTextColor={styles.placeholder} />
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>Cidade</Text>
                        <View style={styles.item}>
                            <TextInput value={cidade} onChangeText={setCidade} placeholder="Cidade" style={styles.input} placeholderTextColor={styles.placeholder} />
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>Estado</Text>
                        <View style={styles.item}>
                            <TextInput value={estado} onChangeText={setEstado} placeholder="Estado" style={styles.input} placeholderTextColor={styles.placeholder} />
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>País</Text>
                        <View style={styles.item}>
                            <TextInput value={pais} onChangeText={setPais}  placeholder="País" style={styles.input} placeholderTextColor={styles.placeholder} />
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.label}>Telefone</Text>
                        <View style={styles.item}>
                            <TextInput value={telefone} onChangeText={setTelefone} placeholder="Telefone" style={styles.input} placeholderTextColor={styles.placeholder} />
                        </View>
                    </View>
                </View>
                <View style={styles.btBox}>
                    <TouchableOpacity style={styles.button} onPress={createAdress}>
                        <Text style={styles.btText}>Adicionar novo endereço</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <BottomBar />
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
        flex: 1,
        textAlign: 'center',
    },
    placeholder: {
        width: 24,
        color: "#808080",
        fontFamily: "Jost-Regular"
    },
    btBox: {
        alignItems: "center"
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
        fontFamily: "Jost-Medium",
        marginBottom: 8,
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
        width: "85%",
        margin: 10
    },
    btText: {
        textAlign:"center", 
        fontWeight: "bold",
        color: "white",
        padding: "3%"
    },
    input: {
        flex: 1,
        fontSize: 15,
        paddingLeft: 10,
        fontFamily: "Jost-Regular"
    },
});

export default AddAdress;