import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Registration from "../components/Registration";
import Dashboard from "../components/Dashboard";
import Auth from "../auth/auth";

const Index = () => {
  // Routes
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route
        path="/dashboard"
        element={
          <Auth>
            <Dashboard />
          </Auth>
        }
      />
    </Routes>
  );
};

export default Index;
