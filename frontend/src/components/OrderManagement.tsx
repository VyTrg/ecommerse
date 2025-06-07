import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/OrderManagement.css';

enum OrderStatus {
  PENDING = 'pending',
  SHIPPING = 'shipping',
  COMPLETED = 'completed',
}

type Order = {
  id: number;
  user: { fullName: string } | null;
  order_total: number;
  status: string | 'pending';
  orderDate: string;
};

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('http://localhost:3001/api/orders',{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => console.error('Lỗi khi tải đơn hàng:', err));
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      fetch(`http://localhost:3001/api/orders/${id}`, { method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token') || ''
      }})
        .then((res) => {
          if (res.ok) setOrders(orders.filter((o) => o.id !== id));
        })
        .catch((err) => console.error('Lỗi khi xoá đơn hàng:', err));
    }
  };

  const handleDetail = (id: number) => {
    navigate(`/orders/${id}`);
  };

  return (
    <div className="order-container">
      <table className="order-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Order Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user?.fullName || 'Khách hàng'}</td>
              <td>{order.order_total?.toLocaleString()}₫</td>
              <td>{order.status || OrderStatus.PENDING}</td>
              <td>{new Date(order.orderDate).toLocaleString('vi-VN')}</td>
              <td>
                <button className="order-button btn-detail" onClick={() => handleDetail(order.id)}>
                  Chi tiết
                </button>
                <button className="order-button btn-delete" onClick={() => handleDelete(order.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
