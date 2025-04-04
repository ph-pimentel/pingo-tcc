export const menu = [
  {
    id: 1,
    title: "Main",
    listItems: [
      {
        id: 1,
        title: "Home Page",
        url: "/",
        icon: "../src/assets/icons/menu/home.png",
        alt: "home",
      },
    ],
  },
  {
    id: 2,
    title: "Usuários",
    listItems: [
      {
        id: 1,
        title: "Usuários",
        url: "/users",
        icon: "../src/assets/icons/menu/usuarios.png",
        alt: "usuarios",
      },
      {
        id: 2,
        title: "Proprietario",
        url: "/proplogin",
        icon: "../src/assets/icons/menu/proprietario.png",
        alt: "proprietarios",
      },
      {
        id: 3,
        title: "Reserva",
        url: "/reserva",
        icon: "../src/assets/icons/menu/reservas.png",
        alt: "proprietarios",
      },
    ],
  },
  {
    id: 3,
    title: "Quadras",
    listItems: [
      {
        id: 1,
        title: "Quadras Publicas",
        url: "/quadraspub",
        icon: "../src/assets/icons/menu/quadras.png",
        alt: "quadras",
      },
      {
        id: 1,
        title: "Quadras Privadas",
        url: "/quadraspriv",
        icon: "../src/assets/icons/menu/reservas.png",
        alt: "reservas",
      },
    ],
  },
  {
    id: 3,
    title: "Configurações",
    listItems: [
      {
        id: 1,
        title: "Configurações",
        url: "/settings",
        icon: "../src/assets/icons/menu/confing.png",
      },
    ],
  },
];

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
    username: "Steve Mine",
    email: "steveMine@gmail.com",
    amount: "500",
  },
  {
    id: 7,
    img: "https://media.istockphoto.com/id/1364917563/pt/foto/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=612x612&w=0&k=20&c=U8JPP2jR5ibSuE_t0JrWgm0iQEfuMHHGMGTwEIMzNq0=",
    username: "Leornado",
    email: "leornado@gmail.com",
    amount: "400",
  },
];

export const chartBoxQuadra = {
  color: "#8884d8",
  icon: "../src/assets/icons/menu/quadras.png",
  title: "Total Quadras",
  number: "11.238",
  dataKey: "quadras",
  percentage: 45,
  chartData: [
    { name: "Jan", quadras: 400 },
    { name: "Fev", quadras: 700 },
    { name: "Mar", quadras: 600 },
  ],
};
export const chartBoxClientes = {
  color: "#8884d8",
  icon: "../src/assets/icons/menu/proprietario.png",
  title: "Total Clientes",
  number: "1.050",
  dataKey: "clientes",
  percentage: 20,
  chartData: [
    { name: "Jan", clientes: 20 },
    { name: "Fev", clientes: 39 },
    { name: "Mar", clientes: 70 },
  ],
};
export const chartBoxQuadrasReq = {
  color: "#8884d8",
  icon: "../src/assets/icons/menu/quadras.png",
  title: "Total Pendencias Quadras",
  number: "200",
  dataKey: "quadras",
  percentage: 20,
  chartData: [
    { name: "Jan", quadras: 20 },
    { name: "Fev", quadras: 50 },
    { name: "Mar", quadras: 20 },
  ],
};

export const barChartBoxLucro = {
  icon: "../src/assets/icons/menu/reservas.png",
  title: "Renda",
  color: "#8884d8",
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

export const userRows = [
  {
    id: 1,
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    lastName: "Snow",
    firstName: "Jon",
    email: "snow.jon@mail.com",
    phone: "11 88790-5670",
    createdAt: "01.02.2025",
    userType: "Comum",
  },
  {
    id: 2,
    img: "https://randomuser.me/api/portraits/women/2.jpg",
    lastName: "Stark",
    firstName: "Arya",
    email: "arya.stark@mail.com",
    phone: "21 99870-3345",
    createdAt: "05.03.2025",
    userType: "Comum",
  },
  {
    id: 3,
    img: "https://randomuser.me/api/portraits/men/3.jpg",
    lastName: "Lannister",
    firstName: "Tyrion",
    email: "tyrion.lannister@mail.com",
    phone: "11 98765-4321",
    createdAt: "12.04.2025",
    userType: "Comum",
  },
  {
    id: 4,
    img: "https://randomuser.me/api/portraits/women/4.jpg",
    lastName: "Targaryen",
    firstName: "Daenerys",
    email: "dany.targaryen@mail.com",
    phone: "31 93456-7890",
    createdAt: "20.05.2025",
    userType: "Proprietario",
  },
  {
    id: 5,
    img: "https://randomuser.me/api/portraits/men/5.jpg",
    lastName: "Bolton",
    firstName: "Ramsay",
    email: "ramsay.bolton@mail.com",
    phone: "41 90012-3456",
    createdAt: "15.06.2025",
    userType: "Proprietario",
  },
  {
    id: 6,
    img: "https://randomuser.me/api/portraits/women/6.jpg",
    lastName: "Mormont",
    firstName: "Lyanna",
    email: "lyanna.mormont@mail.com",
    phone: "51 96785-1234",
    createdAt: "02.07.2025",
    userType: "Comum",
  },
  {
    id: 7,
    img: "https://randomuser.me/api/portraits/men/7.jpg",
    lastName: "Baratheon",
    firstName: "Robert",
    email: "robert.baratheon@mail.com",
    phone: "61 95432-6789",
    createdAt: "22.08.2025",
    userType: "Funcionario",
  },
  {
    id: 8,
    img: "https://randomuser.me/api/portraits/women/8.jpg",
    lastName: "Tyrell",
    firstName: "Margaery",
    email: "margaery.tyrell@mail.com",
    phone: "71 92345-6789",
    createdAt: "18.09.2025",
    userType: "Comum",
  },
  {
    id: 9,
    img: "https://randomuser.me/api/portraits/men/9.jpg",
    lastName: "Greyjoy",
    firstName: "Theon",
    email: "theon.greyjoy@mail.com",
    phone: "81 99876-5432",
    createdAt: "10.10.2025",
    userType: "Comum",
  },
  {
    id: 10,
    img: "https://randomuser.me/api/portraits/women/10.jpg",
    lastName: "Tarth",
    firstName: "Brienne",
    email: "brienne.tarth@mail.com",
    phone: "91 93210-7654",
    createdAt: "05.11.2025",
    userType: "Comum",
  },
  {
    id: 11,
    img: "https://randomuser.me/api/portraits/men/11.jpg",
    lastName: "Martell",
    firstName: "Oberyn",
    email: "oberyn.martell@mail.com",
    phone: "32 95555-6789",
    createdAt: "21.12.2025",
    userType: "Comum",
  },
  {
    id: 12,
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    lastName: "Sand",
    firstName: "Ellaria",
    email: "ellaria.sand@mail.com",
    phone: "45 98765-4321",
    createdAt: "30.01.2026",
    userType: "Comum",
  },
  {
    id: 13,
    img: "https://randomuser.me/api/portraits/men/13.jpg",
    lastName: "Clegane",
    firstName: "Sandor",
    email: "sandor.clegane@mail.com",
    phone: "54 91234-5678",
    createdAt: "14.02.2026",
    userType: "Comum",
  },
  {
    id: 14,
    img: "https://randomuser.me/api/portraits/women/14.jpg",
    lastName: "Reed",
    firstName: "Meera",
    email: "meera.reed@mail.com",
    phone: "62 97654-3210",
    createdAt: "07.03.2026",
    userType: "Comum",
  },
  {
    id: 15,
    img: "https://randomuser.me/api/portraits/men/15.jpg",
    lastName: "Baelish",
    firstName: "Petyr",
    email: "petyr.baelish@mail.com",
    phone: "74 98765-1234",
    createdAt: "29.04.2026",
    userType: "Comum",
  },
];

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
    Idade: "30 anos",
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