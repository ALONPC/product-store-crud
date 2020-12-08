import React, { useEffect, useState } from 'react';
import { Input, Card, Divider, Row, Col, Typography, Tag, Empty } from 'antd';
import { getProducts, onSearch } from '../lib/api';
import { numberFormat } from '../lib/numberFormat';

const { Text, Title } = Typography;
const { Search } = Input;
const { Meta } = Card;

const PriceToDisplay = ({ price, isPalindrome }) => {
  return (
    <>
      {isPalindrome ? (
        <>
          <Row align="middle" gutter={[8]}>
            <Col>
              <Text delete>{numberFormat(price)}</Text>
            </Col>
            <Col>
              <Tag>Oferta!</Tag>
            </Col>
          </Row>
          <Row>
            <Col>
              <Title level={3}>{numberFormat(Math.floor(price - price * 0.2))}</Title>
            </Col>
          </Row>
        </>
      ) : (
        <Title level={3}>{numberFormat(price)}</Title>
      )}
    </>
  );
};

export const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  ////
  useEffect(() => {
    (async () => {
      const products = await getProducts();
      setResults(products);
    })();
  }, []);

  return (
    <>
      <Search
        placeholder="¿Qué estás buscando?"
        allowClear
        onSearch={async (searchValue) => {
          if (searchValue.length >= 3) {
            setSearchValue(searchValue.toLowerCase());
            const products = await onSearch(searchValue);
            setResults(products);
          }
        }}
        enterButton="Buscar!"
        size="large"
      />
      <Divider></Divider>
      {searchValue && results && <h3>Se han encontrado {results.length} resultado(s)</h3>}
      {!results.length && <Empty description={false}></Empty>}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {!!results.length &&
          results.map(({ price, description, name, imageUrl }, i) => {
            const isPalindrome =
              searchValue &&
              Array.from(searchValue).toString() === Array.from(searchValue).reverse().toString();
            return (
              <Col key={i}>
                <Card
                  title={name}
                  hoverable
                  style={{ width: 240, padding: 16 }}
                  cover={
                    imageUrl ? (
                      <img alt="name" src={imageUrl} />
                    ) : (
                      <Empty description={false}></Empty>
                    )
                  }
                >
                  <Meta
                    title={
                      <PriceToDisplay isPalindrome={isPalindrome} price={price}></PriceToDisplay>
                    }
                    description={description}
                  />
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
};
