import React, { useState } from "react";
import "../styles/FilterSidebar.css";

const FilterSidebar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: "Accessories" },
    { name: "Clothing", subcategories: ["Blazers", "Bodysuits", "Bottoms", "Coats & Jackets", "Denim", "Dresses", "Jumpsuits", "Knitwear", "Loungewear", "Pants", "Set", "Shorts", "Skirts", "Tops"] },
    { name: "Swimwear" },
  ];

  return (
    <div className="filter-sidebar">
      {/* Danh mục sản phẩm */}
      <h2>SHOP BY CATEGORIES</h2>
      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={index}>
            <div
              className={`category-title ${selectedCategory === category.name ? "active" : ""}`}
              onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
            >
              {category.name}
              {category.subcategories && (
                <span className="toggle-icon">{selectedCategory === category.name ? "▲" : "▼"}</span>
              )}
            </div>
            {category.subcategories && selectedCategory === category.name && (
              <ul className="subcategory-list">
                {category.subcategories.map((sub, idx) => (
                  <li key={idx}>{sub}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Bộ lọc giá */}
      <h2>SHOP BY PRICE</h2>
      <div className="price-filter">
        <input type="range" min="0" max="1350" />
        <p>Price: <span>$0.00 — $1,350.00</span></p>
        <button className="filter-button">FILTER</button>
      </div>
    </div>
  );
};

export default FilterSidebar;
