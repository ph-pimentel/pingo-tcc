import { useEffect, useState } from 'react'
import styles from './AttQuadra.module.css'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { getEsportes, getQuadraEsporte, updateQuadraEsporte } from '../../api'

const AddQuadra = ({columns, slug, setOpen, onSubmit, initialData}) => {
    const [formData, setFormData] = useState({})
    const [esportes, setEsportes] = useState([]);
    const [esporteSelecionado, setEsporteSelecionado] = useState('');
    const [loadingEsportes, setLoadingEsportes] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
        try {

            // Inicializa formData com valores padrão ou com initialData
            const initialFormData = initialData || {};
            setFormData(initialFormData);

            // Carrega esportes disponíveis
            const esportesData = await getEsportes();
            setEsportes(esportesData);
            
            // Carrega esporte atual da quadra se existir initialData
            if (initialData?.id) {
              const esporteQuadra = await getQuadraEsporte(initialData.id);
              if (esporteQuadra) {
                setEsporteSelecionado(esporteQuadra.Nome);
              }
            }
          } catch (error) {
            console.error('Erro ao carregar esportes:', error);
          } finally {
            setLoadingEsportes(false);
          }
        };


            fetchData();
    }, [initialData]);

    const  handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEsporteChange = (e) => {
        setEsporteSelecionado(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (onSubmit) {
                await onSubmit(formData); //Usa a função passada pelo prop
            }

            // Atualiza o esporte da quadra se foi selecionado um
            if (initialData?.id && esporteSelecionado) {
                const esporte = esportes.find(e => e.Nome === esporteSelecionado);
                if (esporte) {
                await updateQuadraEsporte(initialData.id, esporte.ID_Esporte);
                }
            }
            setOpen(false);
            navigate(0); //Recarrega a Pagina Atual
        }catch (error) {
            console.error('Erro ao processar formulario:', error)
        }
    }
  return (
    <div className={styles.add}>
        <div className={styles.modal}>
            <span className={styles.close} onClick={()=>setOpen(false)}>
            X
            </span>
            <h1>Editar {slug}</h1>
            <form onSubmit={handleSubmit}>
            {columns
            .filter((item) => item.field !== "id" 
                && item.field !== "Foto"
                && item.field !== "DataCriacao"
                && item.field !== "Acessos"
                && item.field !== "TipoQuadra"
                && item.field !== "HorarioDisponiveis")
            .map((column) => (
                <div className={`${styles.item} 
                ${column.field === "Descricao" ? styles.descriptionItem : ""}`}
                key={column.field}
                >
                    <label>{column.headerName}</label>
                    {column.field === "Descricao" ? (
                        <textarea
                            name={column.field}
                            placeholder={column.headerName}
                            value={formData[column.field] || ''}
                            onChange={handleChange}
                            required={!initialData} 
                            rows={5}
                        />
                    ) : (
                        <input 
                            type={column.type}
                            name={column.field}
                            placeholder={column.headerName}
                            value={formData[column.field] || ''}
                            onChange={handleChange}
                            required={!initialData}
                        />
                    )}
                </div>
            ))}

            {/* Campo seleção esportes */}
            <div className={styles.item}>
            <label>Tipo de Esporte</label>
            {loadingEsportes ? (
              <p>Carregando esportes...</p>
            ) : (
              <select
                value={esporteSelecionado}
                onChange={handleEsporteChange}
                className={styles.select}
              >
                <option value="">Selecione um esporte</option>
                {esportes.map((esporte) => (
                  <option key={esporte.ID_Esporte} value={esporte.Nome}>
                    {esporte.Nome}
                  </option>
                ))}
              </select>
            )}
          </div>
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    </div>
  )
}

AddQuadra.PropTypes = {
  columns: PropTypes.array.isRequired,
  setOpen: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  initialData: PropTypes.object,
}
export default AddQuadra