import { Button, Table } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../api/productApi';

const ProductList: React.FC = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const { data, isLoading } = useGetProductsQuery({
    limit: pagination.pageSize,
    skip: (pagination.current - 1) * pagination.pageSize,
  });
  const navigate = useNavigate();

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Button onClick={() => navigate(`/products/${record.id}`)}>View Details</Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data?.products}
      loading={isLoading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: data?.total,
        onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
      }}
      rowKey="id"
    />
  );
};

export default ProductList;
