import styles from "./Friends.module.css";
import imageData from "../../data/images.json";
import { useState } from "react";


const Card = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex - visibleCount < 0 ? imageData.length - visibleCount : prevIndex - visibleCount
    );
  };


  const handleNext = () => {
      setStartIndex((prevIndex) =>
      prevIndex + visibleCount >= imageData.length ? 0 : prevIndex + visibleCount
    );
  };


        return (
          <div className={styles.containerCard}>
            <button className={styles.btnLeft} onClick={handlePrev}>
                <img src="/img/Carrossel/SetaEsquerda.png" alt="Anterior"/>
            </button>

            <div className={styles.grindCard}>
            {imageData.slice(startIndex, startIndex + visibleCount).map((image, index) => (
          <div key={index} className={styles.card}>
            <img src={image.src} alt={image.alt} className={styles.imageCard} />
          </div>
        ))}
            </div>

            <button className={styles.btnRight} onClick={handleNext}>
                <img src="/img/Carrossel/SetaDireita.png" alt="Proxima"/>
            </button>
    
        </div>
        );
      };


export default Card;