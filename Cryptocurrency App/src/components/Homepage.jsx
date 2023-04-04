import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cryptocurrencies, News } from '../components';

// import  cryptoApi  from '../services/cryptoApi';
const { Title } = Typography;

const Homepage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: '50',
        offset: '0',
      },
      headers: {
        'X-RapidAPI-Key': '46a1930555msh40811054868aa91p1405dejsn90070fa8c219',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        const { coins, stats } = response.data.data;
        setStats(stats);
        setCoins(coins);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={stats.totalCoins}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(parseInt(stats.totalExchanges))}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={`$${millify(parseInt(stats.totalMarketCap))}`}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={`$${millify(parseInt(stats.total24hVolume))}`}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(parseInt(stats.totalMarkets))}
          ></Statistic>
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the Word
        </Title>
        <Title level={3} className="show-more">
          <Link to="\cryptocurrencies">Show More</Link>
        </Title>
      </div>

      <Cryptocurrencies simplified={true} />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="\news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
