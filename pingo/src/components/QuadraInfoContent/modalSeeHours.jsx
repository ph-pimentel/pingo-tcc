import React from 'react';
import styles from './modalSeeHours.module.css';

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
          <div>
            <h2>{mesAtual} {anoAtual}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalSeeHours;