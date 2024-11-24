/* eslint-disable react/prop-types */
import { useState } from "react";
import { getAgeFromDate } from "../utils/getAgeFromDate";
import { userRoles } from "../constants/user.roles.js";
import Pencil from "./icons/Pencil";
import PuzzlePiece from "./icons/PuzzlePiece";
import User from "./icons/User";
import Chevron from "./icons/Chevron.jsx";
import { TestResults, TissueStatus } from "../constants/results.js";

export default function InfectiousTableRow({
  donor,
  user,
  setInfectiousTestsData,
  handleSetAllResultsInfecTest,
}) {
  const [expanded, setExpanded] = useState(false);

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

        <td className="px-6 py-4"></td>
        <td className="px-6 py-4">
          <button onClick={() => setExpanded((prevState) => !prevState)}>
            <Chevron className={`size-6 ${expanded ? "rotate-180" : ""}`} />
          </button>
        </td>
      </tr>
      {expanded
        ? donor.Tissues.map((tissue) => {
            const [createdAtDate] = tissue.createdAt.split("T");
            // Obtener la mitad del tamaño del array
            const mitad = Math.floor(tissue.infectiousTests.length / 2);
            const primeraMitad = tissue.infectiousTests.slice(0, mitad);
            const segundaMitad = tissue.infectiousTests.slice(mitad);
            return (
              <tr key={tissue.code} className="border-b">
                <td colSpan={6}>
                  <div className="px-6 py-4">
                    <div
                      className={`grid grid-cols-5 grid-rows-1 gap-4 items-center border p-4 rounded-lg 
                        ${
                          tissue.status === TissueStatus.QUARANTINE
                            ? "border-blue-100 bg-blue-50/80"
                            : tissue.status === TissueStatus.IN_TESTING
                            ? "border-yellow-100 bg-yellow-50/80"
                            : tissue.status === TissueStatus.ACCEPTED
                            ? "border-green-100 bg-green-50/80"
                            : tissue.status === TissueStatus.REJECTED
                            ? "border-red-100 bg-red-50/80"
                            : ""
                        }`}
                    >
                      <div className="flex gap-2 items-center">
                        <PuzzlePiece />
                        <div className="space-y-1">
                          <p className="text-lg font-bold">
                            {tissue.tissuetype}
                          </p>
                          <p className="space-x-1 text-gray-500">
                            <span>Codigo: </span>
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                              {tissue.code}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1 text-right">
                        <p className="space-x-1 text-gray-500">
                          <span>Ingreso:</span>
                          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                            {createdAtDate}
                          </span>
                        </p>
                        <p className="text-gray-500 space-x-1">
                          <span>Recolecion: </span>
                          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded whitespace-nowrap">
                            {tissue.collectedAt}
                          </span>
                        </p>
                        <p>
                          <span>Especialista: </span>
                          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded whitespace-nowrap">
                            {tissue.specialistname}
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col justify-center items-center gap-2">
                        <p>
                          <span
                            className={`text-sm font-medium px-2.5 py-0.5 rounded
                              ${
                                tissue.status === TissueStatus.QUARANTINE
                                  ? "bg-blue-100 text-blue-800"
                                  : tissue.status === TissueStatus.IN_TESTING
                                  ? "bg-yellow-100 text-yellow-800"
                                  : tissue.status === TissueStatus.ACCEPTED
                                  ? "bg-green-100 text-green-800"
                                  : tissue.status === TissueStatus.REJECTED
                                  ? "bg-red-100 text-red-800"
                                  : ""
                              }`}
                          >
                            {tissue.status}
                          </span>
                        </p>
                        {tissue.status === TissueStatus.QUARANTINE ||
                        tissue.status === TissueStatus.IN_TESTING ||
                        userRoles.ADMIN === user.role ? (
                          <button
                            className="font-medium text-blue-600 flex gap-1 hover:underline items-center"
                            title="Agregar resultado de pruebas individuales"
                            onClick={() => {
                              setInfectiousTestsData({
                                showCreateInfectiousTests: true,
                                infectiousTests: tissue.infectiousTests,
                                tissueId: tissue.id,
                              });
                            }}
                          >
                            <Pencil />
                            {userRoles.ADMIN === user.role ? (
                              <span>Editar resultados</span>
                            ) : (
                              <span>Agregar resultados</span>
                            )}
                          </button>
                        ) : null}
                        {tissue.status !== TissueStatus.ACCEPTED &&
                        tissue.status !== TissueStatus.REJECTED &&
                        userRoles.ASSISTANT === user.role ? (
                          <button
                            className="font-medium text-blue-600 flex gap-1 hover:underline items-center"
                            title="Estableceer resultado de todas las pruebas en No Reactivo"
                            onClick={() =>
                              handleSetAllResultsInfecTest(tissue.id)
                            }
                          >
                            <Pencil />
                            <span>Todo en &apos;No reactivo&apos;</span>
                          </button>
                        ) : null}
                      </div>

                      <div className="col-span-2 flex justify-between">
                        <div className="flex flex-col text-right space-y-2">
                          {primeraMitad.map((inftest) => (
                            <p key={inftest.id}>
                              <span className="font-medium">
                                {inftest.testName}:{" "}
                              </span>
                              <span
                                className={`text-xs font-medium ms-1 px-2.5 py-0.5 rounded whitespace-nowrap 
                                  ${
                                    inftest.result === TestResults.NO_REALIZADO
                                      ? "bg-purple-100 text-purple-800"
                                      : inftest.result ===
                                        TestResults.NO_REACTIVO
                                      ? "bg-green-100 text-green-800"
                                      : inftest.result === TestResults.REACTIVO
                                      ? "bg-red-100 text-red-800"
                                      : ""
                                  }`}
                              >
                                {inftest.result}
                              </span>
                            </p>
                          ))}
                        </div>
                        <div className="flex flex-col text-right space-y-2">
                          {segundaMitad.map((inftest) => (
                            <p key={inftest.id}>
                              <span className="font-medium">
                                {inftest.testName}:{" "}
                              </span>
                              <span
                                className={`text-xs font-medium ms-1 px-2.5 py-0.5 rounded whitespace-nowrap 
                                  ${
                                    inftest.result === TestResults.NO_REALIZADO
                                      ? "bg-purple-100 text-purple-800"
                                      : inftest.result ===
                                        TestResults.NO_REACTIVO
                                      ? "bg-green-100 text-green-800"
                                      : inftest.result === TestResults.REACTIVO
                                      ? "bg-red-100 text-red-800"
                                      : ""
                                  }`}
                              >
                                {inftest.result}
                              </span>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })
        : null}
    </>
  );
}
