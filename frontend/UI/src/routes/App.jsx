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

  if (user.processId === userProcesses.PRUEBAS_INFECCIOSAS)
    return <Navigate to="/infectious-tests" />;

  if (user.processId === userProcesses.PROCESAMIENTO_TEJIDOS)
    return <Navigate to="/tissue-processing" />;

  if (user.processId === userProcesses.CONTROL_CALIDAD)
    return <Navigate to="/quality-control" />;

  if (user.processId === userProcesses.DISTRIBUCION_TRAZABILIDAD)
    return <Navigate to="/distribution-logistics-and-traceability" />;

  if (user.processId === userProcesses.ROOT)
    return <Navigate to="/administration" />;

  return <p>Pagina principal para un usuario normal</p>;
}

export default App;
