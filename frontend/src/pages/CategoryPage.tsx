import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import "../styles/CategoryPage.css";
import { useCart } from "../contexts/CartContext"; 

type ProductItem = {
  id: number;
  price: number;
  images?: { image_url?: string }[];
  product: {
    name: string;
    category_id: number;
    productPromotions?: any[];
  };
};

type Product = {
  id: number;
  name: string;
  productItems: ProductItem[];
};

export default function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    if (categoryName) {
      setLoading(true);
      fetch(`http://localhost:3001/api/products?category=${categoryName}`)
        .then((res) => {
          if (!res.ok) throw new Error("Lỗi khi lấy sản phẩm");
          return res.json();
        })
        .then((data) => setProducts(data))
        .catch((err) => console.error("Lỗi fetch:", err))
        .finally(() => setLoading(false));
    }
  }, [categoryName]);

  const handleAddToCart = (item: ProductItem) => {
    // Tính discount nếu có
    let discountRate = 0;
    let newPrice = item.price;
    if (item.product && item.product.productPromotions) {
      const now = new Date();
      const validPromotion = item.product.productPromotions.find(
        (pp: any) =>
          pp.promotion &&
          pp.promotion.discount_rate > 0 &&
          new Date(pp.promotion.start_at) <= now &&
          new Date(pp.promotion.end_at) >= now
      );
      if (validPromotion) {
        discountRate = validPromotion.promotion.discount_rate;
        newPrice = Math.round(item.price * (1 - discountRate));
      }
    }
    addToCart({
      id: item.id,
      name: item.product.name,
      price: newPrice, // Sử dụng giá đã discount
      image: item.images?.[0]?.image_url || "/fallback.jpg",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", textTransform: "uppercase" }}>
        {categoryName}
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p style={{ marginTop: "40px", color: "#666", fontSize: "18px" }}>
          🛒 There are no products in this category yet.
        </p>
      ) : (
        <div
          className="category-product-container"
          style={{ display: "flex", flexWrap: "wrap", gap: 20 }}
        >
          {products.map((product) => {
            const item = product.productItems?.[0];
            if (!item) return null;
            return (
              <div className="category-product-card" key={product.id}>
                <img src={item.images?.[0]?.image_url} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{item.price}₫</p>
                <div className="category-buy-btn">
                  <button
                    onClick={() => {
                      handleAddToCart(item);
                      alert("Item added to cart!");
                    }}
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
