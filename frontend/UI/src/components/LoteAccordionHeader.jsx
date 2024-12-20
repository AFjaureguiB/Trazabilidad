/* eslint-disable react/prop-types */
import Chevron from "../components/icons/Chevron.jsx";
import { userRoles } from "../constants/user.roles.js";
import { useAuth } from "../context/AuthContext.jsx";
import Pencil from "./icons/Pencil.jsx";

export default function LoteAccordionHeader({
  isActive,
  batch,
  closePieceBatch,
  setBatchData,
}) {
  const { user } = useAuth();

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
                    ? "bg-yellow-100 text-yellow-800"
                    : status === "Pre-Aprobado"
                    ? "bg-green-100 text-green-800"
                    : status === "Rechazado"
                    ? "bg-red-100 text-red-800"
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
        {status === "Stand By" && user.role === userRoles.ASSISTANT ? (
          <div>
            <button
              className="px-3 py-2 text-xs font-medium text-center text-red-800 bg-red-100 rounded-lg hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-red-300"
              onClick={(e) => {
                e.stopPropagation();
                closePieceBatch(batch);
              }}
            >
              Cerrar Lote
            </button>
          </div>
        ) : user.role === userRoles.ADMIN ? (
          <div>
            <button
              className="font-medium text-blue-600 flex gap-1 hover:underline items-center"
              onClick={(e) => {
                e.stopPropagation();
                setBatchData({ showCreatePieceBatch: true, batch });
              }}
            >
              <Pencil className={"size-5"} />
              <span>Editar Lote</span>
            </button>
          </div>
        ) : null}
        <div className="px-6 py-4">
          <div>
            <Chevron className={`size-6 ${isActive ? "rotate-180" : ""}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
