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
    Contato varchar(11) not null,
    ID_Esporte int,
    Acessos int default 0,
    Descricao text,
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
    NomeUsuario varchar(40) not null,
    CPF char(11) unique  null,
    Email varchar(150) unique null,
    Senha varchar(225) not null,
    Google_ID varchar(255) unique null,
    Criado_em timestamp default current_timestamp,
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