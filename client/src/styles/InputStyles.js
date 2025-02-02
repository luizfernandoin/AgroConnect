import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 15,
        fontFamily: "Jost-Medium",
        color: "#7c7c7c",
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 8,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputField: {
        flex: 1, 
        fontSize: 15,
        fontFamily: "Jost-Regular",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        overflow: "hidden",
    },
});