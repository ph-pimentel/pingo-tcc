import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import styles from "./usuarioagendamento.module.css";

function UsuarioAgendamento() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarAgendamentos = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        /*Dados da quadra*/
        const dadosMockados = [
          {
            id: 1,
            quadra: "Império Romano",
            endereco: "Prédio Etec Paulistano - Av. Elísio Teixeira Leite, 3393",
            horarios: "10:00 às 11:00, 11:00 às 12:00",
            data: "20/12/25",
            valor: "R$700,00"
          },
          {
            id: 2,
            quadra: "Campo Verde",
            endereco: "Rua das Flores, 123 - Jardim Primavera",
            horarios: "14:00 às 15:00",
            data: "22/12/25",
            valor: "R$500,00"
          },
          {
            id: 3,
            quadra: "Campo Rosa",
            endereco: "Rua das Flores, 123 - Jardim Primavera",
            horarios: "11:00 às 15:00",
            data: "23/05/25",
            valor: "R$900,00"
          }
        ];
        
        setAgendamentos(dadosMockados);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      } finally {
        setCarregando(false);
      }
    };

    buscarAgendamentos();
  }, []);

  return (
    <Layout>
      <div className={styles.main_container}>
        <h1 className={styles.title}>Meus Agendamentos</h1>

        {carregando ? (
          <p className={styles.table_not_found}>Carregando agendamentos...</p>
        ) : agendamentos.length > 0 ? (
          <table className={styles.table_titles}>
            <thead>
              <tr>
                <th>Quadra</th>
                <th>Endereço</th>
                <th>Horário</th>
                <th>Data</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map((agendamento) => (
                <tr key={agendamento.id} className={styles.table_data}>
                  <td>{agendamento.quadra}</td>
                  <td>{agendamento.endereco}</td>
                  <td>{agendamento.horarios}</td>
                  <td>{agendamento.data}</td>
                  <td>{agendamento.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.table_not_found}>Nenhum agendamento encontrado.</p>
        )}
      </div>
    </Layout>
  );
}

export default UsuarioAgendamento;