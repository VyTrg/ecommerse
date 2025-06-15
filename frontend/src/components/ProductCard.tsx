import "../styles/productcard.css";
import "../styles/global.css";
import React from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  img: string;
  price: number;
  discountPrice?: number;
  isOnSale?: boolean;
};

type Props = {
  product: Product;
  onBuy?: () => void;
};

const ProductCard: React.FC<Props> = ({ product, onBuy }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">
      <img
        src={product.img}
        alt={product.name}
        className="product-image"
        onClick={goToDetail}
        style={{ cursor: "pointer" }}
      />

      <div className="product-info">
        <p
          className="product-name"
          onClick={goToDetail}
          style={{ cursor: "pointer" }}
        >
          {product.name}
        </p>
        <p className="product-price">
          {product.isOnSale ? (
            <>
              <span style={{ textDecoration: 'line-through', color: '#999' }}>
                {product.price.toLocaleString()}₫
              </span>
              <br />
              <span style={{ color: '#e44d26', fontWeight: 'bold' }}>
                {product.discountPrice?.toLocaleString()}₫
              </span>
              <span style={{
                backgroundColor: '#e44d26',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                marginLeft: '8px',
                fontWeight: 'bold'
              }}>SALE</span>
            </>
          ) : (
            <span>{product.price.toLocaleString()}₫</span>
          )}
        </p>
      </div>

      <button className="buy-btn" onClick={onBuy}>
        BUY NOW
      </button>
    </div>
  );
};

export default ProductCard;