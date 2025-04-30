// src/modals/ModalSeeHours.jsx
import React, { useState, useEffect } from 'react';
import styles from './modalSeeHours.module.css';

// Componente DiasContainer (mantido igual)
function DiasContainer({ 
  mes, 
  ano, 
  onDiaSelecionado, 
  dataAtual, 
  diaSelecionado, 
  setDiaSelecionado, 
  diasIndisponiveis,
  disponibilidade 
}) {
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  
  const selecionarDia = (dia) => {
    const dataSelecionada = new Date(ano, mes, dia);
    if (dataSelecionada >= new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate())) {
      setDiaSelecionado(dia);
      onDiaSelecionado(dia, mes, ano);
    }
  };
  
  const isDiaIndisponivel = (dia) => {
    return diasIndisponiveis.some(d => d.dia === dia && d.mes === mes + 1 && d.ano === ano);
  };

  const isDiaUtil = (dia) => {
    const diaSemana = new Date(ano, mes, dia).getDay();
    return diaSemana !== 0 && diaSemana !== 6;
  };

  const shouldShowDay = (dia) => {
    const dataSelecionada = new Date(ano, mes, dia);
    const isDiaFuturo = dataSelecionada >= new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());
    const isDiaDisponivel = !isDiaIndisponivel(dia);
    
    if (!isDiaFuturo || !isDiaDisponivel) return false;
    
    switch(disponibilidade) {
      case 'dias-uteis':
        return isDiaUtil(dia);
      case 'fim-de-semana':
        return !isDiaUtil(dia);
      default: 
        return true;
    }
  };
  
  return (
    <div className={`${styles.days_container} ${styles.day_buttons_container}`}>
      {[...Array(diasNoMes)].map((_, i) => {
        const dia = i + 1;
        const dataSelecionada = new Date(ano, mes, dia);
        const diaSemana = dataSelecionada.toLocaleString('default', { weekday: 'short' }).toUpperCase().replace('.', '');
        
        if (shouldShowDay(dia)) {
          return (
            <button
              className={`${styles.btn_day_select} ${diaSelecionado === dia ? styles.selected : ''}`}
              key={i}
              onClick={() => selecionarDia(dia)}
            >
              {dia} <br /> {diaSemana}
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}

// Componente Calendario (mantido igual)
function Calendario({ onDiaSelecionado, disponibilidade }) {
  const dataAtual = new Date();
  const [mesAtual, setMesAtual] = useState(dataAtual.getMonth());
  const [anoAtual, setAnoAtual] = useState(dataAtual.getFullYear());
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  
  const mudarMes = (incremento) => {
    const novaData = new Date(anoAtual, mesAtual + incremento, 1);
    const dataLimite = new Date(dataAtual.getFullYear() + 1, dataAtual.getMonth(), 1);
    
    if (novaData >= new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1) && 
        novaData <= dataLimite) {
      setMesAtual(novaData.getMonth());
      setAnoAtual(novaData.getFullYear());
      setDiaSelecionado(null);
    }
  };
  
  const isMesAtual = mesAtual === dataAtual.getMonth() && anoAtual === dataAtual.getFullYear();
  const atingiuLimiteFuturo = new Date(anoAtual, mesAtual + 1, 1) > 
                             new Date(dataAtual.getFullYear() + 1, dataAtual.getMonth(), 1);
  
  return (
    <div className={styles.date_container}>
      <div className={styles.mount_container}>
        <button 
          onClick={() => mudarMes(-1)} 
          className={styles.btn_mount_select2}
          disabled={isMesAtual}
        >
          <img src="../img/QuadraInfo/seta.png" alt="Anterior" />
        </button>
        <span>{new Date(anoAtual, mesAtual).toLocaleString('default', { month: 'long' })} {anoAtual}</span>
        <button 
          onClick={() => mudarMes(1)} 
          className={styles.btn_mounth_select}
          disabled={atingiuLimiteFuturo}
        >
          <img src="../img/QuadraInfo/seta.png" alt="Próximo" />
        </button>
      </div>
      <DiasContainer
        mes={mesAtual}
        ano={anoAtual}
        onDiaSelecionado={(dia) => onDiaSelecionado(dia, mesAtual, anoAtual)}
        dataAtual={dataAtual}
        diaSelecionado={diaSelecionado}
        setDiaSelecionado={setDiaSelecionado}
        diasIndisponiveis={diasIndisponiveis}
        disponibilidade={disponibilidade}
      />
    </div>
  );
}

// Dados mockados (mantido igual)
const HORARIOS_PADRAO = [
  { inicio: '08:00', fim: '09:00', preco: 300, id: 1 },
  { inicio: '09:00', fim: '10:00', preco: 300, id: 2 },
  { inicio: '10:00', fim: '11:00', preco: 300, id: 3 },
  { inicio: '14:00', fim: '15:00', preco: 350, id: 4 },
  { inicio: '15:00', fim: '16:00', preco: 350, id: 5 },
  { inicio: '16:00', fim: '17:00', preco: 350, id: 6 },
  { inicio: '18:00', fim: '19:00', preco: 400, id: 7 },
  { inicio: '19:00', fim: '20:00', preco: 400, id: 8 },
];

const horariosReservados = [
  { dia: 15, mes: 4, ano: 2025, inicio: '14:00', fim: '15:00' },
];

const diasIndisponiveis = [
  { dia: 22, mes: 4, ano: 2025 },
  { dia: 23, mes: 4, ano: 2025 },
  { dia: 27, mes: 5, ano: 2025 },
];

// Componente Principal
function ModalSeeHours({ isVisible, onClose, disponibilidade = 'todos', onAgendar }) {
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [mesSelecionado, setMesSelecionado] = useState(null);
  const [anoSelecionado, setAnoSelecionado] = useState(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const HORARIOS_POR_PAGINA = 3;

  useEffect(() => {
    if (diaSelecionado) {
      const disponiveis = HORARIOS_PADRAO.filter(horario => {
        const estaReservado = horariosReservados.some(reserva => 
          reserva.dia === diaSelecionado && 
          reserva.mes === mesSelecionado + 1 && 
          reserva.ano === anoSelecionado &&
          reserva.inicio === horario.inicio
        );
        return !estaReservado;
      });
      setHorariosDisponiveis(disponiveis);
      setPaginaAtual(0); 
      setHorariosSelecionados([]); 
    }
  }, [diaSelecionado, mesSelecionado, anoSelecionado]);

  const handleDiaSelecionado = (dia, mes, ano) => {
    setDiaSelecionado(dia);
    setMesSelecionado(mes);
    setAnoSelecionado(ano);
  };

  const handleSelecionarHorario = (horario) => {
    setHorariosSelecionados(prev => {
      const alreadySelected = prev.some(h => h.id === horario.id);
      if (alreadySelected) {
        return prev.filter(h => h.id !== horario.id);
      } else {
        return [...prev, horario];
      }
    });
  };

  const handlePaginarHorarios = (direcao) => {
    const totalPaginas = Math.ceil(horariosDisponiveis.length / HORARIOS_POR_PAGINA);
    setPaginaAtual(prev => {
      if (direcao === 'proximo') {
        return prev < totalPaginas - 1 ? prev + 1 : prev;
      } else {
        return prev > 0 ? prev - 1 : prev;
      }
    });
  };

  const handleAgendar = () => {
    if (horariosSelecionados.length === 0) {
      console.log('Nenhum horário selecionado');
      return;
    }

    const dadosAgendamento = {
      data: {
        dia: diaSelecionado,
        mes: mesSelecionado + 1, 
        ano: anoSelecionado
      },
      horarios: horariosSelecionados,
      total: horariosSelecionados.reduce((sum, horario) => sum + horario.preco, 0)
    };

    onAgendar(dadosAgendamento); // Passa os dados para o pai e abre o ModalAgendamento
    onClose(); // Fecha o ModalSeeHours
  };

  const horariosVisiveis = horariosDisponiveis.slice(
    paginaAtual * HORARIOS_POR_PAGINA,
    (paginaAtual + 1) * HORARIOS_POR_PAGINA
  );

  if (!isVisible) return null;

  return (
    <div className={styles.modal_main_container}>
      <div>
        <button onClick={onClose} className={styles.modal_leave_button}>
          <img src="../img/QuadraInfo/sair.png" alt="Fechar" />
        </button>
      </div>

      <div className={styles.hours_container}>
        <div className={styles.see_hours_title_container}>
          <h1>Agende seu Horário</h1>
          <Calendario 
            onDiaSelecionado={handleDiaSelecionado} 
            disponibilidade={disponibilidade} 
          />
        </div>
      </div>

      <div className={styles.quadra_main_container}>
        <div className={styles.quadra_img_container}>
          <img src="../img/Carrossel/image1.jpg" alt="Quadra"/>
        </div>

        <div className={styles.quadra_info_main_container}>
          <div className={styles.quadra_info_title}>
            <h1>Quadra 1</h1>
          </div>
          
          <div className={styles.quadra_info_sport}>
            <div className={styles.quadra_info_title}>
              <h2>Esportes</h2>
            </div>
            
            <div className={styles.quadra_info_sports_container}>
              <div className={styles.item_sport}>
                <img src="../img/CourtCard/footballball.png" alt="Futebol"/>
                <h2>Futebol</h2>
              </div>
              <div className={styles.item_sport}>
                <img src="../img/CourtCard/basketball.png" alt="Basquete"/>
                <h2>Basquete</h2>
              </div>
              <div className={styles.item_sport}>
                <img src="../img/CourtCard/volleyball.png" alt="Vôlei"/>
                <h2>Vôlei</h2>
              </div>
            </div>
          </div>

          <div className={styles.hours_main_container}>
            <button 
              onClick={() => handlePaginarHorarios('anterior')} 
              className={styles.button_next_hours}
              disabled={paginaAtual === 0}
            >
              <img src="../img/QuadraInfo/seta.png" alt="Anterior" className={styles.next_hours2} />
            </button>

            {diaSelecionado ? (
              horariosVisiveis.length > 0 ? (
                horariosVisiveis.map(horario => (
                  <label key={horario.id} className={styles.hours_card_container}>
                    <input 
                      type="checkbox" 
                      className={styles.hours_checkbox}
                      checked={horariosSelecionados.some(h => h.id === horario.id)}
                      onChange={() => handleSelecionarHorario(horario)}
                    />
                    <div className={styles.hours_text_container}>
                      <h2>{horario.inicio} às {horario.fim}</h2>
                      <h2>R${horario.preco}</h2>
                    </div>
                  </label>
                ))
              ) : (
                <p className={styles.text_notification}>Nenhum horário disponível para este dia</p>
              )
            ) : (
              <p className={styles.text_notification}>Selecione uma data para ver os horários disponíveis</p>
            )}

            <button 
              onClick={() => handlePaginarHorarios('proximo')} 
              className={styles.button_next_hours}
              disabled={(paginaAtual + 1) * HORARIOS_POR_PAGINA >= horariosDisponiveis.length}
            >
              <img src="../img/QuadraInfo/seta.png" alt="Próximo" className={styles.next_hours} />
            </button>
          </div>

          <button 
            className={styles.btn_scheduling} 
            onClick={handleAgendar}
            disabled={horariosSelecionados.length === 0}
          >
            Agendamento
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSeeHours;