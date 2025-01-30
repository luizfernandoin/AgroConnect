import { View, StyleSheet } from "react-native";
import NavigationButton from "./navigationButton";
import { useNavigation } from "@react-navigation/native"
 
const BottomBar = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.bar}> 
            <NavigationButton iconName="home" onPress={() => navigation.navigate("Home")}/>
            <NavigationButton iconName="menufold" onPress={() => navigation.navigate("BancoDeOportunidades")}/>
            <NavigationButton iconName="hearto" onPress={() => navigation.navigate("Favoritos")}/>
            <NavigationButton iconName="shoppingcart" onPress={() => navigation.navigate("Carrinho")}/>
            <NavigationButton iconName="user" onPress={() => navigation.navigate("Profile")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    bar:{
        backgroundColor: "#ffff",
        paddingVertical: 20,
        paddingHorizontal: 20,
        position: "absolute", 
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
});

export default BottomBar;