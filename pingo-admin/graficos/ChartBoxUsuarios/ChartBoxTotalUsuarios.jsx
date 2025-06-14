import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styles from './ChartBoxTotalUsuarios.module.css'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { getTotalUsuariosData } from '../../api';


const ChartBoxTotalUsuarios = ({ color, icon, title, dataKey, url}) => {
    const [data, setData] = useState({
        totalUsuarios: 0,
        porcentagem: 0,
        chartData: []
    })
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTotalUsuariosData();
                setData({
                  totalUsuarios: response.totalUsuarios,
                    porcentagem: response.porcentagem,
                    chartData: response.chartData.map(item => ({
                        name: item.name.substring(0, 3), // Coleta as três primeiras letras do mês
                        [dataKey]: item.usuarios
                    }))
                });
            } catch (err) {
                console.error("Erro ao carregar dados:", err);
                setError("Erro ao carregar dados dos usuários");

                //Dados de fallback (se der erro)
                setData({
                    totalUsuarios: 0,
                    porcentagem: 0,
                    chartData: [
                      { name: "Jan", [dataKey]: 0 },
                      { name: "Fev", [dataKey]: 0 },
                      { name: "Mar", [dataKey]: 0 }
                    ]
                  });          
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dataKey]);

    if (loading) {
        return <div className={styles.chartBox}>Carregando dados...</div>;
      }
    
      if (error) {
        return <div className={styles.chartBox}>{error}</div>;
      }    

    return (
    
    <div className={styles.chartBox}>
       <div className={styles.boxInfo}>
        <div className={styles.title}>
            <img src={icon} alt=''/>
            <span>{title}</span>
        </div>
        <h1>{data.totalUsuarios}</h1>
        <Link to={url} style={{color: color}}>Ver mais</Link>
       </div>
       <div className={styles.chartInfo}>
            <div className={styles.chart}>
            <ResponsiveContainer width="99%" height="100%">
            <LineChart data={data.chartData} className={styles.line}>
              <Tooltip
                contentStyle={{ background: 'transparent', border: 'none'}}
                labelStyle={{ display: 'none'}}
              />
                <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color}
                strokeWidth={2} 
                dot={true}
                />
            </LineChart>
            </ResponsiveContainer>
            </div>
            <div className={styles.texts}>
                <span className={styles.percentage} style={{color: data.porcentagem < 0 ? "red" : "limegreen"}}>{data.porcentagem}%</span>
                <span className={styles.duration}>esse mês</span>
            </div>
       </div>
    </div>
  )
}



export default ChartBoxTotalUsuarios