import { Button, Col, Form, Input, InputNumber, message, Modal, Row } from 'antd';
import React from 'react';
import { createProduct, updateProduct } from '../lib/api';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 },
};

export const ModalProduct = ({ product, modalState, actionTypeState }) => {
  const [open, setOpen] = modalState;
  const [actionType, setActionType] = actionTypeState;

  const onFinish = async (values) => {
    const { _id: id } = product;
    if (actionType === 'create') {
      const res = await createProduct(values);
      res && message.success('Producto creado!');
    } else if (actionType === 'edit') {
      const res = await updateProduct(id, values);
      res && message.success('Producto modificado!');
    }
    setOpen(false);
    setActionType('none');
  };

  return (
    <Modal
      maskClosable={false}
      title={`${actionType === 'create' ? 'Crear' : 'Editar'} producto`}
      visible={open}
      onCancel={() => {
        setOpen(false);
      }}
      footer={() => null}
      destroyOnClose // super important in order to reset form initial values
    >
      <Form
        {...layout}
        onFinish={onFinish}
        {...(actionType === 'edit' && {
          initialValues: {
            brand: product.brand,
            name: product.name,
            description: product.description,
            price: product.price,
          },
        })}
      >
        <Form.Item label="Marca" name="brand">
          <Input></Input>
        </Form.Item>
        <Form.Item label="Nombre" name="name">
          <Input></Input>
        </Form.Item>
        <Form.Item label="Descripción" name="description">
          <Input></Input>
        </Form.Item>
        <Form.Item label="Precio" name="price">
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
        <Row justify="end">
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {`${actionType === 'create' ? 'Crear' : 'Editar'}`}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
