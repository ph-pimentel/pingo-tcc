
import BarChartBox from '../../components/BarChartBox/BarChartBox'
import PizzaChartBox from '../../components/PizzaChartBox/PizzaChartBox'
import TopBox from '../../components/TopBox/TopBox'
import {barChartBoxLucro, barChartBoxHorarios } from '../../data'
import styles from './Home.module.css'
import {  obterUsuario  } from '../../api'
import ChartBoxQuadrasPublicas from '../../graficos/ChartBoxQuadrasPublicas/ChartBoxQuadrasPublicas'
import ChartBoxTotalUsuarios from '../../graficos/ChartBoxUsuarios/ChartBoxTotalUsuarios'
import ChartBoxQuadrasPrivadas from '../../graficos/ChartBoxQuadrasPrivadas/ChartBoxQuadrasPrivadas'
import TopBoxReservas from '../../graficos/TopBoxReservas/TopBoxReservas'
import BarChartBoxHorarios from '../../graficos/BarChartBoxHorarios/BarChartBoxHorarios'
import ChartBoxBestQuadra from '../../graficos/ChartBoxBestQuadra/ChartBoxBestQuadra'
import PizzaChartBoxVisitantes from '../../graficos/PizzaChartBoxVisitantes/PizzaChartBoxVisitantes'

const Home = () => {
    const user = obterUsuario()

    const tipoUsuario = user?.TipoUsuario;

    const graficosPermitidos = {
        Proprietario: [7, 8, 9, 10, 11, 12],
        Admin: [1, 2, 3, 4, 5, 6]
    };

    const boxes = [
        { id: 1, component: <TopBox />, className: styles.box1 },
        { id: 2, component: 
        <ChartBoxQuadrasPublicas
            color="#297EFF"
            icon="../src/assets/icons/menu/quadras.png"
            title="Total Quadras Públicas"
            dataKey="quadras"
            url="/quadraspub"
        />, className: styles.box2 },
        { id: 3, component: 
        <ChartBoxTotalUsuarios
            color="#297EFF"
            icon="../src/assets/icons/menu/usuarios.png"
            title="Total Usuários"
            dataKey="usuarios"
            url="/users"
        />, className: styles.box3 },
        { id: 4, component: 
        <ChartBoxQuadrasPrivadas
        color="#297EFF"
        icon="../src/assets/icons/menu/quadras.png"
        title="Total Quadras Privadas"
        dataKey="quadras"
        url="/quadraspriv"
        />, className: styles.box4 },
        { id: 5, component: <BarChartBox {...barChartBoxLucro} />, className: styles.box5 },
        { id: 6, component: <PizzaChartBox />, className: styles.box6 },

        //Sessão Proprietário
        { id: 7, component: 
            <TopBoxReservas
            color="#297EFF"
            url="/reserva"
            />, className: styles.box7},
            { id: 9, component: <BarChartBoxHorarios {...barChartBoxHorarios} />, className: styles.box8},
            { id: 8, component: <PizzaChartBoxVisitantes />, className: styles.box9 },
            { id: 10, component: <BarChartBox {...barChartBoxLucro} />, className: styles.box10 },
            { id: 11, component: 
                <ChartBoxBestQuadra
                color="#297EFF"
                icon="../src/assets/icons/menu/quadras.png"
                title="Melhor Quadra"
                dataKey="reservas"
                url="/minhas-quadras"
                />, className: styles.box11 },
            
    ]

    return (
        <div className={styles.home}>
           
            {boxes.map(box => 
                graficosPermitidos[tipoUsuario]?.includes(box.id) && (
                    <div key={box.id} className={`${styles.box} ${box.className}`}>
                        {box.component}
                    </div>
                )
            )}

        </div>
    )
}

export default Home