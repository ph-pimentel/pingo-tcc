
import BarChartBox from '../../components/BarChartBox/BarChartBox'
import ChartBox from '../../components/ChartBox/ChartBox'
import PizzaChartBox from '../../components/PizzaChartBox/PizzaChartBox'
import TopBox from '../../components/TopBox/TopBox'
import { chartBoxClientes, chartBoxQuadra, chartBoxQuadrasReq, barChartBoxLucro } from '../../data'
import styles from './Home.module.css'

const Home = () => {
    return (
        <div className={styles.home}>
            <div className={`${styles.box} ${styles.box1}`}><TopBox/></div>
            <div className={`${styles.box} ${styles.box2}`}><ChartBox {...chartBoxQuadra}/></div>
            <div className={`${styles.box} ${styles.box3}`}><ChartBox {...chartBoxClientes}/></div>
            <div className={`${styles.box} ${styles.box4}`}><ChartBox {...chartBoxQuadrasReq}/></div>
            <div className={`${styles.box} ${styles.box5}`}><BarChartBox {...barChartBoxLucro}/></div>
            <div className={`${styles.box} ${styles.box6}`}><PizzaChartBox/></div>
        </div>
    )
}

export default Home