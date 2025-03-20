import React, { useState } from 'react';
import '../styles/Header.css';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-links">
          <li><a href="/clothing"><img src="/images/tshirt.png" alt="Clothing" />CLOTHING</a></li>
          <li><a href="/swimwear"><img src="/images/icons8-beach-24.png" alt="Swimwear" />SWIMWEAR</a></li>
          <li><a href="/accessories"><img src="/images/bag.png" alt="Accessories" />ACCESSORIES</a></li>
          <li><a href="/sale"><img src="/images/percent.png" alt="Sale" />SALE</a></li>
        </ul>
      </nav>

      <div className="logo">
        <img src="https://stitched-lb.com/wp-content/uploads/2024/07/Stitched-logo@4x.png" alt="Logo" />
      </div>

      <div className="header-actions">
        <div className="currency">
          <select>
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
        </div>

        <div className="icons">
          <a href="/search" className="icon search" style={{ fontSize: '20px', color: '#333' }}>
            <img src="/images/search.png" alt="Search" style={{ width: '24px', height: '24px' }} />
          </a>
          <a href="/account" className="icon account" style={{ fontSize: '20px', color: '#333' }}>
            <img src="/images/person.png" alt="Account" style={{ width: '24px', height: '24px' }} />
          </a>
          <a href="/wishlist" className="icon wishlist" style={{ fontSize: '20px', color: '#333' }}>
            <img src="/images/heart.png" alt="Wishlist" style={{ width: '24px', height: '24px' }} />
          </a>
          <a href="/cart" className="icon cart" style={{ fontSize: '20px', color: '#333' }}>
            <img src="/images/cart.png" alt="Cart" style={{ width: '24px', height: '24px' }} />
            <span className="cart-count" style={{
              position: 'absolute', 
              
              backgroundColor: 'red', 
              color: 'white', 
              borderRadius: '50%', 
              padding: '3px 8px', 
              fontSize: '12px'
            }}>0</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button className="mobile-menu-button" onClick={toggleMobileMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#333' }}>
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><a href="/clothing">Clothing</a></li>
            <li><a href="/swimwear">Swimwear</a></li>
            <li><a href="/accessories">Accessories</a></li>
            <li><a href="/sale">Sale</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
