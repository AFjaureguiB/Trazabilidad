import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { writeFile } from "fs/promises";

export async function savefile(fileName, fileBuffer) {
  try {
    // Obtener el directorio actual del archivo
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Configura la ruta para guardar el archivo en la carpeta 'public/uploads'
    const storagePath = join(
      __dirname,
      "../../public/consentimiento-informado"
    );
    const filePath = join(storagePath, fileName);

    // Guardar el archivo en el sistema de archivos
    await writeFile(filePath, fileBuffer);

    return [`Archivo guardado exitosamente`, null];
  } catch (error) {
    [null, "Error al guardar el archivo"];
  }
}
