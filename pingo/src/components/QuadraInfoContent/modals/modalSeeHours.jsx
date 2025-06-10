// src/modals/ModalSeeHours.jsx
import React, { useState, useEffect } from 'react';
import styles from './modalSeeHours.module.css';

// =============================================
// Constantes e Dados Mockados
// =============================================

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

const HORARIOS_POR_PAGINA = 3;

// =============================================
// Componente DiasContainer
// =============================================

function DiasContainer({ 
  mes, 
  ano, 
  onDiaSelecionado, 
  dataAtual, 
  diaSelecionado, 
  setDiaSelecionado,
  diasDisponiveis,
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
  
  const isDiaDisponivel = (dia) => {
    return diasDisponiveis.some(d => 
      d.dia === dia && 
      d.mes === mes + 1 && 
      d.ano === ano
    );
  };

  const isDiaUtil = (dia) => {
    const diaSemana = new Date(ano, mes, dia).getDay();
    return diaSemana !== 0 && diaSemana !== 6;
  };

  const shouldShowDay = (dia) => {
    const dataSelecionada = new Date(ano, mes, dia);
    const isDiaFuturo = dataSelecionada >= new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());
    
    if (!isDiaFuturo || !isDiaDisponivel(dia)) return false;
    
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

// =============================================
// Componente Calendario
// =============================================

function Calendario({ 
  onDiaSelecionado, 
  disponibilidade,
  diasDisponiveis 
}) {
  const dataAtual = new Date();
  const [mesAtual, setMesAtual] = useState(dataAtual.getMonth());
  const [anoAtual, setAnoAtual] = useState(dataAtual.getFullYear());
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  
  // Verifica se existem dias disponíveis nos próximos meses
  const existeMesDisponivel = (incremento) => {
    const proximoMes = new Date(anoAtual, mesAtual + incremento, 1);
    return diasDisponiveis.some(d => {
      const dataDisponivel = new Date(d.ano, d.mes - 1, d.dia);
      return dataDisponivel >= proximoMes;
    });
  };
  
  const mudarMes = (incremento) => {
    const novaData = new Date(anoAtual, mesAtual + incremento, 1);
    setMesAtual(novaData.getMonth());
    setAnoAtual(novaData.getFullYear());
    setDiaSelecionado(null);
  };
  
  const isMesAtual = mesAtual === dataAtual.getMonth() && anoAtual === dataAtual.getFullYear();
  const temProximoMesDisponivel = existeMesDisponivel(1);

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
          disabled={!temProximoMesDisponivel}
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
        diasDisponiveis={diasDisponiveis}
        disponibilidade={disponibilidade}
      />
    </div>
  );
}

// =============================================
// Componente Principal ModalSeeHours
// =============================================

function ModalSeeHours({ 
  isVisible, 
  onClose, 
  disponibilidade = 'todos', 
  onAgendar,
  diasDisponiveis = [],  // Nova prop: lista de dias disponíveis
  horariosReservados = [] 
}) {
  // Estados
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [mesSelecionado, setMesSelecionado] = useState(null);
  const [anoSelecionado, setAnoSelecionado] = useState(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);

  // Resetar estados quando o modal abre
  useEffect(() => {
    if (isVisible) {
      const dataAtual = new Date();
      setDiaSelecionado(null);
      setMesSelecionado(dataAtual.getMonth());
      setAnoSelecionado(dataAtual.getFullYear());
      setHorariosDisponiveis([]);
      setHorariosSelecionados([]);
      setPaginaAtual(0);
    }
  }, [isVisible]);

  // Atualizar horários disponíveis quando seleciona um dia
  useEffect(() => {
    if (diaSelecionado) {
      const hoje = new Date();
      const dataSelecionada = new Date(anoSelecionado, mesSelecionado, diaSelecionado);
      const mesmoDia = dataSelecionada.getDate() === hoje.getDate() && 
                      dataSelecionada.getMonth() === hoje.getMonth() && 
                      dataSelecionada.getFullYear() === hoje.getFullYear();
  
      const disponiveis = HORARIOS_PADRAO.filter(horario => {
        if (mesmoDia) {
          const [hora, minuto] = horario.inicio.split(':').map(Number);
          const horarioInicio = new Date();
          horarioInicio.setHours(hora, minuto, 0, 0);
          
          if (horarioInicio < hoje) {
            return false;
          }
        }
  
        // Verifica se está reservado
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
  }, [diaSelecionado, mesSelecionado, anoSelecionado, horariosReservados]);

  // Handlers
  const handleDiaSelecionado = (dia, mes, ano) => {
    setDiaSelecionado(dia);
    setMesSelecionado(mes);
    setAnoSelecionado(ano);
  };

  const handleSelecionarHorario = (horario) => {
    setHorariosSelecionados(prev => {
      const alreadySelected = prev.some(h => h.id === horario.id);
      return alreadySelected 
        ? prev.filter(h => h.id !== horario.id) 
        : [...prev, horario];
    });
  };

  const handlePaginarHorarios = (direcao) => {
    const totalPaginas = Math.ceil(horariosDisponiveis.length / HORARIOS_POR_PAGINA);
    setPaginaAtual(prev => {
      return direcao === 'proximo' 
        ? Math.min(prev + 1, totalPaginas - 1) 
        : Math.max(prev - 1, 0);
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

    onAgendar(dadosAgendamento);
    onClose();
  };

  // Calcula horários visíveis na paginação atual
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
            diasDisponiveis={diasDisponiveis}
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
            {horariosDisponiveis.length > 0 && (
              <button 
                onClick={() => handlePaginarHorarios('anterior')} 
                className={styles.button_next_hours}
                disabled={paginaAtual === 0}
              >
                <img src="../img/QuadraInfo/seta.png" alt="Anterior" className={styles.next_hours2} />
              </button>
            )}

            {diaSelecionado ? (
              horariosVisiveis.length > 0 ? (
                horariosVisiveis.map(horario => (
                  <label key={horario.id} className={styles.hours_card_container}>
                    <div>
                      <input 
                        type="checkbox" 
                        className={styles.hours_checkbox}
                        checked={horariosSelecionados.some(h => h.id === horario.id)}
                        onChange={() => handleSelecionarHorario(horario)}
                      />
                    </div>
                    <div className={styles.hours_text_container}>
                      <h2>{horario.inicio} às {horario.fim}</h2>
                      <h2>R${horario.preco}</h2>
                    </div>
                  </label>
                ))
              ) : (
                <div className={styles.text_notification}>
                  {new Date(anoSelecionado, mesSelecionado, diaSelecionado).getDate() === new Date().getDate() &&
                  new Date(anoSelecionado, mesSelecionado, diaSelecionado).getMonth() === new Date().getMonth() &&
                  new Date(anoSelecionado, mesSelecionado, diaSelecionado).getFullYear() === new Date().getFullYear()
                  ? <p>Todos os horários de hoje já passaram.</p>
                  : <p>Nenhum horário disponível para este dia.</p>}
                </div>
              )
            ) : (
              <p className={styles.text_notification}>Selecione uma data para ver os horários disponíveis.</p>
            )}

            {horariosDisponiveis.length > 0 && (
              <button 
                onClick={() => handlePaginarHorarios('proximo')} 
                className={styles.button_next_hours}
                disabled={(paginaAtual + 1) * HORARIOS_POR_PAGINA >= horariosDisponiveis.length}
              >
                <img src="../img/QuadraInfo/seta.png" alt="Próximo" className={styles.next_hours} />
              </button>
            )}
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