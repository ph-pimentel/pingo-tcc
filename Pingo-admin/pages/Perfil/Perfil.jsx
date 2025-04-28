import styles from './Perfil.module.css'

const Perfil = () => {
  return (  
    
    <div className={styles.profilePage}>
     <h1>Configurações</h1>
      <div className={styles.profileContainer}>
    {/* Primeira Seção da Esquerda*/}
    <div className={styles.profileHeader}>
      <img className={styles.profileImage} src="https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/06/25/1838205454-h6qiiv3bcnfabit5e5pqj6rutq.png" alt="" />
       <div className={styles.userImage}>
          <button className={styles.buttonImage}>Change Image</button>
        </div>
        <div className={styles.senhas}>
          <div className={styles.oldSenha}>
            <span className={styles.text}>Senha Antiga</span>
            <br/>
            <input className={styles.input}></input>
        </div>
        <div className={styles.newSenha}>
            <span className={styles.text}>Senha Nova</span>
            <br/>
            <input className={styles.input}></input>
        </div>
      </div>
      <button className={styles.buttonPassword}>Change Password</button>
    </div>

    {/* Seção da Direita*/}
     <div className={styles.profileDetails}>
        {/* Sub Divisão Informações Usuario*/}
        <span className={styles.info}>Informações do Usuario</span>
        <div className={styles.infoProfile}>
          <div className={styles.inputGroup}>
            <span>Primeiro Nome</span>
            <input></input>
            <span>Nickname</span>
            <input></input>
          </div>
          <div className={styles.inputGroup}>
            <span>Segundo Nome</span>
            <input></input>
          </div>
        </div>

        {/* Sub Divisão Configurações Usuario*/}
        <span className={styles.info}>Configurações do Usuario</span>
        <div className={styles.infoProfile}>
          <div className={styles.inputGroup}>
            <span>Email</span>
            <input></input>
            <span>Telefone</span>
            <input></input>
          </div>
          <div className={styles.inputGroup}>
            <span>Tipo de Usuario</span>
            <input ></input>
          </div>
        </div>
        
    </div>
    </div>
  </div>
  )

}

export default Perfil