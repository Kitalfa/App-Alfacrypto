import useAxios from '../services/useAxios';
import { Col, Row, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import Loader from './Loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const HistoryChart = ({ coinName, currentPrice, coinHistory }) => {
  const { response } = useAxios(
    `coins/${coinName.toLowerCase()}/market_chart?vs_currency=usd&days=7`
  );

  if (!response) {
    return <Loader />;
  }
  console.log(response);
  const coinChartData = response.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const data = {
    labels: coinChartData.map((value) => moment(value.x).format('MMM DD')),
    datasets: [
      {
        fill: true,
        data: coinChartData.map((val) => val.y),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      <Row className='chart-header'>
        <Typography.Title level={2} className='chart-Typography.title'>
          {coinName} Price Chart{' '}
        </Typography.Title>
        <Col className='price-container'>
          <Typography.Title level={5} className='price-change'>
            Change: {coinHistory?.data?.change}%
          </Typography.Title>
          <Typography.Title level={5} className='current-price'>
            Current {coinName} Price: $ {currentPrice}
          </Typography.Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default HistoryChart;
