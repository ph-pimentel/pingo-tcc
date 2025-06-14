import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleUsuario, updateUsuarioProp, updateUsuarioAdmin, updateUsuarioComum } from '../../api'
import styles from './SinglePageUser.module.css'
import PropTypes from 'prop-types'

const SinglePageUser = () => {
  const {id} = useParams();
  const [usuario, setUsuarios] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getSingleUsuario(id)
        setUsuarios(data.results[0]);
      }catch (error) {
        console.error('Erro ao buscar usuario:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdateProp = async (formData) => {
    try {
      await updateUsuarioProp(
        id,
        formData.TipoUsuario || usuario.TipoUsuario
      );
      
      //Atualiza os dados locais
      setUsuarios(prev => ({
        ...prev,
        TipoUsuario: formData.TipoUsuario || prev.TipoUsuario
      }));
      window.location.reload();
    } catch (error) {
      console.error('Erro ao atualizar o usuario:', usuario)
    }
  };

  const handleUpdateAdmin = async (formData) => {
    try {
      await updateUsuarioAdmin(
        id,
        formData.TipoUsuario || usuario.TipoUsuario
      );
      //Atualiza os dados locais
      setUsuarios(prev => ({
        ...prev,
        TipoUsuario: formData.TipoUsuario || prev.TipoUsuario
      }));
      window.location.reload();
    } catch (error) {
      console.error('Erro ao atualizar o usuario:', usuario)
    }
  };

  const handleUpdateComum = async (formData) => {
    try {
      await updateUsuarioComum(
        id,
        formData.TipoUsuario || usuario.TipoUsuario
      );
      //Atualiza os dados locais
      setUsuarios(prev => ({
        ...prev,
        TipoUsuario: formData.TipoUsuario || prev.TipoUsuario
      }));
      window.location.reload();
    } catch (error) {
      console.error('Erro ao atualizar o usuario:', usuario)
    }
  };

  if (loading) return <p>Carregando..</p>
  if (!usuario) return <p>Usuario não encontrada</p>
  return (
    <div className={styles.single}>

      <div className={styles.view}>
        <div className={styles.info}>
            <div className={styles.principalInfo}>
              <img src={usuario.FotoUsuario} alt="" />
              <h1>{usuario.NomeUsuario}</h1>
              <button className={styles.btn} onClick={handleUpdateProp}>Virar Proprietario</button>
              <button className={styles.btn} onClick={handleUpdateAdmin}>Virar Admin</button>
              <button className={styles.btn} onClick={handleUpdateComum}>Virar Usuário Comum</button>
            </div>
            <hr/>
            <h2>Informações do Usuário</h2>
            <div className={styles.details}>
              
                <div className={styles.item}>
                <span className={styles.itemTitle}>Nome Usuario:</span>
                <span className={styles.itemValue}>{usuario.NomeUsuario}</span>
                </div>
                <div className={styles.item}>
                <span className={styles.itemTitle}>Email Usuario:</span>
                <span className={styles.itemValue}>{usuario.Email}</span>
                </div>
                <div className={styles.item}>
                <span className={styles.itemTitle}>Tipo de Usuario:</span>
                <span className={styles.itemValue}>{usuario.TipoUsuario}</span>
                </div>
                <div className={styles.item}>
                <span className={styles.itemTitle}>Nome Usuario:</span>
                <span className={styles.itemValue}>{usuario.NomeUsuario}</span>
                </div>
                <div className={styles.item}>
                <span className={styles.itemTitle}>Email Usuario:</span>
                <span className={styles.itemValue}>{usuario.Email}</span>
                </div>
                <div className={styles.item}>
                <span className={styles.itemTitle}>Tipo de Usuario:</span>
                <span className={styles.itemValue}>{usuario.TipoUsuario}</span>
                </div>
            </div>
          </div>
    </div>
   </div>
  )
}

SinglePageUser.PropTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired
}

export default SinglePageUser