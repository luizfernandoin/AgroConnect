import { apiConfig } from "../config/api";
import { getToken } from "./authService";

export const getAllOpportunities = async () => {
    try {
        const response = await fetch(`${apiConfig.baseUrl}/api/opportunities/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar oportunidades");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Erro ao buscar oportunidades:", error);
        return [];
    }
};

export const createOpportunity = async (opportunityData) => {
    const token = await getToken();
    console.log(`${apiConfig.baseUrl}/api/opportunities/`);
    try {
        const response = await fetch(`${apiConfig.baseUrl}/api/opportunities/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(opportunityData),
        });

        if (!response.ok) {
            throw new Error(`Erro ao criar oportunidade: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Erro ao criar oportunidade:', error);
        throw error;
    }
};

export const getOpportunityById = async () => {

}