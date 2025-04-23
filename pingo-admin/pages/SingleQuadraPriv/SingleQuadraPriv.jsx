import SinglePageQuadraPriv from '../../components/SinglePageQuadraPriv/SinglePageQuadraPriv'
import { singleQuadraPub } from '../../data'
import styles from './SingleQuadraPriv.module.css'
const SingleQuadraPriv = () => {
  return (
    <div>
      <SinglePageQuadraPriv {...singleQuadraPub}/>
    </div>
  )
}

export default SingleQuadraPriv