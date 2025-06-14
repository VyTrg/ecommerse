import React, { useEffect, useState } from 'react';
import '../styles/RegisterForm.css';  // Ensure the correct path to your CSS file
import { Link } from 'react-router-dom';
import Notification from '../components/Notification';

const RegisterForm: React.FC = () => {
  // Local state for handling form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  // Tự động ẩn sau 3 giây
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);
  const handleRegister = () => {
    // Example: Handle registration logic here (e.g., API call)
    if (password !== confirmPassword) {
      setNotification({ message: 'Passwords do not match!', type: 'error' });
      return;
    }
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="register-section">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <h2>REGISTER</h2>
      <p>
        Creating an account allows you to access your order status and history. Fill in the fields below to sign up.
        We will only ask for necessary information to make the purchase process faster and easier.
      </p>

      <form className="register-form" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
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

        {/* Email Input */}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="Enter your email" 
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

        {/* Confirm Password Input */}
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            placeholder="Confirm your password" 
          />
           <p>If you have an account, <Link to="/login">login here</Link></p>
        </div>

        {/* Register Button */}
        <button type="submit" className="register-btn">REGISTER</button>
      </form>
    </div>
  );
};

export default RegisterForm;