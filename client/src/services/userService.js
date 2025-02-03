import { apiConfig } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "./authService";


export const getProfile = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${apiConfig.baseUrl}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar perfil');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        return [];
    }
};

export const getUserById = async () => {

}

export const deleteUserByToken = async () => {

};

export const deleteUserById = async () => {

};

export const updateUser = async (userData) => {
    const token = await getToken();
    console.log(`${apiConfig.baseUrl}/api/users/`);
    try {
        const response = await fetch(`${apiConfig.baseUrl}/api/users/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: userData,
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar usuário: ${response.status}`);
        }

        const result = await response.json();
        console.log("Resposta do servidor ao atualizar usuário:", result);
        return result;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
};

