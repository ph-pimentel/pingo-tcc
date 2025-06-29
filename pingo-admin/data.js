
export const topDealUsers = [
  {
    id: 1,
    img: "https://media.istockphoto.com/id/1364917563/pt/foto/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=612x612&w=0&k=20&c=U8JPP2jR5ibSuE_t0JrWgm0iQEfuMHHGMGTwEIMzNq0=",
    username: "Stevan Goggins",
    email: "goggins@gmail.com",
    amount: "5.000",
  },
  {
    id: 2,
    img: "https://media.istockphoto.com/id/1364917563/pt/foto/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=612x612&w=0&k=20&c=U8JPP2jR5ibSuE_t0JrWgm0iQEfuMHHGMGTwEIMzNq0=",
    username: "Goggins Steve",
    email: "steve@gmail.com",
    amount: "2.000",
  },
  {
    id: 3,
    img: "https://media.istockphoto.com/id/1364917563/pt/foto/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=612x612&w=0&k=20&c=U8JPP2jR5ibSuE_t0JrWgm0iQEfuMHHGMGTwEIMzNq0=",
    username: "Vanessa James",
    email: "vanessa@gmail.com",
    amount: "1.000",
  },
  {
    id: 4,
    img: "https://media.istockphoto.com/id/1364917563/pt/foto/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=612x612&w=0&k=20&c=U8JPP2jR5ibSuE_t0JrWgm0iQEfuMHHGMGTwEIMzNq0=",
    username: "Carlos Jones",
    email: "carlos@gmail.com",
    amount: "900",
  },
  {
    id: 5,
    img: "https://media.istockphoto.com/id/1364917563/pt/foto/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=612x612&w=0&k=20&c=U8JPP2jR5ibSuE_t0JrWgm0iQEfuMHHGMGTwEIMzNq0=",
    username: "Roberto Steve",
    email: "roberto@gmail.com",
    amount: "800",
  },
  {
    id: 6,
    img: "https://media.istockphoto.com/id/1364917563/pt/foto/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=612x612&w=0&k=20&c=U8JPP2jR5ibSuE_t0JrWgm0iQEfuMHHGMGTwEIMzNq0=",
    username: "Roberto Steve",
    email: "roberto@gmail.com",
    amount: "800",
  },
];

export const recentReservas = [
  {
    id: 1,
    img: "https://media.istockphoto.com/id/1364917563/pt/foto/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=612x612&w=0&k=20&c=U8JPP2jR5ibSuE_t0JrWgm0iQEfuMHHGMGTwEIMzNq0=",
    username: "Stevan Goggins ",
    email: "Quadra 1",
    amount: "12:00",
    days: "17/06/2008",
  },
  {
    id: 2,
    img: "https://media.istockphoto.com/id/1364917563/pt/foto/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=612x612&w=0&k=20&c=U8JPP2jR5ibSuE_t0JrWgm0iQEfuMHHGMGTwEIMzNq0=",
    username: "Goggins Steve",
    email: "Quadra 1",
    amount: "14:00",
    days: "17/06/2008",
  },
  {
    id: 3,
    img: "https://media.istockphoto.com/id/1364917563/pt/foto/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=612x612&w=0&k=20&c=U8JPP2jR5ibSuE_t0JrWgm0iQEfuMHHGMGTwEIMzNq0=",
    username: "Vanessa James",
    email: "Quadra 1",
    amount: "15:30",
    days: "17/06/2008",
  }
]

export const chartBoxQuadra = {
  color: "#297EFF",
  icon: "../src/assets/icons/menu/quadras.png",
  title: "Total Quadras Públicas",
  number: "11.238",
  dataKey: "quadras",
  percentage: 45,
  chartData: [
    { name: "Jan", quadras: 400 },
    { name: "Fev", quadras: 700 },
    { name: "Mar", quadras: 600 },
  ],
  url: "/quadraspub"
};
export const chartBoxClientes = {
  color: "#297EFF",
  icon: "../src/assets/icons/menu/usuarios.png",
  title: "Total Usuários",
  number: "1.050",
  dataKey: "clientes",
  percentage: 20,
  chartData: [
    { name: "Jan", clientes: 20 },
    { name: "Fev", clientes: 39 },
    { name: "Mar", clientes: 70 },
  ],
  url: "/users"
};
export const chartBoxQuadrasPriv = {
  color: "#297EFF",
  icon: "../src/assets/icons/menu/quadras.png",
  title: "Total Quadras Privadas",
  number: "200",
  dataKey: "quadras",
  percentage: 20,
  chartData: [
    { name: "Jan", quadras: 20 },
    { name: "Fev", quadras: 50 },
    { name: "Mar", quadras: 20 },
  ],
  url: "/quadraspriv"
};

export const barChartBoxLucro = {
  icon: "../src/assets/icons/menu/reservas.png",
  title: "Renda",
  color: "#297EFF",
  dataKey: "lucro",
  chartData: [
    { name: "Jan", lucro: 300 },
    { name: "Fev", lucro: 100 },
    { name: "Mar", lucro: 150 },
    { name: "Abr", lucro: 500 },
    { name: "Mai", lucro: 700 },
    { name: "Jun", lucro: 300 },
  ],
};

export const barChartBoxHorarios = {
  icon: "../src/assets/icons/graficos/clock.png",
  title: "Horários de maior alocação",
  color: "#297EFF",
  dataKey: "reservas",
  chartData: [
    { name: "15:00", reservas: 300 },
    { name: "17:00", reservas: 100 },
    { name: "18:00", reservas: 150 },
    { name: "19:00", reservas: 500 },
    { name: "21:00", reservas: 700 },
  ],
};


export const quadraspub = [
  {
    id: 1,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "Quadra Central",
    cidade: "São Paulo",
    bairro: "Vila Mariana",
    endereco: "Rua das Palmeiras, 123",
    createdAt: "2024-03-20",
  },
  {
    id: 2,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "Campo Verde",
    cidade: "Rio de Janeiro",
    bairro: "Copacabana",
    endereco: "Av. Atlântica, 456",
    createdAt: "2024-02-15",
  },
  {
    id: 3,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "Tênis Clube",
    cidade: "Belo Horizonte",
    bairro: "Savassi",
    endereco: "Rua Minas Gerais, 789",
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "Quadra de Vôlei",
    cidade: "Curitiba",
    bairro: "Batel",
    endereco: "Av. Sete de Setembro, 321",
    createdAt: "2023-12-05",
  },
  {
    id: 5,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "Pista de Skate",
    cidade: "Porto Alegre",
    bairro: "Moinhos de Vento",
    endereco: "Rua Padre Chagas, 654",
    createdAt: "2023-11-18",
  },
  {
    id: 6,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "Ginásio Municipal",
    cidade: "Florianópolis",
    bairro: "Centro",
    endereco: "Praça XV de Novembro, 999",
    createdAt: "2023-10-12",
  },
  {
    id: 7,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "Estádio Popular",
    cidade: "Fortaleza",
    bairro: "Meireles",
    endereco: "Av. Beira-Mar, 111",
    createdAt: "2023-09-07",
  },
  {
    id: 8,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "Arena Badminton",
    cidade: "Recife",
    bairro: "Boa Viagem",
    endereco: "Rua das Gaivotas, 222",
    createdAt: "2023-08-25",
  },
  {
    id: 9,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "Parque do Basquete",
    cidade: "Salvador",
    bairro: "Barra",
    endereco: "Av. Oceânica, 333",
    createdAt: "2023-07-30",
  },
  {
    id: 10,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "Academia Pública",
    cidade: "Brasília",
    bairro: "Asa Sul",
    endereco: "SQS 308 Bloco A",
    createdAt: "2023-06-14",
  },
];
export const quadraspriv = [
  {
    id: 1,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "João Silva",
    cidade: "São Paulo",
    bairro: "Vila Mariana",
    regiao: "SP",
    endereco: "Rua das Flores, 123",
    contato: "(11) 99999-9999",
    createdAt: "2024-03-31",
    regrasGerais: "Seguir as normas de convivência",
    horarios: "10:30 11:00 10:30 11:00 10:30 11:00",
    idprop: 50,
    nameProp: "Leozinho da Paraiba",
  },
  {
    id: 2,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "Maria Oliveira",
    cidade: "Rio de Janeiro",
    bairro: "Copacabana",
    regiao: "RJ",
    endereco: "Avenida Atlântica, 456",
    contato: "(21) 98888-8888",
    createdAt: "2024-03-30",
    regrasGerais: "Proibido fumar nas dependências",
    idprop: 50,
    nameProp: "Leozinho da Paraiba",
  },
  {
    id: 3,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "Carlos Souza",
    cidade: "Belo Horizonte",
    bairro: "Savassi",
    regiao: "MG",
    endereco: "Rua dos Timbiras, 789",
    contato: "(31) 97777-7777",
    createdAt: "2024-03-29",
    regrasGerais: "Uso obrigatório de crachá",
    idprop: 50,
    nameProp: "Leozinho da Paraiba",
  },
  {
    id: 4,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "Ana Pereira",
    cidade: "Curitiba",
    bairro: "Centro",
    regiao: "PR",
    endereco: "Rua XV de Novembro, 101",
    contato: "(41) 96666-6666",
    createdAt: "2024-03-28",
    regrasGerais: "Silêncio após as 22h",
    idprop: 50,
    nameProp: "Leozinho da Paraiba",
  },
  {
    id: 5,
    img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
    name: "Fernando Lima",
    cidade: "Porto Alegre",
    bairro: "Moinhos de Vento",
    regiao: "RS",
    endereco: "Avenida Goethe, 202",
    contato: "(51) 95555-5555",
    createdAt: "2024-03-27",
    regrasGerais: "Proibido trazer animais",
    idprop: 50,
    nameProp: "Leozinho da Paraiba",
  },
];

export const reserva = [
  {
    id: 1,
    photo: "../src/assets/icons/menu/perfil.png",
    name: "João Silva",
    quadra: "Quadra 1",
    endereco: "Rua das Flores, 123",
    createdAt: "10:00 AM",
    date: "2025-03-31",
  },
  {
    id: 2,
    photo: "../src/assets/icons/menu/perfil.png",
    name: "Maria Oliveira",
    quadra: "Quadra 2",
    endereco: "Avenida Central, 456",
    createdAt: "14:30 PM",
    date: "2025-03-31",
  },
  {
    id: 3,
    photo: "../src/assets/icons/menu/perfil.png",
    name: "Carlos Pereira",
    quadra: "Quadra 3",
    endereco: "Praça da Liberdade, 789",
    createdAt: "16:45 PM",
    date: "2025-03-31",
  },
  {
    id: 4,
    photo: "../src/assets/icons/menu/perfil.png",
    name: "Ana Costa",
    quadra: "Quadra 1",
    endereco: "Rua da Paz, 101",
    createdAt: "09:15 AM",
    date: "2025-03-31",
  },
  {
    id: 5,
    photo: "../src/assets/icons/menu/perfil.png",
    name: "Lucas Souza",
    quadra: "Quadra 4",
    endereco: "Rua do Sol, 202",
    createdAt: "12:00 PM",
    date: "2025-03-31",
  },
];

export const singleQuadraPriv = {
  id: 1,
  img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
  title: "Quadra peixoto",
  info: {
    Nome: "João Silva",
    Cidade: "São Paulo",
    Profissão: "Desenvolvedor",
    Endereço: "Rua João Zé",
    Região: "Zona Norte",
    Horários: "11:00 12:00",
    Descrição: "O Sapo não lava o pé",
    Regras_Gerais: "Proibido a entrada da zona segura",
    Contato: "11 92332-2323",
    Proprietário: "Leonardo"
},
  activities: [
    { time: "08:00", text: "Acordou e tomou café da manhã" },
    { time: "09:30", text: "Começou a trabalhar no projeto React" },
    { time: "12:00", text: "Almoçou com amigos" },
    { time: "15:00", text: "Reunião com equipe" },
    { time: "18:30", text: "Saiu para correr no parque" }
  ]
};

export const singleQuadraPub = {
  id: 1,
  img: "https://altipisos.com.br/wp-content/uploads/2023/01/vantagens-da-quadra-poliesportiva.png",
  title: "Quadra Andarilho",
  info: {
    Nome: "João Silva",
    Idade: "30 anos",
    Cidade: "São Paulo",
    Profissão: "Desenvolvedor",
    Endereço: "Rua João Zé",
    Região: "Zona Norte",
    Descrição: "O Sapo não lava o pé",
},
  activities: [
    { time: "08:00", text: "Acordou e tomou café da manhã" },
    { time: "09:30", text: "Começou a trabalhar no projeto React" },
    { time: "12:00", text: "Almoçou com amigos" },
    { time: "15:00", text: "Reunião com equipe" },
    { time: "18:30", text: "Saiu para correr no parque" }
  ]
};