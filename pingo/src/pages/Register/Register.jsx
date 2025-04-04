import styles from "./Register.module.css";
import { useState } from "react";
import { focusInput, togglePasswordVisibility } from "../../scripts/script.js";

function Register() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={styles.registerContainer}>
            {/*---- Ícone do Registro ----*/}
            <img src="/img/BackGround/pingoicon.png" className={styles.registerIcon} alt="Ícone do Registro" />

            {/*---- Formulário de Registro ----*/}
            <form className={styles.registerForm} method="POST">
                <h1 className={styles.registerTitle}>Registrar</h1>
                <input type="text" className={styles.usernameInput} placeholder="Nome de Usuário*" />
                <input type="email" className={styles.emailInput} placeholder="Endereço de e-mail*" />

                {/*---- Input de Senha ----*/}
                <label className={styles.passwordInputContainer} onClick={focusInput}>
                    <input type={showPassword ? "text" : "password"} placeholder="Senha*" />
                    <img
                        src={showPassword ? "/img/Icon/EyeOpen.png" : "/img/Icon/EyeBlock.png"}
                        alt="Mostrar senha"
                        onClick={(e) => togglePasswordVisibility(e, setShowPassword)}
                    />
                </label>

                {/*---- Repetir Senha ----*/}
                <label className={styles.passwordInputContainer} onClick={focusInput}>
                    <input type={showPassword ? "text" : "password"} placeholder="Repetir Senha*" />
                </label>

                {/*---- Manter Conectado ----*/}
                <div className={styles.optionsContainer}>
                    <div className={styles.rememberMeContainer}>
                        <input type="checkbox" id="rememberMe" className={styles.rememberMeCheckbox} />
                        <label htmlFor="rememberMe" className={styles.rememberMeLabel}>Manter Conectado</label>
                    </div>
                </div>

                {/*---- Botão Continuar ----*/}
                <button className={styles.continueButton}>Continuar</button>
            </form>
        </div>
    );
}

export default Register;