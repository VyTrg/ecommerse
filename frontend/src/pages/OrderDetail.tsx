import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/OrderDetail.css';


interface OrderItem {
  id: number;
  productItem: {
    id: number;
    product: {
      id: number;
      name: string;
    };
  };
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  user: {
    id: number;
    username: string;
    phone: string;
    email: string;
  };
  shippingAddress: {
    id: number;
    street_name: string;
    city: string;
  };
  shippingMethod?: {
    id: number;
    name: string;
    price: number;
  };
  orderStatus?: {
    id: number;
    status: string;
  };
  orderDate: string;
  order_total: number;
  orderItems: OrderItem[];
}

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3001/api/orders/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data: Order) => setOrder(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading order details…</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!order) return <p>Order not found.</p>;

  const itemsTotal = order.orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const shippingFee = order.shippingMethod?.price ?? 0;

  const total = itemsTotal + shippingFee;
  return (
    <div className="order-detail-container">
      <button onClick={() => navigate(-1)} className="btn-back">Back</button>

      <h1>Order Details #{order.id}</h1>
      <section className="customer-info">
        <h2>Customer Info</h2>
        <p>Username: {order.user?.username ?? 'Unknown'}</p>
        <p>Email: {order.user?.email ?? 'Unknown'}</p>
        <p>Phone: {order.user?.phone ?? 'Unknown'}</p>
      </section>

      <section className="shipping-info">
        <h2>Shipping Address</h2>

        {order.shippingAddress ? (
          <p>
            {order.shippingAddress.street_name}, {order.shippingAddress.city}
          </p>
        ) : (
          <p>No shipping address provided</p>
        )}

        <p>Method: {order.shippingMethod?.name ?? '—'}</p>
        <p>
          Price:{' '}
          {order.shippingMethod?.price != null
            ? `${order.shippingMethod.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}`
            : '—'}
        </p>
      </section>


      <section className="status-info">
        <h2>Status</h2>
        <p>{order.orderStatus?.status ?? 'Not updated'}</p>
        <p>Order Date: {new Date(order.orderDate).toLocaleString('vi-VN')}</p>
      </section>

      {<section className="items-info">
        <h2>Items</h2>
        <table className="items-table">
          <thead>
            <tr>
              <th> </th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.productItem.product.name }</td> 
                <td>{item.quantity}</td>
                <td>{item.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                <td>{(item.quantity * item.price).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section> }

      <footer className="order-total">
      <h2>Total: {total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</h2>
    </footer>
    </div>
  );
};

export default OrderDetailPage;
