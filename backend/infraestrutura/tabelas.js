const conexao = require('./conexão'); 

class Tabelas {
  constructor() {
    this.conexao = conexao;
  }

  async init() {
    try {
      await this.criarTabelaEvento();
      await this.criarTabelaLogin();
      await this.criarTabelaEsportes();
      console.log('Todas as tabelas foram criadas/verificadas com sucesso');
    } catch (error) {
      console.error('Erro ao criar tabelas:', error);
      throw error;
    }
  }

  async criarTabelaEvento() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Eventos (
        ID_Eventos int auto_increment,
        Nome_Evento varchar(50) not null,
        ID_Esporte int not null,
        DataHora datetime,
        Descricao text not null,
        primary key (ID_Eventos)
      )`;
    
    try {
    } catch (error) {
      console.error('Erro ao criar tabela Eventos:', error.message);
      throw error;
    }
  }

  async criarTabelaLogin() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Usuario (
        ID_Usuario int auto_increment,
        NomeUsuario varchar(40) not null,
        CPF char(11) unique null,
        Email varchar(150) unique null,
        Senha varchar(225) not null,
        Google_ID varchar(255) unique null,
        Criado_em timestamp default current_timestamp,
        TipoUsuario varchar(20) check (TipoUsuario in ('proprietario', 'funcionario do proprietario', 'admin', 'usuario comum')) not null,
        primary key (ID_Usuario)
      )`;
    
    try {
    } catch (error) {
      console.error('Erro ao criar tabela Usuario:', error.message);
      throw error;
    }
  }

  async criarTabelaEsportes() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Esportes (
        ID_Esporte int auto_increment,
        NomeEsporte varchar(100),
        primary key (ID_Esporte)
      )`;
    
    try {
    } catch (error) {
      console.error('Erro ao criar tabela Esportes:', error.message);
      throw error;
    }
  }
}

module.exports = new Tabelas();