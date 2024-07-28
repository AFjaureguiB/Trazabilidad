import { useAuth } from "../context/AuthContext";
import UsersCard from "../components/UsersCard";

function App() {

  const { user, users } = useAuth();

  if (user.role === "ADMIN") {
    return <UsersCard users={users} />;
  }

  return <p>Pagina principal para un usuario normal</p>;
}

export default App;
