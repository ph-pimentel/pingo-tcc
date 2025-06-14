import styles from "./TopBoxReservas.module.css";
import { Link } from 'react-router-dom'
import {recentReservas} from "../../data.js";
import { useEffect, useState } from "react";
const TopBoxReservas = ({url, color}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.topBox}>
      <h1>Últimas reservas</h1>
          <div className={styles.table}>
              <div className={styles.header}>
                <span>Nome locatário</span>
                <span>Quadra escolhida</span>
                <span>Horário marcado</span>
                <span>Dia alocação</span>
              </div>

              {recentReservas.map((user) => {
                const primeiroNome = user.username.trim().split(" ")[0];
                return(
                    <div className={styles.row} key={user.id}>
                      <span>
                        {isMobile && <span className={styles.blod}>Nome locatário:</span>}
                        {primeiroNome}
                      </span>
                      <span>
                      {isMobile && <span className={styles.blod}>Quadra escolhida:</span>}
                      {user.email}
                      </span>
                      <span>
                      {isMobile && <span className={styles.blod}>Horário marcado:</span>}
                      {user.amount}
                      </span>
                      <span>
                      {isMobile && <span className={styles.blod}>Dia alocação:</span>}
                      {user.days}</span>
                    </div>
                );
              })}
              <Link to={url} style={{color: color}} className={styles.moreLink}>Ver todas reservas</Link>
          </div>
      </div>
  ) 
}

export default TopBoxReservas;