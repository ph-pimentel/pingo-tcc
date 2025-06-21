import styles from './GerenciadorDeQuadras.module.css'
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState, useEffect } from 'react'

const GerenciadorDeQuadras = () => {
    const [diasIndisponiveis, setDiasIndisponiveis] = useState([]);
    const [horariosQuadra, setHorariosQuadra] = useState([]);
    const [activeTab, setActiveTab] = useState('indisponiveis');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Estados para paginação
    const [paginaAtualIndisponiveis, setPaginaAtualIndisponiveis] = useState(1);
    const [paginaAtualHorarios, setPaginaAtualHorarios] = useState(1);
    const itensPorPagina = 7;

    const fetchDiasIndisponiveis = async () => {
        try {
            const proprietarioID = localStorage.getItem("proprietarioID");
            const response = await fetch(`http://localhost:5000/quadra/dias-indisponiveis-admin?proprietarioId=${proprietarioID}`);
            
            if (!response.ok) {
                throw new Error(`Erro ${response.status} ao buscar dias indisponíveis`);
            }
            return await response.json();
        } catch (err) {
            console.error("Erro ao buscar dias indisponíveis:", err);
            return [];
        }
    };

    const fetchHorariosQuadra = async () => {
        try {
            const proprietarioID = localStorage.getItem("proprietarioID");
            const response = await fetch(`http://localhost:5000/quadra/horarios-admin?proprietarioId=${proprietarioID}`);
            
            if (!response.ok) {
                throw new Error(`Erro ${response.status} ao buscar horários`);
            }
            const data = await response.json();
            
            // Formata os horários para exibição
            return data.map(item => ({
                ...item,
                Horarios: Array.isArray(item.Horarios) ? item.Horarios : []
            }));
        } catch (err) {
            console.error("Erro ao buscar horários:", err);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [indisponiveis, horarios] = await Promise.all([
                    fetchDiasIndisponiveis(),
                    fetchHorariosQuadra()
                ]);

                setDiasIndisponiveis(indisponiveis);
                setHorariosQuadra(horarios);
            } catch (err) {
                console.error("Erro ao carregar dados:", err);
                setError(err.message || "Erro ao carregar dados");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calcula dados paginados
    const itensIndisponiveisPaginados = diasIndisponiveis.slice(
        (paginaAtualIndisponiveis - 1) * itensPorPagina,
        paginaAtualIndisponiveis * itensPorPagina
    );

    const itensHorariosPaginados = horariosQuadra.slice(
        (paginaAtualHorarios - 1) * itensPorPagina,
        paginaAtualHorarios * itensPorPagina
    );

    // Formatação de dados
    const formatarData = (data) => {
        if (!data) return '-';
        try {
            return format(parseISO(data), 'dd/MM/yyyy', { locale: ptBR });
        } catch {
            return data;
        }
    };

    // Deleta registro
    const deletarRegistro = async (id, tipo) => {
        if (!window.confirm('Tem certeza que deseja excluir este registro?')) {
            return;
        }

        setLoading(true);
        try {
            const proprietarioID = localStorage.getItem("proprietarioID");
            if (!proprietarioID) {
                throw new Error("Usuário não identificado");
            }

            let endpoint = tipo === 'indisponiveis' 
                ? `http://localhost:5000/quadra/dias-indisponiveis/${id}`
                : `http://localhost:5000/quadra/horarios/${id}`;

                const response = await fetch(endpoint, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ proprietarioId: proprietarioID })
                });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Erro ao deletar registro`);
            }

            // Atualiza o estado local
            if (tipo === 'indisponiveis') {
                setDiasIndisponiveis(diasIndisponiveis.filter(item => item.ID_Indisponibilidade !== id));
            } else {
                setHorariosQuadra(horariosQuadra.filter(item => item.ID_Config !== id));
            }
        } catch (err) {
            console.error("Erro ao deletar:", err);
            setError(err.message || "Erro ao deletar registro");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className={styles.container}>Carregando...</div>;
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>Erro: {error}</div>
                <button 
                    className={styles.botaoRecarregar}
                    onClick={() => window.location.reload()}
                >
                    Tentar novamente
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Gerenciar Histórico</h1>
            
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'indisponiveis' ? styles.ativo : ''}`}
                    onClick={() => setActiveTab('indisponiveis')}
                >
                    Dias Indisponíveis
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'horarios' ? styles.ativo : ''}`}
                    onClick={() => setActiveTab('horarios')}
                >
                    Horários da Quadra
                </button>
            </div>

            {/* Tabela de Dias Indisponíveis */}
            {activeTab === 'indisponiveis' && (
                <>
                    <div className={styles.tabelaContainer}>
                        <table className={styles.tabela}>
                            <thead>
                                <tr>
                                    <th>Quadra</th>
                                    <th>Período</th>
                                    <th>Motivo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itensIndisponiveisPaginados.map(item => (
                                    <tr key={item.ID_Indisponibilidade}>
                                        <td>{item.NomeQuadra || `Quadra ${item.ID_Quadra}`}</td>
                                        <td>
                                            {item.DataInicio === item.DataFim
                                                ? formatarData(item.DataInicio)
                                                : `${formatarData(item.DataInicio)} a ${formatarData(item.DataFim)}`}
                                        </td>
                                        <td>{item.Motivo || '-'}</td>
                                        <td>
                                            <button 
                                                className={styles.botaoDeletar}
                                                onClick={() => deletarRegistro(item.ID_Indisponibilidade, 'indisponiveis')}
                                                disabled={loading}
                                            >
                                                <img src='../../src/assets/table/delete.svg' alt="Deletar" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {itensIndisponiveisPaginados.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className={styles.semRegistros}>
                                            Nenhum dia indisponível cadastrado
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {diasIndisponiveis.length > itensPorPagina && (
                        <div className={styles.paginacao}>
                            {Array.from({length: Math.ceil(diasIndisponiveis.length / itensPorPagina)}).map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.pagina} ${paginaAtualIndisponiveis === index + 1 ? styles.paginaAtiva : ''}`}
                                    onClick={() => setPaginaAtualIndisponiveis(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Tabela de Horários da Quadra */}
            {activeTab === 'horarios' && (
                <>
                    <div className={styles.tabelaContainer}>
                        <table className={styles.tabela}>
                            <thead>
                                <tr>
                                    <th>Quadra</th>
                                    <th>Período</th>
                                    <th>Horários</th>
                                    <th>Preço</th>
                                    <th>Intervalo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itensHorariosPaginados.map(item => (
                                    <tr key={item.ID_Config}>
                                        <td>{item.NomeQuadra || `Quadra ${item.ID_Quadra}`}</td>
                                        <td>
                                            {formatarData(item.DataInicio)} a {formatarData(item.DataFim)}
                                        </td>
                                        <td>
                                            {item.Horarios.join(', ')}
                                        </td>
                                        <td>{item.PrecoFormatado || formatarMoeda(item.Preco)}</td>
                                        <td>
                                            {item.Intervalo === '30min' ? '30 minutos' : 
                                             item.Intervalo === '1h' ? '1 hora' : 
                                             item.Intervalo === '2h' ? '2 horas' : item.Intervalo}
                                        </td>
                                        <td>
                                            <button 
                                                className={styles.botaoDeletar}
                                                onClick={() => deletarRegistro(item.ID_Config, 'horarios')}
                                                disabled={loading}
                                            >
                                                <img src='../../src/assets/table/delete.svg' alt="Deletar" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {itensHorariosPaginados.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className={styles.semRegistros}>
                                            Nenhum horário cadastrado
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {horariosQuadra.length > itensPorPagina && (
                        <div className={styles.paginacao}>
                            {Array.from({length: Math.ceil(horariosQuadra.length / itensPorPagina)}).map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.pagina} ${paginaAtualHorarios === index + 1 ? styles.paginaAtiva : ''}`}
                                    onClick={() => setPaginaAtualHorarios(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default GerenciadorDeQuadras;