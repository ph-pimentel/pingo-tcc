import { useState } from 'react';
import styles from './ProprietarioLogin.module.css'
import { useNavigate } from 'react-router-dom';
import { checkProprietario } from '../../api';


const ProprietarioLogin = () => {
  {/*Uso da propriedade useNavigate para redicionar, sendo mais recomendado */}
  const [proprietarioID, setProprietarioID] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin =  async () => {
    if (!proprietarioID.trim()) {
      setError('Por favor, insira um ID válido');
      return;
    }

    try {
      //Verifica se o ID é Proprietario
      const {isProprietario} = await checkProprietario(proprietarioID);

      if (isProprietario) {
        //Armazena no localStorage e redireciona
        localStorage.setItem('proprietarioID', proprietarioID);
        navigate("/proprietario");
      } else {
        setError('O ID fornecido não pertence a um proprietário');
      }
    } catch (err) {
      setError('Erro ao verificar o ID. Tente novamente.');
      console.error(err);
    }
  };
  
  return (
    <div className={styles.container}>
        <div className={styles.loginContainer}>
            <h1>Login Proprietario</h1>
            <div className={styles.inputGroup}>
                <input 
                placeholder='ID do Proprietario'
                value={proprietarioID}
                onChange={(e) => {
                setProprietarioID(e.target.value);
                setError('');
                }} 
                />
                <button onClick={handleLogin}>Entrar</button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    </div>
  )
}

export default ProprietarioLogin