import { focusInput } from "../../scripts/script";
import styles from "./filter.module.css";
import { useState } from "react";

function Filter() {
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
                        <h2>Região de Busca</h2>
                            <label className={styles.form_radio_container}>

                            <label className={styles.radio_label}>
                                <input className={styles.form_radio_btn} type="checkbox" name="regiao" value="1"/>
                                <span>Norte</span>
                            </label>

                            <label className={styles.radio_label}>
                                <input className={styles.form_radio_btn} type="checkbox" name="regiao" value="2"/>
                                <span>Sul</span>
                            </label>

                            <label className={styles.radio_label}>
                                <input className={styles.form_radio_btn} type="checkbox" name="regiao" value="3"/>
                                <span>Leste</span>
                            </label>
                            <label className={styles.radio_label}>
                                <input className={styles.form_radio_btn} type="checkbox" name="regiao" value="4"/>
                                <span>Oeste</span>
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
                        <h2>Tipo de Quadra</h2>
                        <label className={styles.form_radio_container}>
                            <label className={styles.radio_label}>
                                    <input className={styles.form_radio_btn} type="checkbox" name="quadra" value="1"/>
                                    <span>Campo</span>
                            </label>  
                            <label className={styles.radio_label}>
                                    <input className={styles.form_radio_btn} type="checkbox" name="quadra" value="1"/>
                                    <span>Salão</span>
                            </label>  
                            <label className={styles.radio_label}>
                                    <input className={styles.form_radio_btn} type="checkbox" name="quadra" value="1"/>
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
