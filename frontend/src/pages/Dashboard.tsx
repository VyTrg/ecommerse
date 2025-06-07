import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";

const AdminDashboard: React.FC = () => {
  const [type, setType] = useState("day");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10)); // yyyy-MM-dd

  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    orders: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log(sessionStorage.getItem('token'));
        const [catRes, userRes] = await Promise.all([
          fetch("http://localhost:3001/api/categories",{
            headers:{"Authorization": 'Bearer ' + sessionStorage.getItem('token') || ''}
          }),
          fetch("http://localhost:3001/api/users", {
            headers:{"Authorization":'Bearer ' +  sessionStorage.getItem('token') || ''}
          }),
        ]);

        const [catData, userData] = await Promise.all([
          catRes.json(),
          userRes.json(),
        ]);

       setStats(prev => ({
          ...prev,
          categories: catData.length,
          users: userData.length,
        }));
      } catch (err) {
        console.error("Failed to load statistics:", err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, orderRes] = await Promise.all([
          fetch(`http://localhost:3001/api/statistics/products?type=${type}&date=${date}`,{
            headers: {"Authorization": `Bearer ${sessionStorage.getItem('token')}`}
          }),
          fetch(`http://localhost:3001/api/statistics/orders?type=${type}&date=${date}`,
              {
            headers: {"Authorization": `Bearer ${sessionStorage.getItem('token')}`}
          }),
        ]);

        const prodData = await prodRes.json();
        const orderData = await orderRes.json();

        setStats(prev => ({
          ...prev,
          products: prodData.totalInStock || 0, // nếu backend trả về { totalInStock: ... }
          orders: orderData.totalOrders || 0,
        }));

      } catch (err) {
        setStats(prev => ({
          ...prev,
          products: 0,
          orders: 0,
        }));
        console.error("Failed to load statistics:", err);
      }
    };

    fetchStats();
  }, [type, date]);
  
  return (
    <div className="dashboard-container">
      <h1>Welcome to the Admin Dashboard</h1>
      
      <div className="dashboard-filter">
        <select
          className="dashboard-select"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        <input
          className="dashboard-input"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>


      <div className="stats-boxes">
        <div className="stat-box">
          <h2>Categories</h2>
          <p>{stats.categories}</p>
        </div>
        <div className="stat-box">
          <h2>Products</h2>
          <p>{stats.products}</p>
        </div>
        <div className="stat-box">
          <h2>Orders</h2>
          <p>{stats.orders}</p>
        </div>
        <div className="stat-box">
          <h2>Users</h2>
          <p>{stats.users}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
