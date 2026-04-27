import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronDown, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ darkTheme = false, alwaysSolid = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50 || alwaysSolid);
    };
    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [alwaysSolid]);

  const navClass = `navbar ${isScrolled || alwaysSolid ? 'scrolled' : 'transparent'} ${darkTheme ? 'theme-dark' : ''}`;

  return (
    <nav className={navClass}>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <span className="logo-pk">PK</span>
          <span className="logo-door">DOOR</span>
          {/* <div className="logo-icon"></div> */}
        </Link>

        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/">TRANG CHỦ</Link></li>
          <li><Link to="/about">VỀ CHÚNG TÔI</Link></li>
          <li className="dropdown">
            <Link to="/products">SẢN PHẨM <ChevronDown size={16} /></Link>
            <ul className="dropdown-menu">
              <li><a href="#plastic-doors">Cửa nhựa giả gỗ</a></li>
              <li><a href="#wood-doors">Cửa gỗ công nghiệp</a></li>
              <li><a href="#composite-doors">Cửa Composite</a></li>
              <li><a href="#steel-doors">Cửa thép vân gỗ</a></li>
            </ul>
          </li>

          {/* <li><Link to="/news">TIN TỨC</Link></li> */}
          <li><Link to="/contact">LIÊN HỆ</Link></li>
        </ul>

        <div className="nav-actions">
          <a href="tel:0905943679" className="hotline">
            <Phone size={18} />
            <div className="hotline-text">
              <span>Hotline 24/7</span>
              <strong>0905 943 679</strong>
            </div>
          </a>
          
          <Link to="/cart" className="cart-toggle-btn">
            <ShoppingBag size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
