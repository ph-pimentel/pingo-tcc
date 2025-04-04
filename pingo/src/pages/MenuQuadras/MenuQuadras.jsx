import Layout from "../../components/Layout/index";
import styles from "./menuquadras.module.css"


function MenuCourt() {
    return (
        <Layout> 



            <div className={styles.buttons_container}>

                {/* Importante
               Botão "Minhas Quadras" deve ser exibido apenas
               quando o usuário já tiver uma quadra registrada.
                */}
                <a href="#" className={styles.button1}>Minhas Quadras</a>
                <a href="#" className={styles.button2}>Cadastrar Quadra</a>
                <a href="#" className={styles.button3}>Indicar Quadra</a>

            </div>
    
        </Layout>
    );
}

export default MenuCourt;
