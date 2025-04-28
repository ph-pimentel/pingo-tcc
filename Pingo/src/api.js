const API_BASE_URL = 'http://localhost:3001';
const API_LOGIN_URL = `${API_BASE_URL}/auth`;
const API_QUADRA_URL = `${API_BASE_URL}/quadras`;

// Função genérica para requisições sem autenticação
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

// Função genérica para requisições com autenticação (token)
async function requisicaoAutenticada(baseUrl, endpoint, metodo, dados = null) {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!token) throw new Error("Usuário não autenticado");

  const config = {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  if (dados) config.body = JSON.stringify(dados);

  const resposta = await fetch(`${baseUrl}${endpoint}`, config);

  if (!resposta.ok) {
    const erroTexto = await resposta.text();
    throw new Error(`Erro na requisição (${resposta.status}): ${erroTexto}`);
  }

  return await resposta.json();
}

// Registrar usuário
export async function registrarUsuario(dados) {
  try {
    console.log("Registrando usuário:", JSON.stringify(dados));
    const resposta = await fetch(`${API_LOGIN_URL}/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      const erroTexto = await resposta.text();
      throw new Error(`Erro ao registrar usuário (${resposta.status}): ${erroTexto}`);
    }

    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao registrar usuário:', erro);
    throw erro;
  }
}

// Login do usuario
export async function loginUsuario(dados) {
  try {
    console.log("Fazendo login:", JSON.stringify(dados));
    const resposta = await fetch(`${API_LOGIN_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      const erroTexto = await resposta.text();
      throw new Error(`Erro ao logar usuário (${resposta.status}): ${erroTexto}`);
    }

    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao logar usuário:', erro);
    throw erro;
  }
}

// Logout do usuário
export function logoutUsuario() {
  localStorage.removeItem('token');  // Remove o token
  console.log("Usuário deslogado com sucesso.");
  window.location.href = '/login';  // Redireciona automaticamente
}


// Funções para Quadras (públicas e protegidas)
export async function listarTodasQuadras() {
  return await requisicaoAPI(API_QUADRA_URL, '', 'GET');
}

export async function listarQuadras(filtros = {}) {
  const params = new URLSearchParams();
  if (filtros.local) params.append('local', filtros.local);
  if (filtros.raio) params.append('raio', filtros.raio);
  if (filtros.esporte) params.append('esporte', filtros.esporte);
  if (filtros.tipo) params.append('tipo', filtros.tipo);

  const endpoint = `/filtrar?${params.toString()}`;
  return await requisicaoAutenticada(API_QUADRA_URL, endpoint, 'GET');
}

export async function obterDetalhesQuadra(id) {
  return await requisicaoAutenticada(API_QUADRA_URL, `/${id}`, 'GET');
}

export async function criarQuadra(dados) {
  return await requisicaoAutenticada(API_QUADRA_URL, '', 'POST', dados);
}

export async function atualizarQuadra(id, dados) {
  return await requisicaoAutenticada(API_QUADRA_URL, `/${id}`, 'PUT', dados);
}
