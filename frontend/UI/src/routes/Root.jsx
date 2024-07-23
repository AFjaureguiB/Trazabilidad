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
    <div>
      <div className="space-y-4">
        {/* <div>
          <h1>Aqui deberia ir un header</h1>
          <p>Estas logeado como: {user.username}</p>
          <p>El rol es: {user.role}</p>
          <p>Pertenece al proceso: {user.process}</p>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleLogout}
        >
          Cerrar sesion
        </button> */}
        <Header user={user} handleLogout={handleLogout}/>
      </div>
      <Outlet />
    </div>
  );
}

export default Root;
