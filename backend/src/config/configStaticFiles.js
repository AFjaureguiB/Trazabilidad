"use strict";

import * as url from "url";
import path from "node:path";
import express from "express";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

// Obtén __dirname en un entorno ESM
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Exporta una función que configure los archivos estáticos
const setupStaticFiles = (server) => {

  // Configura el middleware para servir la build de React desde 'public/dist'
  server.use(express.static(path.join(__dirname, "../../public/dist")));

  // Configura el middleware para servir los archivos PDF desde 'public/consentimiento-informado'
  server.use("/consentimiento", express.static(path.join(__dirname, "../../public/consentimiento-informado")));

  // Ruta para visualizar un archivo PDF específico desde 'public/consentimiento-informado'
  server.get("/view/:filename", authenticationMiddleware, (req, res) => {

    const filename = req.params.filename;
    const filePath = path.join(__dirname,"../../public/consentimiento-informado",filename);
    // Configura el encabezado 'Content-Disposition' para visualizar el archivo en el navegador
    res.setHeader("Content-Disposition", "inline");
    res.sendFile(filePath);
  });
};

export default setupStaticFiles;