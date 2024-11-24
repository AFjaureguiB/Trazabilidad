import dispatchpdfService from "../services/dispatchpdf.service.js";
import { handleError } from "../utils/errorHandler.js";
import { respondError } from "../utils/resHandler.js";

async function buildDispatchPDF(req, res) {
  try {
    const { shipment } = req.body;
    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    });

    dispatchpdfService.buildDispatchPDF(
      (data) => stream.write(data),
      () => stream.end(),
      shipment
    );
  } catch (error) {
    handleError(error, "dispatchpdf.controller -> buildDispatchPDF");
    respondError(req, res, 400, error.message);
  }
}

export default {
  buildDispatchPDF,
};
