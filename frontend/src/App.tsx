import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AccessoriesPage from "./pages/AccessoriesPage";
import "./styles/app.css";
import Home from "./pages/Home";
import Sale from "./pages/Sale";
import Footer from "./components/Footer";
import Swimwear from "./pages/Swimwear";
import ClothingPage from "./pages/ClothingPage";
import MyAccount from "./pages/MyAccount";
import ItemPage from "./pages/ItemPage";
import LoginSection from "./pages/LoginSection";
import RegisterSection from "./pages/RegisterSection";
import ShoppingCartPopup from "./components/ShoppingCartPopup";
import ForgotPassword from "./components/ForgotPassword";
import UserManagement from "./pages/Usermanangement";
import ProductManagement from "./components/ProductManagement";
import OrderManagement from "./components/OrderManagement";
import SearchResult from "./pages/SearchResult";
import { CartProvider, useCart } from "./contexts/CartContext"; // ✅ import
import CartPopupWrapper from "./components/CartPopupWrapper"; 
import "./assets/themify-icons/themify-icons.css";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";
import AdminLayout from "./components/AdminLayout";
const App = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <Navbar onCartClick={() => setCartOpen(true)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clothing" element={<ClothingPage />} />
          <Route path="/swimwear" element={<Swimwear />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/myaccount/*" element={<MyAccount />} />
          <Route path="/item/*" element={<ItemPage />} />
          <Route path="/login" element={<LoginSection />} />
          <Route path="/signup" element={<RegisterSection />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="products" element={<ProductManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>

        {}
        <CartPopupWrapper cartOpen={cartOpen} setCartOpen={setCartOpen} />

        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
