const API_BASE_URL = 'http://localhost:3001/auth';

async function requisicaoAPI(endpoint, metodo, dados = null) {
  try {
    console.log(`Enviando requisição: ${metodo} ${API_BASE_URL}${endpoint}`, JSON.stringify(dados));
    
    const config = {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
    };
    
    if (dados) config.body = JSON.stringify(dados);
    
    const resposta = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!resposta.ok) {
      const erroTexto = await resposta.text();
      throw new Error(`Erro na requisição (${resposta.status}): ${erroTexto}`);
    }
    
    return await resposta.json();
  } catch (erro) {
    console.error('Erro na API:', erro);
    throw erro;
  }
}

async function requisicaoAutenticada(endpoint, metodo, dados = null) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("Usuário não autenticado");

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const config = { method: metodo, headers };
  if (dados) config.body = JSON.stringify(dados);

  return await fetch(`${API_BASE_URL}${endpoint}`, config)
    .then(async resposta => {
      if (!resposta.ok) {
        const erroTexto = await resposta.text();
        throw new Error(`Erro na requisição (${resposta.status}): ${erroTexto}`);
      }
      return resposta.json();
    });
}

export async function registrarUsuario(dados) {
  return await requisicaoAPI('/registro', 'POST', dados);
}

export async function loginUsuario(dados) {
  const resposta = await requisicaoAPI('/login', 'POST', dados);
  if (resposta.token) {
    localStorage.setItem('token', resposta.token);
  }
  return resposta;
}

export async function obterPerfilUsuario() {
  return await requisicaoAutenticada('/perfil', 'GET');
}

export async function atualizarPerfilUsuario(dados) {
  return await requisicaoAutenticada('/perfil', 'PUT', dados);
}
