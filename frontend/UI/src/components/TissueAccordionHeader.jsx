/* eslint-disable react/prop-types */
import { TissueStatus } from "../constants/results";
import { userRoles } from "../constants/user.roles";
import { useAuth } from "../context/AuthContext";
import Chevron from "./icons/Chevron";
import Plus from "./icons/Plus";
import PuzzlePiece from "./icons/PuzzlePiece";

export default function TissueAccordionHeader({
  tissue,
  setPieceData,
  isActive,
}) {
  const { Donor } = tissue;
  const { user } = useAuth();
  return (
    <div className={`border-green-200 ${isActive ? "border-b" : ""}`}>
      <div
        className={`grid grid-cols-5 grid-rows-1 gap-4 items-center hover:bg-green-100  p-4 ${
          isActive ? "bg-green-100" : "bg-green-50/80"
        }`}
      >
        <div className="flex gap-2 items-center justify-self-start text-green-800">
          <PuzzlePiece />
          <div className="space-y-1">
            <p className="text-lg font-semibold ">{tissue.tissuetype}</p>
            <p className="space-x-1 text-gray-500">
              <span>Codigo: </span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {tissue.code}
              </span>
            </p>
          </div>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-gray-500 space-x-1">
            <span>Recolecion: </span>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded whitespace-nowrap">
              {tissue.collectedAt}
            </span>
          </p>
          <p className="text-gray-500 space-x-1">
            <span>Donante: </span>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded whitespace-nowrap">
              {Donor.names} {Donor.surnames}
            </span>
          </p>
        </div>
        <div className="space-y-3 justify-self-end">
          <p className="space-x-1">
            <span
              className={`text-sm font-medium px-2.5 py-0.5 rounded ${
                tissue.status === TissueStatus.ACCEPTED
                  ? "bg-green-100 text-green-800 border border-green-500"
                  : ""
              }`}
            >
              {tissue.status}
            </span>
          </p>
        </div>
        <div className="justify-self-end">
          {user.role === userRoles.ASSISTANT ? (
            <button
              className="font-medium text-blue-600 flex gap-1 items-center hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                setPieceData({
                  tissue,
                  showCreatePiece: true,
                  pieceToEdit: undefined,
                });
              }}
            >
              <Plus className={"size-5"} />
              <span>Agregar Pieza</span>
            </button>
          ) : null}
        </div>

        <div className="px-6 py-4 justify-self-end">
          <div>
            <Chevron className={`size-6 ${isActive ? "rotate-180" : ""}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
