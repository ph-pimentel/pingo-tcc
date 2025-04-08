import { Link } from 'react-router-dom'
import styles from './ChartBox.module.css'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import PropTypes from 'prop-types';


const ChartBox = ({ color, icon, title, dataKey, number, percentage, chartData, url}) => {
  return (
    
    <div className={styles.chartBox}>
       <div className={styles.boxInfo}>
        <div className={styles.title}>
            <img src={icon} alt=''/>
            <span>{title}</span>
        </div>
        <h1>{number}</h1>
        <Link to={url} style={{color: color}}>Ver mais</Link>
       </div>
       <div className={styles.chartInfo}>
            <div className={styles.chart}>
            <ResponsiveContainer width="99%" height="100%">
            <LineChart data={chartData} >
              <Tooltip
                contentStyle={{ background: 'transparent', border: 'none'}}
                labelStyle={{ display: 'none'}}
                position={{x: 10, y: 90}}
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
                <span className={styles.percentage} style={{color: percentage < 0 ? "red" : "limegreen"}}>{percentage}%</span>
                <span className={styles.duration}>esse mês</span>
            </div>
       </div>
    </div>
  )
}

ChartBox.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  percentage: PropTypes.number.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  url: PropTypes.string.isRequired,
};



export default ChartBox