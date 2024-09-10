import { useEffect, useState } from "react";
import { getLogs } from "../services/logs.service"; // Importa el servicio para obtener los logs

const Administration = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs(); // Llama a la función para obtener los logs cuando el componente se monta
  }, []);

  const fetchLogs = async () => {
    const res = await getLogs(); // Llama al servicio para obtener los logs
    setLogs(res); // Establece los logs en el estado
  };

  // Función para formatear los datos de "Datos"
  const formatUpdatedData = (data) => {
    return Object.entries(data)
      .map(([key, value]) => {
        return `${key}: Se cambió ${value.prevValue} por ${value.newValue}`;
      })
      .join("\n"); // Utilizamos un salto de línea para que cada dato esté en una nueva línea
  };

  return (
    <div className=" relative flex items-center justify-center p-6">
      <div className="flex items-center justify-center rounded-xl border-red-500 border-2">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Logs
        </h2>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Fecha</th>
              <th className="px-6 py-3">Tipo</th>
              <th className="px-6 py-3">Usuario</th>
              <th className="px-6 py-3">Rol</th>
              <th className="px-6 py-3">Proceso</th>
              <th className="px-6 py-3">Acción</th>
              <th className="px-6 py-3">Datos</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4">{log.info}</td>
                  <td className="px-6 py-4">{log.user}</td>
                  <td className="px-6 py-4">{log.role}</td>
                  <td className="px-6 py-4">{log.process}</td>
                  <td className="px-6 py-4">{log.action}</td>
                  <td className="px-6 py-4 whitespace-pre-wrap">
                    {formatUpdatedData(log.updatedData)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No logs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Administration;
