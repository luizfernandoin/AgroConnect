import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiConfig } from "../config/api";


export const login = async (email, password) => {
    const loginData = {
        email,
        password,
    };

    try {
        console.log(`Fazendo login com email ${email} e senha ${password}`);
        console.log(`Conectando com ${apiConfig.baseUrl}/api/auth/login`);

        const response = await fetch(`${apiConfig.baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        const responseText = await response.text();
        console.log('Texto da resposta:', responseText);

        if (response.ok) {
            console.log('chegou em ok');

            try {
                const responseData = JSON.parse(responseText);
                console.log('JSON parseado:', responseData);

                const token = responseData.data?.token;
                console.log(`token: ${token}`);

                if (token) {
                    await AsyncStorage.setItem('token', token);
                    console.log('Token salvo:', await getToken());
                }

                return { success: true, data: responseData };
            } catch (error) {
                console.error('Erro ao fazer parsing do JSON:', error);
                return { success: false, error: 'Erro ao processar resposta JSON' };
            }
        } else {
            console.log('Resposta não OK, tentando capturar erro...');

            try {
                const errorData = JSON.parse(responseText);
                console.log('Erro no login:', errorData);
                return { success: false, error: errorData };
            } catch (error) {
                console.error('Erro ao processar erro do backend:', error);
                return { success: false, error: 'Erro desconhecido no servidor' };
            }
        }
    } catch (error) {
        console.error('Erro ao conectar com o backend:', error);
        return { success: false, error: 'Erro ao conectar com o backend.' };
    }
};


export const register = async (formData) => {
    try {
        const response = await fetch(`${apiConfig.baseUrl}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });

        const responseText = await response.text();

        if (response.ok) {
            return { success: true, message: "Conta criada com sucesso!" };
        } else {
            const errorData = JSON.parse(responseText);
            return { success: false, message: errorData.message || "Erro ao criar conta." };
        }
    } catch (error) {
        console.error('Erro ao conectar com o backend:', error);
        return { success: false, message: "Erro ao conectar com o backend." };
    }
}

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Erro ao buscar token:', error);
        return null;
    }
}
