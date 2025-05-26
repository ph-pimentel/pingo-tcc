import { useState } from "react";
import styles from './AttPerfil.module.css'

const AttPerfil = ({ setOpen, onSubmit, initialData}) => {
    const [formData, setFormData ] = useState(initialData);
    const [loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev=> ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          await onSubmit(formData);
        } finally {
          setLoading(false);
        }
      };

    return (
         <div className={styles.add}>
        <div className={styles.modal}>
                    <span className={styles.close} onClick={()=>setOpen(false)}>
                    x
                    </span>
                    <h1>Editar Perfil</h1>
                    <form onSubmit={handleSubmit}>
                    <div className={styles.item}>
                        <label>Nome</label>
                         <input
                            type="text"
                            name="Nome"
                            value={formData.Nome}
                            onChange={handleChange}
                            required
                         />
                    </div>
                    <div className={styles.item}>
                        <label>Email</label>
                         <input
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            required
                         />
                    </div>
                        <button type="submit">Salvar Alterações</button>
                    </form>
                </div>
                </div>
    )
}

export default AttPerfil;