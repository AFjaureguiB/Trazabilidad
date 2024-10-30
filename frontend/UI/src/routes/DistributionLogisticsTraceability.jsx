import { useEffect, useState } from "react";
import LeftArrow from "../components/icons/LeftArrow";
import { userRoles } from "../constants/user.roles";
import { useAuth } from "../context/AuthContext";
import { getInventory } from "../services/inventory.service";
import Accordion from "../components/Accordion";
import InventoryAccordionHeader from "../components/InventoryAccordionHeader";
import ShipmentForm from "../components/ShipmentForm";
import { getShipments } from "../services/shipment.service";
import Tabs from "../components/Tabs";
import ShipmentAccordionHeader from "../components/ShipmentAccordionHeader";

export default function DistributionLogisticsTraceability() {
  const [inventory, setInventory] = useState([]);
  const [shipments, setShipments] = useState([]);
  const { user } = useAuth();

  const fetchInventory = async () => {
    const { data } = await getInventory();
    setInventory(data);
  };

  const fetchShipments = async () => {
    const { data } = await getShipments();
    setShipments(data);
  };

  useEffect(() => {
    fetchInventory();
    fetchShipments();
  }, []);

  return (
    <>
      {user.role === userRoles.ADMIN ? (
        <a
          href="/"
          className="inline-flex items-center text-lg text-blue-600 gap-2 mt-4 ml-2 hover:underline"
        >
          <LeftArrow />
          Regresar
        </a>
      ) : null}
      <div className="mt-4">
        <Tabs>
          <Tabs.Item title="Inventario">
            <div className="flex gap-10 p-4">
              <div className="w-1/2">
                <div className="my-4">
                  <h6 className="text-xl text-gray-500 font-bold py-2">
                    Inventario de piezas
                  </h6>
                </div>
                <div className="max-h-[700px] overflow-y-auto pb-4 px-2 custom-scrollbar">
                  <Accordion allowMultiple>
                    {inventory.length != 0 ? (
                      inventory.map((referenceGroup) => (
                        <Accordion.Item
                          key={referenceGroup.references}
                          header={<InventoryAccordionHeader />}
                          references={referenceGroup.references}
                          quantity={referenceGroup.quantity}
                          className={
                            "border border-gray-300 rounded-lg overflow-hidden"
                          }
                        >
                          <div className="space-y-2 mt-2 p-4">
                            {referenceGroup.pieces.map((piece) => (
                              <div
                                key={piece.id}
                                className="bg-blue-50/50 border border-blue-200  py-4 px-6 rounded-md space-y-6"
                              >
                                <div className="flex gap-2 justify-between flex-wrap">
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
                                  <div>
                                    <p>
                                      Descripcion:{" "}
                                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {piece.description}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Accordion.Item>
                      ))
                    ) : (
                      <p className="text-xl text-gray-500 font-bold pl-5">
                        No tenemos piezas en el inventario ...
                      </p>
                    )}
                  </Accordion>
                </div>
              </div>
              {inventory.length != 0 && (
                <div className="w-1/2 px-2 pb-2">
                  <div className="my-4">
                    <h6 className="text-xl text-gray-500 font-bold py-2">
                      Creacion de envios
                    </h6>
                  </div>
                  <div className="max-h-[700px] overflow-y-auto pb-4 px-2 custom-scrollbar">
                    <ShipmentForm
                      inventory={inventory}
                      fetchInventory={fetchInventory}
                      fetchShipments={fetchShipments}
                    />
                  </div>
                </div>
              )}
            </div>
          </Tabs.Item>
          <Tabs.Item title="Envios Realizados">
            <div className="my-4">
              <h6 className="text-xl text-gray-500 font-bold py-2">
                Historial de envios
              </h6>
            </div>
            <div className="max-h-[700px] overflow-y-auto pb-4 px-2 custom-scrollbar">
              <Accordion allowMultiple>
                {shipments.length !== 0 ? (
                  shipments.map((shipment) => (
                    <Accordion.Item
                      key={shipment.id}
                      header={<ShipmentAccordionHeader />}
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
      </div>
    </>
  );
}
