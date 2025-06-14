import React, { useEffect } from "react";
import Notification from "../components/Notification";
import { useState } from "react";

interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface OrderData {
  customerName: string;
  orderId: string;
  total: number;
  items: Item[];
}

interface Props {
  id: number;
}


const InvoiceButton: React.FC<Props> = ({ id }) => {
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);
  const handleDownloadInvoice = async () => {
    try {
      const res = await fetch(`http://localhost:3001/admin/api/orders/${id}`);
      const data = await res.json();

      if (!data || !Array.isArray(data.orderItems)) {
        console.error("Invalid order data:", data);
        setNotification({
          message: "Failed to create invoice",
          type: "error",
        });
        return;
      }

      const customerName =
        data.user?.fullName || data.guest_name || "Customer";

      const orderForPdf: OrderData = {
        customerName,
        orderId: "ORD-" + id,
        total: data.order_total || 0,
        items: data.orderItems.map((item: any) => ({
          name: item.productItem?.product?.name || "Unknown Product",
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price),
        })),
      };

      const response = await fetch(
        "http://localhost:3001/api/invoice/generate-invoice",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderData: orderForPdf }),
        }
      );

      if (!response.ok) throw new Error("Failed to create invoice");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (error) {
      console.error("Error creating invoice:", error);
      setNotification({
        message: "Failed to create invoice. Check logs for details.",
        type: "error",
      });
    }
  };

  return (
    <>
      <button onClick={handleDownloadInvoice}>Print Invoice</button>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default InvoiceButton;
