import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { obterUsuario, logout } from "../../api";
const API_URL = "http://localhost:5000";

const Navbar = () => {
  const [usuario, setUsuario] = useState(obterUsuario());
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const carregarMenu = async () => {
      try {
        if (usuario && usuario.TipoUsuario) {
          const response = await fetch(
            `http://localhost:5000/menu/${usuario.TipoUsuario}`
          );
          const data = await response.json();
          setMenu(data);
        }
      } catch (error) {
        console.error("Erro ao carregar menu:", error);
      }
    };

    carregarMenu();
  }, [usuario]);

  if (!usuario) return null;

  useEffect(() => {
    const handleStorageChange = () => {
      setUsuario(obterUsuario());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const irParaSettings = () => {
    navigate("/settings");
  };
  const irParaHome = () => {
    navigate("/home");
  };

  const handleMenuItemClick = () => {
      setOpenMenu(false);
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src="../src/assets/icons/navbar/menu.png"
          className={styles.imageMenu}
          onClick={() => setOpenMenu(!openMenu)}
          alt=""
        />
        <img
          src="../src/assets/logo/pingoLogo.png"
          alt=""
          onClick={irParaHome}
        />
      </div>
      <div className={styles.icons}>
        {/*
        <div className={styles.notification}>
          <img src="../src/assets/icons/navbar/notification.png" alt=''/>
          <span>1</span>
        </div>
          */}
        <div className={styles.user} onClick={() => setOpen(!open)}>
          <img src={usuario.Foto} alt="" />
          <span>{usuario.Nome}</span>
        </div>
        <img
          src="../src/assets/icons/menu/confing.png"
          alt=""
          className={styles.icon}
          onClick={irParaSettings}
        />

        {open && (
          <div className={styles.dropdown}>
            <button onClick={logout} className={styles.logoutBtn}>
              <img src="../src/assets/icons/logout.png" alt="" />
              <span>Sair</span>
            </button>
          </div>
        )}

        {openMenu && (
          <div className={styles.dropMenu}>
            <div className={styles.menu}>
              {menu.map((item) => (
                <div className={styles.item} key={item.id}>
                  {item.listItems.map((listItem) => (
                    <Link
                      to={listItem.url}
                      className={styles.listItem}
                      key={listItem.id}
                      onClick={handleMenuItemClick}
                    >
                      <img
                        src={listItem.icon}
                        className={styles.icon}
                        alt={listItem.alt}
                        title={listItem.title}
                      />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
