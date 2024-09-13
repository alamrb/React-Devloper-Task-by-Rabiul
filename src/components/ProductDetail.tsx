import { Button, Descriptions } from 'antd';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../api/productApi';
const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductByIdQuery(parseInt(id!));
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
       <Button type="primary">
        <Link to="/">Home</Link>
      </Button>
      <Descriptions title="Product Details" bordered>
        <Descriptions.Item label="Title">{product?.title}</Descriptions.Item>
        <Descriptions.Item label="Description">{product?.description}</Descriptions.Item>
        <Descriptions.Item label="Price">${product?.price}</Descriptions.Item>
        <Descriptions.Item label="Category">{product?.category}</Descriptions.Item>
      </Descriptions>
      <Button type="primary" onClick={() => navigate(`/edit/${product?.id}`)}>
        Edit Product
      </Button>
    </div>
  );
};

export default ProductDetail;
