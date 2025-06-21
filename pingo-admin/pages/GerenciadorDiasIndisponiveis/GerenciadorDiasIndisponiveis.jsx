import { useState, useEffect } from "react";
import styles from "./GerenciadorDiasIndisponiveis.module.css";
import { getQuadrasProprietario } from "../../api";

const GerenciadorDiasIndisponiveis = () => {
  const [step, setStep] = useState(1);
  const [quadras, setQuadras] = useState([]);
  const [selectedQuadra, setSelectedQuadra] = useState("");
  const [selectedQuadraInfo, setSelectedQuadraInfo] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [singleDate, setSingleDate] = useState("");
  const [viewMode, setViewMode] = useState('multiple');
  const [existingUnavailableDays, setExistingUnavailableDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [motivo, setMotivo] = useState("");
  const [dateError, setDateError] = useState("");

  // Busca as quadras do proprietário
  useEffect(() => {
    const fetchQuadras = async () => {
      try {
        const proprietarioID = localStorage.getItem("proprietarioID");

        if (!proprietarioID) {
          setError("ID do proprietário não encontrado");
          return;
        }

        setLoading(true);
        const data = await getQuadrasProprietario(proprietarioID);
        setQuadras(data || []);
      } catch (err) {
        console.error("Erro ao buscar quadras:", err);
        setError("Erro ao carregar quadras");
      } finally {
        setLoading(false);
      }
    };

    fetchQuadras();
  }, []);

  // Atualiza as informações da quadra selecionada
  useEffect(() => {
    if (selectedQuadra) {
      const quadra = quadras.find(q => q.ID_Quadra == selectedQuadra);
      setSelectedQuadraInfo(quadra);
    } else {
      setSelectedQuadraInfo(null);
    }
  }, [selectedQuadra, quadras]);

  // Carrega dias indisponíveis existentes quando a quadra é selecionada
  useEffect(() => {
    if (selectedQuadra) {
      const fetchUnavailableDays = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/quadra/dias-indisponiveis/${selectedQuadra}`
          );
          if (!response.ok) throw new Error("Erro ao buscar dias indisponíveis");
          const data = await response.json();
          setExistingUnavailableDays(data);
        } catch (err) {
          console.error("Erro:", err);
        }
      };
      fetchUnavailableDays();
    } else {
      setExistingUnavailableDays([]);
    }
  }, [selectedQuadra]);

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'multiple' ? 'single' : 'multiple');
    setStartDate("");
    setEndDate("");
    setSingleDate("");
    setDateError("");
  };

  const validateDates = () => {
    if (viewMode === 'multiple') {
      if (!startDate || !endDate) {
        setDateError("Ambas as datas devem ser preenchidas");
        return false;
      }
      
      if (new Date(startDate) > new Date(endDate)) {
        setDateError("A data de início não pode ser posterior à data de término");
        return false;
      }
    } else {
      if (!singleDate) {
        setDateError("Selecione uma data");
        return false;
      }
    }
    
    // Definir as variáveis antes de usá-las
    const selectedStart = viewMode === 'multiple' ? startDate : singleDate;
    const selectedEnd = viewMode === 'multiple' ? endDate : singleDate;
    
    // Agora podemos usá-las com segurança
    const hasConflict = existingUnavailableDays.some(day => {
      const existingStart = new Date(day.DataInicio);
      const existingEnd = new Date(day.DataFim);
      const newStart = new Date(selectedStart);
      const newEnd = new Date(selectedEnd);
      
      return (
        (newStart >= existingStart && newStart <= existingEnd) ||
        (newEnd >= existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });
    
    if (hasConflict) {
      setDateError("Já existem dias indisponíveis configurados para este período");
      return false;
    }
    
    setDateError("");
    return true;
  };

  const handleNextStep = () => {
    if (validateDates()) {
      setStep(prev => prev + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validateDates()) {
      setLoading(false);
      return;
    }

    const proprietarioId = localStorage.getItem("proprietarioID");
    if (!proprietarioId) {
      setError("Usuário não identificado");
      setLoading(false);
      return;
    }

    const dates = viewMode === 'multiple' 
      ? { startDate, endDate }
      : { startDate: singleDate, endDate: singleDate };

    try {
      // Verifica duplicação no servidor
      const checkResponse = await fetch(`http://localhost:5000/quadra/verificar-indisponibilidade/${selectedQuadra}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          startDate: dates.startDate,
          endDate: dates.endDate
        })
      });

      if (!checkResponse.ok) {
        const errorData = await checkResponse.json();
        throw new Error(errorData.error || "Erro ao verificar disponibilidade");
      }

      const checkData = await checkResponse.json();
      if (checkData.existeIndisponibilidade) {
        throw new Error("Já existe um período de indisponibilidade para estas datas");
      }

      // Se não houver conflito, prossegue com o cadastro
      const response = await fetch("http://localhost:5000/quadra/dias-indisponiveis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          quadraId: selectedQuadra,
          startDate: dates.startDate,
          endDate: dates.endDate,
          motivo: motivo || "Indisponibilidade programada",
          proprietarioId: Number(proprietarioId)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao salvar configuração");
      }

      alert("Dias indisponíveis configurados com sucesso!");
      
      // Reset form
      setStartDate("");
      setEndDate("");
      setSingleDate("");
      setSelectedQuadra("");
      setSelectedQuadraInfo(null);
      setMotivo("");
      setExistingUnavailableDays([]);
      setStep(1);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao salvar dias indisponíveis:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDateToBR = (dateString) => {
    if (!dateString) return "";
    
    if (dateString.includes("T")) {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('pt-BR');
    }

    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    setDateError("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Configuração de Dias Indisponíveis</div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Etapa 1: Seleção da Quadra */}
        <div className={`${styles.containerCourts} ${step >= 1 ? styles.activeStep : ''}`}>
          <label className={styles.subTitle}>1. Selecione a Quadra</label>

          {loading && !quadras.length ? (
            <div>Carregando quadras...</div>
          ) : (
            <>
              <div className={styles.quadraSelect}>
                <select
                  value={selectedQuadra}
                  onChange={(e) => setSelectedQuadra(e.target.value)}
                  required
                  disabled={loading}
                >
                  <option value="">Selecione uma quadra</option>
                  {quadras.map((quadra) => (
                    <option key={quadra.ID_Quadra} value={quadra.ID_Quadra}>
                      {quadra.NomeQuadra} - {quadra.Bairro}
                    </option>
                  ))}
                </select>
              </div>

              {existingUnavailableDays.length > 0 && (
                <div className={styles.selectedPeriod}>
                  <h4>Dias indisponíveis existentes:</h4>
                  <ul className={styles.selectedSlotsList}>
                    {existingUnavailableDays.map((dia, index) => (
                      <li key={index}>
                        {dia.DataInicioFormatada || formatDateToBR(dia.DataInicio)} a{" "}
                        {dia.DataFimFormatada || formatDateToBR(dia.DataFim)} -{" "}
                        {dia.Motivo || "Sem motivo especificado"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedQuadra && (
                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    className={styles.nextButton}
                    onClick={() => setStep(2)}
                    disabled={loading}
                  >
                    Próximo
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Etapa 2: Seleção de Data(s) */}
        {step >= 2 && (
          <div className={`${styles.containerDate} ${step >= 2 ? styles.activeStep : ''}`}>
            <div className={styles.modeToggle}>
              <button
                type="button"
                className={`${styles.modeButton} ${viewMode === 'multiple' ? styles.activeMode : ''}`}
                onClick={() => toggleViewMode()}
                disabled={loading}
              >
                Múltiplos Dias
              </button>
              <button
                type="button"
                className={`${styles.modeButton} ${viewMode === 'single' ? styles.activeMode : ''}`}
                onClick={() => toggleViewMode()}
                disabled={loading}
              >
                Único Dia
              </button>
            </div>

            <label className={styles.subTitle}>
              2. Selecione {viewMode === 'multiple' ? 'o período' : 'o dia'} indisponível
            </label>

            {viewMode === 'multiple' ? (
              <div className={styles.dateRange}>
                <div>
                  <label>Data de Início:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    disabled={loading}
                    className={styles.dateInput}
                  />
                </div>

                <div>
                  <label>Data de Término:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    required
                    disabled={loading}
                    className={styles.dateInput}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.singleDate}>
                <label>Data Indisponível:</label>
                <input 
                  type="date"
                  value={singleDate}
                  onChange={(e) => setSingleDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  disabled={loading}
                  className={styles.dateInput}
                />
              </div>
            )}

            {dateError && <div className={styles.error}>{dateError}</div>}

            <div className={styles.singleDate}>
              <label>Motivo (opcional):</label>
              <input
                type="text"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ex: Manutenção, Feriado, etc."
                disabled={loading}
                className={styles.textInput}
              />
            </div>

            {((startDate && endDate) || singleDate) && (
              <div className={styles.selectedInfo}>
                <p>
                  {viewMode === 'multiple' ? (
                    <>
                      <strong>Período selecionado:</strong> de {formatDateToBR(startDate)} até {formatDateToBR(endDate)}
                    </>
                  ) : (
                    <>
                      <strong>Dia selecionado:</strong> {formatDateToBR(singleDate)}
                    </>
                  )}
                </p>
                {selectedQuadraInfo && (
                  <p>
                    <strong>Quadra selecionada:</strong> {selectedQuadraInfo.NomeQuadra} - {selectedQuadraInfo.Bairro}
                  </p>
                )}
                {motivo && <p><strong>Motivo:</strong> {motivo}</p>}
              </div>
            )}

            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.backButton}
                onClick={handleBack}
                disabled={loading}
              >
                Voltar
              </button>
              {((startDate && endDate) || singleDate) && (
                <button
                  type="button"
                  className={styles.nextButton}
                  onClick={handleNextStep}
                  disabled={loading}
                >
                  Próximo
                </button>
              )}
            </div>
          </div>
        )}

        {/* Etapa 3: Confirmação */}
        {step >= 3 && (
          <div className={`${styles.containerPrice} ${step >= 3 ? styles.activeStep : ''}`}>
            <label className={styles.subTitle}>3. Resumo de Dias Indisponíveis</label>

            <div className={styles.selectedInfo}>
              {selectedQuadraInfo && (
                <p>
                  <strong>Quadra:</strong> {selectedQuadraInfo.NomeQuadra} - {selectedQuadraInfo.Bairro}
                </p>
              )}
              <p>
                <strong>
                  {viewMode === 'multiple' ? 'Período de indisponibilidade:' : 'Dia indisponível:'}
                </strong>
                {viewMode === 'multiple'
                  ? `${formatDateToBR(startDate)} a ${formatDateToBR(endDate)}`
                  : formatDateToBR(singleDate)}
              </p>
              {motivo && <p><strong>Motivo:</strong> {motivo}</p>}
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.backButton}
                onClick={handleBack}
                disabled={loading}
              >
                Voltar
              </button>
              <input
                type="submit"
                value={loading ? "Salvando..." : "Salvar Configuração"}
                className={styles.submit}
                disabled={loading}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default GerenciadorDiasIndisponiveis;