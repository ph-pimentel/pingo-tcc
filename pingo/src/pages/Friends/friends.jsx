import React from "react";
import Layout from "../../components/Layout";
import AmigoCard from "../../components/AmigoCard/amigo";
import styles from "./friends.module.css";

function Friends() {

  {/* Informações dos Amigos Adicionados*/}
  const allFriends = [
    { id: 1, name: "Amigo 1", profileImage: "../../img/Header/steve.png" },
    { id: 2, name: "Amigo 2", profileImage: "../../img/Header/steve.png" },
  ];

  return (
    <Layout>
      <div className={styles.main_container}>
        <div className={styles.friends_main_container}>
          <h1 className={styles.friends_title}>Amigos</h1>
          
          /* Card Amigo*/
          <div className={styles.card_friend_main_container}>
            {allFriends.length > 0 ? (
              allFriends.map(friend => (
                /*Componente do card de amigos*/
                <AmigoCard 
                  key={friend.id} 
                  friend={friend} 
                />
              ))
            ) : (
              /*Erro na busca*/
              <p className={styles.no_friends}>Nenhum amigo encontrado...</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Friends;