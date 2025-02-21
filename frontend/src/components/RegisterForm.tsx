import React, { useState } from 'react';
import '../styles/RegisterForm.css';  // Đúng đường dẫn cho RegisterForm.css
import '../styles/Header.css';        // Đúng đường dẫn cho Header.css
import '../styles/Footer.css';        // Đúng đường dẫn cho Footer.css

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
  };

  return (
    <div className="register-form">
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" />
            I'm not a robot
          </label>
        </div>
        <button type="submit" className="submit-btn">
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
