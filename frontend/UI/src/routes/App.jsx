import { useAuth } from "../context/AuthContext";
import AdminLayout from "../components/AdminLayout";
import { userRoles } from "../constants/user.roles.js";
import { userProcesses } from "../constants/user.processes.js";
import { Navigate } from "react-router-dom";

function App() {
  const { user } = useAuth();

  if (user.role === userRoles.ADMIN) {
    return <AdminLayout />;
  }

  if (user.processId === userProcesses.DONANTES_TEJIDOS)
    return <Navigate to="/donors" />;

  return <p>Pagina principal para un usuario normal</p>;
}

export default App;
