import { StyleSheet } from "react-native";

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
        flexDirection: "row",
    },
    destaqueBox: {
        borderColor: "#009b38",
        borderWidth: 2,
        flexDirection: "column",
    },
    imageTop: {
        alignItems: "center",
        marginBottom: 15,
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
    imageLarge: {
        width: '100%',
        height: 150,
        resizeMode: "cover",
        borderRadius: 10,
        borderColor: "#ddd",
        borderWidth: 1,
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


export default styles;