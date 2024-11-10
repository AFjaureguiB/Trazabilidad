import { useEffect, useState } from "react";
import { getShipments } from "../services/shipment.service";

export default function LatestShipmetsInfo() {
  const [shipments, setShipments] = useState([]);

  const fetchShipments = async () => {
    const { data } = await getShipments();
    setShipments(data);
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <div className="space-y-4">
      {shipments.map((shipment) => (
        <div
          key={shipment.id}
          className="flex flex-col justify-between  p-4 bg-gray-50 border border-gray-300 rounded-lg gap-4"
        >
          <div className="flex gap-4">
            <div className="text-base font-semibold">
              Numero de envio{" "}
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {shipment.id}
              </span>
            </div>
            <div className="text-base font-semibold">
              Total de piezas{" "}
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {shipment.quantity}
              </span>
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-2 text-sm">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
