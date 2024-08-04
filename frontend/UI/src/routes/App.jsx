import { useAuth } from "../context/AuthContext";
import AdminLayout from "../components/AdminLayout";
function App() {
  const { user } = useAuth();
  if (user.role === "ADMIN") {
    return <AdminLayout />;
  }

  return <p>Pagina principal para un usuario normal</p>;
}

export default App;
