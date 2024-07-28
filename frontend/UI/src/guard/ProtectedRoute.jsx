import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  if (user.role !== "ADMIN") {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default ProtectedRoute;
