import styles from "./TopBox.module.css";
import {topDealUsers} from "../../data.js";
const TopBox = () => {
  return (
    <div className={styles.topBox}>
      <h1>Melhores Proprietarios</h1>
        <div className={styles.list}>
          {topDealUsers.map(user => (
            <div className={styles.listItem} key={user.id}>
              <div className={styles.user}>
                <img src={user.img} alt="" />
                <div className={styles.userTexts}>
                    <span className={styles.username}>{user.username}</span>
                    <span className={styles.email}>{user.email}</span>           
                </div>
            </div>
            <div className={styles.userTexts}>
            <span className={styles.reservas}>Reservas</span>
            <span className={styles.number}>{user.amount}</span>
            </div>
            
           </div>
          ))}
        </div>
    </div>
  ) 
}

export default TopBox;