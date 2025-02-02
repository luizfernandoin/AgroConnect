import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { inputStyles } from "../../styles/InputStyles";


const Input = ({ label, placeholder, value, onChangeText, keyboardType = "default", isPassword = false }) => {
    const [secureText, setSecureText] = useState(isPassword);

    return (
        <View style={inputStyles.inputGroup}>
            <Text style={inputStyles.inputLabel}>{label}</Text>
            <View style={inputStyles.inputContainer}>
                <TextInput
                    style={inputStyles.inputField}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureText}
                />
                {isPassword && (
                    <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                        <Icon name={secureText ? "visibility-off" : "visibility"} size={24} color="#7c7c7c" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};


export default Input;