import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { focusInput } from "../../scripts/script.js";
import { registrarUsuario } from "../../api.js";

function Register() {
  const [form, setForm] = useState({
    NomeUsuario: "",
    Email: "",
    CPF: "",
    Senha: "",
    ConfirmarSenha: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Função para limpar o CPF
  function limparCPF(cpf) {
    return cpf.replace(/[^\d]/g, ""); // Remove tudo que não for número
  }

  // Função para validar o CPF (insira a validação do CPF aqui, se necessário)
  function validarCPF(cpf) {
    // A lógica de validação do CPF vai aqui, por exemplo:
    if (cpf.length !== 11) return false; // Verifica se o CPF tem 11 dígitos
    // Aqui você pode adicionar validações mais detalhadas se necessário.
    return true;
  }

  // Função principal do submit
  async function handleSubmit(e) {
    e.preventDefault();

    // Limpa o CPF, removendo pontos e hífens
    const cpfLimpo = limparCPF(form.CPF);

    // Validação do CPF
    if (!validarCPF(cpfLimpo)) {
      setErrorMessage("CPF inválido! Por favor, insira um CPF válido.");
      return;
    }

    // Verificar se as senhas coincidem
    if (form.Senha !== form.ConfirmarSenha) {
      setErrorMessage("As senhas não coincidem!");
      return;
    }

    try {
      // Aqui você pode usar o await dentro de uma função assíncrona
      const response = await registrarUsuario({
        NomeUsuario: form.NomeUsuario,
        Email: form.Email,
        CPF: cpfLimpo, // Usando o CPF limpo
        Senha: form.Senha,
      });

      if (response.message) {
        alert(response.message);
        navigate("/"); // Redireciona para a Home
      } else {
        setErrorMessage("Erro ao registrar usuário.");
      }
    } catch{
      setErrorMessage("E-mail ou CPF já cadrastrados.");
    }
  }

  return (
    <div className={styles.registerContainer}>
      <img
        src="/img/BackGround/pingoicon.png"
        className={styles.registerIcon}
        alt="Ícone do Registro"
      />

      <form className={styles.registerForm} method="POST" onSubmit={handleSubmit}>
        <h1 className={styles.registerTitle}>Registrar</h1>

        {/* Exibe mensagem de erro */}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <input
          type="text"
          name="NomeUsuario"
          className={styles.usernameInput}
          placeholder="Nome de Usuário*"
          value={form.NomeUsuario}
          onChange={handleChange}
        />

        <input
          type="email"
          name="Email"
          className={styles.emailInput}
          placeholder="Endereço de e-mail*"
          value={form.Email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="CPF"
          className={styles.inputField}
          placeholder="CPF*"
          value={form.CPF}
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
            onClick={() => setShowPassword(!showPassword)}
          />
        </label>

        <label className={styles.passwordInputContainer} onClick={focusInput}>
          <input
            type={showPassword ? "text" : "password"}
            name="ConfirmarSenha"
            placeholder="Repetir Senha*"
            value={form.ConfirmarSenha}
            onChange={handleChange}
          />
        </label>

        <div className={styles.optionsContainer}>
          <div className={styles.rememberMeContainer}>
            <input
              type="checkbox"
              id="rememberMe"
              className={styles.rememberMeCheckbox}
            />
            <label htmlFor="rememberMe" className={styles.rememberMeLabel}>
              Manter Conectado
            </label>
          </div>
        </div>

        <button type="submit" className={styles.continueButton}>
          Continuar
        </button>
      </form>
    </div>
  );
}

export default Register;
