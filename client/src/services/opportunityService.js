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
    try {
        const token = await getToken();
        const response = await fetch(`${apiConfig.baseUrl}/api/opportunities/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: opportunityData,
        });

        if (!response.ok) {
            throw new Error("Erro ao criar oportunidade");
        }
        
        const data = await response.json();
        return data;
    } catch(error) {
        console.error("Erro ao criar oportunidade:", error);
        return [];
    }
};

export const getOpportunityById = async () => {

}