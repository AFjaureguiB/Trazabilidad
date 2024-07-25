import { useEffect, useState } from "react";
import { getUsers } from "../services/user.service";
import { useAuth } from "../context/AuthContext";
import UsersCard from "../components/UsersCard";

function App() {
  const [users, setUsers] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    if (user.role !== "ADMIN") return;
    (async () => {
      const res = await getUsers();
      setUsers(res);
    })();
  }, []);

  if (user.role === "ADMIN") {
    return <UsersCard users={users} />;
  }

  return <p>Pagina principal para un usuario normal</p>;
}

export default App;
