import React from 'react';

import { Layout as AntdLayout, Menu, Breadcrumb } from 'antd';

const { Header, Footer, Content } = AntdLayout;

import styles from './Layout.css';
import { useHistory } from 'react-router-dom';
///
export const Layout = ({ children }) => {
  const history = useHistory();
  return (
    <AntdLayout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" className="navbar">
          <Menu.Item
            key="1"
            onClick={() => {
              history.push('/search');
            }}
          >
            Catálogo
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={() => {
              history.push('/panel');
            }}
          >
            Panel
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Desafío Ripley 2020</Footer>``
    </AntdLayout>
  );
};
