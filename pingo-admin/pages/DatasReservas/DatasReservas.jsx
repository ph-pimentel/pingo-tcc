import { useState, useEffect } from "react";
import styles from "./DatasReservas.module.css";
import { getQuadrasProprietario } from "../../api";

const DatasReservas = () => {
  const [step, setStep] = useState(1);
  const [quadras, setQuadras] = useState([]);
  const [selectedQuadra, setSelectedQuadra] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [price, setPrice] = useState("");
  const [timeInterval, setTimeInterval] = useState("1h");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [existingConfigs, setExistingConfigs] = useState([]);
  const [occupiedSlots, setOccupiedSlots] = useState([]);

  // Busca as quadras do proprietário usando a função da API
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

  useEffect(() => {
    if (selectedQuadra) {
      const fetchExistingConfigs = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/quadra/horarios/${selectedQuadra}`
          );
          if (!response.ok) throw new Error("Erro ao buscar configurações");
          const data = await response.json();
          setExistingConfigs(data);
        } catch (err) {
          console.error("Erro ao buscar configurações:", err);
        }
      };
      fetchExistingConfigs();
    }
  }, [selectedQuadra]);

  // Função para buscar horários ocupados quando as datas mudam
  useEffect(() => {
    if (selectedQuadra && startDate && endDate) {
      const fetchOccupiedSlots = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/quadra/horarios/ocupados/${selectedQuadra}?startDate=${startDate}&endDate=${endDate}`
          );
          if (!response.ok) throw new Error("Erro ao buscar horários ocupados");
          const data = await response.json();
          setOccupiedSlots(data.occupiedSlots || []);
        } catch (err) {
          console.error("Erro ao buscar horários ocupados:", err);
        }
      };
      fetchOccupiedSlots();
    }
  }, [selectedQuadra, startDate, endDate]);

  //Gera horários das 0h até 11:00
  const generateTimeSlots = () => {
    const slots = [];
    const interval =
      timeInterval === "30min" ? 0.5 : timeInterval === "1h" ? 1 : 2;
    const totalIntervals = Math.ceil(24 / interval);

    for (let i = 0; i < totalIntervals; i++) {
      const startHour = Math.floor((i * interval) % 24);
      const startMinute = ((i * interval) % 1) * 60;
      const endHour = Math.floor(((i + 1) * interval) % 24);
      const endMinute = (((i + 1) * interval) % 1) * 60;

      const formatTime = (hour, minute) => {
        return `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
      };

      const startTime = formatTime(startHour, startMinute);
      const endTime = formatTime(endHour, endMinute);

      slots.push(`${startTime} às ${endTime}`);
    }

    return slots;
  };
  const timeSlots = generateTimeSlots();

  const handleTimeSlotToggle = (slot) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100);
  };

  //Manipulador de mudança do campo de preço
  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value ? (parseInt(value) / 100).toFixed(2) : "";
    setPrice(value);
  };

  // Formata o valor quando o campo perde o foco
  const handlePriceBlur = () => {
    if (price) {
      const numeric = parseFloat(price.replace(",", "."));
      if (!isNaN(numeric)) {
        setPrice(formatCurrency(numeric * 100));
      }
    }
  };

  // Remove formatação quando o campo ganha foco
  const handlePriceFocus = () => {
    if (price) {
      setPrice(price.replace(/\D/g, ""));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const proprietarioID = JSON.parse(localStorage.getItem("proprietarioID"));
    if (!proprietarioID) {
      setError("Usuário não identificado");
      setLoading(false);
      return;
    }

    // Converte o preço para centavos para enviar ao backend
    const priceValue = parseFloat(
      price.replace(/[^\d,]/g, "").replace(",", ".")
    );

    if (isNaN(priceValue)) {
      setError("Valor inválido");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/quadra/horarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          quadraId: selectedQuadra,
          startDate,
          endDate,
          timeSlots: selectedTimeSlots,
          price: priceValue,
          timeInterval,
          proprietarioId: Number(proprietarioID),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao salvar configuração");
      }

      alert("Horários configurados com sucesso!");
      // Reset form
      setStep(1);
      setSelectedQuadra("");
      setStartDate("");
      setEndDate("");
      setSelectedTimeSlots([]);
      setPrice("");
      setTimeInterval("1h");
      window.location.reload();
    } catch (err) {
      setError(err.message || "Erro ao salvar configuração");
      console.error("Erro ao salvar horários:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDateToBR = (dateString) => {
    if (!dateString) return "";

    // Se a data já estiver no formato ISO (com 'T')
    if (dateString.includes("T")) {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Retorna original se inválida

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    // Se estiver no formato 'YYYY-MM-DD'
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Configuração de Horários para Reserva</div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Etapa 1: Seleção da quadra */}
        <div
          className={`${styles.containerDate} ${
            step >= 1 ? styles.activeStep : ""
          }`}
        >
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

              {existingConfigs.length > 0 && (
                <div className={styles.existingConfigs}>
                  <h4>Configurações existentes para esta quadra:</h4>
                  <ul>
                    {existingConfigs.map((config) => (
                      <li key={config.ID_Config}>
                        {config.DataInicioFormatada ||
                          formatDateToBR(config.DataInicio)}{" "}
                        a{" "}
                        {config.DataFimFormatada ||
                          formatDateToBR(config.DataFim)}{" "}
                        -{config.Horarios.length} horário(s) -{" "}
                        {config.IntervaloFormatado ||
                          (config.Intervalo === "30min"
                            ? "30 minutos"
                            : config.Intervalo === "1h"
                            ? "1 hora"
                            : "2 horas")}
                        {config.Horarios && config.Horarios.length > 0 && (
                          <div className={styles.horariosList}>
                            Horários: {config.Horarios.join(", ")}
                          </div>
                        )}
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

        {/* Etapa 2: Seleção de Data */}
        {step >= 2 && (
          <div
            className={`${styles.stepContainer} ${
              step >= 2 ? styles.activeStep : ""
            }`}
          >
            <label className={styles.subTitle}>2. Selecione o Período</label>

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
                />
              </div>
            </div>

            {startDate && endDate && (
              <div className={styles.selectedPeriod}>
                <p>
                  Período selecionado: de {formatDateToBR(startDate)} até{" "}
                  {formatDateToBR(endDate)}
                </p>
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
              {startDate && endDate && (
                <button
                  type="button"
                  className={styles.nextButton}
                  onClick={() => setStep(3)}
                  disabled={loading}
                >
                  Próximo
                </button>
              )}
            </div>
          </div>
        )}

        {/* Etapa 3: Seleção de Horários */}
        {step >= 3 && (
          <div
            className={`${styles.stepContainer} ${
              step >= 3 ? styles.activeStep : ""
            }`}
          >
            <label className={styles.subTitle}>
              3. Selecione os Intervalos de Horários
            </label>
            <p>
              Período: {formatDateToBR(startDate)} a {formatDateToBR(endDate)}
            </p>

            <div className={styles.intervalButtons}>
              <button
                type="button"
                className={`${styles.intervalButton} ${
                  timeInterval === "30min" ? styles.activeInterval : ""
                }`}
                onClick={() => setTimeInterval("30min")}
                disabled={loading}
              >
                30 minutos
              </button>
              <button
                type="button"
                className={`${styles.intervalButton} ${
                  timeInterval === "1h" ? styles.activeInterval : ""
                }`}
                onClick={() => setTimeInterval("1h")}
                disabled={loading}
              >
                1 hora
              </button>
              <button
                type="button"
                className={`${styles.intervalButton} ${
                  timeInterval === "2h" ? styles.activeInterval : ""
                }`}
                onClick={() => setTimeInterval("2h")}
                disabled={loading}
              >
                2 horas
              </button>
            </div>

            <div className={styles.timesGrid}>
              {timeSlots.map((slot) => {
                const isOccupied = occupiedSlots.includes(slot);
                return (
                  <div
                    key={slot}
                    className={`${styles.timeOption} ${
                      isOccupied ? styles.occupied : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={`slot-${slot}`}
                      checked={selectedTimeSlots.includes(slot)}
                      onChange={() => !isOccupied && handleTimeSlotToggle(slot)}
                      disabled={loading || isOccupied}
                    />
                    <label htmlFor={`slot-${slot}`}>
                      {slot}
                      {isOccupied && (
                        <span className={styles.occupiedBadge}>Ocupado</span>
                      )}
                    </label>
                  </div>
                );
              })}
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
              {selectedTimeSlots.length > 0 && (
                <button
                  type="button"
                  className={styles.nextButton}
                  onClick={() => setStep(4)}
                  disabled={loading}
                >
                  Próximo
                </button>
              )}
            </div>
          </div>
        )}

        {/* Etapa 4: Definição de Preço */}
        {step >= 4 && (
          <div
            className={`${styles.stepContainer} ${
              step >= 4 ? styles.activeStep : ""
            }`}
          >
            <label className={styles.subTitle}>4. Defina o Valor</label>

            <div className={styles.selectedInfo}>
              <p>
                <strong>Quadra:</strong>{" "}
                {
                  quadras.find((q) => q.ID_Quadra === selectedQuadra)
                    ?.NomeQuadra
                }
              </p>
              <p>
                <strong>Período:</strong> {formatDateToBR(startDate)} a{" "}
                {formatDateToBR(endDate)}
              </p>
              <p>
                <strong>Intervalo:</strong>{" "}
                {timeInterval === "30min"
                  ? "30 minutos"
                  : timeInterval === "1h"
                  ? "1 hora"
                  : "2 horas"}
              </p>
              <p>
                <strong>Horários selecionados:</strong>
              </p>
              <ul className={styles.selectedSlotsList}>
                {selectedTimeSlots.map((slot) => (
                  <li key={slot}>{slot}</li>
                ))}
              </ul>
              <p>
                <strong>Total de intervalos:</strong> {selectedTimeSlots.length}
              </p>
            </div>

            <div className={styles.priceInput}>
              <label>Valor por intervalo:</label>
              <input
                type="text"
                placeholder="R$ 0,00"
                value={price}
                onChange={handlePriceChange}
                onBlur={handlePriceBlur}
                onFocus={handlePriceFocus}
                required
                disabled={loading}
              />
              {!price && (
                <small className={styles.errorText}>Digite um valor</small>
              )}
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
                className={styles.nextButton}
                disabled={loading}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default DatasReservas;
