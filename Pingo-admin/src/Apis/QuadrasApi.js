import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Configuração global do axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getQuadrasPub = async () => {
  try {
    const response = await api.get('/quadraspub');
    // Verifica se a resposta tem dados e está no formato esperado
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Formato de dados inválido da API');
    }
    return response.data;
  } catch (error) {
    console.error("Erro ao obter quadras:", error);
    throw new Error(`Falha ao carregar quadras: ${error.message}`);
  }
};

export const createQuadrasPub = async (quadraData) => {
  try {
    const response = await api.post('/quadraspub', quadraData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar quadra:', error);
    throw new Error(`Falha ao criar quadra: ${error.response?.data?.message || error.message}`);
  }
};

export const deleteQuadraPub = async (id) => {
  try {
    const response = await api.delete(`/quadraspub/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar quadra:', error);
    throw new Error(`Falha ao deletar quadra: ${error.message}`);
  }
};