import React, { useState } from 'react';
import styles from './modalSeeHours.module.css';

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
      onDiaSelecionado(dia);
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


function Calendario({ onDiaSelecionado, disponibilidade }) {
  const dataAtual = new Date();
  const [mesAtual, setMesAtual] = useState(dataAtual.getMonth());
  const [anoAtual, setAnoAtual] = useState(dataAtual.getFullYear());
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  
  const mudarMes = (incremento) => {
    const novaData = new Date(anoAtual, mesAtual + incremento, 1);
    if (novaData >= new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1)) {
      setMesAtual(novaData.getMonth());
      setAnoAtual(novaData.getFullYear());
      setDiaSelecionado(null);
    }
  };
  
  return (
    <div className={styles.date_container}>
      <div className={styles.mount_container}>
        {!(mesAtual === dataAtual.getMonth() && anoAtual === dataAtual.getFullYear()) && (
          <button onClick={() => mudarMes(-1)} className={styles.btn_mount_select2}>
            <img src="../img/QuadraInfo/seta.png" alt="Anterior" />
          </button>
        )}
        <span>{new Date(anoAtual, mesAtual).toLocaleString('default', { month: 'long' })} {anoAtual}</span>
        <button onClick={() => mudarMes(1)} className={styles.btn_mounth_select}>
          <img src="../img/QuadraInfo/seta.png" alt="Próximo" />
        </button>
      </div>
  
      <DiasContainer
        mes={mesAtual}
        ano={anoAtual}
        onDiaSelecionado={onDiaSelecionado}
        dataAtual={dataAtual}
        diaSelecionado={diaSelecionado}
        setDiaSelecionado={setDiaSelecionado}
        diasIndisponiveis={diasIndisponiveis}
        disponibilidade={disponibilidade}
        />
    </div>
  );
}




{/* Aviso Backend 
 Colocar dias indisponiveis que o proprietario selecionou aqui
*/}
const diasIndisponiveis = [
  { dia: 24, mes: 4, ano: 2025 },
  { dia: 25, mes: 4, ano: 2025 },
  { dia: 27, mes: 5, ano: 2025 },
];
{/* Aviso Backend 
  Alterar tipos de dias disponiveis da semana em disponibilidade.
  opções: 'todos', 'dias-uteis', 'fim-de-semana'  
*/}
  
function ModalSeeHours({ isVisible, onClose, disponibilidade='dias-uteis' } )  {
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
            onDiaSelecionado={(dia) => console.log('Dia selecionado:', dia)} 
            disponibilidade={disponibilidade} 
          />
        </div>
      </div>
    </div>
  );
}

export default ModalSeeHours;