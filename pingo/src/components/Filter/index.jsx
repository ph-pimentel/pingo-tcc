import { useState } from "react";
import styles from "./filter.module.css";

function Filter({ onFilter }) {
    const [showForm, setShowForm] = useState(false);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [filters, setFilters] = useState({
        local: "",
        raio: "",
        esporte: "",
        tipoQuadra: ""
    });

    const toggleForm = () => setShowForm(!showForm);
    const toggleFilter = () => setIsFilterActive(prev => !prev);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: checked ? value : ""
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Formatando os filtros para o backend
        const formattedFilters = {
            local: filters.local,
            raio: filters.raio === "1" ? 0.5 : 
                 filters.raio === "2" ? 1 : 
                 filters.raio === "3" ? 2 : 
                 filters.raio === "4" ? 5 : null,
            esporte: filters.esporte === "1" ? "Futebol" :
                    filters.esporte === "2" ? "Basquete" :
                    filters.esporte === "3" ? "Vôlei" : "",
            tipoQuadra: filters.tipoQuadra === "1" ? "Campo" :
                       filters.tipoQuadra === "2" ? "Salão" :
                       filters.tipoQuadra === "3" ? "Areia" : ""
        };

        // Chamando a função de filtro passada como prop
        onFilter(formattedFilters);
        
        // Fechando o formulário após buscar
        toggleForm();
        toggleFilter();
    };

    return (
        <div className={styles.align_container}>
            <div className={styles.filter_container}>
                <div className={styles.title_container}>
                    <label onClick={() => { toggleForm(); toggleFilter(); }}>
                        <div className={styles.icon_form}>
                            <img 
                                id="filterIcon" 
                                src={isFilterActive ? "../img/Filter/filterFullBlack.png" : "../img/Filter/filterBlackBorder.png"} 
                                alt="Filtro" 
                            />
                        </div>
                    </label>
                </div>

                {showForm && (
                    <form className={styles.filter_form} onSubmit={handleSubmit}>
                        <div className={styles.form_item}>
                            <h1>Local de Busca</h1>
                            <label className={styles.form_input}>
                                <img src="../img/Filter/lupawhite.png" alt="Buscar"/>
                                <input 
                                    type="text" 
                                    name="local"
                                    placeholder="Digite o endereço..." 
                                    value={filters.local}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>

                        <div className={styles.form_item}>
                            <h2>Raio de Busca</h2>
                            <div className={styles.form_radio_container}>
                                <label className={styles.radio_label}>
                                    <input 
                                        className={styles.form_radio_btn} 
                                        type="radio" 
                                        name="raio" 
                                        value="1"
                                        checked={filters.raio === "1"}
                                        onChange={handleRadioChange}
                                    />
                                    <span>500m</span>
                                </label>

                                <label className={styles.radio_label}>
                                    <input 
                                        className={styles.form_radio_btn} 
                                        type="radio" 
                                        name="raio" 
                                        value="2"
                                        checked={filters.raio === "2"}
                                        onChange={handleRadioChange}
                                    />
                                    <span>1000m</span>
                                </label>

                                <label className={styles.radio_label}>
                                    <input 
                                        className={styles.form_radio_btn} 
                                        type="radio" 
                                        name="raio" 
                                        value="3"
                                        checked={filters.raio === "3"}
                                        onChange={handleRadioChange}
                                    />
                                    <span>2km</span>
                                </label>
                                
                                <label className={styles.radio_label}>
                                    <input 
                                        className={styles.form_radio_btn} 
                                        type="radio" 
                                        name="raio" 
                                        value="4"
                                        checked={filters.raio === "4"}
                                        onChange={handleRadioChange}
                                    />
                                    <span>5km</span>
                                </label>  
                            </div>
                        </div>

                        <div className={styles.form_item}>
                            <h2>Esportes</h2>
                            <div className={styles.form_radio_container}>
                                <label className={styles.radio_label}>
                                    <input 
                                        className={styles.form_radio_btn} 
                                        type="checkbox" 
                                        name="esporte" 
                                        value="1"
                                        checked={filters.esporte === "1"}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>Futebol</span>
                                </label>  
                                
                                <label className={styles.radio_label}>
                                    <input 
                                        className={styles.form_radio_btn} 
                                        type="checkbox" 
                                        name="esporte" 
                                        value="2"
                                        checked={filters.esporte === "2"}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>Basquete</span>
                                </label>  
                                
                                <label className={styles.radio_label}>
                                    <input 
                                        className={styles.form_radio_btn} 
                                        type="checkbox" 
                                        name="esporte" 
                                        value="3"
                                        checked={filters.esporte === "3"}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>Vôlei</span>
                                </label>  
                            </div>
                        </div>

                        <div className={styles.form_item}>
                            <h2>Quadras</h2>
                            <div className={styles.form_radio_container}>
                                <label className={styles.radio_label}>
                                    <input 
                                        className={styles.form_radio_btn} 
                                        type="radio" 
                                        name="tipoQuadra" 
                                        value="1"
                                        checked={filters.tipoQuadra === "1"}
                                        onChange={handleRadioChange}
                                    />
                                    <span>Campo</span>
                                </label>

                                <label className={styles.radio_label}>
                                    <input 
                                        className={styles.form_radio_btn} 
                                        type="radio" 
                                        name="tipoQuadra" 
                                        value="2"
                                        checked={filters.tipoQuadra === "2"}
                                        onChange={handleRadioChange}
                                    />
                                    <span>Salão</span>
                                </label>

                                <label className={styles.radio_label}>
                                    <input 
                                        className={styles.form_radio_btn} 
                                        type="radio" 
                                        name="tipoQuadra" 
                                        value="3"
                                        checked={filters.tipoQuadra === "3"}
                                        onChange={handleRadioChange}
                                    />
                                    <span>Areia</span>
                                </label>
                            </div>
                        </div>
                        
                        <div className={styles.search_container}>
                            <button type="submit" className={styles.search_btn}>
                                Buscar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Filter;