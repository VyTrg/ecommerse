// src/pages/OrderManagement.tsx
import React, { useEffect, useState } from 'react';
import '../styles/OrderManagement.css';
import { useNavigate } from 'react-router-dom';

// Import ConfirmDialog và Notification
import ConfirmDialog from '../components/ConfirmDialog';
import Notification from '../components/Notification';

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

  // State cho Notification (toast)
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  // State cho ConfirmDialog (modal xác nhận)
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);

  // 1. Lấy danh sách orders khi mount
  useEffect(() => {
    fetch('http://localhost:3001/api/orders')
      .then(res => res.json())
      .then((data: Order[]) => {
        setOrders(data);
      })
      .catch(err => {
        console.error('Error loading orders:', err);
        setNotification({ message: `Cannot load orders: ${err.message}`, type: 'error' });
      });
  }, []);

  // 2. Khi user click Delete: chỉ set orderToDelete và bật ConfirmDialog
  const handleDeleteClick = (id: number) => {
    setOrderToDelete(id);
    setShowConfirm(true);
  };

  // 3. Nếu user bấm "Yes" trong ConfirmDialog → thực sự delete
  const handleConfirmDelete = () => {
    if (orderToDelete === null) {
      setShowConfirm(false);
      return;
    }

    fetch(`http://localhost:3001/api/orders/${orderToDelete}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          setOrders(prev => prev.filter(o => o.id !== orderToDelete));
          setNotification({ message: 'Order deleted successfully!', type: 'success' });
        } else {
          console.error('Delete failed:', res.statusText);
          setNotification({ message: `Delete failed: ${res.statusText}`, type: 'error' });
        }
      })
      .catch(err => {
        console.error('Error deleting order:', err);
        setNotification({ message: `Error deleting: ${err.message}`, type: 'error' });
      })
      .finally(() => {
        setShowConfirm(false);
        setOrderToDelete(null);
      });
  };

  // 4. Nếu user bấm "No" → ẩn ConfirmDialog
  const handleCancelDelete = () => {
    setShowConfirm(false);
    setOrderToDelete(null);
  };

  // 5. Điều hướng tới trang Detail
  const goToDetail = (id: number) => {
    navigate(`/admin/orders/${id}`);
  };

  // 6. Cập nhật trạng thái đơn hàng (giữ nguyên logic trước)
  const updateOrderStatus = (orderId: number, newStatus: string) => {
    fetch(`http://localhost:3001/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(async res => {
        if (!res.ok) {
          let msg = `Server responded with ${res.status}`;
          try {
            const errJson = await res.json();
            if (errJson?.message) msg += `: ${errJson.message}`;
          } catch {}
          throw new Error(msg);
        }
        return res.json();
      })
      .then((resp: any) => {
        const updated = resp.order;
        if (!updated || !updated.orderStatus) {
          console.error('Unexpected response format:', resp);
          setNotification({ message: 'Unexpected server response.', type: 'error' });
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
                  },
                }
              : o
          )
        );
        setNotification({ message: 'Status updated successfully!', type: 'success' });
      })
      .catch(err => {
        console.error('Error updating order status:', err);
        setNotification({ message: `Cannot update status: ${err.message}`, type: 'error' });
      });
  };

  return (
    <div className="order-container">
      {/* Render Notification nếu có */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Render ConfirmDialog nếu showConfirm === true */}
      <ConfirmDialog
        visible={showConfirm}
        message="Are you sure you want to delete this order?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

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
                  onClick={() => handleDeleteClick(order.id)}
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