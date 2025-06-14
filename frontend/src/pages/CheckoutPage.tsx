import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import "../styles/CheckoutPage.css";
import InvoiceButton from "../components/InvoiceButton";
import Notification from "../components/Notification";

const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");


const CheckoutPage: React.FC = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const [notification, setNotification] = useState<{
  message: string;
  type: "success" | "error";
  } | null>(null);

  const [formData, setFormData] = useState({
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    street_name: "",
    city: "",
    region: "",
    district: "",
    country: "Việt Nam",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
const handlePlaceOrder = async () => {
  const isGuest = !currentUser;

  if (
    isGuest &&
    (!formData.guest_name.trim() ||
      !formData.guest_email.trim() ||
      !formData.guest_phone.trim() ||
      !formData.street_name.trim() ||
      !formData.city.trim() ||
      !formData.region.trim() ||
      !formData.district.trim())
  ) {
    setNotification({ message: "Please fill in all shipping information.", type: "error" });
    return;
  }

  const payload: any = {
    
    order_total: total.toFixed(2),
    shipping_method_id: 1,
    order_status_id: 1,
    order_items: cart.map((item) => ({
      product_item_id: item.id,
      quantity: item.quantity.toString(),
      price: item.price.toFixed(2),
    })),
  };

  if (currentUser) {
    payload.user_id = currentUser.id;
    payload.shipping_address_id = 3;
  } else {
    payload.guest_info = {
      guest_name: formData.guest_name,
      guest_email: formData.guest_email,
      guest_phone: formData.guest_phone,
      street_name: formData.street_name,
      city: formData.city,
      region: formData.region,
      district: formData.district,
      country: formData.country,
    };
  }

  try {
    const res = await fetch("http://localhost:3001/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to order");

    setNotification({ message: "Order placed successfully!", type: "success" });

const createdOrder = await res.json();
console.log("ORDER CREATED:", createdOrder);

    
    const orderForPdf = {
      customerName: isGuest ? formData.guest_name : currentUser.name,
      orderId: "ORD-" + createdOrder.order.id,
      total: total,
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    
    const invoiceRes = await fetch("http://localhost:3001/api/invoice/generate-invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderData: orderForPdf }),
    });

    if (!invoiceRes.ok) throw new Error("Failed to generate invoice");

    const blob = await invoiceRes.blob();
    const url = URL.createObjectURL(blob);
    window.open(url);

    clearCart(); 

  } catch (err) {
    setNotification({ message: "Failed to generate invoice.", type: "error" });
    console.error(err);
  }
};


  return (
    <div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="checkout-page">
        <h2>Checkout</h2>

        {cart.length === 0 ? (
          <p>🛒 Your cart is empty.</p>
        ) : (
          <>
            {!currentUser && (
              <div className="checkout-form">
                <h3>Shipping Information</h3>

                <label>Full Name:</label>
                <input
                  type="text"
                  value={formData.guest_name}
                  onChange={(e) => handleInputChange("guest_name", e.target.value)}
                />

                <label>Email:</label>
                <input
                  type="email"
                  value={formData.guest_email}
                  onChange={(e) => handleInputChange("guest_email", e.target.value)}
                />

                <label>Phone Number:</label>
                <input
                  type="text"
                  value={formData.guest_phone}
                  onChange={(e) => handleInputChange("guest_phone", e.target.value)}
                />

                <label>Street Address:</label>
                <input
                  type="text"
                  value={formData.street_name}
                  onChange={(e) => handleInputChange("street_name", e.target.value)}
                />

                <label>District:</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                />

                <label>City:</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />

                <label>Region:</label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => handleInputChange("region", e.target.value)}
                />

                <label>Country:</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                />
              </div>
            )}

            <ul className="checkout-list">
              {cart.map((item) => (
                <li key={item.id} className="checkout-item">
                  <img src={item.image} alt={item.name} className="checkout-img" />
                  <div className="checkout-info">
                    <h4>{item.name}</h4>
                    <p>{item.price.toLocaleString()}₫</p>
                    <div className="quantity-control">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="checkout-summary">
              <strong>Total:</strong> <span>{total.toLocaleString()}₫</span>
            </div>

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Order
            </button>
           
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
