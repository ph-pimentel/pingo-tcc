import DataTable from '../../components/DataTable/DataTable'
import {reserva} from '../../data';
import styles from './Reserva.module.css'

const columns = [
    { 
    field: 'id',
    headerName: 'ID', 
    width: 90 
    },
    {
    field: 'photo', headerName: 'Photo Usuario', width:120,
        renderCell: (params)=>{
            return <img className={styles.img}src={params.row.img || "../src/assets/icons/menu/perfil.png"} alt=""/>
        },
    },
    {
      field: 'name',
      type: 'string',
      headerName: 'Nome Usuario',
      width: 150,
    }, 
    {
        field: 'quadra',
        type: 'string',
        headerName: 'Quadra Selecionada',
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
        headerName: 'Horario Reservado:',
        width: 150,
    },
    {
        field: 'date',
        headerName: 'Data Reserva',
        width: 90,
    },   
  ];
  

const Reserva = () => {
    return (
            <div className={styles.quadrasPub}>
                <div className={styles.info}>
                    <h1>Reservas</h1>
                </div>
                <DataTable slug="quadraspub" columns={columns} rows={reserva}/>
            </div>
    )
}

export default Reserva