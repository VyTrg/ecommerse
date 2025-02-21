
import React from 'react';
import '../styles/LoginSection.css';  // Đường dẫn chính xác nếu file CSS nằm trong thư mục styles


const LoginSection: React.FC = () => {
  return (
    <div className="login-section">
      <h2>LOGIN</h2>
      <p>
        Registering for this site allows you to access your order status and
        history. Just fill in the fields below, and we'll get a new account
        set up for you in no time. We will only ask you for information
        necessary to make the purchase process faster and easier.
      </p>
      <button className="login-btn">LOGIN</button>
    </div>
  );
};

export default LoginSection;
