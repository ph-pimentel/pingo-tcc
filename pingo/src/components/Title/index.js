import styles from "./Title.module.css"

function Title() {
    return(
        <div className={styles.title}>
            <img className={styles.starL} src="/img/Title/imgLeft.png" alt="star" />
            <h1>MAIS ACESSADOS</h1>
            <img className={styles.starR} src="/img/Title/imgRight.png" alt="star" />
              
        </div>
    );
}

export default Title