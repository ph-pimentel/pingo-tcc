
import { useState } from "react";
import styles from "./Navbar.module.css"
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  
  const navigate = useNavigate();
  const [open, setOpen] = useState()
  const irParaSettings = () => {
    navigate("/settings");
  };
  const irParaHome = () => {
    navigate("/");
  };
  const Logout = () => {
    navigate("/");
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
            src="https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/06/25/1838205454-h6qiiv3bcnfabit5e5pqj6rutq.png"
            alt=""
          />
          <span>Pablo</span>
        </div>
        <img src="../src/assets/icons/menu/confing.png" alt="" className={styles.icon} onClick={irParaSettings}/>       
     
       {open && (
        <div className={styles.dropdown}>
          <button onClick={Logout} className={styles.logoutBtn}>
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