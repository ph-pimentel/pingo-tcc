
import AddQuadraPrivada from '../../components/AddQuadraPrivada/AddQuadraPrivada';
import DataTable from '../../components/DataTable/DataTable'
import styles from './Proprietario.module.css'
import { useState, useEffect } from 'react';
import { getQuadrasProprietario } from '../../api';

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
    { field: 'EnderecoQuadra', headerName: 'Endereço Quadra', width: 200 },
    {field: 'NomeProprietario', headerName: 'Nome Proprietario', width: 200 },
    {field: 'DataCriacao', headerName: 'Data de Criação', width: 200 }
  ];

const Proprietario = () => {
  const [open,setOpen] = useState(false)
  const [quadras, setQuadras] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const proprietarioId = localStorage.getItem('proprietarioID');

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

useEffect(() => {
  const fetchQuadras = async () => {
    try {
        if (!proprietarioId){
          setError('ID do proprietário não encontrado');
          return;
        }
        
        const data = await getQuadrasProprietario(proprietarioId);
        console.log(data);
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
            NomeProprietario: quadra.NomeProprietario,
            DataCriacao: new Date(quadra.DataCriacao).toLocaleDateString('pt-BR'),
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
  
}, [proprietarioId]);
if (loading) return <div>Carregando...</div>;
if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.quadrasPub}>
        <div className={styles.info}>
          <h1>Quadras do Proprietario</h1>
          <button className={styles.btn} onClick={()=>setOpen(true)}>Adicionar Quadra</button>
        </div>
      <DataTable 
      slug="quadraspriv" 
      columns={columns} 
      rows={quadras} 
      path= "quadraspriv"
      deleteFunction={deleteQuadraPriv} onDeleted={(id) => {
        setQuadras((prev) => prev.filter(q => q.id !== id)); }}/>
      {open && <AddQuadraPrivada slug="quadra" columns={columns} setOpen={setOpen}/>}
    </div>
  )
}

export default Proprietario