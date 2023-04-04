import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const [coins, setCoins] = useState([]);
  const [searchterm, setSearchTerm] = useState('');
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
        setCoins(coins);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  // useEffect(() => {
  //   setCoins
  // }, [searchterm]);
  return (
    <>
      <div className="search-crypto">
        <Input
          placeholder="Search Cryptocurrency"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <Row gutter={[32, 33]} className="crypto-card-container">
        {coins.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}$</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
