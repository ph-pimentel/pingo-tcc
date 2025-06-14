
import AddQuadraPrivada from '../../components/AddQuadraPrivada/AddQuadraPrivada';
import DataTable from '../../components/DataTable/DataTable'
import styles from './MinhasQuadras.module.css'
import { useState, useEffect } from 'react';
import { getMinhasQuadras, obterUsuario } from '../../api';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'Foto', 
        headerName: 'Foto', 
        width: 120,
        renderCell: (params) => (
            <img className={styles.img} src={params.row.Foto || "../src/assets/icons/menu/quadra-2.png"} alt=""/>
        ),
    },
    { field: 'NomeQuadra', headerName: 'Nome da Quadra', width: 150 },
    { field: 'Cidade', headerName: 'Cidade', width: 150 },
    { field: 'Bairro', headerName: 'Bairro', width: 150 },
    { field: 'ValorHora', headerName: 'Valor por Hora', width: 120 },
    { field: 'HorarioDisponiveis', headerName: 'Horários', width: 200 },
    { field: 'Contato', headerName: 'Contato', width: 200 },
    { field: 'EnderecoQuadra', headerName: 'Endereço Quadra', width: 200 }
  ];

const MinhasQuadras = () => {
  const [open,setOpen] = useState(false)
  const [quadras, setQuadras] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [proprietarioId, setProprietarioId] = useState(null)

  const deleteQuadraPriv = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/quadraspriv/delete/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao deletar a quadra');
      }
  
      setQuadras((prev) => prev.filter((q) => q.id !== id));
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao deletar a quadra. Verifique o console para mais detalhes.');
    }
}
  const getProprietarioIdFromToken = () => {
    const usuario = obterUsuario();
    if (!usuario) {
      setError('Usuário nao autenticado ou token inválido');
      return null;
    }

    return usuario.ID_Usuario;
  };

useEffect(() => {
  const fetchQuadras = async () => {
    try {
        const id = getProprietarioIdFromToken();
        if (!id) {
          setError('ID do proprietário não encontrado no token');
          setLoading(false);
          return;
        }
        
        setProprietarioId(id);
        const data = await getMinhasQuadras(id);
        const quadras = data.map(quadra => ({
            id: quadra.ID_Quadra,
            NomeQuadra: quadra.NomeQuadra,
            EnderecoQuadra: quadra.EnderecoQuadra,
            Cidade: quadra.Cidade,
            Bairro: quadra.Bairro,
            Foto: quadra.Foto,
            Contato: quadra.Contato,
            ValorHora: quadra.ValorHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 'Não informado.',
            HorarioDisponiveis: quadra.HorarioDisponiveis || 'Não informado.',
        }));

        setQuadras(quadras);
    } catch (error) {
      console.error('Erro ao buscar as quadras:', error);
      setError('Erro ao carregar quadras. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  fetchQuadras();
  
}, []);
if (loading) return <div>Carregando...</div>;
if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.quadrasPub}>
        <div className={styles.info}>
          <h1>Minhas Quadras</h1>
        </div>
      <DataTable 
      slug="quadraspriv" 
      columns={columns} 
      rows={quadras} 
      path= "quadraspriv"
      deleteFunction={deleteQuadraPriv} onDeleted={(id) => {
        setQuadras((prev) => prev.filter(q => q.id !== id)); }}
      showActions = {true}
      />
    </div>
  )
}

export default MinhasQuadras