import styles from './ProprietarioLogin.module.css'
import { useNavigate } from 'react-router-dom';
//useNavigate é um hook do Router que permite redicerionar o usuario apos uma ação
const ProprietarioLogin = () => {
  {/*Uso da propriedade useNavigate para redicionar, sendo mais recomendado */}
  const navigate = useNavigate();
  const irParaProprietario = () => {
    navigate("/proprietario");
  };
  return (
    <div className={styles.container}>
        <div className={styles.loginContainer}>
            <h1>Login Proprietario</h1>
            <div className={styles.inputGroup}>
                <div className={styles.input}>
                <input placeholder='ID do Proprietario'></input>
                </div>
                <button onClick={irParaProprietario}>Entrar</button>
            </div>
        </div>
    </div>
  )
}

export default ProprietarioLogin