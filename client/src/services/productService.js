import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiConfig } from "../config/api";
import { getToken } from "./authService";


export const getAllProducts = async () => {
    try {
        const response = await fetch(`${apiConfig.baseUrl}/api/products/`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return { error: "Não foi possível carregar os produtos" };
    }
};

export const getProductsByUser = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${apiConfig.baseUrl}/api/users/products`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }

        const data = await response.json(); // Extrai os dados JSON da resposta
        console.log(JSON.stringify(data, null, 2));

        console.log(data); // Verifique os dados no console

        return data; // Retorna os dados obtidos
    } catch (error) {
        console.error('Erro ao buscar produtos do usuário:', error);
        return []; // Retorna um array vazio em caso de erro
    }
};


export const createProduct = async (produtoData) => {
    const token = await getToken();

    try {
        const response = await fetch(`${apiConfig.baseUrl}/api/products/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
            body: produtoData,
        });

        const responseText = await response.text();
        console.log("Response Text:", responseText);

        if (response.ok) {
            const product = JSON.parse(responseText);
            console.log(product);
            return { success: true, productId: product.productId, message: "Produto criado com sucesso!" };
        } else {
            let errorMessage = "Erro ao criar produto.";
            try {
                const errorData = JSON.parse(responseText);
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                console.error("Erro ao interpretar a resposta do erro:", e);
            }
            return { success: false, message: errorMessage };
        }
    } catch (error) {
        console.error("Erro ao conectar com o backend:", error);
        return { success: false, message: "Erro ao conectar com o backend." };
    }
};

export const addCategoriesToProduct = async (productId, categories) => {
    const token = await getToken();
    console.log(productId, categories);

    try {
        const response = await fetch(`${apiConfig.baseUrl}/api/products/${productId}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(categories),
        });

        const responseText = await response.text();

        if (response.ok) {
            return { success: true, message: "Categorias adicionadas com sucesso!" };
        } else {
            let errorMessage = "Erro ao adicionar categorias.";
            try {
                const errorData = JSON.parse(responseText);
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                console.error("Erro ao interpretar a resposta do erro:", e);
            }
            return { success: false, message: errorMessage };
        }
    } catch (error) {
        console.error("Erro ao conectar com o backend:", error);
        return { success: false, message: "Erro ao conectar com o backend." };
    }
};

export const getAllCategories = async () => {
    const token = await getToken();

    try {
        const response = await fetch(`${apiConfig.baseUrl}/api/categories`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Erro ao buscar categorias');
        }
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        throw error;
    }
};