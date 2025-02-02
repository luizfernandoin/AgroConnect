import { StyleSheet, Dimensions } from "react-native";


const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fcfcfc",
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 80, 
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: width * 0.3,
        height: width * 0.3,
        resizeMode: "contain",
        marginBottom: 10,
    },
    criarContaTitle: {
        fontSize: 25,
        fontWeight: "500",
        fontFamily: "Jost-Medium",
        color: "#181725",
        textAlign: "left",
        alignSelf: "flex-start",
    },
    insiraSeusDados: {
        fontSize: 15,
        color: "#7c7c7c",
        fontFamily: "Jost-Regular",
        textAlign: "left",
        alignSelf: "flex-start",
    },
    radioGroup: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        justifyContent: 'space-evenly'
    },
    radioItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
    },
    radioLabel: {
        fontSize: 15,
        fontFamily: "Jost-Regular",
        color: "#181725",
    },
    footer: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    createButton: {
        backgroundColor: "#53b175",
        borderRadius: 18,
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 10,
    },
    createButtonText: {
        fontSize: 18,
        color: "#fff",
        fontFamily: "Jost-Regular",
    },
    loginPrompt: {
        textAlign: "center",
        fontSize: 13,
        fontFamily: "Jost-Regular",
        color: "#181725",
    },
    loginLink: {
        color: "#53b175",
        fontSize: 15,
        fontFamily: "Jost-Regular",
    },
    fileInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    fileInputText: {
        fontSize: 16,
        fontFamily: "Jost-Regular",
        color: "#7c7c7c",
    },
    previewImage: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        marginTop: 10,
    },
});
