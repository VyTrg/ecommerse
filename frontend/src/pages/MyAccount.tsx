import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import OrderList from "../components/OrderList";
import Address from "../components/Address";
import AccountDetails from "../components/AccountDetail";
import "../styles/MyAccount.css"; // Import CSS để tạo bố cục
import Breadcrumb from "../components/Breadcrumb";

import Sidebar2 from "../components/Sidebar2";

const MyAccount = () => {
    const storedUser = sessionStorage.getItem("userInfo");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?.id;
  return (
    <div className="my-account">
      <Breadcrumb title="My Account" />
      <div className="account-content">
        {/* Sidebar nằm dưới navbar */}
        <Sidebar2/>
        <div className="account-details">
          <Routes>
            <Route index element={<Navigate to="orders" />} />
            <Route path="orders" element={<OrderList userId={userId}/>} />
            <Route path="address" element={<Address />} />
            <Route path="details" element={<AccountDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
