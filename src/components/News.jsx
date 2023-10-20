import React, { useState } from 'react';

import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  'https://previews.123rf.com/images/sylverarts/sylverarts1712/sylverarts171201203/91396254-logo-conceptuel-de-reportage-en-direct-illustration-vectorielle-cr%C3%A9%C3%A9e-avec-l-%C3%A9quipement-de.jpg';

const News = () => {
  const { data, error, isLoading } = useGetCryptosNewsQuery({
    newsCategory: 'Cryptocurrency',
    count: 6,
  });

  if (isLoading) {
    return 'Loadind...';
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data.data) {
    return null;
  }

  return (
    <Row gutter={[24, 24]}>
      {data.data.map((news) => (
        <Col xs={24} sm={12} lg={8} key={news.id}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  style={{ maxWidth: '200px', maxHeight: '100px' }}
                  src={news.thumbnail || demoImage}
                />
              </div>
              <p className="news-text">
                {news.description > 100
                  ? `${news.description.substring(0, 100)}... `
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
                </div>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
