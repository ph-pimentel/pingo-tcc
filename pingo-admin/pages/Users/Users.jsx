
import DataTable from '../../components/DataTable/DataTable'
import { userRows } from '../../data';
import styles from './Users.module.css'


const columns = [
    { 
    field: 'id',
    headerName: 'ID', 
    width: 90 
    },
    {
    field: 'avatar', headerName: 'Avatar', width:100,
        renderCell: (params)=>{
            return <img className={styles.img}src={params.row.img || "../src/assets/icons/menu/perfil.png"} alt=""/>
        },
    },
    {
      field: 'firstName',
      type: 'string',
      headerName: 'Primeiro Nome',
      width: 150,
    }, 
    {
      field: 'lastName',
      type: 'string',
      headerName: 'Último Nome',
      width: 150,
    },
    {
        field: 'email',
        type: "string",
        headerName: 'Email',
        width: 220,
    },
    {
        field: 'phone',
        type: "string",
        headerName: 'Telefone',
        width: 200,
    },
    {
        field: 'createdAt',
        headerName: 'Criado em',
        width: 150,
    },
    {
        field: "userType",
        headerName: "Tipo de Usuário",
        width: 150,
        type: "string",
      },
    
  ];
  

const Users = () => {

    return (
        <div className={styles.users}>
            <div className={styles.info}>
                <h1>Usuários</h1>
            </div>
            <DataTable slug="users" columns={columns} rows={userRows}/>
        </div>
    )
}

export default Users