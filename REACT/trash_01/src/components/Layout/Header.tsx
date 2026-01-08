import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Trang Chủ' },
    { path: '/products', label: 'Sản Phẩm' },
    { path: '/about', label: 'Về Chúng Tôi' },
    { path: '/contact', label: 'Liên Hệ' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">👓</span>
          <span className="logo-text">OptiVision</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <button 
            className="action-btn"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Tìm kiếm"
          >
            <Search size={20} />
          </button>
          <Link to="/account" className="action-btn" aria-label="Tài khoản">
            <User size={20} />
          </Link>
          <Link to="/cart" className="action-btn cart-btn" aria-label="Giỏ hàng">
            <ShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          <button 
            className="menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Tìm kiếm kính mắt..."
            className="search-input"
          />
          <button className="search-submit">
            <Search size={18} />
          </button>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="nav-mobile">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link-mobile ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
