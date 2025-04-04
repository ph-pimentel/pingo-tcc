import { focusInput } from "../../scripts/script";
import styles from "./filter.module.css";
import { useState } from "react";

function Filter({ children }) {
    const [showForm, setShowForm] = useState(false);
    const [isFilterActive, setIsFilterActive] = useState(false);

    const toggleForm = () => setShowForm(!showForm);
    const toggleFilter = () => setIsFilterActive(prev => !prev);

    return (
        <div className={styles.align_container}>
            <div className={styles.filter_container}>
                <div className={styles.title_container}>

                <label
                onClick={() => { toggleForm(); toggleFilter(); 
                }}>
                    <div className={styles.icon_form}>
                        <img id="filterIcon" src={isFilterActive ? "../img/Filter/filterFullBlack.png" : "../img/Filter/filterBlackBorder.png"} alt="Filtro" />
                    </div>
                </label>
                    </div>

                {showForm && (

                    <div className={styles.filter_form}>

                         <div className={styles.form_item}>
                            <h1>Local de Busca</h1>
                            <label className={styles.form_input} onClick={focusInput}>
                                <img src="../img/Filter/lupawhite.png"/>
                                <input type="text" placeholder="Digite o endereço..." />
                            </label>
                         </div>

                        <div className={styles.form_item}>
                        <h2>Raio de Busca</h2>
                            <label className={styles.form_radio_container}>

                            <label className={styles.radio_label}>
                                <input className={styles.form_radio_btn} type="radio" name="distancia" value="1"/>
                                <span>500m</span>
                            </label>

                            <label className={styles.radio_label}>
                                <input className={styles.form_radio_btn} type="radio" name="distancia" value="2"/>
                                <span>1000m</span>
                            </label>

                            <label className={styles.radio_label}>
                                <input className={styles.form_radio_btn} type="radio" name="distancia" value="3"/>
                                <span>2km</span>
                            </label>
                            <label className={styles.radio_label}>
                                <input className={styles.form_radio_btn} type="radio" name="distancia" value="4"/>
                                <span>5km</span>
                            </label>  
                        </label>
                        </div>

                        <div className={styles.form_item}>
                        <h2>Esportes</h2>
                        <label className={styles.form_radio_container}>
                            <label className={styles.radio_label}>
                                    <input className={styles.form_radio_btn} type="checkbox" name="esporte" value="1"/>
                                    <span>Futebol</span>
                            </label>  
                            <label className={styles.radio_label}>
                                    <input className={styles.form_radio_btn} type="checkbox" name="esporte" value="1"/>
                                    <span>Basquete</span>
                            </label>  
                            <label className={styles.radio_label}>
                                    <input className={styles.form_radio_btn} type="checkbox" name="esporte" value="1"/>
                                    <span>Vôlei</span>
                            </label>  
                        </label>
                        </div>

                        <div className={styles.form_item}>
                        <h2>Quadras</h2>
                        <label className={styles.form_radio_container}>
                            <label className={styles.radio_label}>
                                <input className={styles.form_radio_btn} type="radio" name="quadra" value="1"/>
                                <span>Campo</span>
                            </label>

                            <label className={styles.radio_label}>
                                <input className={styles.form_radio_btn} type="radio" name="quadra" value="2"/>
                                <span>Salão</span>
                            </label>

                            <label className={styles.radio_label}>
                                <input className={styles.form_radio_btn} type="radio" name="quadra" value="3"/>
                                <span>Areia</span>
                            </label>
                        </label>
                        
                        </div>
                        <div className={styles.search_container}>
                            <button className={styles.search_btn}>
                                Buscar
                            </button>
                        </div>
                        
                    </div>


                    

                    

                )}
            </div>
        </div>
    );
}

export default Filter;
