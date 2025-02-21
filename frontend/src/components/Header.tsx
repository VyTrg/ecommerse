// src/components/Header.tsx
import React from 'react';
import '../styles/Header.css';        // Đúng đường dẫn cho Header.css
 

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li><a href="#">Clothing</a></li>
          <li><a href="#">Swimwear</a></li>
          <li><a href="#">Accessories</a></li>
          <li><a href="#">Sale</a></li>
        </ul>
      </nav>
      <div className="logo">
        <h1>stitched</h1>
      </div>
      <div className="cart">
        <span>$0.00</span>
        <button>Cart</button>
      </div>
    </header>
  );
};

export default Header;
