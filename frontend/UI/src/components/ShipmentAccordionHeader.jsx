/* eslint-disable react/prop-types */
import { userRoles } from "../constants/user.roles";
import { useAuth } from "../context/AuthContext";
import Chevron from "./icons/Chevron";
import Pencil from "./icons/Pencil";

export default function ShipmentAccordionHeader({
  isActive,
  shipment,
  setShipmentToEdit,
}) {
  const { user } = useAuth();
  return (
    <div className={`${isActive ? "border-b border-gray-300" : ""}`}>
      <div
        className={`flex justify-between items-center hover:bg-gray-100 p-4 ${
          isActive ? "bg-gray-100" : "bg-gray-50"
        }`}
      >
        <div className="flex flex-col gap-2 text-left text-sm">
          <div className="ps-3 space-y-1">
            <div className="text-base font-semibold">Numero de envio</div>
            <div>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {shipment.id}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-left text-sm">
          <div className="ps-3 space-y-1">
            <div className="text-base font-semibold">Total de piezas</div>
            <div>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {shipment.quantity}
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
            <span>Indicacion:</span>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              {shipment.indication}
            </span>
          </p>
          <p className="space-x-1 text-gray-500">
            <span>Fecha de envio:</span>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              {shipment.shippingdate}
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

        {user.role === userRoles.ADMIN ? (
          <div>
            <button
              className="font-medium text-blue-600 flex gap-1 hover:underline items-center"
              onClick={(e) => {
                e.stopPropagation();
                setShipmentToEdit({
                  showShimpmentEditForm: true,
                  shimpment: shipment,
                });
              }}
            >
              <Pencil className={"size-5"} />
              <span>Editar Envio</span>
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
