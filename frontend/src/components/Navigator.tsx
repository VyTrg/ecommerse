import React from "react";
import "../styles/global.css";
import "../styles/navigator.css";

function Navigator() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <div className="nav-item">
          <b>
            <a href="#">CLOTHING</a>
          </b>
          <div className="dropdown">
            <a href="#">Blazers</a>
            <a href="#">Bodysuits</a>
            <a href="#">Bottoms</a>
            <a href="#">Coats & Jackets</a>
            <a href="#">Denim</a>
            <a href="#">Dresses</a>
            <a href="#">Jumpsuits</a>
            <a href="#">Knitwear</a>
            <a href="#">Loungewear</a>
            <a href="#">Shorts</a>
            <a href="#">Skirts</a>
            <a href="#">Tops</a>
          </div>
        </div>
        <div className="nav-item">
          <b>
            <a href="#">SWIMWEAR</a>
          </b>
          <div className="dropdown">
            <a href="#">Bikinis</a>
            <a href="#">One piece</a>
          </div>
        </div>
        <div className="nav-item">
          <b>
            <a href="#">ACCESSORIES</a>
          </b>
          <div className="dropdown">
            <a href="#">Jewelry</a>
            <a href="#">Shoes and Beach Bags</a>
          </div>
        </div>
        <b>
          <a href="#">SALE</a>
        </b>
      </div>
      {/* <div className="logo">stitched</div> */}
      <div className="right">
        {/* <i className="fa-regular fa-user"></i>
        <i className="fa-solid fa-magnifying-glass"></i>
        <i className="fa-regular fa-heart"></i>
        <i className="fa-solid fa-bag-shopping"></i> <span>0.00 $</span> */}
      </div>
    </nav>
  );
}

export default Navigator;
