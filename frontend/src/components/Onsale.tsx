import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Onsale.css';
import ProductCard from './ProductCard';
import ShoppingCartPopup from './ShoppingCartPopup';
import { useCart } from '../contexts/CartContext';

interface ProductPromotion {
  promotion: {
    discount_rate: number;
    start_at: string;
    end_at: string;
  };
}

interface ProductItem {
  price: number;
  images?: { image_url?: string }[];
}

interface Product {
  id: number;
  name: string;
  category_id: number;
  productItems: ProductItem[];
  productPromotions: ProductPromotion[];
}

// Thay các số dưới đây bằng category_id thực tế của bạn
const CATEGORY_MAP: Record<string, number[]> = {
  clothing: [1], // ví dụ: 1 là id của clothing
  swimwear: [2],
  accessories: [3],
};

const OnSale: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<'clothing' | 'swimwear' | 'accessories'>('clothing');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, cart, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    (async () => {
      try {
        let res = await fetch('http://localhost:3001/api/products/sale');
        if (!res.ok) res = await fetch('http://localhost:3001/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setAllProducts(Array.isArray(data) ? data : data.data);
      } catch (err) {
        console.error('Error loading products:', err);
      }
    })();
  }, []);

  const now = new Date();
  const saleProducts = allProducts.filter(
    p => p.productPromotions?.some(
      pp => pp.promotion && pp.promotion.discount_rate > 0 &&
        new Date(pp.promotion.start_at) <= now &&
        new Date(pp.promotion.end_at) >= now
    ) && CATEGORY_MAP[selectedCategory].includes(p.category_id)
  );

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleBuyNow = (product: Product) => {
    const price = product.productItems?.[0]?.price ?? 0;
    const discountRate = product.productPromotions?.[0]?.promotion?.discount_rate ?? 0;
    const newPrice = discountRate > 0 ? Math.round(price * (1 - discountRate)) : price;
    const img = product.productItems?.[0]?.images?.[0]?.image_url || '';
    addToCart({
      id: product.id,
      name: product.name,
      price: newPrice,
      image: img,
    });
    setIsCartOpen(true);
  };

  return (
    <div className="home-container">
      <h1 className="section-title">ON SALE</h1>
      <div className="categories">
        <button onClick={() => setSelectedCategory('clothing')}>Clothing</button>
        <button onClick={() => setSelectedCategory('swimwear')}>Swimwear</button>
        <button onClick={() => setSelectedCategory('accessories')}>Accessories</button>
      </div>
      <div className="category-products">
        {saleProducts.length === 0 ? (
          <p>No products on sale in this category.</p>
        ) : (
          saleProducts.map((product) => {
            const price = product.productItems?.[0]?.price ?? 0;
            const discountRate = product.productPromotions?.[0]?.promotion?.discount_rate ?? 0;
            const newPrice = discountRate > 0 ? Math.round(price * (1 - discountRate)) : price;
            const img = product.productItems?.[0]?.images?.[0]?.image_url || '';

            return (
              <div className="product-item" key={product.id}>
                <ProductCard
                  product={{
                    id: product.id,
                    name: product.name,
                    img: img,
                    price: price,
                    discountPrice: newPrice,
                    isOnSale: discountRate > 0,
                  }}
                  onBuy={() => handleBuyNow(product)}
                />
              </div>
            );
          })
        )}
      </div>
      <ShoppingCartPopup
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  );
};

export default OnSale;