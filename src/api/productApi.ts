import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  reviews: { comment: string; rating: number }[];
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<{ products: Product[]; total: number }, { limit: number; skip: number }>({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
    }),
    updateProduct: builder.mutation<Product, { id: number; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetCategoriesQuery, useUpdateProductMutation } = productApi;
