import { Link } from "react-router-dom"
import styles from "./Menu.module.css"
import {menu} from "../../data"
const Menu = () => {
  return (
    <div className={styles.menu}>
      {menu.map((item) => ( 
        <div className={styles.item} key={item.id}>
          <span className={styles.title}>{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} className={styles.listItem} key={listItem.id}>
            <img src={listItem.icon} alt={listItem.alt} />
            <span className={styles.listItemTitle}>{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
};

export default Menu