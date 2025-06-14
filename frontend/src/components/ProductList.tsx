import React, { useEffect, useState } from "react";
import "../styles/ProductList.css";
import ProductCard from "./ProductCard";
import ShoppingCartPopup from "./ShoppingCartPopup";
import { useCart } from "../contexts/CartContext";

export type ProductItem = {
  id: number;
  price: number;
  images: {
    image_url?: string;
 
  }[];
  product: {
    name: string;
    category_id: number;
  };
};

interface ProductListProps {
  categoryIds: number[];
  page: number;
  limit: number;
  onTotalCountChange?: (n: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  categoryIds,
  page,
  limit,
  onTotalCountChange,
}) => {
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    console.log("📦 categoryIds prop received:", categoryIds);

    if (!categoryIds || categoryIds.length === 0) {
      console.warn("⚠️ categoryIds is empty — skipping fetch.");
      setProductItems([]);
      return;
    }

    fetch("http://localhost:3001/api/product-items")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product items.");
        return res.json();
      })
      .then((data: ProductItem[]) => {
        console.log("Fetched all products:", data);

        const filtered = data.filter(
          (item) =>
            item &&
            item.product &&
            typeof item.product.category_id === "number" &&
            categoryIds.includes(item.product.category_id)
        );

        console.log("Filtered products to display:", filtered);
        setProductItems(filtered);
        onTotalCountChange?.(filtered.length);
      })
      .catch((err) => console.error("Error loading product items:", err));
  }, [categoryIds, onTotalCountChange]);

  const start = (page - 1) * limit;
  const currentItems = productItems.slice(start, start + limit);

  const handleBuyNow = (item: ProductItem) => {
    const image = item.images?.[0];
    const imageUrl = image?.image_url || "/fallback.jpg";

    addToCart({
      id: item.id,
      name: item.product.name,
      price: item.price,
      image: imageUrl,
    });
    setIsCartOpen(true);
  };

  return (
    <div className="product-list-container">
      <div className="product-container">
        {currentItems.length === 0 ? (
          <p className="no-product">No matching products found.</p>
        ) : (
          currentItems.map((item) => {
            const image = item.images?.[0];
            const imageUrl =  image?.image_url || "/fallback.jpg";

            return (
              <ProductCard
                key={item.id}
                product={{
                  id: item.id,
                  name: item.product.name,
                  img: imageUrl,
                  price: item.price,
                }}
                onBuy={() => handleBuyNow(item)}
              />
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

export default ProductList;
