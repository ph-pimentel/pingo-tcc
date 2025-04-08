import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import styles from './DataTable.module.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const DataTable = ({columns, rows, slug}) => {
  const handleDelete = (id) =>{
    //delete the item
    console.log(id + " foi deletado!")
  }


  const actionColumn = {
   field: "action",
   headerName: "Ações",
   width: 100,
    renderCell:(params)=>{
     return( 
        <div className={styles.action}>
          <Link to={`/${slug}/${params.row.id}`}>
            <img src="../src/assets/table/action.svg" alt="" />
          </Link>
          <div className={styles.delete} onClick={()=>handleDelete(params.row.id)}>
            <img src="../src/assets/table/delete.svg" alt="" />
          </div>
          </div>
        );
      },
    };
    //Faz update da lista de columns
    const updatedColumns = [...columns, actionColumn]

  return (
    <div className={styles.dataTable}>
        <DataGrid
        className={styles.dataGrid}
        rows={rows}
        columns={updatedColumns}
        getRowHeight={() => 'auto'} // Faz a altura se ajustar ao conteúdo
        sx={{
          '& .MuiDataGrid-cell': {
            whiteSpace: 'normal', // Permite a quebra de linha
            wordWrap: 'break-word', // Garante que palavras longas quebrem
            display: 'flex',
            alignItems: 'center', // Mantém o texto alinhado verticalmente
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            whiteSpace: 'normal', // Permite quebra no título da coluna
            wordWrap: 'break-word',
            lineHeight: '1.2',
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        slots={{toolbar:GridToolbar}}
        slotProps={{
            toolbar:{
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500}
            }
        }}
        
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnSelector
        disableDensitySelector
        disableColumnFilter
      />
    </div>
  )
}

DataTable.PropTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  slug: PropTypes.string.isRequired,
}

export default DataTable