import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 28,
        backgroundColor: "#d9d9d9",
        paddingHorizontal: 15,
        width: "100%",
        height: 50,
    },
    searchBox: {
        flex: 1,
        fontSize: 16,
        color: "#181725",
        fontFamily: "Jost-Regular",
    },
    carouselContainer: {
        marginTop: 20,
        width: '100%',
        height: 150,
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    carousel: {
        flexDirection: 'row',
    },
    carouselItem: {
        width,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    sectionContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: 25,
        color: '#181725',
        fontFamily: "Jost-Medium",
    },
    moreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#28a745',
        padding: 6,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 5,
    },
    moreButtonText: {
        color: '#fff',
        marginRight: 5,
        fontFamily: "Jost-Regular",
    },
    cardList: {
        marginTop: 20,
        paddingHorizontal: 10,
        marginLeft: -17,
    },
    cardContainer: {
        shadowColor: "rgba(0, 0, 0, 0.50)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 5,
        elevation: 5,
        shadowOpacity: 1,
        borderRadius: 8,
        backgroundColor: "#fff",
        width: 150,
        height: 230,
        overflow: "hidden",
        margin: 10,
    },
    cardImage: {
        width: "100%",
        height: "70%",
    },
    textContainer: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: "#000",
    },
    cardPrice: {
        fontSize: 14,
        fontFamily: "Jost-Regular",
        color: "#000",
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
});