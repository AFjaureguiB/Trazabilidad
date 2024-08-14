import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  userRolesAllowed,
  userProcessIdAllowed,
  children,
}) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  if (userRolesAllowed.every((role) => user.role !== role)) {
    return <Navigate to="/unauthorized" />;
  }

  if (user.processId !== userProcessIdAllowed) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
