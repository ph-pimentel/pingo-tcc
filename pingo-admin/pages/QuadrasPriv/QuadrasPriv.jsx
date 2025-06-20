import { deleteQuadraPriv } from '../../api';
import DataTable from '../../components/DataTable/DataTable'
import styles from './QuadrasPriv.module.css'
import { useEffect, useState } from 'react';


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
  { field: 'Regiao', headerName: 'Região', width: 150 },
  { field: 'TipoQuadraFisica', headerName: 'Tipo de Quadra', width: 150 },
  {
    field: 'Esporte',
    headerName: 'Esporte',
    width: 120,
    renderCell: (params) => {
      return params.row.Esporte || 'Não especificado';
    },
  },
  { field: 'EnderecoQuadra', headerName: 'Endereço', width: 200 },
  { field: 'NomeProprietario', headerName: 'Proprietário', width: 200 },
  { field: 'DataCriacao', headerName: 'Data de Criação', width: 150 }
];
  

const QuadrasPriv = () => {
    const [quadras, setQuadras ] = useState([])

    const deleteQuadraPriv = async (id) => {
        try {
          const response = await fetch(`http://localhost:5000/quadraspriv/delete/${id}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            throw new Error('Erro ao deletar a quadra');
          }
      
          // Se deu certo, remove da interface
          setQuadras((prev) => prev.filter((q) => q.id !== id));
        } catch (error) {
          console.error('Erro ao deletar:', error);
          alert('Erro ao deletar a quadra. Verifique o console para mais detalhes.');
        }
      }


    // Uso do useEffect para buscar dados quando o componente for carregado
    useEffect(() => {
        const fetchQuadras = async () => {
            try {
                const response = await fetch('http://localhost:5000/quadraspriv'); //Armazena os dados da Api
                const data = await response.json(); //Armazena os dados retirados da api e converte para JSON

          // Mapea os dados e confirma o tipo que vai receber
          const quadras = data.map((quadra) => ({
            id: quadra.ID_Quadra, // id: = field da biblioteca ; quadra.ID_Quadra = do DB
            NomeQuadra: quadra.NomeQuadra,
            EnderecoQuadra: quadra.EnderecoQuadra,
            Cidade: quadra.Cidade,
            Bairro: quadra.Bairro,
            Regiao: quadra.Regiao,
            TipoQuadraFisica: quadra.TipoQuadraFisica,
            Foto: quadra.Foto,
            NomeProprietario: quadra.NomeProprietario,
            Esporte: quadra.Esporte,
            DataCriacao: new Date(quadra.DataCriacao).toLocaleDateString('pt-BR'), // Formato BR
          }));

         setQuadras(quadras); // Atualiza os dados, agora com a formatação JSON
   
        } catch (error) {
      console.error('Erro ao buscar as quadras:', error);
    }
  };

  fetchQuadras();
}, []); //o array vazio, faz com que a requisição exercute apenas uma vez

    return (
            <div className={styles.quadrasPub}>
                <div className={styles.info}>
                    <h1>Quadras Privadas</h1>
                </div>
                <DataTable 
                slug="quadraspriv" 
                columns={columns}
                rows={quadras} 
                path= "quadraspriv"
                deleteFunction={deleteQuadraPriv} onDeleted={(id) => {
                    setQuadras((prev) => prev.filter(q => q.id !== id));
                }}/>
            </div>
    )
}

export default QuadrasPriv