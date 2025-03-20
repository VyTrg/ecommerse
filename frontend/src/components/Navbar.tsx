import React, { useState } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar">
      {/* Logo */}
      <div className="logo">
        <a href="/">
          <img
            src="https://stitched-lb.com/wp-content/uploads/2024/07/Stitched-logo@4x.png"
            alt="Stitched Logo"
          />
        </a>
      </div>

      {/* Main Navigation Menu */}
      <nav className="nav">
        <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li className="menu-item">
            <a href="/clothing">Clothing</a>
            <ul className="dropdown-menu">
              <li><a href="/clothing/blazers">Blazers</a></li>
              <li><a href="/clothing/bodysuits">Bodysuits</a></li>
              <li><a href="/clothing/bottoms">Bottoms</a></li>
            </ul>
          </li>
          <li className="menu-item">
            <a href="/swimwear">Swimwear</a>
            <ul className="dropdown-menu">
              <li><a href="/swimwear/bikinis">Bikinis</a></li>
              <li><a href="/swimwear/one-piece">One piece</a></li>
            </ul>
          </li>
          <li className="menu-item">
            <a href="/accessories">Accessories</a>
            <ul className="dropdown-menu">
              <li><a href="/accessories/jewelry">Jewelry</a></li>
              <li><a href="/accessories/shoes-and-beach-bags">Shoes & Beach Bags</a></li>
            </ul>
          </li>
          <li><a href="/sale">Sale</a></li>
        </ul>
      </nav>

      {/* Icons (Search, Account, Wishlist, Cart) */}
      <div className="header-actions">
        <a href="/search" className="icon search">🔍</a>
        <a href="/my-account" className="icon account">👤</a>
        <a href="/wishlist" className="icon wishlist">❤️</a>
        <a href="/cart" className="icon cart">🛒</a>
      </div>

      {/* Mobile Menu Button */}
      <div className="mobile-menu">
        <button onClick={toggleMobileMenu} aria-label="Open mobile menu">
          ☰
        </button>
      </div>
    </header>
  );
};

export default Navbar;
