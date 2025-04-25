const API_LOGIN_URL = 'http://localhost:3001/auth';
const API_QUADRA_URL = 'http://localhost:3001/quadras';

// Função genérica para requisições não autenticadas
async function requisicaoAPI(baseUrl, endpoint, metodo, dados = null) {
  try {
    console.log(`Enviando requisição: ${metodo} ${baseUrl}${endpoint}`, dados ? JSON.stringify(dados) : '');
    
    const config = {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
    };
    
    if (dados) config.body = JSON.stringify(dados);
    
    const resposta = await fetch(`${baseUrl}${endpoint}`, config);
    
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

// Função para requisições autenticadas
async function requisicaoAutenticada(baseUrl, endpoint, metodo, dados = null) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("Usuário não autenticado");

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const config = { method: metodo, headers };
  if (dados) config.body = JSON.stringify(dados);

  return await fetch(`${baseUrl}${endpoint}`, config)
    .then(async resposta => {
      if (!resposta.ok) {
        const erroTexto = await resposta.text();
        throw new Error(`Erro na requisição (${resposta.status}): ${erroTexto}`);
      }
      return resposta.json();
    });
}

// Funções de Autenticação (usam API_LOGIN_URL)
export async function registrarUsuario(dados) {
  return await requisicaoAPI(API_LOGIN_URL, '/registro', 'POST', dados);
}

export async function loginUsuario(dados) {
  const resposta = await requisicaoAPI(API_LOGIN_URL, '/login', 'POST', dados);
  if (resposta.token) {
    localStorage.setItem('token', resposta.token);
  }
  return resposta;
}

export async function obterPerfilUsuario() {
  return await requisicaoAutenticada(API_LOGIN_URL, '/perfil', 'GET');
}

export async function atualizarPerfilUsuario(dados) {
  return await requisicaoAutenticada(API_LOGIN_URL, '/perfil', 'PUT', dados);
}

// Funções de Quadras (usam API_QUADRA_URL)
export async function listarTodasQuadras() {
  return await requisicaoAPI(API_QUADRA_URL, '', 'GET');
}

// Atualize a função existente
export async function listarQuadras(filtros = {}) {
  const params = new URLSearchParams();
  
  if (filtros.local) params.append('local', filtros.local);
  if (filtros.raio) params.append('raio', filtros.raio);
  if (filtros.esporte) params.append('esporte', filtros.esporte);
  if (filtros.tipo) params.append('tipo', filtros.tipo);

  return await requisicaoAPI(API_QUADRA_URL, `/filtrar?${params.toString()}`, 'GET');
}

export async function obterDetalhesQuadra(id) {
  return await requisicaoAPI(API_QUADRA_URL, `/${id}`, 'GET');
}

export async function criarQuadra(dados) {
  return await requisicaoAutenticada(API_QUADRA_URL, '', 'POST', dados);
}

export async function atualizarQuadra(id, dados) {
  return await requisicaoAutenticada(API_QUADRA_URL, `/${id}`, 'PUT', dados);
}