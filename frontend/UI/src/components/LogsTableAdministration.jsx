import { useCallback } from "react";

/* eslint-disable react/prop-types */
export default function LogsTableAdministration({ logs }) {
  // Función para formatear los datos de "Datos"
  const formatUpdatedData = useCallback((data) => {
    return Object.entries(data)
      .map(([key, value]) => {
        if (key === "testName") return `${key}: ${value}`;
        return `${key}: Se cambió ${value.prevValue} por ${value.newValue}`;
      })
      .join("\n"); // Utilizamos un salto de línea para que cada dato esté en una nueva línea
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
              <tr key={index} className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
  );
}
