
import DataTable from '../../components/DataTable/DataTable'
import { quadraspriv } from '../../data';
import styles from './Proprietario.module.css'
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
      headerName: 'Nome',
      width: 90,
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
        field: 'regiao',
        type: "string",
        headerName: 'RG',
        width: 2,
    },
    {
        field: "endereco",
        headerName: 'Endereço',
        width: 200,
        type: "string",
    },
    {
        field: 'contato',
        type: "string",
        headerName: 'Contato',
        width: 150,
    },
    {
        field: 'createdAt',
        headerName: 'Criado Em',
        width: 120,
    },
    {
        field: 'regrasGerais',
        type: "string",
        headerName: 'Regras Gerais',
        width: 150,
    },
    {
      field: 'horarios',
      type: "string",
      headerName: 'Horarios Disponiveis',
      width: 100,
  },
    
  ];

const Proprietario = () => {
  return (
    <div className={styles.quadrasPub}>
        <div className={styles.info}>
          <h1>Quadras do Proprietario</h1>
          <button className={styles.button}>Adicionar Quadra</button>
        </div>
      <DataTable 
      slug="quadraspub" 
      columns={columns} 
      rows={quadraspriv} 
      />
    </div>
  )
}

export default Proprietario