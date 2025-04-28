import { useEffect, useState } from 'react';
import AddQuadra from '../../components/AddQuadra/AddQuadra';
import DataTable from '../../components/DataTable/DataTable';
import { getQuadrasPub, deleteQuadraPub } from '../../src/Apis/QuadrasApi';
import styles from './QuadrasPub.module.css';

const QuadrasPub = () => {
  const [open, setOpen] = useState(false);
  const [quadras, setQuadras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = [
    { 
      field: 'id',
      headerName: 'ID', 
      width: 90 
    },
    {
      field: 'Foto', 
      headerName: 'Foto', 
      width: 120,
      renderCell: (params) => (
        <img 
          className={styles.img} 
          src={params.row.Foto || "/assets/icons/menu/perfil.png"} 
          alt="Quadra"
          onError={(e) => {
            e.target.src = "/assets/icons/menu/perfil.png";
          }}
        />
      ),
    },
    {
      field: 'NomeQuadra',
      headerName: 'Nome',
      width: 150,
    }, 
    {
      field: 'Cidade',
      headerName: 'Cidade',
      width: 150,
    },
    {
      field: 'Bairro',
      headerName: 'Bairro',
      width: 150,
    },
    {
      field: "EnderecoQuadra",
      headerName: 'Endereço',
      width: 200,
    },
    {
      field: "DataCriacao",
      headerName: 'Criado Em',
      width: 200,
    },
  ];

  const fetchQuadras = async () => {
    try {
      setLoading(true);
      const data = await getQuadrasPub();
      
      const formattedData = data.map((quadra) => ({
        id: quadra.ID_Quadra,
        NomeQuadra: quadra.NomeQuadra,
        EnderecoQuadra: quadra.EnderecoQuadra,
        Cidade: quadra.Cidade,
        Bairro: quadra.Bairro,
        Foto: quadra.Foto,
        DataCriacao: quadra.DataCriacao 
          ? new Date(quadra.DataCriacao).toLocaleDateString('pt-BR')
          : 'Não informado',
      }));

      setQuadras(formattedData);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar quadras:', err);
      setError('Falha ao carregar quadras. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuadraDeletada = async (id) => {
    try {
      await deleteQuadraPub(id);
      setQuadras((prev) => prev.filter((q) => q.id !== id));
    } catch (error) {
      console.error('Erro ao deletar quadra:', error);
      setError('Falha ao deletar quadra. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchQuadras();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Carregando quadras...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.quadrasPub}>
      <div className={styles.header}>
        <h1>Quadras Públicas</h1>
        <button 
          className={styles.addButton} 
          onClick={() => setOpen(true)}          
        >
          Adicionar Quadra
        </button>
      </div>
      
      <DataTable 
        slug="quadraspub" 
        columns={columns} 
        rows={quadras} 
        onDeleted={handleQuadraDeletada}
      />
      
      {open && (
        <AddQuadra 
          slug="quadra" 
          columns={columns} 
          setOpen={setOpen}
          setQuadras={setQuadras}
          onQuadraAdded={fetchQuadras} // Atualiza a lista após adicionar
        />
      )}
    </div>
  );
};

export default QuadrasPub;