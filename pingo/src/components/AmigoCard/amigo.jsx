import React from "react";
import styles from "./amigo.module.css";

function AmigoCard({ friend }) {
  return (
    <a href={`/perfil/${friend.id}`} className={styles.card_friend_container}>
      <img 
        src={friend.profileImage} 
        alt={`Foto de ${friend.name}`}
        className={styles.friend_image}
      />
      <div className={styles.card_friend_name_container}>
        <h3>{friend.name}</h3>
      </div>
    </a>
  );
}

export default AmigoCard;