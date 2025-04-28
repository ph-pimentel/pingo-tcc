import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { focusInput } from "../../scripts/script.js";
import { loginUsuario } from "../../api.js";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ Email: "", Senha: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [manterConectado, setManterConectado] = useState(false); // manter conectado
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica se existe token no localStorage ou sessionStorage
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            navigate("/home");
        }
    }, [navigate]);

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleCheckboxChange(e) {
        setManterConectado(e.target.checked);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await loginUsuario(form);

            if (response.token) {
                if (manterConectado) {
                    localStorage.setItem('token', response.token);
                } else {
                    sessionStorage.setItem('token', response.token);
                }
                alert(response.message);
                navigate("/home");
            } else {
                setErrorMessage("Erro ao logar usuário.");
            }
        } catch {
            setErrorMessage("E-mail ou senha incorretos.");
        }
    }

    return (
        <div className={styles.loginContainer}>
            <img src="/img/BackGround/pingoicon.png" className={styles.loginIcon} alt="Ícone do Login" />

            <form className={styles.loginForm} method="POST" onSubmit={handleSubmit}>
                <h1 className={styles.loginTitle}>Entrar</h1>

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
                        placeholder="Senha"
                        value={form.Senha}
                        onChange={handleChange}
                    />
                    <img
                        src={showPassword ? "/img/Icon/EyeOpen.png" : "/img/Icon/EyeBlock.png"}
                        alt="Mostrar senha"
                        onClick={togglePasswordVisibility}
                    />
                </label>

                <button type="submit" className={styles.continueButton}>Continuar</button>

                <div className={styles.registerContainer}>
                    <p>Não tem uma conta?</p>
                    <a href="/registro" className={styles.registerLink}>Registrar</a>
                </div>

                {/* Manter conectado */}
                <div className={styles.optionsContainer}>
                    <div className={styles.rememberMeContainer}>
                        <input 
                            type="checkbox" 
                            id="rememberMe" 
                            className={styles.rememberMeCheckbox}
                            checked={manterConectado}
                            onChange={handleCheckboxChange} // para manter conectado
                        />
                        <label htmlFor="rememberMe" className={styles.rememberMeLabel}>
                            Manter Conectado
                        </label>
                    </div>

                    {/* Esqueceu a Senha */}
                    <a href="/recuperar-senha" className={styles.forgotPasswordLink}>Esqueceu a senha?</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
