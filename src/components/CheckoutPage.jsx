import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/CheckoutPage.css';

const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setTimeout(() => {
      setOrderComplete(true);
      clearCart();
    }, 1000);
  };

  if (orderComplete) {
    return (
      <div className="checkout-container text-center">
        <div className="order-complete-banner">
          <h2 className="order-complete-title">Order Complete!</h2>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
        </div>
        <button onClick={() => navigate('/')} className="primary-button">
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="checkout-container text-center">
        <h2 className="empty-cart-title">No items in cart</h2>
        <button onClick={() => navigate('/')} className="primary-button">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-grid">
        <div className="order-summary-card">
          <h2 className="card-title">Order Summary</h2>
          <div className="order-items">
            {cart.items.map(item => (
              <div key={item.id} className="order-item">
                <div>
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                </div>
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="order-total-section">
            <div className="order-total">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="payment-card">
          <h2 className="card-title">Payment Information</h2>
          <form className="payment-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City</label>
                <input type="text" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Zip Code</label>
                <input type="text" className="form-input" />
              </div>
            </div>
            <button type="button" onClick={handleCheckout} className="checkout-button">
              Complete Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
