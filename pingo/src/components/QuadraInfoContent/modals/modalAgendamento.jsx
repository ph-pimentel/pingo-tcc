import React, { useState } from 'react';
import styles from './modalAgendamento.module.css';

function ModalAgendamento({ isVisible, onClose, agendamentoDados }) {
  const [agendamentoConfirmado, setAgendamentoConfirmado] = useState(false);
  const [pixCopiado, setPixCopiado] = useState(false);

  if (!isVisible) {
    return null;
  }

  if (!agendamentoDados) {
    return (
      <div className={styles.modal_main_container}>
        <button className={styles.modal_leave_button} onClick={onClose}>
          <img src="../img/QuadraInfo/sair.png" alt="Fechar" />
        </button>
        <h1>Erro: Dados do agendamento não disponíveis</h1>
      </div>
    );
  }

  const { data, horarios, total } = agendamentoDados;

  // Código PIX de exemplo (você pode gerar dinamicamente)
  const codigoPix = `00020126360014BR.GOV.BCB.PIX0114+55119876543210210Pingo
  52040000530398654061000.005802BR5910Pingo6009SaoPaulo621
  00506PingoTx6304ABCD`.replace(/\s+/g, ''); // Remove espaços e quebras de linha

  // Função para copiar o código PIX
  const copiarCodigoPix = () => {
    navigator.clipboard.writeText(codigoPix)
      .then(() => {
        setPixCopiado(true);
        setTimeout(() => setPixCopiado(false), 2000); // Reset após 2 segundos
      })
      .catch(err => {
        console.error('Falha ao copiar: ', err);
      });
  };

  // Função para confirmar o agendamento
  const confirmarAgendamento = () => {
    setAgendamentoConfirmado(true);
    // Aqui você pode adicionar lógica para enviar para o backend
  };

  // Calcular data de expiração (1 hora a partir de agora)
  const calcularExpiracao = () => {
    const agora = new Date();
    agora.setHours(agora.getHours() + 1);
    return agora.toLocaleString('pt-BR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.modal_main_container}>
      <button className={styles.modal_leave_button} onClick={onClose}>
        <img src="../img/QuadraInfo/sair.png" alt="Fechar" />
      </button>
      
      <div className={styles.text_main_container}>
        <h1>Resumo do Agendamento</h1>
        <div className={styles.text_form}>
          <p>Data: {data.dia} de {new Date(2025, data.mes - 1).toLocaleString('default', { month: 'long' })} de {data.ano}</p>
          <p>Horários: {horarios.map(h => `${h.inicio} às ${h.fim}`).join(', ')}</p>
          <p>Preço Total: R${total}</p>
        </div>

        {!agendamentoConfirmado ? (
          <button 
            className={styles.btn_confirmar} 
            onClick={confirmarAgendamento}
          >
            Confirmar Agendamento
          </button>
        ) : (
          <div className={`${styles.pix_main_container} ${styles.show}`}>
            <h1>Pagamento Pix</h1>
            <h1>Expira em {calcularExpiracao()}</h1>
            
            <div className={styles.pix_flex}>
              <div className={styles.pix_image_container}>
                <img src="../img/QuadraInfo/qrcodeexemplo.png" alt="QR Code Pix"/>
              </div>
              
              <div className={styles.pix_text_container}>
                <h3>Código Pix</h3>
                <div className={styles.pix_text}>
                  <p>{codigoPix.match(/.{1,50}/g)?.join('\n')}</p>
                </div>
                
                <button 
                  className={styles.pix_copy_and_paste} 
                  onClick={copiarCodigoPix}
                >
                  <img src="../img/QuadraInfo/copy.png" alt="Copiar"/>
                  <p>{pixCopiado ? 'Copiado!' : 'Copiar'}</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalAgendamento;