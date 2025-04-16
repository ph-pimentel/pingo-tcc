import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleQuadrasPub, updateQuadrasPub } from '../../api'
import styles from './SinglePageQuadraPub.module.css'
import PropTypes from 'prop-types'
import AttQuadra from '../AttQuadra/AttQuadra';

const SinglePageQuadraPub = ({activities}) => {
  const {id} = useParams();
  const [quadra, setQuadra] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    const fetchQuadra = async () => {
      try {
        const data = await getSingleQuadrasPub(id)
        setQuadra(data.results[0]);
      }catch (error) {
        console.error('Erro ao buscar quadra:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuadra();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await updateQuadrasPub(
        id,
        formData.NomeQuadra || quadra.NomeQuadra,
        formData.EnderecoQuadra || quadra.EnderecoQuadra,
        formData.Bairro || quadra.Bairro,
        formData.Cidade || quadra.Cidade
      );
      //Atualiza os dados locais
      setQuadra(prev => ({
        ...prev,
        NomeQuadra: formData.NomeQuadra || prev.NomeQuadra,
        EnderecoQuadra: formData.EnderecoQuadra || prev.EnderecoQuadra,
        Bairro: formData.Bairro || prev.Bairro,
        Cidade: formData.Cidade || prev.Cidade
      }));
      setOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar quadra:', quadra)
    }
  };

  if (loading) return <p>Carregando..</p>
  if (!quadra) return <p>Quadra não encontrada</p>

  //Defina as colunas que vão aparecer no formulario
  const columns = [
    { field: 'NomeQuadra', headerName: 'Nome da Quadra', type: 'text' },
    { field: 'EnderecoQuadra', headerName: 'Endereço', type: 'text' },
    { field: 'Bairro', headerName: 'Bairro', type: 'text' },
    { field: 'Cidade', headerName: 'Cidade', type: 'text' },
  ]
  
  return (
    <div className={styles.single}>
      {open && (
        <AttQuadra 
        columns={columns}
        slug="Quadra"
        setOpen={setOpen}
        onSubmit={handleUpdate} // Adicionamos uma prop para o submit
        initialData={{
          NomeQuadra: quadra.NomeQuadra,
          EnderecoQuadra: quadra.EnderecoQuadra,
          Bairro: quadra.Bairro,
          Cidade: quadra.Cidade
        }}
      />
      )}

      <div className={styles.view}>
        <div className={styles.info}>
            <div className={styles.principalInfo}>
              <img src={quadra.Foto} alt="" />
              <h1>{quadra.NomeQuadra}</h1>
              <button onClick={() => setOpen(true)}>Atualizar Quadra</button>
            </div>
            <div className={styles.details}>
                <div className={styles.item}>
                <span className={styles.itemTitle}>Nome da Quadra:</span>
                <span className={styles.itemValue}>{quadra.NomeQuadra}</span>
                </div>
                <div className={styles.item}>
                <span className={styles.itemTitle}>Endereço da Quadra:</span>
                <span className={styles.itemValue}>{quadra.EnderecoQuadra}</span>
                </div>
                <div className={styles.item}>
                <span className={styles.itemTitle}>Cidade:</span>
                <span className={styles.itemValue}>{quadra.Cidade}</span>
                </div>
                <div className={styles.item}>
                <span className={styles.itemTitle}>Bairro:</span>
                <span className={styles.itemValue}>{quadra.Bairro}</span>
                </div>
            </div>
          </div>
        <div className={styles.activities}>
          <h2>Últimas Atividades</h2>
          <ul>
            {activities.map((activity) => (
              <li>
              <div>
                <p>{activity.text}</p>
                <time>{activity.time}</time>
              </div>
            </li>
            ))}
            
          </ul>
        </div>
    </div>
   </div>
  )
}

SinglePageQuadraPub.PropTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired
}

export default SinglePageQuadraPub