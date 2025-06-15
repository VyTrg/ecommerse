import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/SearchResult.css";

interface ProductPromotion {
  promotion: {
    discount_rate: number;
    start_at: string;
    end_at: string;
  };
}

interface ProductItem {
  price: number;
  images: {
    image_url: string;
  }[];
}

interface Product {
  id: number;
  name: string;
  productItems: ProductItem[];
  productPromotions?: ProductPromotion[];
}

const API_URL = "http://localhost:3001";

const SearchResult = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search).get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/products/search?q=${encodeURIComponent(query.trim())}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load data from the server.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="search-result-container">
      <h2 className="title">Search results for: "{query}"</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => {
                const firstItem = product.productItems?.[0];
                const firstImage = firstItem?.images?.[0];
                const imageUrl = firstImage?.image_url?.trim() || "/default.jpg";
                const price = firstItem?.price ?? 0;

                let discountRate = 0;
                let newPrice = price;
                let isOnSale = false;

                if (product.productPromotions) {
                  const now = new Date();
                  const validPromotion = product.productPromotions.find(
                    (pp) =>
                      pp.promotion &&
                      pp.promotion.discount_rate > 0 &&
                      new Date(pp.promotion.start_at) <= now &&
                      new Date(pp.promotion.end_at) >= now
                  );

                  if (validPromotion) {
                    discountRate = validPromotion.promotion.discount_rate;
                    newPrice = Math.round(price * (1 - discountRate));
                    isOnSale = true;
                  }
                }

                return (
                  <div
                    className={`product-card ${isOnSale ? 'sale-product' : ''}`}
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                  >
                    {isOnSale && <div className="sale-badge">SALE</div>}
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="product-image"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/default.jpg";
                      }}
                    />
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">
                      {isOnSale ? (
                        <>
                          <span className="original-price">
                            {price.toLocaleString()}₫
                          </span>
                          <span className="discount-price">
                            {newPrice.toLocaleString()}₫
                          </span>
                        </>
                      ) : (
                        <span className="regular-price">
                          {price.toLocaleString()}₫
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResult;
