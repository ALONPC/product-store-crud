import { Table, Tag, Space, message, Button, Divider, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';

import { deleteProduct, getProducts } from '../lib/api';
import { numberFormat } from '../lib/numberFormat';
import { ModalProduct } from './ModalProduct';

import { PlusOutlined } from '@ant-design/icons';

const columns = (dataState, modalState, actionTypeState, recordState) => [
  {
    title: 'Marca',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Descripción',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Precio',
    key: 'price',
    dataIndex: 'price',
    render: (_, record) => {
      return numberFormat(record.price);
    },
  },
  {
    title: 'Acciones',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Tag
          color="processing"
          onClick={() => {
            console.log('🚀 ~ file: Panel.jsx ~ line 84 ~ record', record);
            const [_, setOpen] = modalState;
            const [__, setActionType] = actionTypeState;
            const [___, setRecord] = recordState;
            setActionType('edit');
            setRecord(record);
            setOpen(true);
          }}
        >
          Editar
        </Tag>
        <Popconfirm
          placement="topRight"
          title="Seguro de que quieres eliminar este producto?"
          onConfirm={async () => {
            const { _id: id } = record;
            const [data, setData] = dataState;
            const response = await deleteProduct(id);
            if (response) {
              const newData = data.filter(({ _id }) => _id !== id);
              await setData(newData);
              message.success(response.message);
            }
          }}
          okText="Si"
          cancelText="No"
        >
          <Tag color="error">Eliminar</Tag>
        </Popconfirm>
      </Space>
    ),
  },
];

export const Panel = () => {
  const dataState = useState([]);
  const modalState = useState(false);
  const actionTypeState = useState('');
  const [_, setOpen] = modalState;
  const [actionType, setActionType] = actionTypeState;
  const [data, setData] = dataState;
  const recordState = useState({});
  const [record, __] = recordState;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const products = await getProducts();
      setData(products);
      setLoading(false);
    })();
    // return () => {
    //   setRecord({});
    // };
  }, [actionType]);

  return (
    <>
      <Button
        type="primary"
        shape="round"
        icon={<PlusOutlined />}
        onClick={() => {
          setActionType((prevState) => prevState != 'create' && 'create');
          setOpen(true);
        }}
      >
        Agregar producto
      </Button>
      <Divider></Divider>

      <Table
        loading={loading}
        columns={columns(dataState, modalState, actionTypeState, recordState)}
        dataSource={data}
      />
      <ModalProduct
        product={record}
        actionTypeState={actionTypeState}
        modalState={modalState}
      ></ModalProduct>
    </>
  );
};
