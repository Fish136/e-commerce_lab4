import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">HoloShop</h3>
            <p className="footer-description">Your favorite Hololive merchandise store.</p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Customer Service</h4>
            <ul className="footer-links">
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>Shipping Info</li>
              <li>Returns</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li>Apparel</li>
              <li>Accessories</li>
              <li>Plushies</li>
              <li>Collectibles</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <ul className="footer-links">
              <li>Twitter</li>
              <li>YouTube</li>
              <li>Discord</li>
              <li>Reddit</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 HoloShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;