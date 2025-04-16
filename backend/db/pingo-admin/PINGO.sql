create database PINGO;
use PINGO;

create table Esportes(
	ID_Esporte int auto_increment,
    Nome varchar(100),
    primary key (ID_Esporte)
);

select * from Esportes;

create table Quadra(
	ID_Quadra int auto_increment,
    NomeQuadra varchar(50) not null,
    EnderecoQuadra varchar(50) not null,
    Contato varchar(11) null,
    ID_Esporte int,
    Acessos int default 0,
    Descricao text,
    Foto varchar(255), -- Armazena imagem
    Cidade varchar(50),
    Bairro varchar(50),
    DataCriacao date default current_date, -- Salva a data a partir da criacao
    TipoQuadra boolean default 0, -- Se for 1 é Proprietario
    primary key (ID_Quadra),
    foreign key (ID_Esporte) references Esportes(ID_Esporte)
);

select * from Quadra;

create table Eventos(
	ID_Eventos int auto_increment,
    Nome_Evento varchar(50) not null,
    DataHora datetime,
    ID_Esporte int,
    ID_Quadra int,
    Descricao text not null,
    primary key (ID_Eventos),
    foreign key (ID_Esporte) references Esportes(ID_Esporte),
    foreign key (ID_Quadra) references Quadra(ID_Quadra)
);

select * from Eventos;

create table Usuario(
	ID_Usuario int auto_increment,
	FotoUsuario varchar(400),
    NomeUsuario varchar(40) not null,
    CPF char(11) unique null,
    Email varchar(150) unique  not null,
    Senha varchar(225) not null,
    Google_ID varchar(255) unique null,
    TipoUsuario varchar(20) not null check (TipoUsuario in ('proprietario', 'funcionario do proprietario', 'admin', 'usuario comum')),
    DataCriacao date default current_date,
    primary key (ID_Usuario) 
);

select * from Usuario;

create table Notificacoes (
    ID_Notificacao int auto_increment,
    ID_Usuario int,           -- Quem recebe a notificação
    ID_Eventos int,            -- O evento relacionado (se aplicável)
    Mensagem text not null,   -- Texto da notificação
    DataHora timestamp default current_timestamp, -- Quando foi criada
    Lida boolean default false,  -- Se o usuário já viu a notificação
    primary key (ID_Notificacao),
	foreign key (ID_Usuario) references Usuario(ID_Usuario),
	foreign key (ID_Eventos) references Eventos(ID_Eventos) on delete cascade
);


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

create table Biografia(
	ID_Biografia int auto_increment,
    ID_Usuario int,
    Descricao text,
    primary key (ID_Biografia),
    foreign key (ID_Usuario) references Usuario(ID_Usuario)
);

select * from Biografia;

create table Seguidores (
    ID_Seguidor int,   -- Quem está seguindo
    ID_Seguindo int,   -- Quem está sendo seguido
    primary key (ID_Seguidor, ID_Seguindo),  -- Chave composta para evitar duplicações
    foreign key (ID_Seguidor) references Usuario(ID_Usuario),
    foreign key (ID_Seguindo) references Usuario(ID_Usuario)
);

select * from Seguidores;

create table Favoritos(
	ID_Favoritos int auto_increment,
    ID_Quadra int,
    ID_Usuario int,
    primary key (ID_Favoritos),
    foreign key (ID_Quadra) references Quadra(ID_Quadra),
    foreign key (ID_Usuario) references Usuario(ID_Usuario)
);

select * from Favoritos;

create table Amigos(
    ID_Usuario1 int,
    ID_Usuario2 int,
    primary key (ID_Usuario1, ID_Usuario2),
    foreign key (ID_Usuario1) references Usuario(ID_Usuario),
    foreign key (ID_Usuario2) references Usuario(ID_Usuario)
);

select * from Amigos;

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

create table FotosQuadra (
	ID_Foto int auto_increment,
    ID_Quadra int,
    URL_Foto text,
    primary key (ID_Foto),
    foreign key (ID_Quadra) references Quadra(ID_Quadra)
);

select * from FotosQuadra;

INSERT INTO Quadra (NomeQuadra, EnderecoQuadra, Contato, Descricao, Cidade, Bairro, Foto)
VALUES ('Quadra Poliesportiva Central', 'Rua das Flores, 123', '11987654321', 'Ótima quadra para diversos esportes.', 'São Paulo', 'Centro', 'https://imgs.search.brave.com/DuB4bxRlPzbodjf4rNh74NsBcK44stdvfyrsNE_FGl0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYWNl/aW9hbGdvdmJyLmRo/b3N0LmNsb3VkL3Vw/bG9hZHMvaW1hZ2Vu/cy9fODQ1eEFVVE9f/Y3JvcF9jZW50ZXIt/Y2VudGVyX25vbmUv/QVRMRVRBLUdVU1RB/Vk8tSEFBS0lOLmpw/ZWc');

INSERT INTO Quadra (NomeQuadra, EnderecoQuadra, Contato, Descricao, Cidade, Bairro, Foto)
VALUES ('Campo de Futebol Society Bom de Bola', 'Avenida Brasil, 456', '21991234567', 'Excelente campo de grama sintética.', 'Rio de Janeiro', 'Copacabana', '../src/assets/image/quadra_1.jpg');

INSERT INTO Usuario (NomeUsuario, Senha, TipoUsuario, Email, FotoUsuario)
VALUES ('Carlos Souza', 'carlos123', 'admin', 'carlos@email.com', 'https://imgs.search.brave.com/wJsJXGzhl7D8UwAdYAixwwvLdge3UA2ngaAdA_VgD1M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtZ3JhdGlz/L3BlcmZpbC1kZS1q/b3ZlbS1ib25pdG8t/ZS1lbGVnYW50ZS1v/bGhhbmRvLXBhcmEt/YS1lc3F1ZXJkYV8x/NzY0MjAtMTk2NDMu/anBnP3NlbXQ9YWlz/X2h5YnJpZA');