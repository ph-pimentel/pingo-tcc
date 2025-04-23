import AddQuadra from '../../components/AddQuadra/AddQuadra';
import DataTable from '../../components/DataTable/DataTable'
import styles from './QuadrasPub.module.css'
import { useEffect, useState } from 'react';


const columns = [
    { 
    field: 'id',
    headerName: 'ID', 
    width: 90 
    },
    {
    field: 'Foto', headerName: 'Foto', width:120,
        renderCell: (params)=>{
            return <img className={styles.img}src={params.row.Foto || "../src/assets/icons/menu/perfil.png"} alt=""/>
        },
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
  

const QuadrasPub = () => {
    const [open,setOpen] = useState(false)
    const [quadras, setQuadras ] = useState([])

    const deleteQuadraPub = async (id) => {
        try {
          const response = await fetch(`http://localhost:5000/quadraspub/delete/${id}`, {
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
                const response = await fetch('http://localhost:5000/quadraspub'); //Armazena os dados da Api
                const data = await response.json(); //Armazena os dados retirados da api e converte para JSON

          // Mapea os dados e confirma o tipo que vai receber
          const quadras = data.map((quadra) => ({
            id: quadra.ID_Quadra, // id: = field da biblioteca ; quadra.ID_Quadra = do DB
            NomeQuadra: quadra.NomeQuadra,
            EnderecoQuadra: quadra.EnderecoQuadra,
            Cidade: quadra.Cidade,
            Bairro: quadra.Bairro,
            Foto: quadra.Foto,
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
                    <h1>Quadras Publicas</h1>
                    <button className={styles.button} onClick={()=>setOpen(true)}>Adicionar Quadra</button>
                </div>
                <DataTable 
                slug="quadraspub" 
                columns={columns}
                rows={quadras} 
                path= "quadraspub"
                deleteFunction={deleteQuadraPub} onDeleted={(id) => {
                    setQuadras((prev) => prev.filter(q => q.id !== id));
                }}/>
                {open && <AddQuadra slug="quadra" columns={columns} setOpen={setOpen}/>}
            </div>
    )
}

export default QuadrasPub