import Layout from "../../components/Layout/index";
import HeaderNoLog from "../../components/HeaderNoLog";
import styles from "./Informacoes.module.css";
import { useState } from "react";

function Informacoes() {
    const [faqAbertos, setFaqAbertos] = useState({
        1: false,
        2: false,
        3: false
    });

    const toggleFaq = (numero) => {
        setFaqAbertos((prev) => ({
            ...prev,
            [numero]: !prev[numero],
        }));
    };

    return (
        <>
            <HeaderNoLog />
            <Layout>
                <div id="sobre" />
                <div className={styles.main_container}>
                    <div className={styles.sobre_container}>
                        {/*___Sobre___*/}
                        <div className={styles.sobre_item}>
                            <h1 id="sobre" className={styles.sobre_text_title}>PINGO</h1>
                            <h2 className={styles.sobre_text_subtitle}>
                                Gerenciamento de locação de quadras privadas e divulgação
                                de quadras públicas
                            </h2>
                            <p className={styles.sobre_text}>
                                Uma plataforma que melhora o seu relacionamento com os clientes,
                                facilita a gestão dos horários da sua quadra e promove espaços
                                públicos para incentivar a prática de esportes na sua região.
                            </p>
                        </div>

                        <div className={styles.sobre_item2}>
                            <img src="../../img/Sobre/sobre/Esportes.png" alt="Esportes" />
                            <div id="passoapasso"/>
                        </div>

                    </div>
                    {/*___PASSO A PASSO___*/}
                    <div className={styles.instructions_container}>
                        <div className={styles.instructions_title}>
                            <h1>PASSO A PASSO</h1>
                            <h2>FÁCIL E RÁPIDO PARA AGENDAR</h2>
                        </div>

                        <div className={styles.instructions_card_container}>
                            <div className={styles.instructions_card}>
                                <h1>1</h1>
                                <img src="../../img/Sobre/cards/pinmapa.png" alt="Encontre a Quadra" />
                                <h2>Encontre a Quadra que Deseja</h2>
                            </div>

                            <div className={styles.instructions_card}>
                                <h1>2</h1>
                                <img src="../../img/Sobre/cards/agendamento.png" alt="Escolha o dia e Horário" />
                                <h2>Escolha o dia e Horário</h2>
                            </div>

                            <div className={styles.instructions_card}>
                                <h1>3</h1>
                                <img src="../../img/Sobre/cards/pagamento.png" alt="Realize o Pagamento" />
                                <h2>Realize o Pagamento</h2>
                            </div>

                            <div className={styles.instructions_card}>
                                <h1>4</h1>
                                <div className={styles.instructions_card_image}>
                                    <img src="../../img/Sobre/cards/jogar.png" alt="Agora é só Aproveitar" />
                                </div>
                                <h2>Agora é só Aproveitar</h2>
                            </div>
                        </div>
                    </div>

                    {/*___POSSUI UMA QUADRA?___*/}
                    <div className={styles.banner_main_container}>
                        <div className={styles.banner_container}>
                            <div className={styles.banner_content_container}>
                                <img src="../../img/Sobre/banner/negocios.png" alt="Negócios" />
                            </div>

                            <div className={styles.banner_content_container}>
                                <h1>Possuí uma quadra esportiva?</h1>
                                <h2>Cadastre sua quadra conosco <br />
                                e facilite a locação dela!</h2>
                                <a href="" className={styles.banner_btn}>Cadastre Agora</a>
                            </div>
                        </div>
                    </div>



                    {/*___FAQ___*/}
                    <div className={styles.faq_main_container} id="perguntas">
                        <div className={styles.faq_container}>
                            <div>
                            <div className={styles.faq_title}>FAQ</div>
                            <div className={styles.faq_subtitle}>Perguntas Frequentes</div>
                            </div>



                            <div className={styles.faq_text_container}>
                                <div className={styles.faq_text_title}>
                                    <h1>"Como Funciona o Pagamento das Quadras?"</h1>
                                    <button onClick={() => toggleFaq(1)}>
                                        <img
                                            src="../../img/Sobre/faq/seta.png"
                                            className={`${styles.seta} ${faqAbertos[1] ? styles.setaAberta : styles.setaFechada}`}
                                            alt="Seta para expandir"
                                        />
                                    </button>
                                </div>
                                {faqAbertos[1] && (
                                    <div className={`${styles.faq_text_wrapper} ${faqAbertos[1] ? styles.open : ""}`}>
                                       
                                        <p className={`${styles.faq_text_text}`}>
                                        A plataforma intermedia os pagamentos entre o usuário e o 
                                        proprietário da quadra, garantindo segurança e organização no 
                                        processo. Após a confirmação do agendamento, o valor é repassado
                                         ao responsável pela quadra.
                                        </p>
                                    </div>
                                )}
                                 <div className={`${styles.linha}`}/>
                                </div>

                                <div className={styles.faq_text_container}>
                                <div className={styles.faq_text_title}>
                                    <h1>"Eu Agendo um Horário na Quadra Pública?"</h1>
                                    <button onClick={() => toggleFaq(2)}>
                                        <img
                                            src="../../img/Sobre/faq/seta.png"
                                            className={`${styles.seta} ${faqAbertos[2] ? styles.setaAberta : styles.setaFechada}`}
                                            alt="Seta para expandir"
                                        />
                                    </button>
                                </div>
                                {faqAbertos[2] && (
                                    <div className={`${styles.faq_text_wrapper} ${faqAbertos[2] ? styles.open : ""}`}>
                                       
                                        <p className={`${styles.faq_text_text}`}>
                                        Não. Apenas divulgamos informações sobre essas quadras para que os 
                                        moradores da região possam conhecê-las, incentivando a prática de
                                         esportes e promovendo o bem-estar da comunidade. Não realizamos 
                                         agendamentos, pois elas são de uso público.
                                        </p>
                                    </div>
                                )}
                                 <div className={`${styles.linha}`}/>
                                </div>

                        </div>
                    </div>

                </div>
            </Layout>
        </>
    );
}

export default Informacoes;
