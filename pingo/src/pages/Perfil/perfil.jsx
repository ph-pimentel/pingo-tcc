import React from "react";
import Layout from "../../components/Layout/index";
import styles from "./perfil.module.css";

function Perfil() {
    return (
        <Layout>
            <div className={styles.main_container}>
                <div className={styles.profile_main_container}>
                    <div className={styles.profile_block_container}>

                    {/* Imagem do perfil */}
                    <div className={styles.profile_img_container}>
                        <img src="../../img/Header/steve.png" alt="Foto de perfil"/>
                    </div>

                    {/* Conteúdo do perfil */}
                    <div className={styles.profile_content_container}>
                        
                        {/* Cabeçalho com nome e redes sociais */}
                        <div className={styles.profile_header}>
                            <div className={styles.profile_name_container}>
                                <h1>Leonardo</h1>
                            </div>

                            <div className={styles.social_container}>
                                <div className={styles.social_item}>
                                    <h3>Seguidores</h3>
                                    <img src="../../img/profile/social.png" alt="Ícone seguidores"/>
                                    <h3>9,3B</h3>
                                </div>
                                <div className={styles.social_item}>
                                    <h3>Seguindo</h3>
                                    <img src="../../img/profile/social.png" alt="Ícone seguindo"/>
                                    <h3>25</h3>
                                </div>
                            </div>
                        </div>

                        {/* Biografia */}
                        <div className={styles.bio_main_container}>
                            <h2>Biografia Mais Bonita deste Brasil
                                 Quadrado que eu tanto amo. Viva a 
                                 vida como se você tivesse apenas
                                 um ultimo bloco.</h2>
                        </div>
                    </div>
                
                    </div>
                    <div className={styles.friends_main_container}>
                        
                        <div className={styles.friends_title_container}>
                            <h1>Amigos</h1>             
                        </div>

                        
                        <div className={styles.friends_item_main_container}>
                    {/*Max Friends: 10*/}
                            <a className={styles.friends_item_container}>
                                <img src="../../img/Header/steve.png"/>
                                 <a href="/">Jorge</a>
                            </a>
                            <a className={styles.friends_item_container}>
                                <img src="../../img/Header/steve.png"/>
                                 <a href="/">Jorge</a>
                            </a>
                     

                        </div>


                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Perfil;