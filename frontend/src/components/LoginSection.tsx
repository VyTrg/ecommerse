// src/components/LoginSection.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link từ React Router
import '../styles/LoginSection.css';

const LoginSection: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Xử lý đăng nhập tại đây
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-section">
      <h2>LOGIN</h2>
      <p>
        Login for this site allows you to access your order status and
        history. Just fill in the fields below, and we'll get a new account
        set up for you in no time. We will only ask you for information
        necessary to make the purchase process faster and easier.
      </p>

      <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        {/* Username Input */}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            placeholder="Enter your username" 
          />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="Enter your password" 
          />
        </div>

        {/* Login Button */}
        <button type="submit" className="login-btn">LOGIN</button>
        
        {/* Link đến trang đăng ký */}
        <p style={{ color: 'black' }}>If you don't have an account, <Link to="/register">register here</Link></p>
      </form>
    </div>
  );
};

export default LoginSection;
