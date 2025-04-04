class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.criarTabelaEvento();
    this.criarTabelaLogin();
    this.criarTabelaEsportes();
  }

  criarTabelaEvento() {
    const sql2 = `
        create table if not exists Eventos(
	    ID_Eventos int auto_increment,
        Nome_Evento varchar(50) not null,
        ID_Esporte int not null,
        DataHora datetime,
        Descricao text not null,
        primary key (ID_Eventos)
    );
        `;
    this.conexao.query(sql2, (error) => {
      if (error) {
        console.log("Eita sentou viu, bem no evento");
        console.log(error.message);
        return;
      }
    });
  }

  criarTabelaLogin() {
    const sql2 = `
    create table if not exists Usuario(
	ID_Usuario int auto_increment,
    NomeUsuario varchar(40) not null,
    CPF char(11) unique  null,
    Email varchar(150) unique null,
    Senha varchar(225) not null,
    Google_ID varchar(255) unique null,
    Criado_em timestamp default current_timestamp,
    primary key (ID_Usuario)
);
  `;
    this.conexao.query(sql2, (error) => {
      if (error) {
        console.log("Eita sentou viu, bem no login");
        console.log(error.message);
        return;
      }
    });
  }

  criarTabelaEsportes() {
    const sql2 = `
    create table if not exists Esportes(
	ID_Esporte int auto_increment,
    NomeEsporte varchar(100),
    primary key (ID_Esporte)
);
    `;
    this.conexao.query(sql2, (error) => {
      if (error) {
        console.log("Eita sentou viu, bem no esportes");
        console.log(error.message);
        return;
      }
    });
  }
}

module.exports = new Tabelas();