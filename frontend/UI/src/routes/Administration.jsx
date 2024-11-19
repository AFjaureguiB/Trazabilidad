import { useEffect, useState } from "react";
import { getLogs } from "../services/logs.service"; // Importa el servicio para obtener los logs
import LogsTableAdministration from "../components/LogsTableAdministration";
import Tabs from "../components/Tabs.jsx";
import AdminUsersCard from "../components/AdminUsersCard.jsx";
import { userRoles } from "../constants/user.roles.js";
import { useAuth } from "../context/AuthContext.jsx";
import Plus from "../components/icons/Plus.jsx";
import AdminUserForm from "../components/AdminUserForm.jsx";
import { getUsersAdmin } from "../services/user.service.js";

const Administration = () => {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);

  const [userAdminData, setUserAdminData] = useState({
    showUserAdminModal: false,
    userAdmin: undefined,
  });

  const { user } = useAuth();

  useEffect(() => {
    fetchLogs();
    fetchUsers();
  }, []);

  const fetchLogs = async () => {
    const res = await getLogs();
    setLogs(res);
  };

  const fetchUsers = async () => {
    const res = await getUsersAdmin();
    setUsers(res);
  };

  return (
    <div className="mt-4">
      <Tabs>
        <Tabs.Item title="Logs">
          <LogsTableAdministration logs={logs} />
        </Tabs.Item>
        <Tabs.Item title="Usuarios Admin">
          {user.role === userRoles.ROOT ? (
            <div className="my-4">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 flex gap-2 items-center"
                onClick={() =>
                  setUserAdminData({
                    showUserAdminModal: true,
                    userAdmin: undefined,
                  })
                }
              >
                <Plus className={"size-6"} />
                Usuario
              </button>
            </div>
          ) : null}
          <AdminUsersCard users={users} setUserAdminData={setUserAdminData} />
        </Tabs.Item>
      </Tabs>
      <AdminUserForm
        userAdminData={userAdminData}
        setUserAdminData={setUserAdminData}
        fetchUsers={fetchUsers}
      />
    </div>
  );
};

export default Administration;
