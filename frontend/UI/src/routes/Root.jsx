import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const { user } = useAuth();

  return (
    <>
      <ToastContainer />
      <header>
        <Header
          user={user}
          handleLogout={handleLogout}
          setShowUpdatePasswordForm={setShowUpdatePasswordForm}
        />
      </header>
      <Outlet />
      <UpdatePasswordForm
        showUpdatePasswordForm={showUpdatePasswordForm}
        setShowUpdatePasswordForm={setShowUpdatePasswordForm}
      />
    </>
  );
}

export default Root;
