
import styles from './SinglePage.module.css'
import PropTypes from 'prop-types'
const SinglePage = ({img, title, info, activities}) => {
  return (
    <div className={styles.single}>
      <div className={styles.view}>
        <div className={styles.info}>
            <div className={styles.principalInfo}>
              <img src={img} alt="" />
              <h1>{title}</h1>
              <button>Atualizar Quadra</button>
            </div>
            <div className={styles.details}>
              {Object.entries(info).map((item) => (
                <div className={styles.item} key={item[0]}>
                <span className={styles.itemTitle}>{item[0]}:</span>
                <span className={styles.itemValue}>{item[1]}</span>
              </div>
              ))}
            </div>
          </div>
        <div className={styles.activities}>
          <h2>Últimas Atividades</h2>
          <ul>
            {activities.map((activity) => (
              <li>
              <div>
                <p>{activity.text}</p>
                <time>{activity.time}</time>
              </div>
            </li>
            ))}
            
          </ul>
        </div>
    </div>
   </div>
  )
}

SinglePage.PropTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  info: PropTypes.object.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired
}

export default SinglePage