import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getQuadrasPub = async () => {
    try {
        const response = await axios.get(`${API_URL}/quadraspub`); //Response vai ter dentro dele os dados da API
        return response.data;
    }catch (error) {
        console.error("Erro ao obter quadras:", error);
    }
};

export const createQuadrasPub = async (NomeQuadra, EnderecoQuadra, Bairro, Cidade) => {
    try{
        const response = await axios.post(`${API_URL}/quadraspub`, {
            NomeQuadra, 
            EnderecoQuadra, 
            Bairro, 
            Cidade
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar reserva:', error);
    }
};