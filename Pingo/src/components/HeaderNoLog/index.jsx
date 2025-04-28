import styles from "./HeaderNoLog.module.css";

function HeaderNoLog() {
  // Verificar se o usuário está logado (presença de token)
  const isLoggedIn = localStorage.getItem('token') || sessionStorage.getItem('token');

  return (
    <div className={styles.header}>
      {/*-- Main Container -- */}
      <div className={styles.container}>
        <div className={styles.left}>
          <a href="/home">
            <img src="../img/Header/pingoLogo.png" className={styles.logo} />
          </a>
        </div>

        {/*-- Center --*/}
        <div className={styles.center}>
          <a href="#sobre" className={styles.center_redirect_title}>Sobre</a>
          <a href="#passoapasso" className={styles.center_redirect_title}>Passo a Passo</a>
          <a href="#perguntas" className={styles.center_redirect_title}>Perguntas</a>
        </div>

        {/*-- Right --*/}
        <div className={styles.right}>
          {/* Mostrar botões de Login e Cadastro somente se o usuário NÃO estiver logado */}
          {!isLoggedIn && (
            <>
              <a href="/login" className={styles.btn_login}>Login</a>
              <a href="/registro" className={styles.btn_register}>Cadastrar-se</a>
            </>
          )}
          
          {/* Caso o usuário esteja logado, você pode mostrar um botão de logout ou qualquer outra opção */}
          {isLoggedIn && (
            <a href="/home">
                <img src="../img/Header/home.png" className={styles.left_icons} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderNoLog;
