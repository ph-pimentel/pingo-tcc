import styles from './SingleQuadraPriv.module.css'
import SinglePage from '../../components/SinglePage/SinglePage.jsx'
import { singleQuadraPriv } from '../../data.js'
const SingleQuadraPriv = () => {
  return (
    <div>
      <SinglePage {...singleQuadraPriv}/>
    </div>
  )
}

export default SingleQuadraPriv