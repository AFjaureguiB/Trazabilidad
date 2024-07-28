import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../services/user.service";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || "";
  const isAuthenticated = user ? true : false;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    if (user.role === "ADMIN") {
      (async () => {
        const res = await getUsers();
        setUsers(res);
      })();
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, users, setUsers }}>
      {children}
    </AuthContext.Provider>
  );
}
