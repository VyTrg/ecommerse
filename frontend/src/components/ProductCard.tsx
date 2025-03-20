import React from 'react';
import '../styles/ProductCard.css';

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{product.price} $</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
