import React from "react";
import Layout from "../../components/Layout";
import styles from "./favoritos.module.css";

function Favoritos() {

  {/* Informações dos Amigos Adicionados*/}
  const todasQuadras = [
    { id: 1, name: "Quadra 1", profileImage: "../../img/Header/steve.png" },
    { id: 2, name: "Quadra 2", profileImage: "../../img/Header/steve.png" },
  ];

  return (
    <Layout>
      <div className={styles.main_container}>
        <div className={styles.friends_main_container}>
          <h1 className={styles.friends_title}>Quadras Favoritas</h1>
          

          <div className={styles.card_friend_main_container}>
           
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Favoritos;