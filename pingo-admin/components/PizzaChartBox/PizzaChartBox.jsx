import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import styles from "./PizzaChartBox.module.css";
import { useEffect, useState } from "react";
import { getUsuariosPorTipo } from "../../api";

const PizzaChartBox = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await getUsuariosPorTipo();
        setData(chartData);
      } catch (err) {
        console.error("Erro ao carregar dados do gráfico:", err);
        setError("Erro ao carregar dados");
        setData([
          { name: "Usuarios", value: 0, color: "#297EFF" },
          { name: "Proprietarios", value: 0, color: "green" },
          { name: "Admins", value: 0, color: "yellow" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.pizzaChartBox}>Carregando dados...</div>;
  }

  if (error) {
    return <div className={styles.pizzaChartBox}>{error}</div>;
  }

  return (
    <div className={styles.pizzaChartBox}>
        <h1>Total Usuários</h1>
        <div className={styles.chart}>
        <ResponsiveContainer width="99%" height={300}>
        <PieChart>
            <Tooltip
                contentStyle={{background: "white", borderRadius: "5px"}}
            />
        <Pie
          data={data}
          innerRadius={"40%"}
          outerRadius={"70%"}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((item) => (
            <Cell 
            key={item.name} 
            fill={item.color} 
            stroke="grey" 
            strokeWidth={0.5}/>
          ))}
        </Pie>
      </PieChart>
        </ResponsiveContainer>
    </div>
          <div className={styles.options}>
            {data.map((item) => (
                <div className={styles.option} key={item.name}>
                    <div className={styles.title}>
                        <div className={styles.dot} style={{backgroundColor: item.color}}/>
                        <span>{item.name}</span>
                    </div>
                    <span>{item.value}</span>
                </div>
            ))}
          </div>
    </div>
  )
}

export default PizzaChartBox