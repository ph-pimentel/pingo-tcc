import styles from "./courtcard.module.css"; // 1. Nome do arquivo corrigido
import { useEffect, useState } from "react";

function QuadraCard({ quadra }) { // 2. Nome do componente corrigido (PascalCase)
    const [esportes, setEsportes] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [_carregando, setCarregando] = useState(true); // 3. Nome da variável corrigido

    useEffect(() => {
        async function buscarDados() {
            try {
                // Busca esportes - 4. Template literals corrigidos
                const resEsportes = await fetch(`http://localhost:3001/quadras/${quadra.ID_Quadra}/esportes`);
                const dadosEsportes = await resEsportes.json();
                setEsportes(dadosEsportes);

                // Busca horários
                const resHorarios = await fetch(`http://localhost:3001/quadras/${quadra.ID_Quadra}/horarios`);
                const dadosHorarios = await resHorarios.json();
                setHorarios(dadosHorarios);
            } catch (error) {
                console.error("Erro ao buscar dados:", error); // 5. Mensagem de erro corrigida
            } finally {
                setCarregando(false);
            }
        }

        buscarDados();
    }, [quadra.ID_Quadra]);

    return (
        <div className={styles.main_container}>
            <div className={styles.card_container}>

                {/* --Imagem da Quadra-- */}
                <div className={styles.image_container}>
                    <img
                        src={quadra.Foto || "../img/Carrossel/image1.jpg"}
                        alt={`Quadra ${quadra.NomeQuadra}`}
                    />
                </div>

                {/* --Informações da quadra-- */}
                <div className={styles.info_container}>
                    <div className={styles.item_info}>
                        <h1>{quadra.NomeQuadra}</h1>
                    </div>
                    <div className={styles.item_info}>
                        <h1>Região</h1>
                        <h2>{quadra.Bairro}, {quadra.Cidade}</h2>
                    </div>
                    <div className={styles.item_info}>
                        <h1>Endereço</h1>
                        <h2>{quadra.EnderecoQuadra}</h2>
                    </div>
                </div>

                <div className={styles.divider} />

                {/* --Esportes e Horários-- */}
                <div className={styles.info_container_2}>

                    {/* Esportes */}
                    <div className={styles.section_container}>
                        <div className={styles.title_container}>
                            <img src="../img/CourtCard/Sport.png" alt="Esportes" />
                            <div className={styles.item_info}>
                                <h1>Esportes</h1>
                            </div>
                        </div>

                        <div className={styles.sport_info_container}>
                            {esportes.slice(0, 3).map(esporte => (
                                <div key={esporte.ID_Esporte} className={styles.item_sport}>
                                    <img
                                        src={`../img/CourtCard/${esporte.Nome.toLowerCase()}.png`}
                                        alt={esporte.Nome}
                                    />
                                    <h2>{esporte.Nome}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Horários */}
                    <div className={styles.section_container}>
                        <div className={styles.title_container}>
                            <img src="../img/CourtCard/clock.png" alt="Horários" />
                            <div className={styles.title}>
                                <h1>Horários Disponíveis</h1>
                            </div>
                        </div>

                        <div className={styles.sport_info_container}>
                            <div className={styles.item_sport}>
                                <div className={styles.clock_container}>
                                    {horarios.slice(0, 3).map(horario => (
                                        <h3 key={horario.ID_Horario}>
                                            {horario.horario}
                                        </h3>
                                    ))}
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