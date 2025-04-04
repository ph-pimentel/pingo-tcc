import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerLeft}>
      <img src="../src/assets/logo/pingoLogo.png" alt='logo'/>
      <br></br>
      <span>© 2025 PINGO, Inc</span>
      </div>
      <div className={styles.footerRight}>
      <h3>Contato</h3>
      <span>Email: pingo@gmail.com</span>
      <br></br>
      <span>Telefone: (+55) 11 93886-5724</span>
      </div>
    </div>
  )
}

export default Footer