// src/QuadraInfoContent.jsx
import styles from "./quadrainfocontent.module.css";
import { useState, useEffect } from "react";
import ModalSeeHours from './modals/ModalSeeHours';
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
  const [agendamentoDados, setAgendamentoDados] = useState(null);
  const [isFavorito, setIsFavorito] = useState(false);
  const [loadingFavorito, setLoadingFavorito] = useState(false);

  const quadraId = "1"; 
  const usuarioId = "1"; 


  const fetchFavoritoStatus = async () => {
    try {
      const mockFavorito = false; 
      setIsFavorito(mockFavorito);
    } catch (error) {
      console.error("Erro ao buscar status de favorito:", error);
    }
  };

  // Função para atualizar o favorito no backend
  const updateFavoritoBackend = async (novoEstado) => {
    setLoadingFavorito(true);
    try {
      // Mock temporário 
      console.log(`Atualizando favorito no backend: Quadra ${quadraId}, Usuário ${usuarioId}, Status: ${novoEstado}`);
      setIsFavorito(novoEstado); 
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    } finally {
      setLoadingFavorito(false);
    }
  };

  useEffect(() => {
    fetchFavoritoStatus();
  }, []);

  const handleAgendar = (dados) => {
    setAgendamentoDados(dados);
    setModalAgendamento(true);
  };

  const toggleFavorito = () => {
    const novoEstado = !isFavorito;
    updateFavoritoBackend(novoEstado);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.content_container}>
        <ModalSeeHours 
          isVisible={modalSeeHours} 
          onClose={() => setModalSeeHours(false)}
          onAgendar={handleAgendar}
        />
        <ModalAgendamento 
          isVisible={modalAgendamento} 
          onClose={() => setModalAgendamento(false)}
          agendamentoDados={agendamentoDados}
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

            <div className={styles.btn_favorite_container}>
              <button 
                className={styles.btn_favorite} 
                onClick={toggleFavorito}
                disabled={loadingFavorito}
              >
                {loadingFavorito ? (
                  <span>Carregando...</span>
                ) : (
                  <img 
                    src={isFavorito ? "../img/QuadraInfo/favoritofull.png" : "../img/QuadraInfo/favorito.png"} 
                    alt={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  />
                )}
              </button>
            </div>
            
            <button className={styles.btn_see_hours} onClick={() => setModalSeeHours(true)}>
              <img src="../img/QuadraInfo/clock.png" alt="Clock"/>    
              Horários Disponíveis
            </button>

          </div>
        </div>

        {/*---------------------------*/}
        {/*         DESCRIÇÃO         */}
        {/*---------------------------*/}
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
              <img src="../img/Header/steve.png" alt="Quadra"/> 
              <h1>Nome da Quadra</h1>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuadraInfoContent;