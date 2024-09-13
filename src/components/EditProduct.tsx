import { Button, Form, Input, Select, Space, message } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCategoriesQuery, useGetProductByIdQuery, useUpdateProductMutation } from '../api/productApi';

const EditProduct: React.FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const { data: product } = useGetProductByIdQuery(parseInt(id!));
  const { data: categories } = useGetCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  const onFinish = async (values: any) => {
    try {
      await updateProduct({ id: parseInt(id!), data: values }).unwrap();
      message.success('Product updated successfully!');
      navigate(`/products/${id}`);
    } catch {
      message.error('Failed to update product.');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} style={{maxWidth:'800px', margin:'0 auto'}}>
      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category!' }]}>
        <Select>
          {categories?.map((category) => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.List name="reviews">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  {...field}
                  label="Comment"
                  name={[field.name, 'comment']}
                  rules={[{ required: true, message: 'Please input the review comment!' }]}
                >
                  <Input placeholder="Review comment" />
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Rating"
                  name={[field.name, 'rating']}
                  rules={[{ required: true, message: 'Please input the rating!' }]}
                >
                  <Input type="number" placeholder="Rating" />
                </Form.Item>
                <Button type="link" onClick={() => remove(field.name)} danger>
                  Remove
                </Button>
              </Space>
            ))}
            <Form.Item>
              <Button  type="dashed" onClick={() => add()} block>
                Add Review
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button style={{float:"right"}} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProduct;
