// src/components/Clothing.tsx
import React from "react";
import "../styles/Clothing.css"; // Import CSS

// Định nghĩa kiểu dữ liệu cho sản phẩm
type Product = {
  name: string;
  price: number;
  imageUrl: string;
};

// Dữ liệu sản phẩm
const products: Product[] = [
  { name: "Dawn Cardigan - Dalya Skirt", price: 335.0, imageUrl: "https://stitched-lb.com/wp-content/uploads/2024/10/384049KNT-DawnCardigan_2_-min_900x-320x491.webp" },
  { name: "Freesia Ivory", price: 99.0, imageUrl: "https://stitched-lb.com/wp-content/uploads/2024/10/Screenshot-2024-10-28-004824-320x605.png" },
  // Thêm sản phẩm khác nếu cần
];

const Clothing: React.FC = () => {
  return (
    <div className="clothing-container">
      <h2>Clothing</h2>
      <div className="products">
        {products.map((product, index) => (
          <div className="product" key={index}>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clothing;
