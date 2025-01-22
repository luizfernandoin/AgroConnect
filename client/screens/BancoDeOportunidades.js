import React, { useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Modal, TextInput, TouchableOpacity, Alert } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomBar from '../components/bottomBar';

const tipoUsuario = "produtor";

const oportunidadesData = [
    {
        id: "1",
        titulo: "Ralar milho",
        descricao: "Ralar milho e separar sabugo",
        tipo: "Agricultura",
        regiao: "Fazenda Feliz",
        dataInicio: "2025-01-20",
        dataFim: "2025-01-25",
        valor: "100",
        imagem: require("../assets/Agro Connect Verde PNG 1.png"),
        candidatos: [],
        criador: "produtor", 
    },
];

const BancoDeOportunidades = () => {
    const [oportunidades, setOportunidades] = useState(oportunidadesData);
    const [filtro, setFiltro] = useState('Todas');
    const [isModalVisible, setModalVisible] = useState(false);
    const [newProposal, setNewProposal] = useState({
        titulo: "",
        descricao: "",
        tipo: "",
        regiao: "",
        dataInicio: "",
        dataFim: "",
        valor: "",
        imagem: null,
    });

    const handleAddProposal = () => {
        if (!newProposal.titulo || !newProposal.descricao || !newProposal.tipo || !newProposal.regiao || !newProposal.dataInicio || !newProposal.dataFim || !newProposal.valor) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        const newOportunity = {
            ...newProposal,
            id: (oportunidades.length + 1).toString(),
            imagem: require("../assets/Agro Connect Verde PNG 1.png"),
            candidatos: [],
            criador: tipoUsuario,
        };

        setOportunidades([...oportunidades, newOportunity]);
        setModalVisible(false);
        setNewProposal({ titulo: "", descricao: "", tipo: "", regiao: "", dataInicio: "", dataFim: "", valor: "", imagem: null });
    };

    const handleCandidatar = (id) => {
        const candidato = {
            nome: "Candidato Exemplo",
            telefone: "12345-6789", 
        };
        
        setOportunidades(oportunidades.map(oportunidade => {
            if (oportunidade.id === id) {
                if (!oportunidade.candidatos.some(c => c.nome === candidato.nome && c.telefone === candidato.telefone)) {
                    return {
                        ...oportunidade,
                        candidatos: [...oportunidade.candidatos, candidato],
                    };
                } else {
                    Alert.alert("Aviso", "Você já se candidatou a esta proposta.");
                }
            }
            return oportunidade;
        }));
    };

    const filtrarOportunidades = () => {
        if (filtro === 'Candidatadas') {
            return oportunidades.filter(oportunidade => oportunidade.candidatos.some(c => c.nome === "Candidato Exemplo"));
        } else if (filtro === 'Minhas Propostas' && tipoUsuario === 'produtor') {
            return oportunidades.filter(oportunidade => oportunidade.criador === tipoUsuario);
        } else {
            return oportunidades;
        }
    };

    const renderOportunity = ({ item }) => (
        <View style={styles.oportunityBox}>
            <View style={styles.imageBox}>
                <Image style={styles.image} source={item.imagem} />
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.oportunity} numberOfLines={2}>{item.descricao}</Text>
                <View style={styles.oportunityInfo}>
                    <View style={styles.info}>
                        <AntDesign name="enviroment" size={20} color="black" />
                        <Text style={styles.infoText}>{item.regiao}</Text>
                    </View>
                    <View style={styles.info}>
                        <FontAwesome name="calendar" size={20} color="black" />
                        <Text style={styles.infoText}>De: {item.dataInicio} Até: {item.dataFim}</Text>
                    </View>
                    <View style={styles.info}>
                        <FontAwesome name="dollar" size={20} color="black" />
                        <Text style={styles.infoText}>R${item.valor}/dia</Text>
                    </View>
                </View>
                {!item.candidatos.some(c => c.nome === "Candidato Exemplo") && (
                    <TouchableOpacity style={styles.candidatarButton} onPress={() => handleCandidatar(item.id)}>
                        <Text style={styles.candidatarButtonText}>Candidatar-se</Text>
                    </TouchableOpacity>
                )}
                {tipoUsuario === "produtor" && filtro === 'Minhas Propostas' && (
                    <View>
                        <Text style={styles.candidatosTitle}>Candidatos:</Text>
                        {item.candidatos.map((candidato, index) => (
                            <Text key={index} style={styles.candidatoInfo}>{candidato.nome} - {candidato.telefone}</Text>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Banco de Oportunidades</Text>
            </View>
            <View style={styles.filterContainer}>
                {['Todas', 'Candidatadas', ...(tipoUsuario === 'produtor' ? ['Minhas Propostas'] : [])].map((status) => (
                    <TouchableOpacity
                        key={status}
                        style={[styles.filterButton, filtro === status && styles.activeFilterButton]}
                        onPress={() => setFiltro(status)}
                    >
                        <Text style={[styles.filterButtonText, filtro === status && styles.activeFilterButtonText]}>
                            {status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={filtrarOportunidades()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderOportunity}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
            {tipoUsuario === "produtor" && (
                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <AntDesign name="pluscircle" size={60} color="#009b38" />
                </TouchableOpacity>
            )}
            <BottomBar />

            {/* Modal */}
            <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Nova Proposta</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Título"
                            value={newProposal.titulo}
                            onChangeText={(text) => setNewProposal({ ...newProposal, titulo: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição"
                            value={newProposal.descricao}
                            onChangeText={(text) => setNewProposal({ ...newProposal, descricao: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Tipo"
                            value={newProposal.tipo}
                            onChangeText={(text) => setNewProposal({ ...newProposal, tipo: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Região"
                            value={newProposal.regiao}
                            onChangeText={(text) => setNewProposal({ ...newProposal, regiao: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Data de Início"
                            value={newProposal.dataInicio}
                            onChangeText={(text) => setNewProposal({ ...newProposal, dataInicio: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Data de Fim"
                            value={newProposal.dataFim}
                            onChangeText={(text) => setNewProposal({ ...newProposal, dataFim: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Valor (por dia)"
                            keyboardType="numeric"
                            value={newProposal.valor}
                            onChangeText={(text) => setNewProposal({ ...newProposal, valor: text })}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={handleAddProposal}>
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        elevation: 3,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Jost-SemiBold',
        color: '#333',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#fff',
        elevation: 3,
        zIndex: 1,
    },
    filterButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f1f1f1',
    },
    activeFilterButton: {
        backgroundColor: '#009b38',
    },
    filterButtonText: {
        fontSize: 14,
        fontFamily: "Jost-Regular",
        color: '#848484',
    },
    activeFilterButtonText: {
        color: '#fff',
    },
    listContent: {
        paddingBottom: 100,
    },
    oportunityBox: {
        flexDirection: "row",
        padding: 15,
        marginHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 15,
        marginTop: 10,
    },
    imageBox: {
        justifyContent: "center",
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: "cover",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    infoBox: {
        flex: 1,
        marginLeft: 15,
    },
    cardTitle: {
        fontFamily: "Jost-Bold",
        color: "#009b38", 
        fontSize: 18,
    },
    oportunity: {
        color: "#000", 
        fontFamily: "Jost-Regular",
        fontSize: 16,
        marginTop: 5,
    },
    oportunityInfo: {
        marginTop: 10,
    },
    info: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    infoText: {
        marginLeft: 5,
        fontFamily: "Jost-Regular",
        fontSize: 14,
        color: "#333",
    },
    candidatarButton: {
        marginTop: 10,
        backgroundColor: "#009b38",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    candidatarButtonText: {
        color: "#fff",
        fontFamily: "Jost-Bold",
        fontSize: 16,
    },
    candidatosTitle: {
        marginTop: 10,
        fontFamily: "Jost-Bold",
        fontSize: 16,
        color: "#333",
    },
    candidatoInfo: {
        marginTop: 5,
        fontFamily: "Jost-Regular",
        fontSize: 14,
        color: "#333",
    },
    addButton: {
        position: "absolute",
        bottom: 80,
        right: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "90%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
        fontFamily: "Jost-Bold",
        color: "#009b38",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontFamily: "Jost-Regular",
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cancelButton: {
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        width: "45%",
        alignItems: "center",
    },
    saveButton: {
        backgroundColor: "#009b38",
        padding: 10,
        borderRadius: 5,
        width: "45%",
        alignItems: "center",
    },
    buttonText: {
        fontFamily: "Jost-Bold",
        color: "#fff",
        fontSize: 16,
    },
});

export default BancoDeOportunidades;