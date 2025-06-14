import styles from './AcessoGerenciadores.module.css'

const AcessoGerenciadores = () => {
  return (
    <div className={styles.forms}>
          <a href="/datas-reservas" className={styles.container}>
          <button className={styles.btn}>Aplicar Horários/Dias</button>
          </a>
          <a href="/datas-indisponiveis" className={styles.container}>
          <button className={styles.btn}>Aplicar Horários/Dias Indisponiveis</button>
          </a>
          <a href="/datas-gerenciador" className={styles.container}>
          <button className={styles.btn}>Gerenciador Global</button>
          </a>
    </div>
  )
}

export default AcessoGerenciadores