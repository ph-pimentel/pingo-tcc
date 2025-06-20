import axios from 'axios';
import {jwtDecode} from 'jwt-decode'

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

export const createQuadrasPub = async (NomeQuadra, EnderecoQuadra, Regiao, TipoQuadraFisica, Descricao, Cidade, Bairro) => {
    try{
        const response = await axios.post(`${API_URL}/quadraspub`, {
            NomeQuadra, 
            EnderecoQuadra,
            Regiao,
            TipoQuadraFisica,
            Descricao,
            Cidade, 
            Bairro
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar reserva:', error);;
        throw error;
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


export const updateQuadrasPub = async (id, NomeQuadra, EnderecoQuadra, Regiao, TipoQuadraFisica, Descricao, Bairro, Cidade ) => {
    try{
        const response = await axios.put(`${API_URL}/quadraspub/att/${id}`, {
            NomeQuadra,
            EnderecoQuadra,
            Regiao,
            TipoQuadraFisica,
            Descricao,
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
        console.log(`Fetching quadra privada com ID: ${id}`);
        const response = await axios.get(`${API_URL}/quadraspriv/${id}`);
        
        console.log('API Response:', response.data);

        // Verifica se a resposta contém dados (a estrutura mudou para retornar o objeto diretamente)
        if (!response.data) {
            throw new Error('Quadra não encontrada');
        }

        const quadraData = response.data;

        // Formata os dados para manter compatibilidade com o frontend
        return {
            results: [{
                ...quadraData,
                // Mantemos esses campos para compatibilidade com componentes existentes
                // Você pode remover esses mapeamentos quando atualizar todos os componentes
                Contato: quadraData.ContatoTelefone || 'Não informado',
                // Campos formatados
                HorarioDisponiveis: quadraData.HorarioDisponiveis || 'Não informado',
                DataCriacao: quadraData.DataCriacao || new Date().toISOString(),
                // Adicionando os novos campos
                Regiao: quadraData.Regiao || 'Não informado',
                TipoQuadraFisica: quadraData.TipoQuadraFisica || 'Não informado',
                Descricao: quadraData.Descricao || 'Sem descrição',
                // Formatando contatos
                ContatoTelefone: quadraData.ContatoTelefone || 'Não informado',
                ContatoEmail: quadraData.ContatoEmail || 'Não informado'
            }]
        };
    } catch (error) {
        console.error('Erro detalhado ao obter a quadra privada:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
};



export const updateQuadrasPriv = async (
    id,
    NomeQuadra,
    EnderecoQuadra,
    Bairro,
    Cidade,
    Regiao,
    TipoQuadraFisica,
    Descricao,
    HorarioDisponiveis,
    ContatoTelefone,
    ContatoEmail
  ) => {
    const response = await fetch(`http://localhost:5000/quadraspriv/att/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        NomeQuadra,
        EnderecoQuadra,
        Bairro,
        Cidade,
        Regiao,
        TipoQuadraFisica,
        Descricao,
        HorarioDisponiveis,
        ContatoTelefone,
        ContatoEmail
      }),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao atualizar quadra');
    }
    
    return await response.json();
  };

  export const createQuadrasPriv = async (
    NomeQuadra,
    EnderecoQuadra,
    Bairro,
    Cidade,
    Regiao,
    TipoQuadraFisica,
    Descricao,
    HorarioDisponiveis,
    ContatoTelefone,
    ContatoEmail,
    ID_Proprietario
  ) => {
    try {
      const response = await axios.post(`${API_URL}/quadrapriv/registre`, {
        NomeQuadra,
        EnderecoQuadra,
        Bairro,
        Cidade,
        Regiao,
        TipoQuadraFisica,
        Descricao,
        HorarioDisponiveis,
        ContatoTelefone,
        ContatoEmail,
        ID_Proprietario
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar quadra privada:', error);
      throw error;
    }
  };
  


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
  
    export const loginUsuario = async (credenciais) => {
        try{
            const response = await axios.post(`${API_URL}/login`, credenciais);


            //Bem-sucedido armazena no localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); //Salvando no localStorage
            }
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    };

    export const obterUsuario = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                return decoded;
            } catch (e) {
                console.error("Erro ao decodificar o token:", e);
            }
        }
        return null;
    };


//Logout
export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
}

//Perfil
export const atualizarPerfil = async (id, Nome, Email) => {
    try {
      const response = await axios.put(`${API_URL}/perfil/att/${id}`, {
        Nome,
        Email
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  };


/// -> Sessão Proprietario

//Verifica se é Proprietario
export const checkProprietario = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/login-proprietario/${id}`);

        if (response.data.error) {
            throw new Error(response.data.error + (response.data.details ? ` (${response.data.details})` : ''));
        }

        return response.data;
    } catch (error) {
        console.error("Erro ao verificar proprietário:", error)
    
        let errorMessage = 'Erro ao verificar o ID';

        if (error.response) {
            //Erro por trás do backend
            errorMessage = error.response.data.error || errorMessage;
            if (error.response.data.details) {
                errorMessage += `: ${error.response.data.details}`;
            }
        } else if (error.response) {
            //Não houve resposta do servidor
            errorMessage = "Sem resposta do servidor. Verifique sua conexão.";
        }

        throw new Error(errorMessage);
    }
};


// Obtém Quadras de um Proprietario específico
export const getQuadrasProprietario = async (proprietarioId) => {
    try {
        const response = await axios.get(`${API_URL}/quadras-proprietario/${proprietarioId}`);
        return response.data;
    }catch (error) {
        console.error("Erro ao obter quadras do proprietário:", error);
        throw error;
      }
};


 /// Atualiza para Proprietario
 export const updateUsuarioProp = async (id, TipoUsuario) => {
    try{
        const response = await axios.put(`${API_URL}/user/attprop/${id}`, {
            TipoUsuario
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar usuario:', error);
        throw error;
    }
}

   /// Atualiza para Admin
   export const updateUsuarioAdmin = async (id, TipoUsuario) => {
    try{
        const response = await axios.put(`${API_URL}/user/attadmin/${id}`, {
            TipoUsuario
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar usuario:', error);
        throw error;
    }
}

/// Atualiza para Usuário Comum
export const updateUsuarioComum = async (id, TipoUsuario) => {
    try{
        const response = await axios.put(`${API_URL}/user/attcomum/${id}`, {
            TipoUsuario
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar usuario:', error);
        throw error;
    }
}

/// Minhas Quadras = Sessão Proprietario
export const getMinhasQuadras = async (proprietarioId) => {
    try {
        const usuario = obterUsuario();
        if (!usuario || usuario.ID_Usuario !== proprietarioId) {
            throw new Error('Não autorizado');
        }

        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/quadras-proprietario/${proprietarioId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }catch (error) {
        console.error("Erro ao obter quadras do proprietário:", error);
        throw error;
    }
};


// Atualizar Senha
export const atualizarSenha = async (id, senhaAntiga, novaSenha) => {
    try {
        const response = await axios.put(`${API_URL}/perfil/senha/${id}`, {
            senhaAntiga,
            novaSenha
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        window.location.href = '/settings';
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar senha:', error);
        throw error;
    }
};

//Atualiza a Foto do Usuário

export const atualizarFotoUsuario = async (id, file) => {
    try {
        const formData = new FormData();
        formData.append('foto', file);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);

        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/usuario/foto/${id}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                signal: controller.signal
            });

            clearTimeout(timeout);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            return response.data;
    } catch (error) {
        console.error('Erro no upload:', {
            errorName: error.name,
            errorMessage: error.message,
            errorStack: error.stack
        });

        if (error.response){
            // Erro da resposta do servidor
            throw new Error(error.response.data.error || 'Erro ao atualizar foto');
        } else if (error.request) {
            //Erro na requisição 
            throw new Error('Sem resposta do servidor');
        } else {
            //Outros erros
            throw error;
        }
    }
};

//Atualizar Foto Quadra
export const atualizarFotoQuadra = async (id, file) => {
    try {
      const formData = new FormData();
      formData.append("foto", file);
  
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
  
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/quadra/foto/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
  
      clearTimeout(timeout);
      return response.data;
    } catch (error) {
      console.error("Erro no upload da quadra:", {
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
      });
  
      if (error.response) {
        throw new Error(
          error.response.data.error || "Erro ao atualizar foto da quadra"
        );
      } else if (error.request) {
        throw new Error("Sem resposta do servidor");
      } else {
        throw error;
      }
    }
  };


/// Gráficos

//Gráfico de Pizza com contagem por tipo de usuarios
export const getUsuariosPorTipo = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/dashboard/users-type`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao obter dados de usuários por tipo:", error);
        throw error; 
    }
}

// Obtém dados para o gráfico de quadras públicas
export const getQuadrasPublicasData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/dashboard/quadras-publicas`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao obter dados de quadras públicas:", error);
      throw error;
    }
};

// Obtém dados para o gráfico de quadras públicas
export const getQuadrasPrivData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/dashboard/quadras-privadas`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao obter dados de quadras públicas:", error);
      throw error;
    }
};


export const getTotalUsuariosData = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/dashboard/total-usuarios`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }catch (error) {
    console.error("Erro ao obter dados de usuários:", error);
    throw error;
}
};

/// -> Sessão Esporte

export const getEsportes = async () => {
    try {
      const response = await axios.get(`${API_URL}/esportes`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter esportes:', error);
      throw error;
    }
  };
  
  export const getQuadraEsporte = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/quadraspub/${id}/esporte`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter esporte da quadra:', error);
      throw error;
    }
  };
  
  export const updateQuadraEsporte = async (id, ID_Esporte) => {
    try {
      const response = await axios.put(`${API_URL}/quadraspub/${id}/esporte`, { ID_Esporte });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar esporte da quadra:', error);
      throw error;
    }
  };


// Reservas
export const getAgendamentosProprietario = async (proprietarioId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/proprietario/agendamentos/${proprietarioId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao obter agendamentos:", error);
        throw error;
    }
};