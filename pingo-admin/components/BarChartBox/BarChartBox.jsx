import styles from './BarChartBox.module.css'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis  } from 'recharts'
import PropTypes from 'prop-types';

const BarChartBox = ({title, icon, chartData, dataKey, color}) => {
  return (
    <div className={styles.barChartBox}>
        <img src={icon} alt=''/>
        <h1>{title}</h1>
        <div className={styles.chart}>
        <ResponsiveContainer width="99%" height={200}>
            <BarChart width={150} height={40} data={chartData}>
            <XAxis dataKey="name" />
                <Tooltip
                    contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
                    labelStyle={{ display: "none"}}
                    cursor={{fill:"none"}}
                />
            <Bar dataKey={dataKey} fill={color} />
            </BarChart>
        </ResponsiveContainer>
        </div>
    </div>
  )
}

BarChartBox.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default BarChartBox