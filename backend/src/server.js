"use strict";
import path from "node:path";
import * as url from "node:url";

// Importa el archivo 'configEnv.js' para cargar las variables de entorno
import { SERVER_PORT, SERVER_HOST } from "./config/configEnv.js";

//Importa el archivo configStaticFiles.js para cargar la funcion que configura el server para archivos estaticos
import setupStaticFiles from "./config/configStaticFiles.js";

// Importa el módulo 'cors' para agregar los cors
import cors from "cors";

// Importa el módulo 'express' para crear la aplicacion web
import express, { urlencoded, json } from "express";

// Importamos morgan para ver las peticiones que se hacen al servidor
import morgan from "morgan";

// Importa el módulo 'cookie-parser' para manejar las cookies
import cookieParser from "cookie-parser";

/** El enrutador principal */
import indexRoutes from "./routes/index.routes.js";

// Importa el archivo 'configDB.js' para crear la conexión a la base de datos
import { setupDB } from "./config/configDB.js";

// Importa el handler de errores
import { handleFatalError, handleError } from "./utils/errorHandler.js";

/**
 * Inicia el servidor web
 */
async function setupServer() {
  try {
    // Obtén __dirname en un entorno ESM
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    /** Instancia de la aplicacion */
    const server = express();
    server.disable("x-powered-by");

    // Agregamos los cors
    server.use(cors({ credentials: true, origin: true }));

    // Agrega el middleware para el manejo de datos en formato URL
    server.use(urlencoded({ extended: true }));
    // Agrega el middleware para el manejo de datos en formato JSON
    server.use(json());
    // Agregamos el middleware para el manejo de cookies
    server.use(cookieParser());

    // Agregamos morgan para ver las peticiones que se hacen al servidor
    server.use(morgan("dev"));

    // Configura el server para servir archivos estáticos desde el directorio 'public'
    setupStaticFiles(server);

    // Agrega el enrutador principal al servidor
    // Agrega el enrutador principal al servidor
    server.use("/api", indexRoutes);

    // Catch-all para redirigir todas las rutas no gestionadas a index.html de React, de esa manera, es react-dom que gestiona las rutas
    server.get("*", (req, res) => {
      res.sendFile(path.join(__dirname,"../public/dist/index.html"));
    });

    // Inicia el servidor en el puerto especificado
    server.listen(SERVER_PORT, () => {
      console.log(`=> Servidor corriendo en ${SERVER_HOST}:${SERVER_PORT}/api`);
    });
  } catch (err) {
    handleError(err, "/server.js -> setupServer");
  }
}

/**
 * Inicia la API
 */
async function setupAPI() {
  try {
    // Inicia la conexión a la base de datos
    await setupDB();
    // Inicia el servidor web
    await setupServer();
  } catch (err) {
    handleFatalError(err, "/server.js -> setupAPI");
  }
}

// Inicia la API
setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));
