import Chevron from "./icons/Chevron";

/* eslint-disable react/prop-types */
export default function PieceTrazabilityAccordionHeader({
  isActive,
  piece,
  shipment,
}) {
  return (
    <div className={`${isActive ? "border-b border-gray-300" : ""}`}>
      <div
        className={`flex justify-between items-center hover:bg-gray-100 p-4 ${
          isActive ? "bg-gray-100" : "bg-gray-50"
        }`}
      >
        <div className="gap-2 text-left text-sm items-center justify-center grid grid-cols-5 grid-rows-1 w-full">
          <div className="ps-3 space-y-1 flex justify-center">
            <div>
              <div className="text-base font-semibold">Codigo</div>
              <div>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                  {piece.code}
                </span>
              </div>
            </div>
          </div>
          <div className="ps-3 space-y-1 flex justify-center">
            <div>
              <div className="text-base font-semibold">Referencia</div>
              <div>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                  {piece.references}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-right text-sm">
            <p className="space-x-1 text-gray-500">
              <span>IPS Receptora:</span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {shipment.receivingips}
              </span>
            </p>
            <p className="space-x-1 text-gray-500">
              <span>Sede:</span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {shipment.sede}
              </span>
            </p>
            <p className="space-x-1 text-gray-500">
              <span>Fecha de envio:</span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {shipment.shippingdate}
              </span>
            </p>
            <p className="space-x-1 text-gray-500">
              <span>Indicacion:</span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {shipment.indication}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-right text-sm">
            <p className="space-x-1 text-gray-500">
              <span>Nombre del Paciente:</span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {shipment.patientname}
              </span>
            </p>
            <p className="space-x-1 text-gray-500">
              <span>DNI del Paciente:</span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {shipment.patientdni}
              </span>
            </p>
            <p className="space-x-1 text-gray-500">
              <span>Nombre Especialista:</span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {shipment.specialistname}
              </span>
            </p>
          </div>
          <div className="px-6 py-4 flex justify-center">
            <Chevron className={`size-6 ${isActive ? "rotate-180" : ""}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
