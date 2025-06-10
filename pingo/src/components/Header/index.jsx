// Header.js
import styles from "./Header.module.css";
import { focusInput, useProfileMenu } from "../../scripts/script.js";
import { useState } from 'react'



function Header() {
    

    const [options, setOptions] = useState(false);
    const toggleOptions = () => {
        setOptions(!options);    
    };

    const { isOpen, toggleMenu, menuRef, buttonRef } = useProfileMenu();
    return (

            
        <div className={styles.header}>
            {/*-- Main Container -- */}
            <div className={styles.container}>

                <div className={styles.left}>
                    <div className={styles.logo_container}>
                    <button className={styles.options} onClick={toggleOptions}>   
                        <img src="../img/Header/options.png"/>
                    </button>

                    { options && (
                        <div className={styles.options_selected_container}>
                            <div className={styles.options_selected_buttons_container}>
            
                       {/* Home */}
                            <a href="/" className={styles.options_icons_container}>
                                <img src="../img/Header/home.png" />
                                <h1> Início</h1>
                            </a>
                        {/* Favoritos */}
                            <a href="/favoritos" className={styles.options_icons_container}>
                                <img src="../img/Header/favoritos.png" />
                                <h1> Favoritos</h1>
                            </a>
                        {/* Meus Agendamentos */}
                            <a href="/meusagendamentos" className={styles.options_icons_container}>
                                <img src="../img/Header/agendamentos.png" />
                                <h1> Agendamentos</h1>
                            </a>
                        {/* Meus Agendamentos */}
                            <a href="/quadraopcoes" className={styles.options_icons_container}>
                                <img src="../img/Header/AddQuadra.png" />
                                <h1>Gestão de Quadras</h1>
                            </a>
                        {/* Informação Pingo */}
                            <a href="/informacoes" className={styles.options_icons_container}>
                                <img src="../img/Header/informacoes.png" />
                                <h1>Informaçãoes Pingo</h1>
                            </a>
                            
                    </div>
                </div>
                     
                    )}




                    <a href="/">
                        <img src="../img/Header/pingoLogo.png" className={styles.logo} />
                    </a>
                    </div>

                    {/* - Icons -*/}
                    <div className={styles.left_icons_container}>
                       {/* Home */}
                        <a href="/">
                        <img src="../img/Header/home.png" className={styles.left_icons} alt='inicio' />
                        </a>

                        {/* Agendamentos */}
                        <a href="/meusagendamentos">
                        <img src="../img/Header/agendamentos.png" className={styles.left_icons} alt='agendamentos' />
                        </a>

                        {/* Favoritos */}
                        <a href="/favoritos">
                        <img src="../img/Header/favoritos.png" className={styles.left_icons} alt='favoritos' />
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


                    </div>


                    <div className={styles.right_profile_container}>
                        <button className={styles.right_profile_button} onClick={toggleMenu} ref={buttonRef}>
                            <img src="../img/Header/steve.png" alt="Perfil" />
                        </button>

                        {/*Profile-Menu-bar-*/}
                        <div ref={menuRef} className={`${styles.menu_profile_container} 
                            ${isOpen ? styles.menu_profile_container_active : ""}`}>

                            <a href="/configuracoes" className={styles.menu_items}>Sua Conta</a>
                            <a href="/login" className={styles.menu_desconect}>Desconectar-se</a>
                        </div>
                    </div>



                </div>
            </div>






        </div>
    );
}

export default Header;
