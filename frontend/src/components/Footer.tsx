import React from 'react';
import '../styles/Footer.css';



const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 mt-16 w-full">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <div className="text-4xl font-semibold text-gray-100">
            <a href="/" className="text-white">stitched</a>
          </div>
          <p className="mt-2 text-sm text-gray-500">STITCHED © 2024 | DESIGNED & DEVELOPED BY TEDMOB.COM</p>
        </div>

        {/* Shop Now Links */}
        <div>
          <h3 className="text-xl font-semibold text-gray-100">SHOP NOW</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="/clothing" className="text-sm text-gray-400 hover:text-white transition duration-300">Clothing</a></li>
            <li><a href="/swimwear" className="text-sm text-gray-400 hover:text-white transition duration-300">Swimwear</a></li>
            <li><a href="/accessories" className="text-sm text-gray-400 hover:text-white transition duration-300">Accessories</a></li>
            <li><a href="/sale" className="text-sm text-gray-400 hover:text-white transition duration-300">Sale</a></li>
            <li><a href="/wishlist" className="text-sm text-gray-400 hover:text-white transition duration-300">Wishlist</a></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold text-gray-100">USEFUL LINKS</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="/my-account" className="text-sm text-gray-400 hover:text-white transition duration-300">My account</a></li>
            <li><a href="/contact" className="text-sm text-gray-400 hover:text-white transition duration-300">Get in Touch</a></li>
            <li><a href="/about" className="text-sm text-gray-400 hover:text-white transition duration-300">About</a></li>
            <li><a href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition duration-300">Privacy Policy</a></li>
            <li><a href="/terms" className="text-sm text-gray-400 hover:text-white transition duration-300">Terms and Conditions</a></li>
            <li><a href="/price-match" className="text-sm text-gray-400 hover:text-white transition duration-300">Price Match Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Stay Up-to-Date Section */}
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center mt-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-100">STAY UP-TO-DATE</h3>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="email"
            placeholder="Your email address"
            className="px-4 py-2 text-sm text-gray-900 rounded-l-md focus:outline-none"
          />
          <button className="px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-r-md hover:bg-gray-200 transition duration-300">
            SIGN UP
          </button>
        </div>
        <div className="flex items-center space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <svg className="w-6 h-6 text-gray-400 hover:text-white transition duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 2h-3c-1.104 0-2 .896-2 2v3H8V4c0-1.104.896-2 2-2h3c1.104 0 2 .896 2 2v3h3v4h-3v10H13V9h-2V5h2V2z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <svg className="w-6 h-6 text-gray-400 hover:text-white transition duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zM12 13c-2.755 0-5-2.245-5-5s2.245-5 5-5 5 2.245 5 5-2.245 5-5 5zM15 2c.553 0 1 .447 1 1s-.447 1-1 1-1-.447-1-1 .447-1 1-1z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="text-center mt-8">
        <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7-7-7 7"/>
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
