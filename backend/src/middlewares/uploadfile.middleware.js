import multer from "multer";

import { handleError } from "../utils/errorHandler.js";
import { respondError } from "../utils/resHandler.js";
import { donorBodySchema } from "../scheme/donor.schema.js";

// Configurar multer para almacenar el archivo en la memoria temporalmente
const storage = multer.memoryStorage();

// Middleware para filtrar archivos, asegurando que solo se acepten PDFs
//De alguna manera, multer ejecuta esta funcion, antes de asignar valores al obj `req
//por lo tanto aqui no existe `req.body` y `req.file`, sin embargo `file` si existe aqui y podemos acceder a sus valores.
const fileFilter = (req, file, cb) => {
  // Verificar que el archivo sea un PDF
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(new Error("Solo se permiten archivos PDF"), false); // Rechazar el archivo
  }
};

const upload = multer({ storage, fileFilter }).single("consentimiento-pdf");

export const uploadAndValidateFile = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      //Aqui caeria un error de multer, que puede ser que el field no corresponda con el definido en `.single("file");`, que adjuntes mas de 1 archivo PDF
      //o basicamente cualquier error de multer
      handleError(err, "savefileV2.middleware -> validateFileType"); //no es como tal un "error", ya que lo estamos controlando, pero para debuggear esta bien.
      respondError(
        req,
        res,
        400,
        err.message,
        "Error, demasiados archivos o fieldname no valido, intentalo de nuevo"
      );
    } else if (err) {
      //Aqui caeria el error que lanzamos nosotros, validando que no es un PDF
      handleError(err, "savefileV2.middleware -> validateFileType"); //no es como tal un "error", ya que lo estamos controlando, pero para debuggear esta bien.
      respondError(req, res, 400, err.message);
    } else {
      next();
    }
  });
};

// Middleware personalizado para validar campos de texto y el campo con el archivo
export const validateFields = (req, res, next) => {
  //Aunque es extraño, si no colocas ningun archivo en tu formulario, multer no lo toma como un "error", simplemente lo ignora
  //y maneja los datos que vengan en tu formulario, asi que debemos validar que req.file sea distinto de undefined o null
  if (!req.file) {
    return respondError(
      req,
      res,
      400,
      "Debes proveer toda la informacion necesaria",
      "El archivo de consentimiento es obligatorio"
    );
  }

  /**
   * Aqui podriamos cambiar la estrategia, ya que en ningun momento estamos "guardando" nada en el disco, el archivo esta en memoria.
   * Por lo tanto, podriamos simplemente seguir con nuestro flujo de insercion, y solo hasta cuando la DB ya haya regresado
   * la insercion correcta de los objetos Donor con su respectiva Tissue, es ahi cuando habria que guardar nuestro archivo PDF.
   *
   * 1) Merece la pena validar que al menos vengan todos datos `required`, ya que asi ahorramos esa consulta a la DB, porque si sabemos que algo no viene,
   * es mejor regresar el error sin consultar a la DB.
   *
   * 2) Siendo diferente por ejemplo, verificar si un DNI o un codigo de pieza ya estan asociados a un registro en la DB, en ese caso es necesario realizar
   * una consulta a la DB, porque solo es ahi donde podemos obtener esa informacion.
   */

  //recuperamos la info de un donador y su tejido
  const { body: donor } = req;

  //Nos valemos del schema que creamos para facilmente ver si toda la informacion que requerimos viene en el objeto `req.body`.
  //Solo necesitamos `dni` del donador, y el `code` de un tissue para el nombre del archivo, pero como se menciona arriba, es mejor validar desde ahora para ahorrar problemas
  const { error: bodyDonorError } = donorBodySchema.validate(donor);
  if (bodyDonorError)
    return respondError(
      req,
      res,
      400,
      "Debes proveer toda la informacion necesaria",
      bodyDonorError.message
    );
  next();
};
