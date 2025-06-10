// src/modals/ModalSeeHours.jsx
import React, { useState, useEffect } from 'react';
import styles from './modalSeeHours.module.css';

// ============= VARIÁVEIS =============
const KITS_HORARIOS = [
  {
    id: 1,
    horarios: [
      { id: 1, inicio: '08:00', fim: '09:00' },
      { id: 2, inicio: '09:00', fim: '10:00' },
      { id: 3, inicio: '10:00', fim: '11:00' }
    ],
    preco: 300,
    periodo: {
      inicio: new Date(2025, 5, 15), // 01/06/2025
      fim: new Date(2025, 5, 31)    // 31/06/2025
    }
  },
  {
    id: 2,
    horarios: [
      { id: 4, inicio: '14:00', fim: '15:00' },
      { id: 5, inicio: '15:00', fim: '16:00' },
      { id: 6, inicio: '16:00', fim: '17:00' }
    ],
    preco: 350,
    periodo: {
      inicio: new Date(2025, 6, 1), // 01/07/2025
      fim: new Date(2025, 6, 31)    // 31/07/2025
    }
  },
  {
    id: 3,
    horarios: [
      { id: 7, inicio: '18:00', fim: '19:00' },
      { id: 8, inicio: '19:00', fim: '20:00' }
    ],
    preco: 400,
    periodo: {
      inicio: new Date(2025, 7, 1), // 01/08/2025
      fim: new Date(2025, 7, 31)    // 31/08/2025
    }
  }
];

// Dias que não terão nenhum horário disponível (sobrescreve tudo)
const PERIODOS_INDISPONIVEIS = [
  {
    inicio: new Date(2025, 5, 22), // 22/06/2025
    fim: new Date(2025, 5, 24)     // 24/06/2025 
  },
  {
    inicio: new Date(2025, 6, 1),  // 01/07/2025
    fim: new Date(2025, 6, 7)      // 07/07/2025 
  }
];

// Horários já reservados (dentro dos disponíveis)
const HORARIOS_RESERVADOS = [
  { dia: 15, mes: 6, ano: 2025, horarioId: 4 } // Reservou o horário de id 4 no dia 15/05/2025
];

const HORARIOS_POR_PAGINA = 3;

// ============= FUNÇÕES =============
// Componente DiasContainer
function DiasContainer({ 
  mes, 
  ano, 
  onDiaSelecionado, 
  dataAtual, 
  diaSelecionado, 
  setDiaSelecionado,
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
  const dataTeste = new Date(ano, mes, dia);
  return PERIODOS_INDISPONIVEIS.some(periodo => 
    dataTeste >= periodo.inicio && 
    dataTeste <= periodo.fim
  );
};

  const isDiaUtil = (dia) => {
    const diaSemana = new Date(ano, mes, dia).getDay();
    return diaSemana !== 0 && diaSemana !== 6;
  };

  const isDiaNoPeriodoKit = (dia) => {
    const dataTeste = new Date(ano, mes, dia);
    return KITS_HORARIOS.some(kit => 
      dataTeste >= kit.periodo.inicio && 
      dataTeste <= kit.periodo.fim
    );
  };

  const shouldShowDay = (dia) => {
    const dataSelecionada = new Date(ano, mes, dia);
    const isDiaFuturo = dataSelecionada >= new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());
    const isDiaNoPeriodo = isDiaNoPeriodoKit(dia);
    const isDiaBloqueado = isDiaIndisponivel(dia);
    
    if (!isDiaFuturo || !isDiaNoPeriodo || isDiaBloqueado) return false;
    
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

// Componente Calendario
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
        disponibilidade={disponibilidade}
      />
    </div>
  );
}

// ============= CÓDIGO BASE =============
function ModalSeeHours({ isVisible, onClose, disponibilidade = 'todos', onAgendar }) {
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [mesSelecionado, setMesSelecionado] = useState(null);
  const [anoSelecionado, setAnoSelecionado] = useState(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);

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

  useEffect(() => {
    if (diaSelecionado) {
      const hoje = new Date();
      const dataSelecionada = new Date(anoSelecionado, mesSelecionado, diaSelecionado);
      const mesmoDia = dataSelecionada.getDate() === hoje.getDate() && 
                      dataSelecionada.getMonth() === hoje.getMonth() && 
                      dataSelecionada.getFullYear() === hoje.getFullYear();

      // Encontra todos os kits que estão ativos na data selecionada
      const kitsAtivos = KITS_HORARIOS.filter(kit => 
        dataSelecionada >= kit.periodo.inicio && 
        dataSelecionada <= kit.periodo.fim
      );

      // Gera todos os horários disponíveis com seus preços
      let todosHorarios = [];
      kitsAtivos.forEach(kit => {
        kit.horarios.forEach(horario => {
          todosHorarios.push({
            ...horario,
            preco: kit.preco,
            kitNome: kit.nome
          });
        });
      });

      // Filtra horários passados se for o dia atual
      const disponiveis = todosHorarios.filter(horario => {
        if (mesmoDia) {
          const [hora, minuto] = horario.inicio.split(':').map(Number);
          const horarioInicio = new Date();
          horarioInicio.setHours(hora, minuto, 0, 0);
          
          if (horarioInicio < hoje) {
            return false;
          }
        }

        // Verifica se está reservado
        const estaReservado = HORARIOS_RESERVADOS.some(reserva => 
          reserva.dia === diaSelecionado && 
          reserva.mes === mesSelecionado && 
          reserva.ano === anoSelecionado &&
          reserva.horarioId === horario.id
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
        mes: mesSelecionado + 1, // +1 porque meses são 0-indexed
        ano: anoSelecionado
      },
      horarios: horariosSelecionados,
      total: horariosSelecionados.reduce((sum, horario) => sum + horario.preco, 0)
    };

    onAgendar(dadosAgendamento);
    onClose();
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