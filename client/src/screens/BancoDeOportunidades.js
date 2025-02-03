import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList, Modal, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomBar from '../components/bottomBar';
import { getAllOpportunities } from "../services/opportunityService";
import styles from "../styles/Opportunities";
import Icon from 'react-native-vector-icons/Ionicons';


const tipoUsuario = "produtor";


const BancoDeOportunidades = ({ navigation }) => {
    const [oportunidades, setOportunidades] = useState();
    const [filtro, setFiltro] = useState('Todas');
    const [isModalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newProposal, setNewProposal] = useState({
        titulo: "",
        descricao: "",
        tipo: "",
        regiao: "",
        dataInicio: "",
        dataFim: "",
        valor: "",
        imagem: null,
        destaque: false
    });

    // Ordenar oportunidades com destaques primeiro
    const sortedOportunidades = oportunidades.sort((a, b) => b.destaque - a.destaque);

    const handleAddProposal = () => {
        if (!newProposal.titulo || !newProposal.descricao || !newProposal.tipo || !newProposal.regiao || !newProposal.dataInicio || !newProposal.dataFim || !newProposal.valor) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }


        const newOportunity = new FormData();
        newOportunity.append("title", newProposal.titulo);
        newOportunity.append("description", newProposal.descricao);
        newOportunity.append("type", newProposal.tipo);
        newOportunity.append("startDate", newProposal.dataInicio);
        newOportunity.append("endDate", newProposal.dataFim);
        newOportunity.append("value", newProposal.valor);

        setOportunidades([...oportunidades, newOportunity]);
        setModalVisible(false);
        setNewProposal({ titulo: "", descricao: "", tipo: "", regiao: "", dataInicio: "", dataFim: "", valor: "", imagem: null });
    };

    const handleCandidatar = (id) => {
        const candidato = {
            nome: "Candidato Exemplo",
            telefone: "12345-6789",
        };
        /*
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
        */
    };
    /*
    const filtrarOportunidades = () => {
        if (filtro === 'Candidatadas') {
            return sortedOportunidades.filter(oportunidade => oportunidade.candidatos.some(c => c.nome === "Candidato Exemplo"));
        } else if (filtro === 'Minhas Propostas' && tipoUsuario === 'produtor') {
            return sortedOportunidades.filter(oportunidade => oportunidade.criador === tipoUsuario);
        } else {
            return sortedOportunidades;
        }
    };
    */

    useEffect(() => {
        fetchOpportunities();
    }, []);


    const fetchOpportunities = async () => {
        try {
            const data = await getAllOpportunities();
            setOportunidades(data);
        } catch (error) {
            console.error("Erro ao carregar oportunidades:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderOportunity = ({ item }) => (
        <View style={[styles.oportunityBox, item.destaque && styles.destaqueBox]}>
            {item.destaque ? (
                <View style={styles.imageTop}>
                    <Image style={styles.imageLarge} source={item.imagem} />
                </View>
            ) : (
                <View style={styles.imageBox}>
                    <Image style={styles.image} source={item.imagem} />
                </View>
            )}
            <View style={styles.infoBox}>
                <Text style={styles.cardTitle}>{item.title}</Text> {/* Título da oportunidade */}
                <Text style={styles.oportunity} numberOfLines={2}>{item.description}</Text> {/* Descrição */}
                <View style={styles.oportunityInfo}>
                    <View style={styles.info}>
                        <AntDesign name="enviroment" size={20} color="black" />
                        <Text style={styles.infoText}>{item.producer.name}</Text> {/* Nome do produtor */}
                    </View>
                    <View style={styles.info}>
                        <FontAwesome name="calendar" size={20} color="black" />
                        <Text style={styles.infoText}>De: {item.startDate} Até: {item.endDate}</Text> {/* Datas */}
                    </View>
                    <View style={styles.info}>
                        <FontAwesome name="dollar" size={20} color="black" />
                        <Text style={styles.infoText}>R${item.value}</Text> {/* Valor */}
                    </View>
                </View>
                {/* Outros elementos do componente */}
            </View>
        </View>
    );


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Banco de Oportunidades</Text>
                <View style={styles.placeholder} />
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
                data={oportunidades}
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


export default BancoDeOportunidades;