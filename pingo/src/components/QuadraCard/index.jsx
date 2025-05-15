import styles from "./courtcard.module.css";

function QuadraCard() {
    return (
        <div className={styles.main_container}>
            <div className={styles.card_container}>
                
    {/* --Imagem da Quadra-- */}
                <div className={styles.image_container}>
                    <img src="../img/Carrossel/image1.jpg" alt="Quadra" />
                </div>

    {/* --Informações da quadra-- */}
                <div className={styles.info_container}>
                    <div className={styles.item_info} alt="Nome da quadra">
                        <h1>Etec Paulistano</h1>
                    </div>
                    <div className={styles.item_info} alt="região">
                        <h1>Região</h1>
                        <h2>Norte</h2>
                    </div>
                    <div className={styles.item_info} alt="endereço">
                        <h1>Endereço</h1>
                        <h2>Avenida Elísio Teixeira Leite, 3611, Jardim Paulistano</h2>
                    </div>
                </div>

                <div className={styles.divider} />

        {/* --Esportes e Horários-- */}
                <div className={styles.info_container_2}>
                    
            {/*-Esportes Título-*/}
                    <div className={styles.section_container}>
                        <div className={styles.title_container}>
                            <img src="../img/CourtCard/Sport.png" />
                            <div className={styles.item_info}>
                                <h1>Esportes</h1>
                            </div>
                        </div>

            {/* --Esportes da Quadra-- */}
                        <div className={styles.sport_info_container}>
                            <div className={styles.item_sport}>
                                <img src="../img/CourtCard/footballball.png" />
                                <h2>Futebol</h2>
                            </div>
                            <div className={styles.item_sport}>
                                <img src="../img/CourtCard/basketball.png" />
                                <h2>Basquete</h2>
                            </div>
                            <div className={styles.item_sport}>
                                <img src="../img/CourtCard/volleyball.png" />
                                <h2>Vôlei</h2>
                            </div>
                        </div>
                    </div>

             {/* Horários Disponíveis Título */}
                    <div className={styles.section_container}>
                        <div className={styles.title_container}>
                            <img src="../img/CourtCard/clock.png" />
                            <div className={styles.title}>
                                <h1>Horários Disponíveis</h1>
                            </div>
                        </div>

                {/* -Horários- */}
                        <div className={styles.sport_info_container}>
                            <div className={styles.item_sport}>
                                <div className={styles.clock_container}>

                                <h3>12:00</h3>
                                <h3>13:50</h3>
                                <h3>15:00</h3>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuadraCard;
