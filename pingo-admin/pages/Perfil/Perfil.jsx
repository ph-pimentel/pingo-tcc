import { useState, useRef } from 'react';
import styles from './Perfil.module.css';
import { obterUsuario, atualizarPerfil, atualizarSenha, atualizarFotoUsuario} from "../../api";
import AttPerfil from '../../components/AttPerfil/AttPerfil';
import MudarSenha from '../../components/AttPassword/AttPassword';

const Perfil = () => {
  const [usuario, setUsuario] = useState(obterUsuario());
  const [openPerfil, setOpenPerfil] = useState(false);
  const [openSenha, setOpenSenha] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const fileInputRef = useRef(null);
  
  const handleUpdate = async (formData) => {
    try {
    const response = await atualizarPerfil(usuario.ID_Usuario, formData.Nome, formData.Email);
    localStorage.setItem('token', response.token);
    setUsuario(obterUsuario()); //Atualiza os dados
    setOpenPerfil(false); 
    window.location.reload();
  } catch (error) {
    alert('Erro ao atualizar: ' + (error.response?.data?.error || error.message));
  }
};

  const handleUpdatePassword = async (senhaAntiga, novaSenha) => {
    try {
      await atualizarSenha(usuario.ID_Usuario, senhaAntiga, novaSenha);
      setMensagem('Senha alterada com sucesso');
      setOpenSenha(false);
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao atualizar senha');
    }
  };

  const handleUpdatePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    //Limpa mensagens anteriores
    setErro('');
    setMensagem('Processando imagem...');

    //Validações iniciais
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if(!allowedTypes.includes(file.type)) {
      setErro('Por favor, selecione uma imagem válida (JPEG, PNG, JPG, WebP)');
      setMensagem('')
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErro('A imagem deve ter no máximo 5MB');
      setMensagem('');
      return;
    }

    try {
      const response = await atualizarFotoUsuario(usuario.ID_Usuario, file);

      localStorage.setItem('token', response.token);
      setUsuario(obterUsuario());
      setMensagem('Foto atualizada com sucesso!');
      setErro('');

      // Atualiza a visualização sem recarregar a página
      const newUserData = obterUsuario();
      setUsuario(newUserData);
      window.location.reload();

      // Limpa o input de arquivo para realizar um novo upload

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    }catch (error) {
      console.error('Erro no upload:', error);
      setErro(error.message || 'Erro ao atualizar a foto');
      setMensagem('');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (  
    
    <div className={styles.profilePage}>
      {mensagem && <div className={styles.mensagemSucesso}>{mensagem}</div>}
      {erro && <div className={styles.mensagemErro}>{erro}</div>}

      {openPerfil && (
        <AttPerfil 
          setOpen={setOpenPerfil}
          onSubmit={handleUpdate}
          initialData={{
            Nome: usuario.Nome,
            Email: usuario.Email
          }}
        />
      )}

      {openSenha && (
        <MudarSenha
        setOpen={setOpenSenha}
        onUpdatePassword={handleUpdatePassword}
        />
      )}

     <h1>Configurações</h1>
      <div className={styles.profileContainer}>
    {/* Primeira Seção da Esquerda*/}
    <div className={styles.profileHeader}>
      <img 
      className={styles.profileImage} 
      src={usuario.Foto} 
      alt="" 
      onError={(e) => {
        e.target.src = '../../src/icons/menu/perfil.png';
      }}
      />
       <div className={styles.userImage}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpdatePhoto}
          accept='image/*'
          style={{display: 'none'}}
        />
          <button 
            className={styles.buttonImage} 
            onClick={triggerFileInput}
            disabled={mensagem === 'Processando imagem...'}
            >
            {mensagem === 'Processando imagem...' ? 'Enviando...' : 'Alterar Imagem'}
            </button>
        </div>
    </div>

    {/* Seção da Direita*/}
     <div className={styles.profileDetails}>
        {/* Sub Divisão Informações Usuario*/}
        <span className={styles.info}>Informações do Usuario</span>
        <div className={styles.infoProfile}>
          <div className={styles.inputGroup}>
            <span>Nome Usuário</span>
            <input type="text" value={usuario.Nome} disabled />
          </div>
          <div className={styles.inputGroup}>
          </div>
        </div>

        {/* Sub Divisão Configurações Usuario*/}
        <span className={styles.info}>Configurações do Usuario</span>
        <div className={styles.infoProfile}>
          <div className={styles.inputGroup}>
            <span>Email</span>
            <input type="text" value={usuario.Email} disabled/>
            <span>Senha</span>
            <input type="text" value="****" disabled/>
          </div>
          <div className={styles.inputGroup}>
          <span>Tipo de Usuario</span>
          <input type="text" value={usuario.TipoUsuario} disabled/>
          </div>
        </div>
        <div className={styles.divButton}>
          <button className={styles.buttonPassword} onClick={() => setOpenPerfil(true)}>Mudar Configurações</button>
          <button className={styles.buttonPassword} onClick={() => setOpenSenha(true)}>Mudar Senha</button>
        </div>
        
    </div>
    </div>
  </div>
  )

}

export default Perfil