import { useEffect, useState } from 'react'
import styles from './AttQuadra.module.css'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const AddQuadra = ({columns, slug, setOpen, onSubmit, initialData}) => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const  handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (onSubmit) {
                await onSubmit(formData); //Usa a função passada pelo prop
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
                && item.field !== "DataCriacao")
                .map((column) =>(
                    <div className={styles.item} key={column.field}>
                        <label>{column.headerName}</label>
                        <input 
                        type={column.type}
                        name={column.field}
                        placeholder={column.headerName}
                        value={formData[column.field] || ''}
                        onChange={handleChange}
                        required
                         />
                    </div>
                ))}
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