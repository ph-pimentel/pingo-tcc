import AddQuadra from '../../components/AddQuadra/AddQuadra';
import DataTable from '../../components/DataTable/DataTable'
import { quadraspub } from '../../data';
import styles from './QuadrasPub.module.css'
import { useState } from 'react';

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
        headerName: 'Created At',
        width: 150,
    },
    
  ];
  

const QuadrasPub = () => {
    const [open,setOpen] = useState(false)
    return (
            <div className={styles.quadrasPub}>
                <div className={styles.info}>
                    <h1>Quadras Publicas</h1>
                    <button className={styles.button} onClick={()=>setOpen(true)}>Adicionar Quadra</button>
                </div>
                <DataTable slug="quadraspub" columns={columns} rows={quadraspub}/>
                {open && <AddQuadra slug="quadra" columns={columns} setOpen={setOpen}/>}
            </div>
    )
}

export default QuadrasPub