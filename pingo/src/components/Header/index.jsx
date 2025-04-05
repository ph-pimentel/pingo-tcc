// Header.js
import styles from "./Header.module.css";
import { focusInput, useProfileMenu } from "../../scripts/script.js";



function Header() {
    
    const { isOpen, toggleMenu, menuRef, buttonRef } = useProfileMenu();
    return (

            
        <div className={styles.header}>

            {/*-- Main Container -- */}
            <div className={styles.container}>

                <div className={styles.left}>
                    <a href="/">
                        <img src="../img/Header/pingoLogo.png" className={styles.logo} />
                    </a>

                    {/* - Icons -*/}
                    <div className={styles.left_icons_container}>
                       {/* Amigos */}
                        <a href="/">
                        <img src="../img/Header/home.png" className={styles.left_icons} />
                        </a>

                        {/* Favoritos */}
                        <a href="">
                            <img src="../img/Header/amigos.png" className={styles.left_icons} />
                        </a>

                        {/* Quadras */}
                        <a href="">
                            <img src="../img/Header/favoritos.png" className={styles.left_icons} />
                        </a>
                    </div>

                </div>

                {/*-- Center --*/}
                <div className={styles.center}>
                    <label className={styles.search_container} onClick={(e) => focusInput}>
                        <input id="search_input" placeholder="Pesquise aqui..." maxLength="100" className={styles.search_input} />
                        <img src="../img/Header/lupa.png" className={styles.search_icon} />
                    </label>

                </div>


                {/*-- Right --*/}
                <div className={styles.right}>
                    <div className={styles.right_icons_container}>

                        {/* Adicione sua quadra */}
                        <a href="/quadraopcoes">
                        <img src="../img/Header/AddQuadra.png" className={styles.right_icons} />
                        </a>

                        {/* Informações */}
                        <a href="/informacoes">
                        <img src="../img/Header/informacoes.png" className={styles.right_icons} />
                        </a>

                        {/* Notificações */}
                        <a href="">
                        <img src="../img/Header/notification.png" className={styles.right_icons} />
                        </a>


                    </div>


                    <div className={styles.right_profile_container}>
                        <button className={styles.right_profile_button} onClick={toggleMenu} ref={buttonRef}>
                            <img src="../img/Header/steve.png" alt="Perfil" />
                        </button>

                        {/*Profile-Menu-bar-*/}
                        <div ref={menuRef} className={`${styles.menu_profile_container} 
                            ${isOpen ? styles.menu_profile_container_active : ""}`}>

                            <a href="/" className={styles.menu_items}>Perfil</a>
                            <a href="/" className={styles.menu_items}>Configurações</a>
                            <a href="/login" className={styles.menu_desconect}>Desconectar-se</a>
                        </div>
                    </div>



                </div>
            </div>






        </div>
    );
}

export default Header;
