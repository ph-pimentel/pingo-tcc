import React, { useState } from "react";
import Layout from "../../components/Layout";
import styles from './config.module.css';

function Config() {
    const [info, setInfo] = useState("accountInfo");

    /*Área Backend */
    const [name, setName] = useState("Bravudo");
    const [email, setEmail] = useState("test@gmail.com");
    const [password, setPassword] = useState("senha1234"); 
    const [cpf] = useState("12945678923"); 

    const [modalOpen, setModalOpen] = useState(false);
    const [fieldEditing, setFieldEditing] = useState(null);
    const [tempValue, setTempValue] = useState("");

    const openEditModal = (field, currentValue) => {
        setFieldEditing(field);
        setTempValue(currentValue);
        setModalOpen(true);
    };

    const saveChanges = () => {
        if (fieldEditing === "name" && tempValue.trim().length < 3) {
            alert("O nome deve ter pelo menos 3 caracteres.");
            return;
        }

        if (fieldEditing === "email" && !tempValue.endsWith("@gmail.com")) {
            alert("O email precisa terminar com @gmail.com");
            return;
        }

        if (fieldEditing === "password" && tempValue.length < 4) {
            alert("A senha deve ter pelo menos 4 caracteres.");
            return;
        }

        if (fieldEditing === "name") setName(tempValue);
        if (fieldEditing === "email") setEmail(tempValue);
        if (fieldEditing === "password") setPassword(tempValue);

        setModalOpen(false);
        setFieldEditing(null);
        setTempValue("");
    };

    const cancelChanges = () => {
        setModalOpen(false);
        setFieldEditing(null);
        setTempValue("");
    };

    const maskCpf = (cpf) => {
        return cpf.replace(/^(\d{3})\d{3}\d{3}(\d{2})$/, "$1.***.***-$2");
    };

    const maskPassword = (password) => "•".repeat(password.length);

    return (
        <Layout>
            <div className={styles.main_container}>
                <div className={styles.config_main_container}>
                    <div className={styles.config_buttons_main_container}>
                        <h1>Configurações</h1>
                        <button onClick={() => setInfo("accountInfo")}>
                            Informações da Conta
                        </button>
                    </div>

                    <div className={styles.config_content_main_container}>
                        {info === "accountInfo" && (
                            <>
                                <h1>Informações da Conta</h1>
                                <div className={styles.config_content_account_info}>

                                    {/* Nome */}
                                    <div className={styles.config_content_account_info_input_container}>
                                        <div className={styles.config_info_input}>
                                            <p>Nome do Usuário:</p>
                                            <h1>{name}</h1>
                                        </div>
                                        <div className={styles.config_info_edit_button}>
                                            <button onClick={() => openEditModal("name", name)}>
                                                <img src="../img/config/edit.png" alt="Editar" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className={styles.config_content_account_info_input_container}>
                                        <div className={styles.config_info_input}>
                                            <p>Email:</p>
                                            <h1>{email}</h1>
                                        </div>
                                        <div className={styles.config_info_edit_button}>
                                            <button onClick={() => openEditModal("email", email)}>
                                                <img src="../img/config/edit.png" alt="Editar" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Senha (oculta) */}
                                    <div className={styles.config_content_account_info_input_container}>
                                        <div className={styles.config_info_input}>
                                            <p>Senha:</p>
                                            <h1>{maskPassword(password)}</h1>
                                        </div>
                                        <div className={styles.config_info_edit_button}>
                                            <button onClick={() => openEditModal("password", "")}>
                                                <img src="../img/config/edit.png" alt="Editar" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* CPF (oculto) */}
                                    <div className={styles.config_content_account_info_input_container}>
                                        <div className={styles.config_info_input}>
                                            <p>CPF:</p>
                                            <h1>{maskCpf(cpf)}</h1>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Modal de Edição */}
                {modalOpen && (
                    <div className={styles.modal_overlay}>
                        <div className={styles.modal_box}>
                            <h2>Alterar {fieldEditing === "name" ? "Nome" : fieldEditing === "email" ? "Email" : "Senha"}</h2>
                            <input
                                type={fieldEditing === "password" ? "password" : "text"}
                                value={tempValue}
                                maxLength={
                                    fieldEditing === "name" ? 50 :
                                    fieldEditing === "email" ? 250 :
                                    fieldEditing === "password" ? 20 : undefined
                                }
                                onChange={(e) => setTempValue(e.target.value)}
                            />

                            <div className={styles.modal_buttons}>
                                <button onClick={saveChanges} className={styles.modal_buttons_accept}>Salvar</button>
                                <button onClick={cancelChanges} className={styles.modal_buttons_cancel}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Config;
