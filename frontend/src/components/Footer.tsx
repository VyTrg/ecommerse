import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo and Copyright */}
        <div className="footer-section logo">
          <div className="logo-text">
            <img src="https://stitched-lb.com/wp-content/uploads/2024/07/Stitched-white@4x-320x108.png" alt="" />
          </div>
        </div>

        {/* Shop Now Links */}
        <div className="footer-section">
          <h3 className="footer-title">SHOP NOW</h3>
          <ul className="footer-links">
            <li><a href="/clothing">Clothing</a></li>
            <li><a href="/swimwear">Swimwear</a></li>
            <li><a href="/accessories">Accessories</a></li>
            <li><a href="/sale">Sale</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="footer-section">
          <h3 className="footer-title">USEFUL LINKS</h3>
          <ul className="footer-links">
            <li><a href="/my-account">My account</a></li>
            <li><a href="/contact">Get in Touch</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms and Conditions</a></li>
            <li><a href="/price-match">Price Match Policy</a></li>
          </ul>
        </div>
        <div className="stay-up-to-date">
        <div className="stay-title">
          <h3>STAY UP-TO-DATE</h3>
        </div>
        <div className="stay-form">
          <input type="email" placeholder="Your email address" className="email-input" />
          <button className="sign-up-btn">SIGN UP</button>
        </div>
      </div>
      </div>

      {/* Stay Up-to-Date Section */}
      

      {/* Social Media Links */}
      <div className="social-links">
        <a href="https://facebook.com">Facebook</a>
        <a href="https://instagram.com">Instagram</a>
      </div>

      {/* Back to Top Button */}
      <div className="back-to-top">
        <button className="back-btn">
          <svg className="arrow-up" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7-7-7 7"/>
          </svg>
        </button>
      </div>

      {/* Copyright and Developer Info */}
      <div className="footer-bottom">
        <hr className="custom-hr" />
        <p>STITCHED © 2024 | DESIGNED & DEVELOPED BY BLABLA</p>
      </div>
    </footer>
  );
};

export default Footer;
