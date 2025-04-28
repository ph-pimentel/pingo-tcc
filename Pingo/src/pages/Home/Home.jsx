import { useState, useEffect } from "react";
import Layout from "../../components/Layout/index";
import QuadraCard from "../../components/CourtCard/index";
import Filter from "../../components/Filter";
import { listarQuadras } from "../../api";
import { useNavigate } from "react-router-dom";  // Importar useNavigate

function Home() {
    const [quadras, setQuadras] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const navigate = useNavigate();  // Hook de navegação

    useEffect(() => {
        async function carregarQuadrasIniciais() {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            
            if (!token) {
                // Se não houver token, redireciona e PARA a execução da função
                window.location.href = "/";
                return; // <--- IMPORTANTE
            }
    
            try {
                const dados = await listarQuadras();
                setQuadras(dados);
            } catch (error) {
                console.error("Erro ao carregar quadras:", error);
            } finally {
                setCarregando(false);
            }
        }
    
        carregarQuadrasIniciais();
    }, [navigate]);

    const handleFiltrar = async (filtros) => {
        setCarregando(true);
        try {
            const dados = await listarQuadras(filtros);
            setQuadras(dados);
        } catch (error) {
            console.error("Erro ao filtrar:", error);
        } finally {
            setCarregando(false);
        }
    };

    if (carregando) {
        return (
            <Layout>
                <Filter onFilter={handleFiltrar} />
                <div className="carregando">Carregando quadras...</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Filter onFilter={handleFiltrar} />

            {quadras.map(quadra => (
                <QuadraCard
                    key={quadra.ID_Quadra}
                    quadra={quadra}
                />
            ))}
        </Layout>
    );
}

export default Home;
