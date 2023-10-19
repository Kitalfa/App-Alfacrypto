import React from 'react';
import { useEffect, useState } from 'react';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { Col, Row, Collapse, Avatar, Typography } from 'antd';
import { useGetExchangesQuery } from '../services/exchangesApi';
import Loader from './Loader';
const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data;

  const [sortedExchangesList, setSortedExchangesList] = useState([]);

  useEffect(() => {
    if (exchangesList) {
      const sortedList = [...exchangesList].sort(
        (a, b) => a.trust_score_rank - b.trust_score_rank
      );
      setSortedExchangesList(sortedList);
    }
  }, [exchangesList]);

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Year etablished</Col>
        <Col span={6}>Country</Col>
      </Row>
      <Row>
        {sortedExchangesList.map((exchange) => (
          <Col key={exchange.id} span={24}>
            <Collapse>
              <Panel
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.trust_score_rank}.</strong>
                      </Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>
                      ${millify(exchange.trade_volume_24h_btc)}
                    </Col>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.year_established}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.country}</strong>
                      </Text>
                    </Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
