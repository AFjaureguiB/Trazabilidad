import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Resolver la ruta en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, "../../user-activity.log");

export const getLogs = async () => {
  try {
    const data = await fs.readFile(logFilePath, "utf-8");
    return data;
  } catch (err) {
    throw new Error("Error reading log file");
  }
};
