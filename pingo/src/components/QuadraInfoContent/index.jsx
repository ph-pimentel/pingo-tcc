import styles from "./quadrainfocontent.module.css";
import { useState } from "react";

function QuadraInfoContent(){

    {/*__Descrição__*/}
    const textos = {
        descricao: <span>Quadra mais limpa do mundo...</span>,
        contato: <span>contatoproprietario@gmail.com <br/>Telefone 123-012039-19</span>,
        regras: <span>Não mijar na quadra de luz acesa</span>
      };
    
    const [textoAtivo, setTextoAtivo] = useState(textos.descricao);



    return(
        <div className={styles.main_container}>
                

         <div className={styles.content_container}>

            {/*  Imagem e Detalhes da Quadra  */}
            <div className={styles.main_content}>

                <div className={styles.img_container}>
                    <img src="../img/Carrossel/image1.jpg"/> 
                </div>

                 <div className={styles.quadra_info_container}>
                        <div className={styles.quadra_info_title}>
                            <h1>Nome da Quadra</h1>
                        </div>

                        <div className={styles.quadra_info_subtitle}>
                            <h1>Região</h1>
                            <h2>Exemplo</h2>
                        </div>

                        <div className={styles.quadra_info_subtitle}>
                             <h1>Endereço</h1>
                            <p>Rua joãozinho pereira da silva @ 943 - belo campo amarelo</p>

                        </div>

        
                     <button className={styles.btn_see_hours}>
                            <img src="../img/QuadraInfo/clock.png"/>    
                            Horários Disponíveis
                            </button>
                </div>

            </div>


            {/*  DESCRIÇÃO  */}
            <div className={styles.description_container}>
                <div className={styles.description_content_container}>
                   <button onClick={() => setTextoAtivo(textos.descricao)}>Descrição</button>
                   <button onClick={() => setTextoAtivo(textos.contato)}>Contato</button>
                   <button onClick={() => setTextoAtivo(textos.regras)}>Regras</button>
                </div>

                {/*  Texto Exibido  (Editar texto, a partir da linha 8) */}
                <div className={styles.description_text}>
                {textoAtivo && <p>{textoAtivo}</p>}

                </div>

            </div>




        </div>


        </div>

    )
}

export default QuadraInfoContent;