

import React, { useEffect, useState } from "react";
import "../styles/ProductList.css";
import ProductCard from "./ProductCard";
import ShoppingCartPopup from "./ShoppingCartPopup";
import { useCart } from "../contexts/CartContext";
import { FilterOptions } from "./Sidebar";

export type SaleProductItem = {
  id: number;
  price: number;
  image: { image_url: string };
  product: { name: string; category_id: number };
};

interface SaleProductListProps {
  filters?: FilterOptions;
  page: number;
  limit: number;
  onTotalCountChange?: (total: number) => void;
}

const SaleProductList: React.FC<SaleProductListProps> = ({
  filters,
  page,
  limit,
  onTotalCountChange,
}) => {
  const [productItems, setProductItems] = useState<SaleProductItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3001/api/product-items");
        if (!res.ok) throw new Error("Failed to fetch sale products");
        const data: SaleProductItem[] = await res.json();
        // filter for sale items
        let filtered = data.filter(item => item.product.category_id === /* sale category id? */ item.product.category_id);
        // apply optional filters
        if (filters) {
          if (filters.minPrice) {
            filtered = filtered.filter(item => item.price >= Number(filters.minPrice));
          }
          if (filters.maxPrice) {
            filtered = filtered.filter(item => item.price <= Number(filters.maxPrice));
          }
          if (filters.color) {
            filtered = filtered.filter(
              item =>
                item["color"]?.name?.toLowerCase() === filters.color?.toLowerCase()
            );
          }
          if (filters.size) {
            filtered = filtered.filter(
              item =>
                item["size"]?.toLowerCase() === filters.size?.toLowerCase()
            );
          }
        }
        setProductItems(filtered);
        onTotalCountChange?.(filtered.length);
      } catch (err) {
        console.error("Error loading sale products:", err);
      }
    })();
  }, [filters, onTotalCountChange]);

  // pagination
  const start = (page - 1) * limit;
  const currentItems = productItems.slice(start, start + limit);

  const handleBuyNow = (item: SaleProductItem) => {
    addToCart({
      id: item.id,
      name: item.product.name,
      price: item.price,
      image: item.image.image_url,
    });
    setIsCartOpen(true);
  };

  return (
    <div className="product-list-container">
      <div className="product-container">
        {currentItems.length === 0 ? (
          <p className="no-product">No discounted products available.</p>
        ) : (
          currentItems.map(item => (
            <ProductCard
              key={item.id}
              product={{ id: item.id, name: item.product.name, img: item.image.image_url, price: item.price }}
              onBuy={() => handleBuyNow(item)}
            />
          ))
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

export default SaleProductList;
