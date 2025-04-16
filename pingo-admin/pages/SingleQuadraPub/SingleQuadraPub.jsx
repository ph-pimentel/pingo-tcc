import SinglePageQuadraPub from '../../components/SinglePageQuadraPub/SinglePageQuadraPub'
import { singleQuadraPub } from '../../data'
import styles from './SingleQuadraPub.module.css'

const SingleQuadraPub = () => {
  return (
    <div>
      <SinglePageQuadraPub {...singleQuadraPub}/>

      </div>
  )
}

export default SingleQuadraPub