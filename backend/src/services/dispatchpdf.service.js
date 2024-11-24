import PDFDocument from "pdfkit-table";
import { handleError } from "../utils/errorHandler.js";

async function buildDispatchPDF(dataCallback, endCallback, shipment) {
  try {
    const doc = new PDFDocument();

    doc.on("data", dataCallback);
    doc.on("end", endCallback);

    //Si quieres agregar mas informacion, en el siguiente objeto lo puedes hacer
    //El objeto `shipment` ya tiene toda la informacion que se muestra en el front, solo tomala y muestrala en el PDF
    const table = {
      title: "Envio",
      subtitle: "Realizado",
      headers: ["Numero Envio", "Total de Piezas", "Info IPS", "Info Paciente"],
      rows: [
        [
          shipment.id,
          shipment.quantity,
          `IPS Receptora: ${shipment.receivingips}\n Sede: ${shipment.sede}\n Fecha de envio: ${shipment.shippingdate}`,
          `Nombre Paciente: ${shipment.patientname}\n DNI: ${shipment.patientdni}\n Nombre Especialista: ${shipment.specialistname}`,
        ],
      ],
    };

    doc.fontSize(25).text("Orden de Envio de Piezas");
    await doc.table(table, {
      columnsSize: [50, 50, 200, 200],
    });

    doc.end();
  } catch (error) {
    handleError(error, "dispatchpdf.service -> buildDispatchPDF");
  }
}

export default { buildDispatchPDF };
