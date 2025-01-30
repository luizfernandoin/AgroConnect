import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

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
    },
    placeholder: {
        width: 24,
    },
    addButton: {
        backgroundColor: '#53b175',
        padding: 15,
        borderRadius: 8,
        margin: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Jost-Medium'
    },
    flatListContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    row: {
        justifyContent: 'space-between',
    },
    cardContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 5,
        overflow: 'hidden',
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: width / 2.5,
    },
    textContainer: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: 'Jost-SemiBold',
        color: '#333',
    },
    cardPrice: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
        fontFamily: 'Jost-Regular'
    },
});


export default styles;