import { useEffect, useState } from "react";
import { getSterilizationBatches } from "../services/sterilizationBatch.service";

export default function LatestSterilizationBatchInfo() {
  const [sterilizationBatches, setSterilizationBatches] = useState([]);
  const fetchSterilizationBatches = async () => {
    const { data } = await getSterilizationBatches();
    setSterilizationBatches(data);
  };

  useEffect(() => {
    fetchSterilizationBatches();
  }, []);

  return (
    <div>
      {sterilizationBatches ? (
        sterilizationBatches.map((batch) => (
          <div key={batch.id}>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-col gap-2 text-left text-sm">
                <div className="ps-3 space-y-1">
                  <div className="text-base font-semibold">Numero de Lote</div>
                  <div>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                      {batch.id}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-right text-sm">
                <p className="space-x-1 text-gray-500">
                  <span>Fecha Inicial:</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                    {batch.startdate}
                  </span>
                </p>
                <p className="space-x-1 text-gray-500">
                  <span>Fecha Final:</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                    {batch.enddate}
                  </span>
                </p>
              </div>
              <div>
                <p className="space-x-1 text-gray-500">
                  <span>Status:</span>
                  <span
                    className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded 
                  ${
                    batch.status === "Stand By"
                      ? "bg-indigo-100 text-indigo-800"
                      : batch.status === "Closed"
                      ? "bg-yellow-100 text-yellow-800"
                      : batch.status === "Pre-Aprobado"
                      ? "bg-green-100 text-green-800"
                      : batch.status === "Rechazado"
                      ? "bg-red-100 text-red-800"
                      : ""
                  }`}
                  >
                    {batch.status}
                  </span>
                </p>
                <p className="space-x-1 text-gray-500">
                  <span>Total:</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                    {batch.pieces.length} Piezas
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-xl text-gray-500 font-bold pl-5">
          No existen lotes de esterilizacion
        </p>
      )}
    </div>
  );
}
