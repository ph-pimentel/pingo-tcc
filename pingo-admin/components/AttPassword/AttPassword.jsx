import { useState } from "react";
import styles from './AttPassword.module.css';

const MudarSenha = ({ setOpen, onUpdatePassword }) => {
    const [formData, setFormData ] = useState ({
        senhaAntiga: '',
        novaSenha: '',
        confirmarSenha: ''
    });
    const [loading, setLoadign] = useState(false)
    const [erro, setErro] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        // Validações
        if (formData.novaSenha !== formData.confirmarSenha) {
            setErro('As senhas não coincidem');
            return;
        }

        if (formData.novaSenha.length < 6){
            setErro('A senha deve ter pelo menos 8 caracteres');
            return;
        }

        setLoadign(true);
        try {
            await onUpdatePassword(formData.senhaAntiga, formData.novaSenha);
            setOpen(false);
        }catch (error) {
            setErro(error.message || 'Erro ao atualizar senha');
        } finally {
            setLoadign(false);
            
        }
    };

    return (
        <div className={styles.add}>
            <div className={styles.modal}>
                <span className={styles.close} onClick={() => setOpen(false)}>
                    x
                </span>
                <h1>Alterar Senha</h1>
                {erro && <div className={styles.erro}>{erro}</div>}
                <form onSubmit={handleSubmit}>
                    <div className={styles.item}>
                        <label>Senha Antiga</label>
                        <input
                            type="password"
                            name="senhaAntiga"
                            value={formData.senhaAntiga}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Nova Senha</label>
                        <input
                            type="password"
                            name="novaSenha"
                            value={formData.novaSenha}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Confirmar Nova Senha</label>
                        <input
                            type="password"
                            name="confirmarSenha"
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Processando...' : 'Alterar Senha'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default MudarSenha