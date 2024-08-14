"use strict";
import * as url from "url";
import path from "node:path";
import fs from "node:fs";

//Importamos el modulo de multer para el manejo de archivos
import multer from "multer";

import { donorBodySchema } from "../scheme/donor.schema.js";
import { respondError } from "../utils/resHandler.js";
import { getFileName } from "../utils/getFileName.js";

import {
  existDonorWithDni,
  existTissueWithCode,
} from "../services/donor.service.js";

// Obtén __dirname en un entorno ESM
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicialización de multer
/* Multer es quien maneja la informacion que viene con `enctype="multipart/form-data"`, esto es tratado de manera especial, 
   y no podras acceder a ningun dato en el `body` sin que antes multer haga ese parseo, no estan manejando JSON en su manera "convencional"
*/
//Hay que tener en cuenta que multer realiza el manejo del archivo de manera independiente al contenido que venga en el formulario
//Multer reescribe el archivo si es que se sube el mismo archivo con el mismo nombre mas de una vez
export const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/consentimiento-informado");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      //este error debe ser "atrapado/cachado" en un bloque try-catch en algun sitio
      //de otra manera, el servidor responde con un `internal server error`
      /*La otra solucion es que directamente desde el codigo del cliente cuando se 
        suba cualquier archivo que no sea pdf, lanzar un error y gestionarlo ahi */
      cb(new Error("Solo se permiten archivos PDF"), false);
    }
  },
});

//No podemos acceder a los valores que trae el request en su objeto body directamente desde los mecanismos de multer, ya que aun no los ha procesado
/* Esto ocasiona problemas y nos obliga a realizar ciertas validaciones por separado, ya que en algun momento necesitamos renombrar
 *  el archivo del consentimiento con algun nombre especifico para guardarlo en nuestro backend. Para renombrarlo se plantean usar los
 *  atributos de `names`, `surnames` y `dni`, pero como no podemos comprobar si esta informacion viene antes, de que multer guarde el archivo
 *  se opta por crear este middleware. Una vez que multer proceso y guardo el archivo, y podemos verificar si tenemos toda la informacion
 *  para renombrarlo, y si no viene hay que borrar aquello que multer ya guardo.
 */
export const validateFile = async (req, res, next) => {
  const { body: donor } = req;

  if (!req.file) {
    return respondError(
      req,
      res,
      400,
      "Debes proveer toda la informacion necesaria",
      "El archivo de consentimiento es obligatorio"
    );
  }

  //Nos valemos del schema que creamos para facilmente ver si toda la informacion que requerimos viene en el objeto `req.body`.
  //Solo necesitamos `dni` del donador, y el `code` de un tissue pero si ya existe un esquema, lo usamos.
  const { error: bodyDonorError } = donorBodySchema.validate(donor);

  if (bodyDonorError) {
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error al eliminar el archivo:", err);
    });
    return respondError(
      req,
      res,
      400,
      "Debes proveer toda la informacion necesaria",
      bodyDonorError.message
    );
  }

  //aqui hay que verificar si quieres agregar un DNI o un tissue.code que ya existe
  const dniAlreadyExist = await existDonorWithDni(donor.dni);
  if (dniAlreadyExist) {
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error al eliminar el archivo:", err);
    });
    return respondError(
      req,
      res,
      400,
      "Existen inconsistencias con la informacion",
      "El DNI ingresado ya esta asociado a un donador"
    );
  }

  const codeAlreadyExist = await existTissueWithCode(donor.tissue.code);
  if (codeAlreadyExist) {
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error al eliminar el archivo:", err);
    });
    return respondError(
      req,
      res,
      400,
      "Existen inconsistencias con la informacion",
      "El codigo ingresado ya esta asociado a una pieza/tejido"
    );
  }

  next();
};

// Middleware para cambiar el nombre del archivo después de la subida
// por defecto multer no nos permite acceder al contenido del formulario dentro de su middleware
// asi que creamos un middleware para realizar el renombrado del mismo una vez que multer ya haya guardado el archivo
export const renameFile = (req, res, next) => {
  const { body: donor } = req;

  const newFilename =
    getFileName(donor.dni, donor.tissue.code) +
    path.extname(req.file.originalname);

  const oldPath = path.join(
    __dirname,
    "../../public/consentimiento-informado",
    req.file.filename
  );

  const newPath = path.join(
    __dirname,
    "../../public/consentimiento-informado",
    newFilename
  );

  fs.rename(oldPath, newPath, (err) => {
    if (err) console.error(err);
  });
  req.file.filename = newFilename; // Actualiza req.file con el nuevo nombre
  next();
};
