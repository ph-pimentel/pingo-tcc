
import { useState } from "react";
import styles from "./Navbar.module.css"
import { useNavigate } from 'react-router-dom';
import { obterUsuario, logout } from "../../api";
const Navbar = () => {
   const usuario = obterUsuario();
  const navigate = useNavigate();
  const [open, setOpen] = useState()
  const irParaSettings = () => {
    navigate("/settings");
  };
  const irParaHome = () => {
    navigate("/home");
  };

  return (
    <div className={styles.navbar}>
         <div className={styles.logo}>
        <img src="../src/assets/logo/pingoLogo.png" alt="" onClick={irParaHome}/>
      </div>
      <div className={styles.icons}>
        {/*
        <div className={styles.notification}>
          <img src="../src/assets/icons/navbar/notification.png" alt=''/>
          <span>1</span>
        </div>
          */}
        <div className={styles.user} onClick={() => setOpen(!open)}>
          <img
            src={usuario.Foto}
            alt=""
          />
          <span>{usuario.Nome}</span>
        </div>
        <img src="../src/assets/icons/menu/confing.png" alt="" className={styles.icon} onClick={irParaSettings}/>       
     
       {open && (
        <div className={styles.dropdown}>
          <button onClick={logout} className={styles.logoutBtn}>
            <img src="../src/assets/icons/logout.png" alt=""/>
            <span>Sair</span>
          </button>
        </div>
        )} 
     </div>
  </div>
  )
}

export default Navbar