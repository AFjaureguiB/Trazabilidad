import { useEffect, useState } from "react";
import { getLogs } from "../services/logs.service"; // Importa el servicio para obtener los logs
import LogsTableAdministration from "../components/LogsTableAdministration";
import Tabs from "../components/Tabs.jsx";

const Administration = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs(); // Llama a la función para obtener los logs cuando el componente se monta
  }, []);

  const fetchLogs = async () => {
    const res = await getLogs(); // Llama al servicio para obtener los logs
    setLogs(res); // Establece los logs en el estado
  };

  return (
    <div className="mt-4">
      <Tabs>
        <Tabs.Item title="Logs">
          <LogsTableAdministration logs={logs} />
        </Tabs.Item>
        <Tabs.Item title="Usuarios Admin"></Tabs.Item>
      </Tabs>
    </div>
  );
};

export default Administration;
