import React, { useState } from 'react';
import styles from './modalSeeHours.module.css';

function DiasContainer({ mes, ano, onDiaSelecionado, dataAtual, diaSelecionado, setDiaSelecionado }) {
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();

  const selecionarDia = (dia) => {
    const dataSelecionada = new Date(ano, mes, dia);
    if (dataSelecionada >= new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate())) {
      setDiaSelecionado(dia);
      onDiaSelecionado(dia);
    }
  };

  return (
    <div className={`${styles.days_container} ${styles.day_buttons_container}`}>
      {[...Array(diasNoMes)].map((_, i) => {
        const dia = i + 1;
        const dataSelecionada = new Date(ano, mes, dia);
        const diaSemana = dataSelecionada.toLocaleString('default', { weekday: 'short' }).toUpperCase().replace('.', '');

        if (dataSelecionada >= new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate())) {
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

function Calendario({ onDiaSelecionado }) {
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
        className={styles.day_buttons_container}
        mes={mesAtual}
        ano={anoAtual}
        onDiaSelecionado={onDiaSelecionado}
        dataAtual={dataAtual}
        diaSelecionado={diaSelecionado}
        setDiaSelecionado={setDiaSelecionado}
      />
    </div>
  );
}

function Horarios({ diaSelecionado }) {
  const horarios = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const [horariosIndisponiveis, setHorariosIndisponiveis] = useState([]);

  const reservarHorario = (horario) => {
    setHorariosIndisponiveis([...horariosIndisponiveis, horario]);
  };

  return (
    <div>
      {horarios.map((horario) => (
        <button
          key={horario}
          onClick={() => reservarHorario(horario)}
          disabled={horariosIndisponiveis.includes(horario)}
        >
          {horario}
        </button>
      ))}
    </div>
  );
}

function ModalSeeHours({ isVisible, onClose }) {
  if (!isVisible) return null;

  const dataAtual = new Date();
  const mesAtual = dataAtual.toLocaleString('default', { month: 'long' });
  const anoAtual = dataAtual.getFullYear();

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
          <Calendario onDiaSelecionado={(dia) => {}} />
        </div>
      </div>
    </div>
  );
}

export default ModalSeeHours;