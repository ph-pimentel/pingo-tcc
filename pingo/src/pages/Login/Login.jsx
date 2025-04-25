import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { focusInput } from "../../scripts/script.js";
import { loginUsuario } from "../../api.js";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ Email: "", Senha: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await loginUsuario(form);

            if (response.message) {
                alert(response.message);
                navigate("/"); // Redireciona para a Home
            } else {
                setErrorMessage("Erro ao logar usuário.");
            }
        } catch{
            setErrorMessage("E-mail ou senha incorretos.");
        }
    }

    return (
        <div className={styles.loginContainer}>
            <img src="/img/BackGround/pingoicon.png" className={styles.loginIcon} alt="Ícone do Login" />

            <form className={styles.loginForm} method="POST" onSubmit={handleSubmit}>
                <h1 className={styles.loginTitle}>Entrar</h1>

                {/* Exibe a mensagem de erro */}
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                <input
                    type="Email"
                    name="Email"
                    className={styles.emailInput}
                    placeholder="Endereço de e-mail*"
                    value={form.Email}
                    onChange={handleChange}
                />

                <label className={styles.passwordInputContainer} onClick={focusInput}>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="Senha"
                        placeholder="Senha*"
                        value={form.Senha}
                        onChange={handleChange}
                    />
                    <img
                        src={showPassword ? "/img/Icon/EyeOpen.png" : "/img/Icon/EyeBlock.png"}
                        alt="Mostrar senha"
                        onClick={togglePasswordVisibility}
                    />
                </label>

                <div className={styles.optionsContainer}>
                    <div className={styles.rememberMeContainer}>
                        <input type="checkbox" id="rememberMe" className={styles.rememberMeCheckbox} />
                        <label htmlFor="rememberMe" className={styles.rememberMeLabel}>Manter Conectado</label>
                    </div>
                    <a href="/recuperar-senha" className={styles.forgotPasswordLink}>Esqueceu a senha?</a>
                </div>

                <button type="submit" className={styles.continueButton}>Continuar</button>

                <div className={styles.registerContainer}>
                    <p>Não tem uma conta?</p>
                    <a href="/registro" className={styles.registerLink}>Registrar</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
