import PDFDocument from "pdfkit-table";
import { handleError } from "../utils/errorHandler.js";

async function buildDispatchPDF(dataCallback, endCallback, shipment) {
  try {
    const doc = new PDFDocument({ margin: 30 });

    doc.on("data", dataCallback);
    doc.on("end", endCallback);

    // Añadir el logo SVG
    doc.image("public/logoFHD.png", {
      fit: [200, 250],
      align: "left",
      valign: "left",
    });

    // Añadir información del encabezado
    doc
      .fontSize(12)
      .fillColor("#183254")
      .text("Fundonemos Banco de Tejidos", 140, 35, { align: "right" })
      .fontSize(10)
      .fillColor("#000000")
      .text(`Parque industrial de Bucarmanga`, 140, 50, { align: "right" })
      .fontSize(10)
      .text(`Manzana C - Bodega 12`, 140, 65, { align: "right" })
      .fontSize(10)
      .text(`Orden No.: ${shipment.id}`, 140, 80, { align: "right" })
      .moveDown();

    // Información del paciente
    doc
      .fontSize(10)
      .text(`Fecha de impresión: ${new Date().toLocaleString()}`, 30, 125, {
        align: "left",
      })
      .text(`Paciente: ${shipment.patientname}`, 30, 140)
      .text(`Documento: ${shipment.patientdni}`, 30, 155)
      .text(`Fecha de envío: ${shipment.shippingdate}`, 30, 170)
      .moveDown();

    doc
      .moveTo(20, 10) // Punto superior izquierdo (x: 50, y: 150)
      .roundedRect(20, 20, 575, 95, 10) // Rectángulo con bordes redondeados (ancho: 200, alto: 100, radio de esquina: 20)
      .stroke(); // Dibuja el rectángulo

    // Crear la tabla
    const table = {
      title: "Información del envío",

      subtitle: "Detalles",

      headers: [
        "Número de Envío",
        "Total de Piezas",
        "Info IPS",
        "Info Paciente",
      ],
      rows: [
        [
          shipment.id,
          shipment.quantity,
          `IPS Receptora: ${shipment.receivingips}\nSede: ${shipment.sede}\nFecha de envío: ${shipment.shippingdate}`,
          `Nombre Paciente: ${shipment.patientname}\nDNI: ${shipment.patientdni}\nNombre Especialista: ${shipment.specialistname}`,
        ],
      ],
    };

    doc.moveDown();
    await doc.table(table, {
      columnsSize: [70, 70, 200, 200],
    });

    doc.end();
  } catch (error) {
    handleError(error, "dispatchpdf.service -> buildDispatchPDF");
  }
}

export default { buildDispatchPDF };
