import DataTable from '../../components/DataTable/DataTable';
import styles from './Reserva.module.css';
import { useState, useEffect } from 'react';
import { getAgendamentosProprietario, obterUsuario } from '../../api';

const columns = [
    { 
        field: 'id',
        headerName: 'ID', 
        width: 70 
    },
    {
        field: 'name',
        type: 'string',
        headerName: 'Cliente',
        width: 150,
    }, 
    {
        field: 'quadra',
        type: 'string',
        headerName: 'Quadra',
        width: 150,
    },
    {
        field: 'dia',
        headerName: 'Dia',
        width: 100,
        type: "string",
    },
    {
        field: 'horario',
        headerName: 'Horário',
        width: 150,
        renderCell: (params) => (
            <span>
                {params.row.horario_inicio} - {params.row.horario_fim}
            </span>
        ),
    },
    {
        field: 'Preco',
        headerName: 'Valor',
        width: 100,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 120,
        renderCell: (params) => {
            let color;
            switch(params.row.status.toLowerCase()) {
                case 'pago': color = 'green'; break;
                case 'pendente': color = 'orange'; break;
                case 'falhou': color = 'red'; break;
                default: color = 'gray';
            }
            return <span style={{ color, fontWeight: 'bold' }}>{params.row.status}</span>;
        },
    },
];

const Reserva = () => {
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const usuario = obterUsuario();
                if (!usuario) {
                    throw new Error('Usuário não autenticado');
                }

                const data = await getAgendamentosProprietario(usuario.ID_Usuario);
                setAgendamentos(data);
            } catch (err) {
                console.error("Erro ao carregar agendamentos:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAgendamentos();
    }, []);

    if (loading) return <div className={styles.loading}>Carregando agendamentos...</div>;
    if (error) return <div className={styles.error}>Erro: {error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Reservas</h1>
            </div>
            
            <div className={styles.tableContainer}>
                <DataTable 
                    slug="reservas" 
                    columns={columns} 
                    rows={agendamentos}
                    showActions={false}
                />
            </div>
        </div>
    );
};

export default Reserva;