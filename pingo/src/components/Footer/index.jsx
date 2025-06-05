import styles from "./Footer.module.css";


function Footer() {
    
    return (

        <div className={styles.footer_container}>
           


            <div className={styles.items}>
                <div className={styles.logo}>
                <img src="../img/Footer/WhitePingo.png"/>
                <p>© 2025 PINGO,Inc</p>
                </div>
            </div>

            <div className={styles.items}>
                <div className={styles.list}>
                    <a href="">Sobre o Pingo</a>

                 </div>
            </div>

            <div className={styles.items}>
                <div className={styles.list}>
                    <a href="">Perguntas Frequentes</a>
                 </div>
            </div>


            <div className={styles.items}>
            <div className={styles.list}>
                         <h1>Contato</h1>
                    <div className={styles.contact}>
                         <h2>E-mail:</h2><p>pingo@gmail.com</p>
                    </div>
                    <div className={styles.contact}>
                         <h2>Telefone:</h2><p>+55 11 94504-9396</p>
                    </div>

                 </div>
            </div>

        </div>
    );
}

export default Footer;
