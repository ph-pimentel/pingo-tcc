import { useEffect, useState } from 'react'
import { createQuadrasPub } from '../../api'
import styles from './AddQuadra.module.css'
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
            await createQuadrasPub(
                formData.NomeQuadra, 
                formData.EnderecoQuadra,
                formData.Regiao,
                formData.TipoQuadraFisica,
                formData.Descricao,
                formData.Cidade, 
                formData.Bairro
            );
            setOpen(false);
            navigate(0); //Recarrega a Pagina Atual
        }catch (error) {
            console.error('Erro ao criar quadra:', error)
        }
    }
  return (
    <div className={styles.add}>
        <div className={styles.modal}>
            <span className={styles.close} onClick={()=>setOpen(false)}>
            X
            </span>
            <h1>Adicionar {slug}</h1>
            <form onSubmit={handleSubmit}>
                {columns
                .filter((item) => 
                item.field !== "id" && 
                item.field !== "Foto" && 
                item.field !== "DataCriacao" && 
                item.field !== "Acessos" && 
                item.field !== "TipoQuadra" &&
                item.field !== "Esporte"
                )
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
}
export default AddQuadra