create database PINGO;
use PINGO;

create table Esportes(
	ID_Esporte int auto_increment,
    Nome varchar(100),
    primary key (ID_Esporte)
);

select * from Esportes;

create table MenuItems (
	ID_MenuItem int auto_increment,
	Titulo varchar(50) not null,
	Url varchar(100),
	Icone varchar(255),
	OrdemExibicao int,
	TipoUsuarioPermitido varchar(20) not null,
	check (TipoUsuarioPermitido in ('Admin', 'Proprietario', 'Funcionario', 'Usuario')),
	primary key (ID_MenuItem)
);

select * from MenuItems;

create table Quadra(
	ID_Quadra int auto_increment,
    NomeQuadra varchar(50) not null,
    EnderecoQuadra varchar(50) not null,
    ID_Esporte int,
    Acessos int default 0,
    Descricao text,
    Foto varchar(255), -- Armazena imagem
    Cidade varchar(50),
    Bairro varchar(50),
    DataCriacao date default (current_date), -- Salva a data a partir da criacao
    TipoQuadra boolean default 0, -- Se for 1 é Proprietario
    primary key (ID_Quadra),
    foreign key (ID_Esporte) references Esportes(ID_Esporte)
);

select * from Quadra;

create table QuadraPrivada(
	ID_Quadra int primary key,
	Contato varchar(11) not null,
	HorarioDisponiveis varchar(255),
	ID_Proprietario int,
	ValorHora DECIMAL(10,2),
	foreign key (ID_Quadra) references Quadra(ID_Quadra) on delete cascade,
	foreign key (ID_Proprietario) references Usuario(ID_Usuario)
);

select * from QuadraPrivada;

/* create table Quadra(
	ID_Quadra int auto_increment,
    NomeQuadra varchar(50) not null,
    EnderecoQuadra varchar(50) not null,
    ContatoTelefone varchar(11) null,
    Regiao varchar(255) not null,
    TipoQuadraFisica varchar(255) not null, -- Ex: "Campo", "Salão", "Areia"
	ContatoEmail varchar(255) null,
    ID_Esporte int,
    Acessos int default 0,
    Descricao text,
    Foto varchar(500) null, -- Armazena imagem
    Cidade varchar(50),
    Bairro varchar(50),
    DataCriacao date default (current_date), -- Salva a data a partir da criacao,
    TipoQuadra boolean default 0, -- Se for 1 é Proprietario
    primary key (ID_Quadra)
); */
/* 
	create table QuadraPublica (
    ID_QuadraPublica int auto_increment,
    NomeQuadra varchar(50) not null,
    EnderecoQuadra varchar(50) not null,
    Regiao varchar(255) not null,
    TipoQuadraFisica varchar(255) not null,
    Acessos int default 0,
    Descricao text,
    Foto varchar(500) null, 
    Cidade varchar(50),
    Bairro varchar(50),
    DataCriacao date default (current_date), 
    TipoQuadraPublica boolean default 1, 
    primary key (ID_QuadraPublica)
);

create table QuadraEsportes (
    ID_Quadra int,
    ID_Esporte int,
    PRIMARY KEY (ID_Quadra, ID_Esporte),
    FOREIGN KEY (ID_Quadra) REFERENCES Quadra(ID_Quadra),
    FOREIGN KEY (ID_Esporte) REFERENCES Esportes(ID_Esporte)
);

*/


create table Usuario(
	ID_Usuario int auto_increment,
	FotoUsuario varchar(400),
    NomeUsuario varchar(40) not null,
    CPF char(11) unique null,
    Email varchar(150) unique  not null,
    Senha varchar(225) not null,
    Google_ID varchar(255) unique null,
    TipoUsuario varchar(20) not null 
    check (TipoUsuario in ('Proprietario', 'Funcionario', 'Admin', 'Usuario')),
    DataCriacao date default (current_date),
    primary key (ID_Usuario) 
);

select * from Usuario;

create table HorariosQuadra (
	ID_Config int auto_increment,
	ID_Quadra int not null,
	DataInicio date not null,
	DataFim date not null,
	Horarios text not null, -- Armazena em JSON
	Preco decimal(10,2) not null default 0,
	Intervalo varchar(10) not null,
	DataCriacao timeStamp default current_timestamp,
	primary key (ID_Config),
	foreign key (ID_Quadra) references Quadra(ID_Quadra) on delete cascade
);

select * from HorariosQuadra;

create table Avaliacoes(
	ID_Avaliacao int auto_increment,
    DataAvaliacao date,
    Curtidas int default 0,
    Comentario text,
    ID_Quadra int,
    ID_Usuario int,
    primary key (ID_Avaliacao),
    foreign key (ID_Quadra) references Quadra(ID_Quadra),
    foreign key (ID_Usuario) references Usuario(ID_Usuario)
);

select * from Avaliacoes;

create table Favoritos(
	ID_Favoritos int auto_increment,
    ID_Quadra int,
    ID_Usuario int,
    primary key (ID_Favoritos),
    foreign key (ID_Quadra) references Quadra(ID_Quadra),
    foreign key (ID_Usuario) references Usuario(ID_Usuario)
);

select * from Favoritos;


create table Visitados(
	ID_Visitados int auto_increment,
    ID_Usuario int,
    ID_Quadra int,
    ID_Amigo int null,
    DataVisita datetime,
    primary key (ID_Visitados),
    foreign key (ID_Usuario) references Usuario(ID_Usuario),
    foreign key (ID_Quadra) references Quadra(ID_Quadra)
);

select * from Visitados;

create table FormaPagamento(
    ID_FormaPagamento int auto_increment,
    NomeFormaPagamento varchar(50),  
    Descricao text,  
    primary key (ID_FormaPagamento)
);

select * from FormaPagamento;

create table StatusPagamento(
	ID_StatusPagamento int auto_increment,
    StatusPagamento varchar(20) not null check (StatusPagamento in ('pendente', 'pago', 'falhou', 'estornado')),
    primary key (ID_StatusPagamento)
);

select * from StatusPagamento;

create table Agendamento (
    ID_Agendamento int auto_increment,
    ID_Usuario int,  
    ID_Quadra int, 
    ID_FormaPagamento int,   
    ID_StatusPagamento int,
    DataAgendamento datetime,  
    Preco decimal(10,2),  
    ID_TransacaoPagamento varchar(255),  
    DataPagamento datetime,  
    primary key (ID_Agendamento),
    foreign key (ID_Usuario) references Usuario(ID_Usuario),
    foreign key (ID_Quadra) references Quadra(ID_Quadra),
    foreign key (ID_FormaPagamento) references FormaPagamento(ID_FormaPagamento),
    foreign key (ID_StatusPagamento) references StatusPagamento(ID_StatusPagamento)
);

select * from Agendamento;

create table HistoricoPagamento (
	ID_Historico int auto_increment,
    ID_Agendamento int,
    DataPagamento datetime default current_timestamp,
    Preco decimal(10,2),
    primary key (ID_Historico),
    foreign key (ID_Agendamento) references Agendamento(ID_Agendamento)
);

select * from HistoricoPagamento;


INSERT INTO Quadra (NomeQuadra, EnderecoQuadra, Contato, Descricao, Cidade, Bairro, Foto)
VALUES ('Quadra Poliesportiva Central', 'Rua das Flores, 123', '11987654321', 'Ótima quadra para diversos esportes.', 'São Paulo', 'Centro', 'https://imgs.search.brave.com/DuB4bxRlPzbodjf4rNh74NsBcK44stdvfyrsNE_FGl0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYWNl/aW9hbGdvdmJyLmRo/b3N0LmNsb3VkL3Vw/bG9hZHMvaW1hZ2Vu/cy9fODQ1eEFVVE9f/Y3JvcF9jZW50ZXIt/Y2VudGVyX25vbmUv/QVRMRVRBLUdVU1RB/Vk8tSEFBS0lOLmpw/ZWc');

INSERT INTO Quadra (NomeQuadra, EnderecoQuadra, Descricao, Cidade, Bairro, Foto, TipoQuadra)
VALUES ('Campo de Futebol Society Bom de Bola', 'Avenida Brasil, 456', 'Excelente campo de grama sintética.', 'Rio de Janeiro', 'Copacabana', '../src/assets/image/quadra_1.jpg', 1);
-- Obtem o ID da última quadra criada
set @quadra_id = LAST_INSERT_ID();
INSERT INTO QuadraPrivada (ID_Quadra, HorarioDisponiveis, ValorHora, ID_Proprietario , Contato)
VALUES (@quadra_id, 'Seg-Sex: 08:00-23:00, Sáb-Dom: 09:00-20:00', 180.00, 1, '11323323222' );


INSERT INTO Usuario (NomeUsuario, Senha, TipoUsuario, Email, FotoUsuario)
VALUES ('Carlos Souza', 'carlos123', 'Proprietario', 'carlos@email.com', 'https://imgs.search.brave.com/wJsJXGzhl7D8UwAdYAixwwvLdge3UA2ngaAdA_VgD1M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtZ3JhdGlz/L3BlcmZpbC1kZS1q/b3ZlbS1ib25pdG8t/ZS1lbGVnYW50ZS1v/bGhhbmRvLXBhcmEt/YS1lc3F1ZXJkYV8x/NzY0MjAtMTk2NDMu/anBnP3NlbXQ9YWlz/X2h5YnJpZA');

INSERT INTO Usuario (NomeUsuario, Senha, TipoUsuario, Email, FotoUsuario)
VALUES ('Ferreira', 'carlos123', 'Admin', 'ferreira@email.com', 'https://imgs.search.brave.com/wJsJXGzhl7D8UwAdYAixwwvLdge3UA2ngaAdA_VgD1M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtZ3JhdGlz/L3BlcmZpbC1kZS1q/b3ZlbS1ib25pdG8t/ZS1lbGVnYW50ZS1v/bGhhbmRvLXBhcmEt/YS1lc3F1ZXJkYV8x/NzY0MjAtMTk2NDMu/anBnP3NlbXQ9YWlz/X2h5YnJpZA');

INSERT INTO Usuario (NomeUsuario, Senha, TipoUsuario, Email, FotoUsuario)
VALUES ('Gabriel', 'carlos123', 'Usuario', 'gabriel@email.com', 'https://imgs.search.brave.com/wJsJXGzhl7D8UwAdYAixwwvLdge3UA2ngaAdA_VgD1M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtZ3JhdGlz/L3BlcmZpbC1kZS1q/b3ZlbS1ib25pdG8t/ZS1lbGVnYW50ZS1v/bGhhbmRvLXBhcmEt/YS1lc3F1ZXJkYV8x/NzY0MjAtMTk2NDMu/anBnP3NlbXQ9YWlz/X2h5YnJpZA');

-- Menu
INSERT INTO MenuItems (Titulo, URL, Icone, OrdemExibicao, TipoUsuarioPermitido) VALUES
('Home', '/home', '../src/assets/icons/menu/home.png', 1, 'Admin'),
('Usuários', '/users', '../src/assets/icons/menu/usuarios.png', 2, 'Admin'),
('Proprietario', '/proplogin', '../src/assets/icons/menu/proprietario.png', 3, 'Admin'),
('Quadras Públicas', '/quadraspub', '../src/assets/icons/menu/quadras.png', 4, 'Admin'),
('Quadras Privadas', '/quadraspriv', '../src/assets/icons/menu/reservas.png', 5, 'Admin'),
('Configurações', '/settings', '../src/assets/icons/menu/confing.png', 6, 'Admin'),
('Formulários', '/forms', '../src/assets/icons/menu/task.png', 7, 'Admin');

INSERT INTO MenuItems (Titulo, URL, Icone, OrdemExibicao, TipoUsuarioPermitido) VALUES
('Home', '/home', '../src/assets/icons/menu/home.png', 1, 'Proprietario'),
('Minhas Quadras', '/minhas-quadras', '../src/assets/icons/menu/quadras.png', 2, 'Proprietario'),
('Reservas', '/reserva', '../src/assets/icons/menu/reservas.png', 3, 'Proprietario'),
('Configurações', '/settings', '../src/assets/icons/menu/confing.png', 4, 'Proprietario');












