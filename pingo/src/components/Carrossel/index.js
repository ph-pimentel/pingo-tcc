import React, { useState } from 'react';
import styles from "./Carrossel.module.css"
import imageData from "../../data/images.json"

const Carrossel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? imageData.length - 1 : prevIndex - 1
      );
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imageData.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    return(
        <div className={styles.carrosselContainer}>
            <button className={styles.btnLeft} onClick={handlePrev}>
                <img src="/img/Carrossel/SetaEsquerda.png" alt="Anterior"/>
            </button>
            <div className={styles.carrosselDisplay}>
            <img
                src={imageData[currentIndex].src}
                alt={imageData[currentIndex].alt}
                 className={styles.carrosselImage}
            />
            
            
            
            
            
            </div>

            <button className={styles.btnRight} onClick={handleNext}>
                <img src="/img/Carrossel/SetaDireita.png" alt="Proxima"/>
            </button>
            
    
        </div>
        
    );
}

export default Carrossel