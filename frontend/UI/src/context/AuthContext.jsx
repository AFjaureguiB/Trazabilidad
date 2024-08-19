import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { logout } from "../services/auth.service";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const isAuthenticated = user ? true : false;

  const token = localStorage.getItem("accestkn") || "";
  const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

  const isValidToken = token ? jwtDecode(token).exp > currentTime : false;

  useEffect(() => {
    if (!isAuthenticated || !isValidToken) {
      logout();
      navigate("/auth");
      return;
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
