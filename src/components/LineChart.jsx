import React from 'react';
import moment from 'moment';
import Loader from './Loader';
import { Col, Row, Typography } from 'antd';
// const { Title } = Typography;
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  Title,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
  Title
);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  // console.log(coinHistory);

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      moment(coinHistory?.data?.history[i].timestamp).format('MMM DD')
      // new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  console.log(coinPrice);
  console.log(coinTimestamp);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        fill: true,
        data: coinPrice,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgb(53, 162, 235, 0.5)',
      },
    ],
  };
  const options = {
    responsive: true,
  };

  if (!coinPrice && !coinTimestamp) {
    return <Loader />;
  }
  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-Typography.title">
          {coinName} Price Chart{' '}
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Typography.Title>
          <Typography.Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Typography.Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
