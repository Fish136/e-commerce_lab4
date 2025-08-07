import React, { useState } from 'react';
import { Star, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate, useParams } from 'react-router-dom';
import { mockProducts } from '../../data/mockProducts';
import '../../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);


  const product = mockProducts.find(p => String(p.id) === id);

  if (!product) return <p style={{ padding: '2rem' }}>Product not found</p>;

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={20}
        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
        className="star"
      />
    ));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Products
      </button>

      <div className="product-detail-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="detail-product-image" />
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>

          <div className="rating-section">
            <div className="stars-container">{renderStars()}</div>
            <span className="rating-text">({product.rating}/5)</span>
          </div>

          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>

          <div className="quantity-section">
            <label className="quantity-label">Quantity:</label>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="quantity-btn">
                <Minus size={16} />
              </button>
              <span className="quantity-display">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="quantity-btn">
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button onClick={handleAddToCart} className="add-to-cart-detail-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
