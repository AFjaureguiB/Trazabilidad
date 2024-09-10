import { getLogs } from "../services/logInfo.service.js";

export const fetchLogs = async (req, res) => {
  try {
    const logs = await getLogs();

    // Procesar cada línea de log y extraer la parte JSON
    const logEntries = logs
      .split("\n")
      .filter((entry) => entry)
      .map((log) => {
        // Extraer la parte JSON de la línea del log
        const jsonString = log
          .substring(log.indexOf("Updated Data:") + 13)
          .trim();
        return {
          timestamp: log.substring(0, 19), // Fecha y hora del log
          info: log.split("[")[1].split("]")[0], // Nivel de log (info)
          user: log.match(/User: (\w+)/)[1], // Extraer el usuario
          role: log.match(/Role: (\w+)/)[1], // Extraer el rol
          process: log.match(/Process: (.+?) \|/)[1], // Extraer el proceso
          action: log.match(/Action: (.+?) \|/)[1], // Extraer la acción
          updatedData: JSON.parse(jsonString), // Parsear la parte JSON
        };
      });

    res.json({ logs: logEntries });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving logs", error: error.message });
  }
};

/* Separación del log: Se dividen los logs por línea con split('\n').
Extracción del JSON: Se usa substring para localizar la parte que contiene "Updated Data: {...}", y luego se usa JSON.parse para extraer la parte de datos actualizados como objeto JSON.
Otras partes del log: Se usa match para extraer otras partes como el usuario, el rol, el proceso, y la acción. */
