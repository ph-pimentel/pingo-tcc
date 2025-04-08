import { useState } from 'react'
import { createQuadrasPub } from '../../api'
import styles from './AddQuadra.module.css'
import PropTypes from 'prop-types'

const AddQuadra = ({columns, slug, setOpen}) => {
    const [formData, setFormData] = useState({})

    const  handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Dados", formData)
        try {
            await createQuadrasPub(
                formData.NomeQuadra,
                formData.EnderecoQuadra,
                formData.Bairro,
                formData.Cidade
            );
            setOpen(false);
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
                <button type="submit">Send</button>
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