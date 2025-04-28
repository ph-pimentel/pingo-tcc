import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { focusInput } from "../../scripts/script.js";
import { loginUsuario } from "../../api.js";
import { jwtDecode } from "jwt-decode";

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


        if (!form.Email || !form.Senha) {
            setErrorMessage("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await loginUsuario(form);
            const decoded = jwtDecode(response.token);
            if (form.manterConectado) {
                localStorage.setItem('token', response.token);
                console.log(decoded)
            }else {
                sessionStorage.setItem('token', response.token);
                console.log(decoded)
            }

            if (decoded.TipoUsuario === 'Admin' || decoded.TipoUsuario === 'Proprietario'){
                navigate("/home"); // Redireciona para a Home
            }

        } catch (error){
            // Trata diferentes tipos de erro
        if (error.response) {
            // O servidor respondeu com um status fora do range 2xx
            setErrorMessage(error.response.data.error || "Credenciais inválidas.");
        } else if (error.request) {
            // A requisição foi feita mas não houve resposta
            setErrorMessage("Sem resposta do servidor. Tente novamente.");
        } else {
            // Algum erro ocorreu ao configurar a requisição
            setErrorMessage("Erro ao configurar a requisição.");
        }
    }
}

    return (
        <div className={styles.loginContainer}>
            <img src="../src/assets/BackGround/pingoicon.png" className={styles.loginIcon} alt="Ícone do Login" />

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
                        placeholder="Senha"
                        value={form.Senha}
                        onChange={handleChange}
                    />
                    <img
                        src={showPassword ? "../src/assets/icons/EyeOpen.png" : "../src/assets/icons/EyeBlock.png"}
                        alt="Mostrar senha"
                        onClick={togglePasswordVisibility}
                    />
                </label>

                <div className={styles.optionsContainer}>
                    <div className={styles.rememberMeContainer}>
                        <input type="checkbox" 
                        id="rememberMe" 
                        name="manterConectado"
                        className={styles.rememberMeCheckbox}
                        checked={form.manterConectado}
                        onChange={handleChange} />
                        <label htmlFor="rememberMe" className={styles.rememberMeLabel}>Manter Conectado</label>
                    </div>
                    <a href="/recuperar-senha" className={styles.forgotPasswordLink}>Esqueceu a senha?</a>
                </div>

                <button type="submit" className={styles.continueButton}>Continuar</button>
            </form>
        </div>
    );
}

export default Login;
