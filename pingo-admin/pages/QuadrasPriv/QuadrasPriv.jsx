import DataTable from '../../components/DataTable/DataTable'
import { quadraspriv} from '../../data';
import styles from './QuadrasPriv.module.css'

const columns = [
    { 
    field: 'id',
    headerName: 'ID', 
    width: 90 
    },
    {
    field: 'photo', headerName: 'Photo', width:120,
        renderCell: (params)=>{
            return <img className={styles.img}src={params.row.img || "../src/assets/icons/menu/perfil.png"} alt=""/>
        },
    },
    {
      field: 'name',
      type: 'string',
      headerName: 'Name',
      width: 150,
    }, 
    {
        field: 'cidade',
        type: "string",
        headerName: 'Cidade',
        width: 150,
    },
    {
        field: 'bairro',
        type: "string",
        headerName: 'Bairro',
        width: 150,
    },
    {
        field: "endereco",
        headerName: 'Endereço',
        width: 200,
        type: "string",
    },
    {
        field: 'createdAt',
        headerName: 'Criado Em',
        width: 150,
    },
    {
        field: 'idprop',
        headerName: 'ID Proprietario',
        width: 90,
    },
    {
        field: 'nameProp',
        headerName: 'Nome do Proprietario',
        width: 150,
    },
    
  ];
  

const QuadrasPriv = () => {
    return (
            <div className={styles.quadrasPub}>
                <div className={styles.info}>
                    <h1>Quadras Privadas</h1>
                </div>
                <DataTable slug="quadraspriv" columns={columns} rows={quadraspriv}/>
            </div>
    )
}

export default QuadrasPriv