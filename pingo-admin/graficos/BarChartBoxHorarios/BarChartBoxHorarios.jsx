import styles from './BarChartBoxHorarios.module.css'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis  } from 'recharts'
import PropTypes from 'prop-types';

const BarChartBoxHorarios = ({title, icon, chartData, dataKey, color}) => {
  return (
    <div className={styles.barChartBox}>
      <div className={styles.header}>
         <img src={icon} alt=''/>
        <h1>{title}</h1>
      </div>
        <div className={styles.chart}>
        <ResponsiveContainer width="99%" height={300}>
            <BarChart width={150} height={40} data={chartData}>
            <XAxis dataKey="name" />
                <Tooltip
                    contentStyle={{ background: "white", borderRadius: "5px"}}
                    labelStyle={{ display: "none"}}
                />
            <Bar dataKey={dataKey} fill={color} />
            </BarChart>
        </ResponsiveContainer>
        </div>
    </div>
  )
}

BarChartBoxHorarios.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default BarChartBoxHorarios