import React, { useState } from "react";
import Layout from "../../components/Layout";
import styles from "./friends.module.css";

function Friends() {
  // Dados mockados (substituir pela API depois)
  const allFriends = [
    { id: 1, name: "Amigo 1", profileImage: "../../img/Header/steve.png" }

  ];

  return (
    <Layout>
      <div className={styles.main_container}>
        <div className={styles.friends_main_container}>
          <h1 className={styles.friends_title}>Amigos</h1>
          
      
            <div className={styles.card_friend_main_container}>
           
           {/* Adicionar Rota para perfil do amigo*/}
                <a href="/" className={styles.card_friend_container}>
                  <img 
                    src="../../img/Header/steve.png"
                  />
                  <div className={styles.card_friend_name_container}>
                    <h1>leonardo</h1>
                  </div>
                </a>
               
         

            </div>
           </div>
        </div>

    </Layout>
  );
}

export default Friends;