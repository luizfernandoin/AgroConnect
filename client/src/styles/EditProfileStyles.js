import { StyleSheet, Dimensions } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
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
        textAlign: "center",
    },
    placeholder: {
        width: 24,
        color: "#808080",
        fontFamily: "Jost-Regular"
    },
    scrollContainer: {
        flex: 1,
    },
    profileDetails: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    imageBt: {
        backgroundColor: "#d9d9d9",
        padding: 10,
        borderRadius: 4,
        margin: 10,
        borderColor: "#595959",
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        width: "40%"
    },
    btTexto: {
        marginRight: 5,
        fontFamily: "Jost-Regular",
        paddingHorizontal: 5,
    },
    content: {
        alignItems: "center"
    },
    group: {
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
    texto: {
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
    input: {
        flex: 1,
        fontSize: 15,
        paddingLeft: 10,
        fontFamily: "Jost-Regular"
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
        width: "80%",
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E2E2",
    }
});


export default styles;