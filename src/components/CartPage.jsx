import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/CartPage.css';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingCart size={64} className="empty-cart-icon" />
        <h2 className="empty-cart-title">Your cart is empty</h2>
        <p className="empty-cart-subtitle">Start shopping to add items to your cart!</p>
        <button onClick={() => navigate('/')} className="browse-products-btn">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="cart-title">Shopping Cart</h1>
        <button onClick={clearCart} className="clear-cart-btn">
          <Trash2 size={16} />
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cart.items.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">${item.price}</p>
            </div>
            <div className="cart-item-controls">
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="quantity-btn">
                  <Minus size={16} />
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-btn">
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="cart-item-total">
              <p className="item-total-price">${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="remove-item-btn">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span className="total-label">Total: ${getTotalPrice().toFixed(2)}</span>
        </div>
        <button onClick={() => navigate('/checkout')} className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
