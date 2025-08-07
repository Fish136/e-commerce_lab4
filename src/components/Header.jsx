import React, { useState, useEffect } from 'react';

import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
    const { getTotalItems } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const [isSticky, setIsSticky] = useState(false);
    const [scrollUp, setScrollUp] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentY = window.scrollY;

            if (currentY > 0) {
                setIsSticky(true);
                setScrollUp(currentY < lastScrollY);
            } else {
                // back at the top
                setIsSticky(false);
            }

            lastScrollY = currentY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { path: '/', label: 'Products' },
        { path: '/cart', label: 'Cart' },
        { path: '/checkout', label: 'Checkout' }
    ];


    return (
        <header
            className={`header ${isSticky ? (scrollUp ? 'show-header' : 'hide-header') : 'initial-header'
                }`}
        >
            <div className="header-container">
                <div className="header-content">
                    <div className="header-left">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-menu-btn">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <img
                            src="https://shop.hololivepro.com/cdn/shop/t/104/assets/logo_officialshop.png?v=49470815954276103671720404261"
                            alt="HoloShop"
                            className="logo"
                            onClick={() => navigate('/')}
                        />
                    </div>

                    <nav className="desktop-nav">
                        {navItems.map(item => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="header-right">
                        <div className="cart-icon-container">
                            <ShoppingCart size={24} className="cart-icon" onClick={() => navigate('/cart')} />
                            {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
                        </div>
                        <User size={24} className="user-icon" />
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="mobile-menu">
                        <nav className="mobile-nav">
                            {navItems.map(item => (
                                <button
                                    key={item.path}
                                    onClick={() => {
                                        navigate(item.path);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`mobile-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
