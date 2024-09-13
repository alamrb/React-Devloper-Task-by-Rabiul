import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EditProduct from './components/EditProduct';
import MainLayout from './components/MainLayout';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
        </MainLayout>
    </Router>
  );
};

export default App;
