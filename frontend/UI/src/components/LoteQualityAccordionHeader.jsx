import Chevron from "./icons/Chevron";

/* eslint-disable react/prop-types */
export default function LoteQualityAccordionHeader({ isActive, batch }) {
  const { id: batchNumber, startdate, enddate, status, pieces } = batch;
  const totalPieces = pieces.length;

  return (
    <div className={`${isActive ? "border-b border-gray-300" : ""}`}>
      <div
        className={`flex justify-between items-center hover:bg-gray-100 p-4 ${
          isActive ? "bg-gray-100" : "bg-gray-50"
        }`}
      >
        <div className="flex flex-col gap-2 text-left text-sm">
          <div className="ps-3 space-y-1">
            <div className="text-base font-semibold">Numero de Lote</div>
            <div>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {batchNumber}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-right text-sm">
          <p className="space-x-1 text-gray-500">
            <span>Fecha Inicial:</span>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              {startdate}
            </span>
          </p>
          <p className="space-x-1 text-gray-500">
            <span>Fecha Final:</span>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              {enddate}
            </span>
          </p>
        </div>
        <div>
          <p className="space-x-1 text-gray-500">
            <span>Status:</span>
            <span
              className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded 
                  ${
                    status === "Stand By"
                      ? "bg-indigo-100 text-indigo-800"
                      : status === "Closed"
                      ? "bg-red-100 text-red-800"
                      : status === "Pre-Aprobado"
                      ? "bg-green-100 text-green-800"
                      : ""
                  }`}
            >
              {status}
            </span>
          </p>
          <p className="space-x-1 text-gray-500">
            <span>Total:</span>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              {totalPieces} Piezas
            </span>
          </p>
        </div>

        <div className="px-6 py-4">
          <div>
            <Chevron className={`size-6 ${isActive ? "rotate-180" : ""}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
