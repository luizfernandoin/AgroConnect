import { StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        padding: 30,
        fontFamily: "Jost-Bold",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginLeft: 40,
    },
    profileText: {
        fontWeight: "medium",
        fontSize: 24,
        fontFamily: "Jost-Regular",
    },
    profileDetails: {
        flex: 1,
        flexDirection: "column",
        marginLeft: 10,
    },
    edit: {
        borderRadius: 18,
        marginTop: 5,
        flexDirection: "row",
        marginRight: 5,
    },
    text: {
        fontSize: 13,
        fontFamily: "Jost-Regular",
    },
    list: {
        width: "100%",
        alignItems: "center",
        marginTop: 15,
    },
    button: {
        backgroundColor: "#53b175",
        padding: 10,
        borderRadius: 18,
        width: "85%",
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    btTexto: {
        color: "white",
        flex: 1,
        paddingHorizontal: 10,
        padding: "3%",
        fontSize: 15,
        fontFamily: 'Jost-Regular'
    },
    image: {
        borderWidth: 5,
        borderColor: "#1A6836",
        borderRadius: 100,
        width: 100,
        height: 100,
    },
});


export default styles;