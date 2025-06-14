import { useState } from "react";
import styles from "./GerenciadorDiasIndisponiveis.module.css";

const GerenciadorDiasIndisponiveis = () => {
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCourts, setSelectedCourts] = useState([]);
  const [singleDate, setSingleDate] = useState("");
  const [viewMode, setViewMode] = useState('multiple') // 'multiple' or 'single
  
  
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'multiple' ? 'single' : 'multiple');
    // Limpa as seleções ao alterar
    setStartDate("");
    setEndDate("");
    setSingleDate("");
  };

  const courts = [
    { id: 1, name: 'Quadra 1' },
    { id: 2, name: 'Quadra 2' },
    { id: 3, name: 'Quadra 3' },
    { id: 4, name: 'Quadra 4' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    //Envia para o BackEnd

    const dates = viewMode === 'multiple'
    ? { startDate, endDate}
    : {singleDate};

    console.log({
      ...dates,
      selectedCourts,
      viewMode,
    });
    //Reseta o form ou mostra mensagem de sucesso
    alert("Configuração salva com sucesso!");
  };

  const formatDateToBR = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };


  const handleCourtToggle = (courtId) => {
    setSelectedCourts(prev => 
      prev.includes(courtId)
      ? prev.filter(id => id !== courtId)
      : [...prev, courtId]
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Configuração de Dias Indisponíveis</div>

    <form onSubmit={handleSubmit} className={styles.form}>
              {/* Etapa 1: Seleção de Quadras */}
              <div className={`${styles.containerCourts} ${step >= 1 ? styles.activeStep : ''}`}>
                <label className={styles.subTitle}>1. Selecione as Quadras</label>
    
                <div className={styles.courtsGrid}>
                  {courts.map(court => (
                    <div key={court.id} className={styles.courtOption}>
                      <input
                        type="checkbox"
                        id={`court-${court.id}`}
                        checked={selectedCourts.includes(court.id)}
                        onChange={() => handleCourtToggle(court.id)}
                      />
                      <label htmlFor={`court-${court.id}`}>{court.name}</label>
                    </div>
                  ))}
                </div>
    
                {selectedCourts.length > 0 && (
                <button 
                  type="button"
                  className={styles.nextButton}
                  onClick={() => setStep(2)}
                >
                  Próximo
                </button>
              )}
            </div>

        {/* Etapa 2: Seleção de Data(s) */}
        {step >= 2 && (
          <div className={`${styles.containerDate} ${step >= 2 ? styles.activeStep : ''}`}>
            <div className={styles.modeSelector}>
              <button
                type="button"
                className={`${styles.modeButton} ${viewMode === 'multiple' ? styles.activeMode : ''}`}
                onClick={() => toggleViewMode()}
              >
                Múltiplos Dias
              </button>
              <button
                type="button"
                className={`${styles.modeButton} ${viewMode === 'single' ? styles.activeMode : ''}`}
                onClick={() => toggleViewMode()}
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
                />
              </div>
            )} 

            {(startDate && endDate) || singleDate ? (
              <div className={styles.selectedPeriod}>
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
                <p>
                  <strong>Quadras selecionadas:</strong> {courts.filter(c => selectedCourts.includes(c.id)).map(c => c.name).join(', ')}
                </p>
              </div>
            ) : null}

            {((startDate && endDate) || singleDate) && (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => setStep(3)}
              >
                Próximo
              </button>
            )}
          </div>
        )}

        {/* Etapa 2: Confirmação */}
        {step >= 3 && (
          <div
            className={`${styles.containerPrice} ${
              step >= 3 ? styles.activeStep : ""
            }`}
          >
            <label className={styles.subTitle}>
              3. Resumo de Dias Indisponíveis
            </label>

            <div className={styles.selectedInfo}>
              <p>
                <strong>
                  {viewMode === 'multiple'
                    ? 'Período de indisponibilidade:'
                    : 'Dia indisponível:'}
                </strong>
                {viewMode === 'multiple'
                  ? `${formatDateToBR(startDate)} a ${formatDateToBR(endDate)}`
                  : formatDateToBR(singleDate)}
              </p>
            </div>
            
            <input
              type="submit"
              value="Salvar Configuração"
              className={styles.submit}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default GerenciadorDiasIndisponiveis;
