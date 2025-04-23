import axios from 'axios';

const API_URL = 'http://localhost:5000';


//Sessão Quadras Publicas BackEnd

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

export const deleteQuadraPub = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/quadraspub/delete/${id}`);
        return response.data;
    }catch (error) {
        console.error('Erro ao deletar quadra:', error);
        throw error;
    }
};


export const updateQuadrasPub = async (id, NomeQuadra, EnderecoQuadra, Bairro, Cidade) => {
    try{
        const response = await axios.put(`${API_URL}/quadraspub/att/${id}`, {
            NomeQuadra,
            EnderecoQuadra,
            Bairro,
            Cidade
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar quadra:', error);
        throw error;
    }
}

export const getSingleQuadrasPub = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/quadraspub/${id}`)
        return response.data;
    }catch (error) {
        console.error('Erro ao obter a quadra:', error)
        throw error;
    };
};


//Sessão Quadras Privadas BackEnd
export const getQuadrasPriv = async () => {
    try {
        const response = await axios.get(`${API_URL}/quadraspriv`); //Response vai ter dentro dele os dados da API
        return response.data;
    }catch (error) {
        console.error("Erro ao obter quadras:", error);
    }
};

export const deleteQuadraPriv = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/quadraspriv/delete/${id}`);
        return response.data;
    }catch (error) {
        console.error('Erro ao deletar quadra:', error);
        throw error;
    }
};

export const getSingleQuadrasPriv = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/quadraspriv/${id}`)
        return response.data;
    }catch (error) {
        console.error('Erro ao obter a quadra:', error)
        throw error;
    };
};


export const updateQuadrasPriv = async (id, NomeQuadra, EnderecoQuadra, Bairro, Cidade) => {
    try{
        const response = await axios.put(`${API_URL}/quadraspub/att/${id}`, {
            NomeQuadra,
            EnderecoQuadra,
            Bairro,
            Cidade
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar quadra:', error);
        throw error;
    }
}



//Sessão Usuarios BackEnd
export const getUsuarios = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`); //Response vai ter dentro dele os dados da API
      return response.data;
    } catch (error) {
      console.error("Erro ao obter quadras:", error);
    }
  };
  
  export const deleteUsuario = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/users/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar quadra:", error);
      throw error;
    }
  };


export const getSingleUsuario = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/user/${id}`)
        return response.data;
    }catch (error) {
        console.error('Erro ao obter a quadra:', error)
        throw error;
    };
};


  export const updateUsuario = async (id, NomeUsuario, Email, TipoUsuario) => {
    try{
        const response = await axios.put(`${API_URL}/user/att/${id}`, {
            NomeUsuario,
            Email,
            TipoUsuario
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar usuario:', error);
        throw error;
    }
}
  