import styles from './GerenciadorDeQuadras.module.css'
import { format, parseISO, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {useState, useEffect} from 'react'

const GerenciadorDeQuadras = () => {

    const [diasIndisponiveis, setDiasIndisponiveis] = useState([
        { id: 1, quadras: [1, 2], inicio: '2023-10-10', fim: '2023-10-12', tipo: 'periodo' },
        { id: 2, quadras: [3], inicio: '2023-11-15', fim: null, tipo: 'unico' },
        { id: 3, quadras: [4], inicio: '2023-12-20', fim: '2023-12-22', tipo: 'periodo' },
        { id: 4, quadras: [1, 3], inicio: '2023-09-01', fim: null, tipo: 'unico' },
        { id: 5, quadras: [2], inicio: '2023-11-01', fim: '2023-11-05', tipo: 'periodo' },
        { id: 6, quadras: [1, 4], inicio: '2023-12-24', fim: null, tipo: 'unico' },
        { id: 7, quadras: [3, 4], inicio: '2023-10-30', fim: '2023-11-02', tipo: 'periodo' },
        { id: 8, quadras: [2, 3], inicio: '2023-12-15', fim: null, tipo: 'unico' }
      ]);

    const [reservas, setReservas] = useState([
        { id: 1, quadras: [1], inicio: '2023-10-01', fim: '2023-10-31', horarios: ['08:00 às 09:00', '10:00 às 11:00'], valor: 10000 },
        { id: 2, quadras: [2, 4], inicio: '2023-11-01', fim: '2023-11-30', horarios: ['14:00 às 15:00'], valor: 15000 } ,
        { id: 3, quadras: [3], inicio: '2023-12-01', fim: '2023-12-31', horarios: ['09:00 às 10:00', '16:00 às 17:00'], valor: 12000 },
        { id: 4, quadras: [1, 2], inicio: '2023-09-15', fim: '2023-09-30', horarios: ['11:00 às 12:00'], valor: 8000 },
        { id: 5, quadras: [4], inicio: '2023-11-15', fim: '2023-11-20', horarios: ['13:00 às 14:00', '15:00 às 16:00'], valor: 9000 },
        { id: 6, quadras: [1, 3, 4], inicio: '2023-12-10', fim: '2023-12-15', horarios: ['10:00 às 11:00'], valor: 11000 },
        { id: 7, quadras: [2], inicio: '2023-10-15', fim: '2023-10-20', horarios: ['17:00 às 18:00'], valor: 7500 },
        { id: 8, quadras: [3, 4], inicio: '2023-11-25', fim: '2023-11-30', horarios: ['08:00 às 09:00', '18:00 às 19:00'], valor: 13000 }
    ]);

    // Estados para paginação
    const [paginaAtualIndisponiveis, setPaginaAtualIndisponiveis] = useState(1);
    const [paginaAtualReservas, setPaginaAtualReservas] = useState(1);
    const itensPorPagina = 7;

    // Estados para edição
    const [activeTab, setActiveTab] = useState('indisponiveis'); // ou 'reservas'
    const [editando, setEditando] = useState(null); //ID do item em edição
    const [modalAberto, setModalAberto] = useState(false);
    const [erros, setErros] = useState({});


    // Formúlario de edição
    const [formulario, setFormulario] = useState({
        quadras: [],
        inicio: '',
        fim: '',
        horarios: [],
        valor: ''
    });

    // Calcula dados paginados
    const itensIndisponiveisPaginados = diasIndisponiveis.slice(
      (paginaAtualIndisponiveis - 1) * itensPorPagina,
      paginaAtualIndisponiveis * itensPorPagina
    );

    const itensReservasPaginados = reservas.slice(
      (paginaAtualReservas - 1) * itensPorPagina,
      paginaAtualReservas * itensPorPagina
    );

    //Funções de paginação
    const mudarPaginaIndisponiveis = (pagina) => {
      setPaginaAtualIndisponiveis(pagina);
    };

    const mudarPaginaReservas = (pagina) => {
      setPaginaAtualReservas(pagina);
    };

    // Formatação de dados
    const formatarData = (data) => {
      if (!data) return '-';
      return format(parseISO(data), 'dd/MM/yyyy', { locale: ptBR });
    };

    const formatarMoeda = (valor) => {
      if (!valor) return '-';
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(valor / 100);
    };

    const nomeQuadra = (id) => {
      const quadras = { 1: 'Quadra 1', 2: 'Quadra 2', 3: 'Quadra 3', 4: 'Quadra 4' };
      return quadras[id] || id;
    };

    //Validação de formulário
    const validarFormulario = () => {
      const novosErros = {};
      const hoje = new Date();

      if (formulario.quadras.length === 0) {
        novosErros.quadras = 'Selecione pelo menos uma quadra';
      }

      if (!formulario.inicio){
        novosErros.inicio = 'Data de início é obrigatória';
      } else if (isBefore(parseISO(formulario.inicio), hoje)){
        novosErros.inicio = 'Data não pode ser anterior a hoje';
      }

      if (activeTab === 'reservas') {
        if (!formulario.fim) {
          novosErros.fim = 'Data de término é obrigatória';
        } else if (isNaN(formulario.valor) || Number(formulario.valor) <= 0) {
          novosErros.valor = 'Valor deve ser um número positivo';
        }
      }

      setErros(novosErros);
      return Object.keys(novosErros).length === 0;
    };

    // Carrega dados do item para edição
    const abrirEdicao = (item) => {
        setEditando(item.id);
        setFormulario({
            quadras: item.quadras,
            inicio: item.inicio,
            fim: item.fim || '',
            horarios: item.horarios || [],
            valor: item.valor ? (item.valor / 100).toFixed(2) : ''
        });
        setErros({});
        setModalAberto(true);
    };

    const salvarEdicao = () => {
      if (!validarFormulario()) return;

      const dadosAtualizados = {
        ...formulario,
        valor: activeTab === 'reservas' ? Math.round(Number(formulario.valor) * 100) : null
      };

        if (activeTab === 'indisponiveis') {
            setDiasIndisponiveis(diasIndisponiveis.map(item => 
                item.id === editando ? { ...item, ...dadosAtualizados } : item
            ));
        } else {
            setReservas(reservas.map(item => 
                item.id === editando ? { ...item, ...dadosAtualizados } : item
            ));
        }
        setModalAberto(false);
        setEditando(null);
    };

    const handleValorChange = (e) => {
      const valor = e.target.value.replace(/\D/g, '');
      const valorFormatado = (Number(valor) / 100).toFixed(2);
      setFormulario({...formulario, valor: valorFormatado});
    };

    // Deleta registro
    const deletarRegistro = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este registro?')) {
            if (activeTab === 'indisponiveis') {
                setDiasIndisponiveis(diasIndisponiveis.filter(item => item.id !== id));
            } else {
                setReservas(reservas.filter(item => item.id !== id));
            }
        }
    };


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
          className={`${styles.tab} ${activeTab === 'reservas' ? styles.ativo : ''}`}
          onClick={() => setActiveTab('reservas')}
        >
          Dias/Horas de Reserva
        </button>
      </div>

      {/* Tabela de Dias Indisponíveis */}
      {activeTab === 'indisponiveis' && (
        <>
        <div className={styles.tabelaContainer}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Quadras</th>
                <th>Período</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {itensIndisponiveisPaginados.map(item => (
                <tr key={item.id}>
                  <td>{item.quadras.map(nomeQuadra).join(', ')}</td>
                  <td>
                    {item.tipo === 'periodo' 
                      ? `${formatarData(item.inicio)} a ${formatarData(item.fim)}`
                      : formatarData(item.inicio)}
                  </td>
                  <td>{item.tipo === 'periodo' ? 'Período' : 'Dia único'}</td>
                  <td>
                    <div className={styles.buttons}>
                    <button 
                      className={styles.botaoEditar}
                      onClick={() => abrirEdicao(item)}
                    >
                      <img src='../../src/assets/table/action.svg' />
                    </button>
                    <button 
                      className={styles.botaoDeletar}
                      onClick={() => deletarRegistro(item.id)}
                    >
                      <img src='../../src/assets/table/delete.svg' />
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {diasIndisponiveis.length > itensPorPagina && (
          <div className={styles.paginacao}>
            {Array.from({length: Math.ceil(diasIndisponiveis.length / itensPorPagina)}).map ((_, index) =>(
              <button
                key={index}
                className={`${styles.pagina} ${paginaAtualIndisponiveis === index + 1 ? styles.paginaAtiva : ''}`}
                onClick={() => mudarPaginaIndisponiveis(index + 1)}
                >
                  {index + 1}
                </button>
            ))}
            </div>
        )}
        </>
      )}

      {/* Tabela de Dias/Horas de Reserva */}
      {activeTab === 'reservas' && (
        <>
        <div className={styles.tabelaContainer}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Quadras</th>
                <th>Período</th>
                <th>Horários</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {itensReservasPaginados.map(item => (
                <tr key={item.id}>
                  <td>{item.quadras.map(nomeQuadra).join(', ')}</td>
                  <td>{formatarData(item.inicio)} a {formatarData(item.fim)}</td>
                  <td>{item.horarios.join(', ')}</td>
                  <td>{formatarMoeda(item.valor)}</td>
                  <td>
                    <div className={styles.buttons}>
                    <button 
                      className={styles.botaoEditar}
                      onClick={() => abrirEdicao(item)}
                    >
                      <img src='../../src/assets/table/action.svg' />
                    </button>
                    <button 
                      className={styles.botaoDeletar}
                      onClick={() => deletarRegistro(item.id)}
                    >
                      <img src='../../src/assets/table/delete.svg' />
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {reservas.length > itensPorPagina && (
          <div className={styles.paginacao}>
            {Array.from({length: Math.ceil(reservas.length / itensPorPagina)}).map ((_, index) =>(
              <button
                key={index}
                className={`${styles.pagina} ${paginaAtualIndisponiveis === index + 1 ? styles.paginaAtiva : ''}`}
                onClick={() => mudarPaginaReservas(index + 1)}
                >
                  {index + 1}
              </button>
        ))}
          </div>
        )}
          </>
      )}

      {/* Modal de Edição */}
      {modalAberto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Editar Registro</h2>
            
            <div className={styles.formGroup}>
              <label>Quadras:</label>
              <div className={styles.quadrasCheckbox}>
                {[1, 2, 3, 4].map(id => (
                  <label key={id}>
                    <input
                      type="checkbox"
                      checked={formulario.quadras.includes(id)}
                      onChange={(e) => {
                        const novasQuadras = e.target.checked
                          ? [...formulario.quadras, id]
                          : formulario.quadras.filter(q => q !== id);
                        setFormulario({ ...formulario, quadras: novasQuadras });
                      }}
                    />
                    {nomeQuadra(id)}
                  </label>
                ))}
              </div>
              {erros.quadras && <span className={styles.erro}>{erros.quadras}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Data de Início:</label>
              <input
                type="date"
                value={formulario.inicio}
                min={format(new Date(), 'yyyy-MM-dd')}
                onChange={(e) => setFormulario({ ...formulario, inicio: e.target.value })}
                lang="pt-BR"
              />
              {erros.inicio && <span className={styles.erro}>{erros.inicio}</span>}
            </div>

            {activeTab === 'reservas' && (
              <>
                <div className={styles.formGroup}>
                  <label>Data de Término:</label>
                  <input
                    type="date"
                    value={formulario.fim}
                    min={formulario.inicio || format(new Date(), 'yyyy-MM-dd')}
                    onChange={(e) => setFormulario({ ...formulario, fim: e.target.value })}
                    lang="pt-BR"
                  />
                  {erros.fim && <span className={styles.erro}>{erros.fim}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Valor:</label>
                  <div className={styles.inputMoeda}>
                    <span>R$</span>
                    <input
                    type="text"
                    value={formulario.valor}
                    onChange={handleValorChange}
                    placeholder="0,00"
                  />
                  </div>
                  {erros.valor && <span className={styles.erro}>{erros.valor}</span>}
                </div>
              </>
            )}

            <div className={styles.modalBotoes}>
              <button 
                className={styles.botaoCancelar}
                onClick={() => setModalAberto(false)}
              >
                Cancelar
              </button>
              <button 
                className={styles.botaoSalvar}
                onClick={salvarEdicao}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciadorDeQuadras