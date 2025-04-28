import styles from './Perfil.module.css'
import { obterUsuario } from "../../api";
const Perfil = () => {
  const usuario = obterUsuario()
  return (  
    
    <div className={styles.profilePage}>
     <h1>Configurações</h1>
      <div className={styles.profileContainer}>
    {/* Primeira Seção da Esquerda*/}
    <div className={styles.profileHeader}>
      <img className={styles.profileImage} src={usuario.Foto} alt="" />
       <div className={styles.userImage}>
          <button className={styles.buttonImage}>Change Image</button>
        </div>
        <div className={styles.senhas}>
          <h2>Mudar Informações</h2>
      </div>
      <button className={styles.buttonPassword}>Change Password</button>
    </div>

    {/* Seção da Direita*/}
     <div className={styles.profileDetails}>
        {/* Sub Divisão Informações Usuario*/}
        <span className={styles.info}>Informações do Usuario</span>
        <div className={styles.infoProfile}>
          <div className={styles.inputGroup}>
            <span>Nome Usuário</span>
            <input type="text" value={usuario.Nome} disabled />
          </div>
          <div className={styles.inputGroup}>
          </div>
        </div>

        {/* Sub Divisão Configurações Usuario*/}
        <span className={styles.info}>Configurações do Usuario</span>
        <div className={styles.infoProfile}>
          <div className={styles.inputGroup}>
            <span>Email</span>
            <input type="text" value={usuario.Email} disabled/>
            <span>Senha</span>
            <input type="text" value={usuario.ID_Usuario} disabled/>
          </div>
          <div className={styles.inputGroup}>
          <span>Tipo de Usuario</span>
          <input type="text" value={usuario.TipoUsuario} disabled/>
          </div>
        </div>
        
    </div>
    </div>
  </div>
  )

}

export default Perfil