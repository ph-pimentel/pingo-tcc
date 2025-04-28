import { useState } from 'react';
import styles from './AddQuadra.module.css';
import { createQuadrasPub } from '../../src/Apis/QuadrasApi';

const AddQuadra = ({ slug, setOpen, setQuadras }) => {
  const [formData, setFormData] = useState({
    NomeQuadra: '',
    EnderecoQuadra: '',
    Bairro: '',
    Cidade: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novaQuadra = await createQuadrasPub(
        formData.NomeQuadra,
        formData.EnderecoQuadra,
        formData.Bairro,
        formData.Cidade
      );
      
      setQuadras(prev => [...prev, {
        id: novaQuadra.ID_Quadra,
        ...formData,
        DataCriacao: new Date().toLocaleDateString('pt-BR')
      }]);
      
      setOpen(false);
    } catch (error) {
      console.error('Erro ao criar quadra:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.add}>
      <div className={styles.modal}>
        <span className={styles.close} onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Adicionar nova {slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.item}>
            <label>Nome da Quadra</label>
            <input 
              type="text" 
              name="NomeQuadra" 
              value={formData.NomeQuadra}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.item}>
            <label>Endereço</label>
            <input 
              type="text" 
              name="EnderecoQuadra" 
              value={formData.EnderecoQuadra}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.item}>
            <label>Bairro</label>
            <input 
              type="text" 
              name="Bairro" 
              value={formData.Bairro}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.item}>
            <label>Cidade</label>
            <input 
              type="text" 
              name="Cidade" 
              value={formData.Cidade}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuadra;