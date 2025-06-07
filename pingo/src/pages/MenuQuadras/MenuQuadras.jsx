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
                <a href='https://forms.gle/8YhKLMtoM328ygM5A' className={styles.button2}>Trabalhe Conosco</a>
                <a href="https://forms.gle/5JNxMt2JffQjGFym7" className={styles.button2}>Cadastrar Quadra Privada</a>
                <a href="https://forms.gle/h52KTDZJe7EfmU159" className={styles.button3}>Indicar Quadra Pública</a>

            </div>
    
        </Layout>
    );
}

export default MenuCourt;
