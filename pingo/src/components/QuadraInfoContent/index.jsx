// src/QuadraInfoContent.jsx
import styles from "./quadrainfocontent.module.css";
import { useState } from "react";
import ModalSeeHours from "./modals/ModalSeeHours";
import ModalAgendamento from "./modals/ModalAgendamento";

function QuadraInfoContent() {
  const textos = {
    descricao: <span>Quadra mais limpa do mundo...</span>,
    contato: <span>contatoproprietario@gmail.com <br/>Telefone 123-012039-19</span>,
    regras: <span>Não mijar na quadra de luz acesa</span>
  };

  const [textoAtivo, setTextoAtivo] = useState(textos.descricao);
  const [modalSeeHours, setModalSeeHours] = useState(false);
  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [agendamentoDados, setAgendamentoDados] = useState(null); // Estado para armazenar os dados do agendamento

  const handleAgendar = (dados) => {
    setAgendamentoDados(dados); // Armazena os dados do agendamento
    setModalAgendamento(true); // Abre o ModalAgendamento
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.content_container}>
        <ModalSeeHours 
          isVisible={modalSeeHours} 
          onClose={() => setModalSeeHours(false)}
          onAgendar={handleAgendar} // Passa a callback para receber os dados
        />
        <ModalAgendamento 
          isVisible={modalAgendamento} 
          onClose={() => setModalAgendamento(false)}
          agendamentoDados={agendamentoDados} // Passa os dados para o ModalAgendamento
        />

        {/* Imagem e Detalhes da Quadra */}
        <div className={styles.main_content}>
          <div className={styles.img_container}>
            <img src="../img/Carrossel/image1.jpg" alt="Quadra"/> 
          </div>
          <div className={styles.quadra_info_container}>
            <div className={styles.quadra_info_title}>
              <h1>Nome da Quadra</h1>
            </div>
            <div className={styles.quadra_info_subtitle}>
              <h1>Região</h1>
              <h2>Exemplo</h2>
            </div>
            <div className={styles.quadra_info_subtitle}>
              <h1>Endereço</h1>
              <p>Rua joãozinho pereira da silva @ 943 - belo campo amarelonho pereira da silva @ 943 - belo campo amarelo</p>
            </div>
            <button className={styles.btn_see_hours} onClick={() => setModalSeeHours(true)}>
              <img src="../img/QuadraInfo/clock.png" alt="Clock"/>    
              Horários Disponíveis
            </button>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className={styles.description_container}>
          <div className={styles.description_content_container}>
            <button onClick={() => setTextoAtivo(textos.descricao)}>Descrição</button>
            <button onClick={() => setTextoAtivo(textos.contato)}>Contato</button>
            <button onClick={() => setTextoAtivo(textos.regras)}>Regras</button>
          </div>
          <div className={styles.description_text}>
            {textoAtivo && <p>{textoAtivo}</p>}
          </div>
        </div>

        {/* Outras Quadras */}
        <div className={styles.other_courts_container}>
          <div className={styles.other_courts_title}>
            <h1>Outras Quadras</h1>                
          </div>
          <div className={styles.court_cards_container}>
            <a href="LINK DA QUADRA" className={styles.court_card}>
              <img src="../img/Carrossel/image1.jpg" alt="Quadra"/> 
              <h1>Nome da Quadra</h1>
            </a>
            <a href="LINK DA QUADRA" className={styles.court_card}>
              <img src="../img/Carrossel/image1.jpg" alt="Quadra"/> 
              <h1>Nome da Quadra</h1>
            </a>
            <a href="LINK DA QUADRA" className={styles.court_card}>
              <img src="../img/Carrossel/image1.jpg" alt="Quadra"/> 
              <h1>Nome da Quadra</h1>
            </a>
            <a href="LINK DA QUADRA" className={styles.court_card}>
              <img src="../img/Carrossel/image1.jpg" alt="Quadra"/> 
              <h1>Nome da Quadra</h1>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuadraInfoContent;