import React from "react";
import Layout from "../../components/Layout";
import styles from "./SearchPage.module.css";
import Filter from "../../components/Filter";
import QuadraCard from "../../components/QuadraCard";


let search = 'Pesquisa do usuario aqui'

function SearchPage(){
    return(
        <Layout>
            <div className={styles.main_container}>
                <div className={styles.main_wrapper}>
                    <div className={styles.you_search_container}>
                        <div className={styles.you_search_text_container}>
                        <h2>Você pesquisou por "<p>{search}</p>"</h2>
                        </div>
                    <Filter/>
                    </div>
                    <QuadraCard/>

                </div>
            </div>
        </Layout>
    )
}

export default SearchPage;