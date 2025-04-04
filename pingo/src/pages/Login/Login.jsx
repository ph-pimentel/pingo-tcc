import { useState } from "react";
import styles from "./Login.module.css";
import { focusInput, togglePasswordVisibility } from "../../scripts/script.js";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={styles.loginContainer}>
            {/*---- Ícone do Login ----*/}
            <img src="/img/BackGround/pingoicon.png" className={styles.loginIcon} alt="Ícone do Login" />

            {/*---- Formulário de Login ----*/}
            <form className={styles.loginForm} method="POST">
                <h1 className={styles.loginTitle}>Entrar</h1>
                <input type="email" className={styles.emailInput} placeholder="Endereço de e-mail*" />

                {/*---- Input de Senha ----*/}
                <label className={styles.passwordInputContainer} onClick={focusInput}>
                    <input type={showPassword ? "text" : "password"} placeholder="Senha*" />
                    <img
                        src={showPassword ? "/img/Icon/EyeOpen.png" : "/img/Icon/EyeBlock.png"}
                        alt="Mostrar senha"
                        onClick={(e) => togglePasswordVisibility(e, setShowPassword)}
                        onclick={(e) => togglePasswordVisibility(e, setShowPassword)}
                    />
                </label>

                {/*---- Manter Conectado ----*/}
                <div className={styles.optionsContainer}>
                    <div className={styles.rememberMeContainer}>
                        <input type="checkbox" id="rememberMe" className={styles.rememberMeCheckbox} />
                        <label htmlFor="rememberMe" className={styles.rememberMeLabel}>Manter Conectado</label>
                    </div>

                    {/*---- Esqueceu a Senha ----*/}
                    <a href="/recuperar-senha" className={styles.forgotPasswordLink}>Esqueceu a senha?</a>
                </div>

                {/*---- Botão Continuar ----*/}
                <button className={styles.continueButton}>Continuar</button>

                {/*---- Mover para Registro ----*/}
                <div className={styles.registerContainer}>
                    <p>Não tem uma conta?</p>
                    <a href="/registro" className={styles.registerLink}>Registrar</a>
                </div>

                {/*---- Formas de Login ----*/}
                <div className={styles.alternativeLoginContainer}>
                    <hr /> <span>ou</span> <hr />
                </div>

                {/*---- Login com Google ----*/}
                <button className={styles.googleLoginButton}>
                    <img src="/img/Icon/google.png" alt="Google Icon" />
                    <p>Continuar com Google</p>
                </button>
            </form>
        </div>
    );
}

export default Login;