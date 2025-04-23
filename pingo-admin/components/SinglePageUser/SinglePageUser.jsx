import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleUsuario, updateUsuario } from '../../api'
import styles from './SinglePageUser.module.css'
import PropTypes from 'prop-types'
import AttQuadra from '../AttQuadra/AttQuadra';

const SinglePageUser = ({activities}) => {
  const {id} = useParams();
  const [usuario, setUsuarios] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false)
  
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

  const handleUpdate = async (formData) => {
    try {
      await updateUsuario(
        id,
        formData.NomeUsuario || usuario.NomeUsuario,
        formData.Email || usuario.Email,
        formData.TipoUsuario || usuario.TipoUsuario
      );
      //Atualiza os dados locais
      setUsuarios(prev => ({
        ...prev,
        NomeUsuario: formData.NomeUsuario || prev.NomeUsuario,
        Email: formData.Email || prev.Email,
        TipoUsuario: formData.TipoUsuario || prev.TipoUsuario
      }));
      setOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar o usuario:', usuario)
    }
  };

  if (loading) return <p>Carregando..</p>
  if (!usuario) return <p>Usuario não encontrada</p>

  //Defina as colunas que vão aparecer no formulario
  const columns = [
    { field: 'TipoUsuario', headerName: 'Tipo do Usuario', type: 'text' },
  ]
  
  return (
    <div className={styles.single}>
      {open && (
        <AttQuadra 
        columns={columns}
        slug="Usuario"
        setOpen={setOpen}
        onSubmit={handleUpdate} // Adicionamos uma prop para o submit
        initialData={{
          NomeUsuario: usuario.NomeUsuario,
          Email: usuario.Email,
          TipoUsuario: usuario.TipoUsuario
        }}
      />
      )}

      <div className={styles.view}>
        <div className={styles.info}>
            <div className={styles.principalInfo}>
              <img src={usuario.FotoUsuario} alt="" />
              <h1>{usuario.NomeUsuario}</h1>
              <button onClick={() => setOpen(true)}>Atualizar Usuario</button>
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