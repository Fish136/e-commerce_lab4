import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/ProductsCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    addToCart(product);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);

  };

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
        className="star"
      />
    ));
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`heart-btn ${isLiked ? 'liked' : ''}`}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
        <div className="image-overlay" />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="rating-container">
          <div className="stars-container">
            {renderStars()}
          </div>
          <span className="rating-text">({product.rating})</span>
        </div>
        
        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <button 
            onClick={handleAddToCart}
            className="add-to-cart-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
