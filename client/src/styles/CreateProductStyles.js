import { StyleSheet, Dimensions } from "react-native";


const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fcfcfc",
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
    },
    placeholder: {
        width: 24,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 15,
        color: "#7c7c7c",
        marginBottom: 8,
        fontFamily: "Jost-Medium",
    },
    inputField: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 8,
        fontSize: 15,
        fontFamily: "Jost-Regular",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        overflow: "hidden",
    },
    imageButton: {
        backgroundColor: "#ccc",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    imageButtonText: {
        color: "#000",
        fontSize: 15,
        fontFamily: "Jost-Regular",
    },
    imageContainer: {
        marginTop: 10,
        alignItems: "center",
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: "cover",
    },
    addCepButton: {
        backgroundColor: "#ccc",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    addCepButtonText: {
        color: "#181725",
        fontSize: 15,
        fontFamily: "Jost-Regular",
    },
    submitButton: {
        backgroundColor: "#53b175",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Jost-Medium",
    },
});