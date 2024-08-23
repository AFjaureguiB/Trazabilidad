import { useState } from "react";

import { getAgeFromDate } from "../utils/getAgeFromDate";
import { userRoles } from "../constants/user.roles.js";

import Pencil from "./icons/Pencil";
import PuzzlePiece from "./icons/PuzzlePiece";
import DocumentArrowDown from "./icons/DocumentArrowDown";
import User from "./icons/User";
import Plus from "./icons/Plus.jsx";
import Chevron from "./icons/Chevron.jsx";

export default function DonorTableRow({
  donor,
  user,
  setAddTissueData,
  setEditDonorData,
}) {
  const [expanded, setExpanded] = useState(false);

  const handleAddTissue = (donorId, donorNames, donorSurNames) => {
    setAddTissueData({
      showAddTissueModal: true,
      donorId,
      donorFullName: `${donorNames} ${donorSurNames}`,
    });
  };

  const handleEditDonorData = (donor) => {
    const { Tissues, ...donorData } = donor;
    setEditDonorData({
      showEditDonorModal: true,
      donor: donorData,
    });
  };

  return (
    <>
      <tr
        className={`border-b hover:bg-gray-100 ${
          expanded ? "bg-gray-100" : "bg-white"
        }`}
      >
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
        >
          <div className="relative size-10 overflow-hidden bg-gray-200 rounded-full">
            <User />
          </div>
          <div className="ps-3 space-y-1">
            <div className="text-base font-semibold">
              {`${donor.names} ${donor.surnames}`}
            </div>
            <div>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {getAgeFromDate(donor.dateOfBirth)} años
              </span>
            </div>
          </div>
        </th>
        <td className="px-6 py-4">{donor.dni}</td>
        <td className="px-6 py-4">{donor.dateOfBirth}</td>

        <td className="px-6 py-4">
          {user.role === userRoles.ADMIN ? (
            <button
              className="font-medium text-blue-600 flex gap-1 hover:underline"
              title="Editar informacion de donador"
              onClick={() => handleEditDonorData(donor)}
            >
              <Pencil />
              <span>Editar donador</span>
            </button>
          ) : user.role === userRoles.ASSISTANT ? (
            <button
              className="font-medium text-blue-600 flex gap-1 hover:underline"
              title="Editar informacion de donador"
              onClick={() =>
                handleAddTissue(donor.id, donor.names, donor.surnames)
              }
            >
              <Plus className={"size-5"} />
              <span>Agregar tejido</span>
            </button>
          ) : null}
        </td>
        <td className="px-6 py-4">
          <button onClick={() => setExpanded((prevState) => !prevState)}>
            <Chevron className={`size-6 ${expanded ? "rotate-180" : ""}`} />
          </button>
        </td>
      </tr>
      {expanded
        ? donor.Tissues.map((tissue) => (
            <tr key={tissue.code} className="border-b">
              <td colSpan={6}>
                <div className="px-6 py-4">
                  <div className="grid grid-cols-5 grid-rows-1 gap-4 items-center border border-blue-100 p-2 rounded-lg bg-blue-50/80">
                    <div className="flex gap-2 items-center">
                      <PuzzlePiece />
                      <div className="space-y-1">
                        <p className="text-lg font-bold">{tissue.tissuetype}</p>
                        <p className="space-x-1 text-gray-500">
                          <span>Codigo: </span>
                          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                            {tissue.code}
                          </span>
                        </p>
                        <p className="space-x-1 text-gray-500">
                          <span>Nevera:</span>
                          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                            {tissue.location}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 text-right">
                      <p className="text-gray-500 space-x-1">
                        <span>IPS: </span>
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded whitespace-nowrap">
                          {tissue.ips}
                        </span>
                      </p>
                      <p className="text-gray-500 space-x-1">
                        <span>Recolecion: </span>
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded whitespace-nowrap">
                          {tissue.collectedAt}
                        </span>
                      </p>
                      <p>
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded whitespace-nowrap">
                          {tissue.specialistname}
                        </span>
                      </p>
                    </div>

                    <div>
                      <a
                        href={`http://localhost:4000/consentimiento/${tissue.pdfpath}`}
                        target="_blank"
                        className="font-medium text-blue-600 hover:underline flex gap-1 justify-center"
                      >
                        <DocumentArrowDown />
                        Consentimiento
                      </a>
                    </div>

                    <div>
                      <p className="text-pretty text-gray-500">
                        {tissue.description
                          ? tissue.description
                          : "Sin descripcion adicional ..."}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div className="space-y-3">
                        <p className="space-x-1">
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                            {tissue.status}
                          </span>
                        </p>
                        {user.role === userRoles.ADMIN ? (
                          <button
                            className="font-medium text-blue-600 flex gap-1 hover:underline"
                            title="Editar informacion del tejido"
                          >
                            <Pencil />
                            <span>Editar tejido</span>
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))
        : null}
    </>
  );
}
