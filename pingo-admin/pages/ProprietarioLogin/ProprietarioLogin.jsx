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

    // Verifica se é um número válido
    if (isNaN(proprietarioID)) {
      setError('O ID deve ser um número');
      return;
    };

    try {
      setError('Verificando...');

      const { isProprietario, error } = await checkProprietario(proprietarioID);

      if (error) {
        setError(error);
        return;
      }
  
      if (isProprietario) {
        localStorage.setItem('proprietarioID', proprietarioID);
        navigate("/proprietario");
      } else {
        setError('O ID fornecido não pertence a um proprietário válido');
      }
    } catch (err) {
      setError(err.message || 'Erro ao verificar o ID. Tente novamente.');
      console.error(err);
    }
  };
  
  return (
    <div className={styles.container}>
    <div className={styles.formContainer}>
        <div className={styles.title}>
            <span>Login Proprietario</span>
          </div>
            <form className={styles.form}>
              <div className={styles.formGrup}>
                <label for='id'>ID Proprietário</label>
                <input 
                placeholder='Insira o ID do Proprietário '
                value={proprietarioID}
                onChange={(e) => {
                setProprietarioID(e.target.value);
                setError('');
                }} 
                />
                <button type="button" className={styles.btn} onClick={handleLogin}>Entrar</button>
                </div>
            </form>
            {error && <p className={error === 'Verificando...'
              ? styles.validation 
              : styles.error
            }>{error}</p>}
        </div>
        </div>
  )
}

export default ProprietarioLogin