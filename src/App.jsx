import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductsPage from './components/Products/ProductsPage';
import ProductDetail from './components/Products/ProductDetail';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import './styles/App.css';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
