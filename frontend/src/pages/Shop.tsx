import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import "../styles/Shop.css";

const products = [
  { id: 1, name: "Dawn Cardigan", price: "335.00", image: "https://stitched-lb.com/wp-content/uploads/2024/10/384049KNT-DawnCardigan_1_-min_900x.webp" },
  { id: 2, name: "Freesia Ivory", price: "80.00", image: "https://stitched-lb.com/wp-content/uploads/2024/11/zS2hpxtw.jpg" },
  { id: 3, name: "Hannah Cardigan", price: "120.00", image: "https://stitched-lb.com/wp-content/uploads/2024/11/A8VW6fa4-scaled.jpg" },
  { id: 4, name: "Knox Hot Short", price: "95.00", image: "https://stitched-lb.com/wp-content/uploads/2024/10/0-1.jpg" },
  { id: 5, name: "Vintage Denim Jacket", price: "150.00", image: "https://stitched-lb.com/wp-content/uploads/2024/10/IMG_8821_900x.webp" },
  { id: 6, name: "Casual Sweatshirt", price: "60.00", image: "https://stitched-lb.com/wp-content/uploads/2024/10/0.jpg" },
  { id: 7, name: "Slim Fit Trousers", price: "75.00", image: "https://stitched-lb.com/wp-content/uploads/2024/09/brigade-blazer-600289.webp" },
  { id: 8, name: "Summer Floral Dress", price: "130.00", image: "https://via.placeholder.com/150" },
  { id: 9, name: "Classic Leather Jacket", price: "250.00", image: "https://via.placeholder.com/150" },
  { id: 10, name: "Basic White Tee", price: "30.00", image: "https://via.placeholder.com/150" },
  { id: 11, name: "Wool Overcoat", price: "300.00", image: "https://via.placeholder.com/150" },
  { id: 12, name: "Casual Joggers", price: "85.00", image: "https://via.placeholder.com/150" },
  { id: 13, name: "Striped Polo Shirt", price: "55.00", image: "https://via.placeholder.com/150" },
  { id: 14, name: "Elegant Evening Gown", price: "400.00", image: "https://via.placeholder.com/150" },
  { id: 15, name: "Chic Blazer", price: "220.00", image: "https://via.placeholder.com/150" },
];

const Shop: React.FC = () => {
  return (
    <div className="shop-page">
      <Header />
      
      <div className="shop-container">
        {/* Sidebar */}
        <div className="sidebar">
          <FilterSidebar />
        </div>

        {/* Product List */}
        <div className="main-content">
          <h1>Clothing</h1>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
