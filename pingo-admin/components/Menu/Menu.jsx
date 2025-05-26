import { Link } from "react-router-dom"
import styles from "./Menu.module.css"
import { useEffect, useState } from "react";
import { obterUsuario } from "../../api"

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const usuario = obterUsuario();

  useEffect(() => {
    const carregarMenu = async () => {
      try{
        if (usuario && usuario.TipoUsuario) {
          const response = await fetch(`http://localhost:5000/menu/${usuario.TipoUsuario}`);
          const data = await response.json();
          setMenu(data);
        }
      } catch (error) {
        console.error("Erro ao carregar menu:", error);
      }
      };

      carregarMenu();
    }, [usuario]);

    if (!usuario) return null

  
  return (
    <div className={styles.menu}>
      {menu.map((item) => ( 
        <div className={styles.item} key={item.id}>
          <span className={styles.title}>{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} className={styles.listItem} key={listItem.id}>
            <img src={listItem.icon} className={styles.icon}alt={listItem.alt} />
            <span className={styles.listItemTitle}>{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
};

export default Menu