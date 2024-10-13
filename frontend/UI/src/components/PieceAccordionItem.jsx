/* eslint-disable react/prop-types */

import { userRoles } from "../constants/user.roles";
import { useAuth } from "../context/AuthContext";
import Pencil from "./icons/Pencil";

// eslint-disable-next-line react/prop-types
export default function PieceAccordionItem({ setPieceData, piece, tissue }) {
  const { user } = useAuth();
  return (
    <div className="border border-gray-300  rounded-lg overflow-hidden w-full">
      <div className="grid grid-cols-3 grid-rows-1 gap-4 items-center bg-gray-50 hover:bg-gray-100  p-4">
        <div className="flex flex-col gap-2 text-left text-sm">
          <div className="ps-3 space-y-1">
            <div className="text-base font-semibold">Codigo de Pieza</div>
            <div>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {piece.code}
              </span>
            </div>
          </div>
        </div>
        <p className="space-x-1 text-gray-500">
          <span>Referencia: </span>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
            {piece.references}
          </span>
        </p>
        <div>
          <p className={"space-x-1 text-gray-500"}>
            <span>Descripcion: </span>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              {piece.description}
            </span>
          </p>
          {user.role === userRoles.ADMIN ? (
            <button
              className="font-medium text-blue-600 flex gap-1 hover:underline items-center"
              onClick={(e) => {
                e.stopPropagation();
                setPieceData({
                  tissue,
                  showCreatePiece: true,
                  pieceToEdit: piece,
                });
              }}
            >
              <Pencil className={"size-5"} />
              <span>Editar Pieza</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
