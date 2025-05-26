import DataTable from '../../components/DataTable/DataTable'
import styles from './Users.module.css'
import { useEffect, useState } from 'react';

const columns = [
    { 
    field: 'id',
    headerName: 'ID', 
    width: 90 
    },
    {
    field: 'FotoUsuario', headerName: 'Foto', width:100,
        renderCell: (params)=>{
            return <img className={styles.img}src={params.row.Foto || "../../src/assets/icons/menu/perfil.png"} alt=""/>
        },
    },
    {
      field: 'NomeUsuario',
      headerName: 'Nome Usuario',
      width: 200,
    }, 
    {
        field: 'Email',
        headerName: 'Email',
        width: 220,
    },
    {
        field: 'DataCriacao',
        headerName: 'Criado em',
        width: 150,
    },
    {
        field: "TipoUsuario",
        headerName: "Tipo de Usuário",
        width: 150,
        type: "string",
      },
    
  ];
  

const Users = () => {
        const [user, setUsuarios ] = useState([])
        //Delete pelo Banco de Dados
        const deleteUsuario = async (id) => {
            try {
              const response = await fetch(`http://localhost:5000/users/delete/${id}`, {
                method: 'DELETE',
              });
          
              if (!response.ok) {
                throw new Error('Erro ao deletar o usuário');
              }
          
              // Se deu certo, remove da interface
              setUsuarios((prev) => prev.filter((q) => q.id !== id));
            } catch (error) {
              console.error('Erro ao deletar:', error);
              alert('Erro ao deletar o usuário. Verifique o console para mais detalhes.');
            }
          }
    
        // Uso do useEffect para buscar dados quando o componente for carregado
        useEffect(() => {
            const fetchQuadras = async () => {
                try {
                    const response = await fetch('http://localhost:5000/users'); //Armazena os dados da Api
                    const data = await response.json(); //Armazena os dados retirados da api e converte para JSON
    
              // Mapea os dados e confirma o tipo que vai receber
              const usuarios = data.map((user) => ({
                id: user.ID_Usuario, // id: = field da biblioteca ; quadra.ID_Quadra = do DB
                NomeUsuario: user.NomeUsuario,
                Email: user.Email,
                TipoUsuario: user.TipoUsuario,
                Foto: user.FotoUsuario,
                DataCriacao: new Date(user.DataCriacao).toLocaleDateString('pt-BR'), // Formato BR
              }));
    
             setUsuarios(usuarios); // Atualiza os dados, agora com a formatação JSON
       
            } catch (error) {
          console.error('Erro ao buscar as usuarios:', error);
        }
      };
    
      fetchQuadras();
    }, []); //o array vazio, faz com que a requisição exercute apenas uma vez
    //Att
    return (
        <div className={styles.users}>
            <div className={styles.info}>
                <h1>Usuários</h1>
            </div>
            <DataTable slug="users" 
            columns={columns} 
            rows={user}
            path={'users'}
            entityNameKey={"NomeUsuario"}
            deleteFunction={deleteUsuario} onDeleted={(id) => {
                setUsuarios((prev) => prev.filter(q => q.id !== id));
            }}/>
        </div>
    )
}

export default Users