import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

const LoadingPage = () => {
    const navigation = useNavigation();
    useEffect(()=>{
        const time = setTimeout(() =>{
            navigation.replace("Login");
        }, 2000);

        return () => clearTimeout(time);
    });
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/Agro Connect Verde PNG 1.png")}
                style={styles.logo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    logo:{
        width: "70%",
        height: "70%",
        resizeMode: "contain"
    }
});

export default LoadingPage;
