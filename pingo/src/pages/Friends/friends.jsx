import React from "react";
import Layout from "../../components/Layout";
import styles from "./friends.module.css";

function Friends(){
    return(
        <Layout>
            <div className={styles.main_container}>


                <div className={styles.friends_main_container}>
                        <h1 className={styles.friends_title}>Amigos</h1>

                        <div className={styles.card_friend_main_container}>

                            <a href="/perfil" className={styles.card_friend_container}>
                                <img src="../../img/Header/steve.png"/>
                                
                                <div className={styles.card_friend_name_container}>
                                    <h1>Leonardo, o Macho</h1>
                                </div>

                            </a>
                            <a href="/perfil" className={styles.card_friend_container}>
                                <img src="../../img/Header/steve.png"/>
                                
                                <div className={styles.card_friend_name_container}>
                                    <h1>Leonardo, o Macho</h1>
                                </div>

                            </a><a href="/perfil" className={styles.card_friend_container}>
                                <img src="../../img/Header/steve.png"/>
                                
                                <div className={styles.card_friend_name_container}>
                                    <h1>Leonardo, o Macho</h1>
                                </div>

                            </a>
                           

                        </div>

                </div>



            </div>



        </Layout>
    )
}

export default Friends;