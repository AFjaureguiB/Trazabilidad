import { useEffect, useState } from "react";
import { getLogs } from "../services/logs.service"; // Importa el servicio para obtener los logs
import LogsTableAdministration from "../components/LogsTableAdministration";
import Tabs from "../components/Tabs.jsx";
import AdminUsersCard from "../components/AdminUsersCard.jsx";
import { userRoles } from "../constants/user.roles.js";
import { useAuth } from "../context/AuthContext.jsx";
import Plus from "../components/icons/Plus.jsx";
import AdminUserForm from "../components/AdminUserForm.jsx";
import {
  getUsersAdmin,
  deleteAdminUserById,
} from "../services/user.service.js";
import { notifyError, notifySuccess } from "../utils/notifyToast.js";
import Accordion from "../components/Accordion.jsx";
import { getTrazabilityPiecesInShipments } from "../services/trazability.service.js";
import PieceTrazabilityAccordionHeader from "../components/PieceTrazabilityAccordionHeader.jsx";
import { getShipments } from "../services/shipment.service";
import DispatchShipmentAccordionHeader from "../components/DispatchShipmentAccordionHeader.jsx";
import DocumentArrowDown from "../components/icons/DocumentArrowDown.jsx";

const Administration = () => {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [trazability, setTrazability] = useState([]);
  const [shipments, setShipments] = useState([]);

  const [userAdminData, setUserAdminData] = useState({
    showUserAdminModal: false,
    userAdmin: undefined,
  });

  const { user } = useAuth();

  const fetchLogs = async () => {
    const res = await getLogs();
    setLogs(res);
  };

  const fetchUsers = async () => {
    const res = await getUsersAdmin();
    setUsers(res);
  };

  const fetchTrazability = async () => {
    const res = await getTrazabilityPiecesInShipments();
    setTrazability(res);
  };

  const fetchShipments = async () => {
    const { data } = await getShipments();
    setShipments(data);
  };

  useEffect(() => {
    fetchLogs();
    fetchUsers();
    fetchTrazability();
    fetchShipments();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    const {
      state,
      data,
      message: messageError,
    } = await deleteAdminUserById(id);

    if (state === "Error") notifyError(messageError);

    if (state == "Success") {
      notifySuccess(data);
      fetchUsers();
    }
  };

  return (
    <div className="mt-4">
      <Tabs>
        <Tabs.Item title="Logs">
          <LogsTableAdministration logs={logs} />
        </Tabs.Item>
        <Tabs.Item title="Usuarios Admin">
          {user.role === userRoles.ROOT ? (
            <div className="my-4">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 flex gap-2 items-center"
                onClick={() =>
                  setUserAdminData({
                    showUserAdminModal: true,
                    userAdmin: undefined,
                  })
                }
              >
                <Plus className={"size-6"} />
                Usuario
              </button>
            </div>
          ) : null}
          <AdminUsersCard
            users={users}
            setUserAdminData={setUserAdminData}
            handleDelete={handleDelete}
          />
        </Tabs.Item>
        <Tabs.Item title="Trazabilidad">
          <div className="my-4">
            <h6 className="text-xl text-gray-500 font-bold py-2">
              Piezas Enviadas
            </h6>
          </div>
          <Accordion allowMultiple>
            {trazability.length !== 0 ? (
              trazability.map((piece) => {
                // Obtener la mitad del tamaño del array
                const mitad = Math.floor(
                  piece.tissue.infectiousTests.length / 2
                );
                const primeraMitad = piece.tissue.infectiousTests.slice(
                  0,
                  mitad
                );
                const segundaMitad = piece.tissue.infectiousTests.slice(mitad);
                return (
                  <Accordion.Item
                    key={piece.id}
                    header={<PieceTrazabilityAccordionHeader />}
                    piece={piece}
                    shipment={piece.shipment}
                    className={
                      "border border-gray-300 rounded-lg overflow-hidden"
                    }
                  >
                    <div className="p-4">
                      <div className="gap-2 text-left text-sm items-center justify-center grid grid-cols-6 grid-rows-1 w-full bg-blue-50/50 border border-blue-200 rounded-md p-4">
                        <div>
                          {piece.batches.map((batch) => (
                            <div
                              key={batch.id}
                              className="flex flex-col gap-2 text-right text-sm"
                            >
                              <p className="space-x-1 text-gray-500">
                                <span>Lote de pieza:</span>
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                  {batch.id}
                                </span>
                              </p>
                              <p className="space-x-1 text-gray-500">
                                <span>Status:</span>
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                  {batch.status}
                                </span>
                              </p>
                              <p className="space-x-1 text-gray-500">
                                <span>Fecha inicial:</span>
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                  {batch.startdate}
                                </span>
                              </p>
                              <p className="space-x-1 text-gray-500">
                                <span>Fecha final:</span>
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                  {batch.enddate}
                                </span>
                              </p>
                            </div>
                          ))}
                        </div>
                        <div>
                          {piece.sterilizationBatch.map((batch) => (
                            <div
                              key={batch.id}
                              className="flex flex-col gap-2 text-right text-sm"
                            >
                              <p className="space-x-1 text-gray-500">
                                <span>Lote de esterilizacion:</span>
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                  {batch.id}
                                </span>
                              </p>
                              <p className="space-x-1 text-gray-500">
                                <span>Status:</span>
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                  {batch.status}
                                </span>
                              </p>
                              <p className="space-x-1 text-gray-500">
                                <span>Fecha inicial:</span>
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                  {batch.startdate}
                                </span>
                              </p>
                              <p className="space-x-1 text-gray-500">
                                <span>Fecha final:</span>
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                  {batch.enddate}
                                </span>
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col gap-2 text-right text-sm">
                          <p className="space-x-1 text-gray-500">
                            <span>Codigo de Tejido:</span>
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                              {piece.tissue.code}
                            </span>
                          </p>
                          <p className="space-x-1 text-gray-500">
                            <span>Tipo tejido:</span>
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                              {piece.tissue.tissuetype}
                            </span>
                          </p>
                          <p className="space-x-1 text-gray-500">
                            <span>Status Tejido:</span>
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                              {piece.tissue.status}
                            </span>
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 text-right text-sm">
                          <p className="space-x-1 text-gray-500">
                            <span>IPS Recoleccion:</span>
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                              {piece.tissue.ips}
                            </span>
                          </p>
                          <p className="space-x-1 text-gray-500">
                            <span>Fecha Recoleccion:</span>
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                              {piece.tissue.collectedAt}
                            </span>
                          </p>
                          <p className="space-x-1 text-gray-500">
                            <a
                              href={`http://localhost:4000/consentimiento/${piece.tissue.pdfpath}`}
                              target="_blank"
                              className="font-medium text-blue-600 hover:underline flex gap-1 justify-end"
                            >
                              <DocumentArrowDown />
                              Consentimiento
                            </a>
                          </p>
                        </div>

                        <div className="flex flex-col items-end text-right space-y-2 text-gray-500">
                          {primeraMitad.map((inftest) => (
                            <p key={inftest.id}>
                              <span>{inftest.testName}: </span>
                              <span
                                className={`text-xs font-medium ms-1 px-2.5 py-0.5 rounded whitespace-nowrap bg-indigo-100 text-indigo-800`}
                              >
                                {inftest.result}
                              </span>
                            </p>
                          ))}
                        </div>
                        <div className="flex flex-col text-right space-y-2 text-gray-500">
                          {segundaMitad.map((inftest) => (
                            <p key={inftest.id}>
                              <span>{inftest.testName}: </span>
                              <span
                                className={`text-xs font-medium ms-1 px-2.5 py-0.5 rounded whitespace-nowrap bg-indigo-100 text-indigo-800`}
                              >
                                {inftest.result}
                              </span>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Accordion.Item>
                );
              })
            ) : (
              <p className="text-xl text-gray-500 font-bold pl-5">
                No tenemos informacion para la trazabilidad ...
              </p>
            )}
          </Accordion>
        </Tabs.Item>
        <Tabs.Item title="Despachos">
          <div className="my-4">
            <h6 className="text-xl text-gray-500 font-bold py-2">
              Ordenes de despachos
            </h6>
          </div>
          <div className="max-h-[700px] overflow-y-auto pb-4 px-2 custom-scrollbar">
            <Accordion allowMultiple>
              {shipments.length !== 0 ? (
                shipments.map((shipment) => (
                  <Accordion.Item
                    key={shipment.id}
                    header={<DispatchShipmentAccordionHeader />}
                    shipment={shipment}
                    className={
                      "border border-gray-300 rounded-lg overflow-hidden"
                    }
                  >
                    <div className="p-4 space-y-2">
                      {shipment.pieces.map((piece) => (
                        <div
                          key={piece.id}
                          className="bg-blue-50/50 border border-blue-200  py-4 px-6 rounded-md flex justify-between items-center gap-2 flex-wrap"
                        >
                          <div className="space-y-2">
                            <p>
                              Codigo:
                              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {piece.code}
                              </span>
                            </p>

                            <p>
                              Referencia:
                              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {piece.references}{" "}
                              </span>
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p>
                              Descripcion:{" "}
                              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {piece.description}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Accordion.Item>
                ))
              ) : (
                <p className="text-xl text-gray-500 font-bold pl-5">
                  No tenemos lotes de piezas ...
                </p>
              )}
            </Accordion>
          </div>
        </Tabs.Item>
      </Tabs>
      <AdminUserForm
        userAdminData={userAdminData}
        setUserAdminData={setUserAdminData}
        fetchUsers={fetchUsers}
      />
    </div>
  );
};

export default Administration;
