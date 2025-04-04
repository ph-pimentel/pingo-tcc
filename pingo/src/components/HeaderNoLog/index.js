// Header.js
import styles from "./HeaderNoLog.module.css";



function HeaderNoLog() {
    return (

        <div className={styles.header}>

            {/*-- Main Container -- */}
            <div className={styles.container}>

                <div className={styles.left}>
                    <a href="/">
                        <img src="../img/Header/pingoLogo.png" className={styles.logo} />
                    </a>

                   
                 

                </div>

                {/*-- Center --*/}
                <div className={styles.center}>
            
                <a href="#sobre" className={styles.center_redirect_title}>Sobre</a>
                <a href="#duvidas" className={styles.center_redirect_title}>Passo a Passo</a>
                <a href="#perguntas" className={styles.center_redirect_title}>Perguntas</a>


                </div>


                {/*-- Right --*/}
                <div className={styles.right}>
                      <a href="/login" className={styles.btn_login}>Login</a>
                      <a href="/registro" className={styles.btn_register}>Cadastrar-se</a>
                </div>
            </div>






        </div>
    );
}

export default HeaderNoLog;
