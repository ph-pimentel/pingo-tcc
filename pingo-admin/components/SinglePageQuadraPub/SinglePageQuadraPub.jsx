import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSingleQuadrasPub,
  updateQuadrasPub,
  atualizarFotoQuadra,
} from "../../api";
import styles from "./SinglePageQuadraPub.module.css";
import AttQuadra from "../AttQuadra/AttQuadra";

const SinglePageQuadraPub = ({ activities }) => {
  const { id } = useParams();
  const [quadra, setQuadra] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [mensagemFoto, setMensagemFoto] = useState("");
  const [erroFoto, setErroFoto] = useState("");
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpdatePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setErroFoto("");
    setMensagemFoto("Processando imagem...");

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setErroFoto("Por favor, selecione uma imagem válida (JPEG, PNG, WebP)");
      setMensagemFoto("");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErroFoto("A imagem deve ter no máximo 5MB");
      setMensagemFoto("");
      return;
    }

    try {
      const response = await atualizarFotoQuadra(id, file);

      setQuadra((prev) => ({
        ...prev,
        Foto: response.fotoUrl,
      }));

      setMensagemFoto("Foto atualizada com sucesso!");
      setErroFoto("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      setErroFoto(error.message || "Erro ao atualizar a foto");
      setMensagemFoto("");
    }
  };

  useEffect(() => {
    const fetchQuadra = async () => {
      try {
        const data = await getSingleQuadrasPub(id);
        setQuadra(data.results[0]);
      } catch (error) {
        console.error("Erro ao buscar quadra:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuadra();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await updateQuadrasPub(
        id,
        formData.NomeQuadra || quadra.NomeQuadra,
        formData.EnderecoQuadra || quadra.EnderecoQuadra,
        formData.Bairro || quadra.Bairro,
        formData.Cidade || quadra.Cidade
      );
      //Atualiza os dados locais
      setQuadra((prev) => ({
        ...prev,
        NomeQuadra: formData.NomeQuadra || prev.NomeQuadra,
        EnderecoQuadra: formData.EnderecoQuadra || prev.EnderecoQuadra,
        Bairro: formData.Bairro || prev.Bairro,
        Cidade: formData.Cidade || prev.Cidade,
      }));
      setOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar quadra:", quadra);
    }
  };

  if (loading) return <p>Carregando..</p>;
  if (!quadra) return <p>Quadra não encontrada</p>;

  //Defina as colunas que vão aparecer no formulario
  const columns = [
    { field: "NomeQuadra", headerName: "Nome da Quadra", type: "text" },
    { field: "EnderecoQuadra", headerName: "Endereço", type: "text" },
    { field: "Bairro", headerName: "Bairro", type: "text" },
    { field: "Cidade", headerName: "Cidade", type: "text" },
  ];

  return (
    <div className={styles.single}>
      {open && (
        <AttQuadra
          columns={columns}
          slug="Quadra"
          setOpen={setOpen}
          onSubmit={handleUpdate} // Adicionamos uma prop para o submit
          initialData={{
            NomeQuadra: quadra.NomeQuadra,
            EnderecoQuadra: quadra.EnderecoQuadra,
            Bairro: quadra.Bairro,
            Cidade: quadra.Cidade,
          }}
        />
      )}

      <div className={styles.view}>
        <div className={styles.info}>
          <div className={styles.principalInfo}>
            <img src={quadra.Foto} alt="" />
            <h1>{quadra.NomeQuadra}</h1>
            <button onClick={() => setOpen(true)}>Atualizar Quadra</button>
          </div>
          <div className="quadrasImage">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleUpdatePhoto}
              accept="image/*"
              style={{ display: "none" }}
            />
            <button
              onClick={triggerFileInput}
              disabled={mensagemFoto === "Processando imagem..."}
            >
              {mensagemFoto === "Processando imagem..."
                ? "Enviando..."
                : "Alterar Imagem"}
            </button>
            {mensagemFoto && (
              <div className={styles.mensagemSucesso}>{mensagemFoto} </div>
            )}
            {erroFoto && <div className={styles.mensagemErro}>{erroFoto}</div>}
          </div>
          <hr />
          <h2>Informações da Quadra Pública</h2>
          <div className={styles.details}>
            <div className={styles.item}>
              <span className={styles.itemTitle}>Nome da Quadra:</span>
              <span className={styles.itemValue}>{quadra.NomeQuadra}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.itemTitle}>Endereço da Quadra:</span>
              <span className={styles.itemValue}>{quadra.EnderecoQuadra}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.itemTitle}>Cidade:</span>
              <span className={styles.itemValue}>{quadra.Cidade}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.itemTitle}>Bairro:</span>
              <span className={styles.itemValue}>{quadra.Bairro}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePageQuadraPub;
