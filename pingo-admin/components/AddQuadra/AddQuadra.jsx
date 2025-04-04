import styles from './AddQuadra.module.css'
import PropTypes from 'prop-types'

const AddQuadra = ({columns, slug, setOpen}) => {
    const  handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <div className={styles.add}>
        <div className={styles.modal}>
            <span className={styles.close} onClick={()=>setOpen(false)}>
            X
            </span>
            <h1>Adicionar {slug}</h1>
            <form onSubmit={handleSubmit}>
                {columns
                .filter((item) => item.field !== "id" && item.field !== "photo")
                .map((column) =>(
                    <div className={styles.item}>
                        <label>{column.headerName}</label>
                        <input type={column.type} placeholder={column.field} />
                    </div>
                ))}
                <button>Send</button>
            </form>
        </div>
    </div>
  )
}

AddQuadra.PropTypes = {
  columns: PropTypes.array.isRequired,
  setOpen: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
}
export default AddQuadra