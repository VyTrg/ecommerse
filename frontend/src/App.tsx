// src/App.tsx
import React from 'react';
import './App.css';
import Header from './components/Header';
import RegisterForm from './components/RegisterForm';
import LoginSection from './components/LoginSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="register-container">
        <RegisterForm />
        <LoginSection />
      </div>
      <Footer />
    </div>
  );
};

export default App;
