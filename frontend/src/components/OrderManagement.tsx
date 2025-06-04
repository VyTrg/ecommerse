import React, { useEffect, useState } from 'react';
import '../styles/OrderManagement.css';
import { useNavigate } from 'react-router-dom';

type Order = {
  id: number;
  user: {
    id: number;
    username: string;
    phone: string;
    email: string;
  };
  order_total: number;
  orderStatus: {
    id: number;
    status: string;
  } | null;
  orderDate: string;
};

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  // 1. Lấy danh sách order khi component mount
  useEffect(() => {
    fetch('http://localhost:3001/api/orders')
      .then(res => res.json())
      .then((data: Order[]) => {
        console.log('Orders from API:', data);
        setOrders(data);
      })
      .catch(err => console.error('Error loading orders:', err));
  }, []);

  // 2. Xóa order
  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }
    fetch(`http://localhost:3001/api/orders/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          setOrders(prev => prev.filter(o => o.id !== id));
        } else {
          console.error('Delete failed:', res.statusText);
        }
      })
      .catch(err => console.error('Error deleting order:', err));
  };

  // 3. Điều hướng tới trang Detail
  const goToDetail = (id: number) => {
    navigate(`/admin/orders/${id}`);
  };

  // 4. Cập nhật trạng thái đơn hàng
  const updateOrderStatus = (orderId: number, newStatus: string) => {
    fetch(`http://localhost:3001/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(async res => {
        if (!res.ok) {
          // Nếu server trả 400 hoặc 404 hoặc 500, cố parse body để lấy message
          let msg = `Server responded with ${res.status}`;
          try {
            const errJson = await res.json();
            if (errJson?.message) {
              msg += `: ${errJson.message}`;
            }
          } catch {
            // Nếu không parse được JSON, cứ dùng msg hiện tại
          }
          throw new Error(msg);
        }
        // Nếu status code là 2xx, parse JSON tiếp
        return res.json();
      })
      .then((resp: any) => {
  // resp có dạng { message: "...", order: { id, orderStatus: { id, status } } }
  const updated = resp.order;
  if (!updated || !updated.orderStatus) {
    // Nếu backend trả thiếu order hoặc orderStatus, ta chỉ log ra và không update state
    console.error('Unexpected response format:', resp);
    return;
  }
          setOrders(prev =>
            prev.map(o =>
              o.id === orderId
                ? {
                    ...o,
                    orderStatus: {
                      id: updated.orderStatus!.id,
                      status: updated.orderStatus!.status,
                    }
                  }
                : o
            )
          );
        })

      .catch(err => {
        console.error('Error updating order status:', err);
        alert(`Không thể cập nhật trạng thái:\n${err.message}`);
      });
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
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user.username}</td>
              <td>{order.order_total.toLocaleString()}₫</td>
              <td>
                <select
                  value={order.orderStatus?.status ?? ''}
                  onChange={e => updateOrderStatus(order.id, e.target.value)}
                >
                  {/* Nếu bạn muốn có dòng placeholder khi status=null, bỏ comment phần dưới */}
                  {/* <option value="" disabled>
                    -- Select Status --
                  </option> */}
                  <option value="Shipping">Shipping</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>{new Date(order.orderDate).toLocaleString('vi-VN')}</td>
              <td>
                <button
                  className="order-button btn-detail"
                  onClick={() => goToDetail(order.id)}
                >
                  Detail
                </button>
                <button
                  className="order-button btn-delete"
                  onClick={() => handleDelete(order.id)}
                >
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
