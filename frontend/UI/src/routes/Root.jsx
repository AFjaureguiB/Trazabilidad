import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Header from "../components/Header";
function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const { user } = useAuth();

  return (
    <>
      <header>
        <Header user={user} handleLogout={handleLogout} />
      </header>
      <Outlet />
    </>
  );
}

export default Root;
