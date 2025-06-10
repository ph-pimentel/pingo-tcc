import React from 'react';
import styles from './quadrafavoritacard.module.css';

function QuadraFavoritaCard({ nome, imagem, link }){
    return(
        <a href={link} className={styles.favorite_card_main_container}>
             <img 
               className={styles.favorite_card_image} 
               src={imagem} 
               alt={`Quadra ${nome}`}
             />
             <p className={styles.favorite_card_text}>{nome}</p>
        </a>
    )
}

export default QuadraFavoritaCard;