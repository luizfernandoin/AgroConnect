import { apiConfig } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


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
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${apiConfig.baseUrl}/api/users/`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: userData,
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar usuário: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
};
