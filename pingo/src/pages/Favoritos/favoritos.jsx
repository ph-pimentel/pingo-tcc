import React from "react";
import Layout from "../../components/Layout";
import styles from "./favoritos.module.css";
import QuadraFavoritaCard from '../../components/QuadraFavoritaCard/QuadraFavoritaCard';

function Favoritos() {

  const todasQuadras = [
    { 
      id: 1, 
      nome: "Quadra 1", 
      imagem: "../img/Header/steve.png",
      link: "/quadrainformacoes/" 
    },
    { 
      id: 2, 
      nome: "Quadra 2", 
      imagem: "../img/Header/steve.png",
      link: "/quadrainformacoes/"
    },
    { 
      id: 2, 
      nome: "Quadra 2", 
      imagem: "../img/Header/steve.png",
      link: "/quadrainformacoes/"
    },
    { 
      id: 2, 
      nome: "Quadra 2", 
      imagem: "../img/Header/steve.png",
      link: "/quadrainformacoes/"
    },
  ];

  return (
    <Layout>
      <div className={styles.main_container}>
        <div className={styles.quadras_main_container}>
          <h1 className={styles.quadra_title}>Quadras Favoritas</h1>
          
          <div className={styles.card_quadra_main_container}>

            {todasQuadras.map(quadra => (
              <QuadraFavoritaCard
                key={quadra.id}
                nome={quadra.nome}
                imagem={quadra.imagem}
                link={quadra.link}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Favoritos;