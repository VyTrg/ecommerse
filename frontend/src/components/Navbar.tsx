import React, { useState } from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaUserShield,
  FaSignInAlt,
  FaSearch,
    FaSignOutAlt,
} from "react-icons/fa";
function decodeToken(token: string) {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

type NavbarProps = {
  onCartClick: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const isLoggedIn = !!token;

  let isAdmin = false;

  if (token) {
    const decoded = decodeToken(token);
    const roles = decoded?.resource_access?.['express-api']?.roles || [];
    isAdmin = roles.includes('admin');
  }
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
      setShowSearch(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userInfo');

    navigate('/login');
  };
  return (
    <header>
      <div className="navbar-container">
        <nav className="nav-section left">
          <ul className="nav_link">
            <li className="drop-down-menu">
              <Link to="/clothing">CLOTHING</Link>
              <ul className="drop-down">
              <ul className="drop-down">
                <li><Link to="/clothing/blazer">Blazers</Link></li>
                <li><Link to="/clothing/bodysuit">Bodysuits</Link></li>
                <li><Link to="/clothing/bottom">Bottoms</Link></li>
                <li><Link to="/clothing/jacket">Coats & Jackets</Link></li>
                <li><Link to="/clothing/denim">Denim</Link></li>
                <li><Link to="/clothing/dress">Dresses</Link></li>
                <li><Link to="/clothing/jumpsuit">Jumpsuits</Link></li>
                <li><Link to="/clothing/knitwear">Knitwear</Link></li>
                <li><Link to="/clothing/loungewear">Loungewear</Link></li>
                <li><Link to="/clothing/shorts">Shorts</Link></li>
                <li><Link to="/clothing/skirt">Skirts</Link></li>
                <li><Link to="/clothing/top">Tops</Link></li>
                </ul>
              </ul>
            </li>
            <li className="drop-down-menu">
              <Link to="/swimwear">SWIMWEAR</Link>
              <ul className="drop-down">
                <li><a href="#">Bikinis</a></li>
                <li><a href="#">One piece</a></li>
              </ul>
            </li>
            <li className="drop-down-menu">
              <Link to="/accessories">ACCESSORIES</Link>
              <ul className="drop-down">
                <li><Link to="/category/jewelry">Jewelry</Link></li>
                
                <li><Link to="category/shoesandbags">Shoes and Beach Bags</Link></li>
              </ul>
            </li>
            <li><Link to="/sale">SALE</Link></li>
          </ul>
        </nav>

        {/* Center - Logo */}
        <div className="nav-logo">
          <img className="navbar-logo" src="src/assets/logo.png" alt="Logo" />
        </div>

        {/* Right - Icons */}
        <nav className="nav-section right">
          <ul className="nav_link icon-links">
            <li>
              <button
                  onClick={() => setShowSearch(prev => !prev)}
                  title="Search"
                  className="icon-button"
              >
                <FaSearch />
              </button>
            </li>
            {!isAdmin && token && (
                <>
                  <li>
                    <Link to="/myaccount" title="My Account">
                      <FaUser />
                    </Link>
                  </li>

                  <li>
                    <button
                        onClick={onCartClick}
                        title="Shopping Cart"
                        className="cart-button"
                    >
                      <FaShoppingCart />
                    </button>
                  </li>
                </>
            )}

            {isAdmin && (
                <li><Link to="/admin" title="Admin Page"><FaUserShield /></Link></li>
            )}
            {!isLoggedIn ? (
                <li><Link to="/login" title="Login"><FaSignInAlt /></Link></li>
            ) : (
                <li>
                  <button onClick={handleLogout} title="Logout" className="icon-button">
                    <FaSignOutAlt />
                  </button>
                </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Overlay nền mờ */}
      {showSearch && (
        <div
          className="search-overlay"
          onClick={() => setShowSearch(false)}
        ></div>
      )}

      {/* Popup tìm kiếm full màn hình */}
      <div className={`search-popup-container ${showSearch ? "show" : ""}`}>
        <button
          type="button"
          className="close-search"
          onClick={() => setShowSearch(false)}
        >
          ✕
        </button>

        <form className="search-popup" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  );
};

export default Navbar;
