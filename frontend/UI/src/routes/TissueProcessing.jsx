import { useAuth } from "../context/AuthContext.jsx";
import { userRoles } from "../constants/user.roles.js";
import LeftArrow from "../components/icons/LeftArrow.jsx";
import Plus from "../components/icons/Plus.jsx";
import Tabs from "../components/Tabs.jsx";
import Accordion from "../components/Accordion.jsx";
import LoteAccordionHeader from "../components/LoteAccordionHeader.jsx";
import PieceAccordionItem from "../components/PieceAccordionItem.jsx";
import TissueAccordionHeader from "../components/TissueAccordionHeader.jsx";
import { getTissuesWithPieces } from "../services/tissue.service.js";
import { useEffect, useState } from "react";
import CreatePieceForm from "../components/CreatePieceForm.jsx";

export default function TissueProcessing() {
  const { user } = useAuth();

  const [tissues, setTissues] = useState([]);
  const [pieceData, setPieceData] = useState({
    showCreatePiece: false,
    tissue: {},
  });

  useEffect(() => {
    fetchTissues();
  }, []);

  const fetchTissues = async () => {
    const {
      state,
      data,
      details: detailsError,
      message: messageError,
    } = await getTissuesWithPieces();
    setTissues(data);
  };

  const batches = [
    {
      batchNumber: "8712563",
      startDate: "23/09/2024",
      endDate: "23/09/2024",
      status: "Stand By",
      totalItems: "25 Piezas",
      piezas: ["Pieza 1", "Pieza 2", "Pieza 3"],
    },
    {
      batchNumber: "8712563",
      startDate: "23/09/2024",
      endDate: "23/09/2024",
      status: "Stand By",
      totalItems: "25 Piezas",
      piezas: ["Pieza 1", "Pieza 2", "Pieza 3"],
    },
    {
      batchNumber: "8712563",
      startDate: "23/09/2024",
      endDate: "23/09/2024",
      status: "Stand By",
      totalItems: "25 Piezas",
      piezas: ["Pieza 1", "Pieza 2", "Pieza 3"],
    },
    {
      batchNumber: "8712563",
      startDate: "23/09/2024",
      endDate: "23/09/2024",
      status: "Stand By",
      totalItems: "25 Piezas",
      piezas: ["Pieza 1", "Pieza 2", "Pieza 3"],
    },
    {
      batchNumber: "8712563",
      startDate: "23/09/2024",
      endDate: "23/09/2024",
      status: "Stand By",
      totalItems: "25 Piezas",
      piezas: ["Pieza 1", "Pieza 2", "Pieza 3"],
    },
    {
      batchNumber: "8712563",
      startDate: "23/09/2024",
      endDate: "23/09/2024",
      status: "Stand By",
      totalItems: "25 Piezas",
      piezas: ["Pieza 1", "Pieza 2", "Pieza 3"],
    },
    {
      batchNumber: "8712563",
      startDate: "23/09/2024",
      endDate: "23/09/2024",
      status: "Stand By",
      totalItems: "25 Piezas",
      piezas: ["Pieza 1", "Pieza 2", "Pieza 3"],
    },
    {
      batchNumber: "8712563",
      startDate: "23/09/2024",
      endDate: "23/09/2024",
      status: "Stand By",
      totalItems: "25 Piezas",
      piezas: ["Pieza 1", "Pieza 2", "Pieza 3"],
    },
    {
      batchNumber: "8712563",
      startDate: "23/09/2024",
      endDate: "23/09/2024",
      status: "Stand By",
      totalItems: "25 Piezas",
      piezas: ["Pieza 1", "Pieza 2", "Pieza 3"],
    },
    {
      batchNumber: "8712563",
      startDate: "23/09/2024",
      endDate: "23/09/2024",
      status: "Stand By",
      totalItems: "25 Piezas",
      piezas: ["Pieza 1", "Pieza 2", "Pieza 3"],
    },
  ];

  const pieces = [
    {
      code: "1234A",
      references: "CD001",
      description: "Some descrition here ...",
    },
    {
      code: "1234A",
      references: "CD001",
      description: "Some descrition here ...",
    },
    {
      code: "1234A",
      references: "CD001",
      description: "Some descrition here ...",
    },
    {
      code: "1234A",
      references: "CD001",
      description: "Some descrition here ...",
    },
    {
      code: "1234A",
      references: "CD001",
      description: "Some descrition here ...",
    },
    {
      code: "1234A",
      references: "CD001",
      description: "Some descrition here ...",
    },
    {
      code: "1234A",
      references: "CD001",
      description: "Some descrition here ...",
    },
    {
      code: "1234A",
      references: "CD001",
      description: "Some descrition here ...",
    },
    {
      code: "1234A",
      references: "CD001",
      description: "Some descrition here ...",
    },
    {
      code: "1234A",
      references: "CD001",
      description: "Some descrition here ...",
    },
    {
      code: "1234A",
      references: "CD001",
      description: "Some descrition here ...",
    },
    {
      code: "1234A",
      references: "CD001",
      description: "Some descrition here ...",
    },
    {
      code: "1234A",
      references: "CD001",
      description: "Some descrition here ...",
    },
  ];
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
          <Tabs.Item title="Piezas">
            <div>
              <div className="my-4">
                <h6 className="text-xl text-gray-500 font-bold py-2">
                  Tejidos Aceptados
                </h6>
              </div>
              <div className="space-y-2">
                <Accordion>
                  {tissues.map((tissue) => (
                    <Accordion.Item
                      key={tissue.id}
                      header={<TissueAccordionHeader />}
                      tissue={tissue}
                      setPieceData={setPieceData}
                      className={
                        "border border-green-200 rounded-lg overflow-hidden"
                      }
                    >
                      <div className="p-4 space-y-2">
                        {tissue.pieces.map((piece) => (
                          <PieceAccordionItem
                            key={piece.code}
                            code={piece.code}
                            references={piece.references}
                            description={piece.description}
                            tissueCode={tissue.code}
                            tissueType={tissue.tissuetype}
                          />
                        ))}
                      </div>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
          </Tabs.Item>

          <Tabs.Item title="Lotes">
            <div className="flex gap-8">
              <div className="w-1/2">
                <div className="my-4">
                  {user.role === userRoles.ASSISTANT ? (
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 flex gap-2 items-center"
                      onClick={() => console.log("clic!")}
                    >
                      <Plus className={"size-6"} />
                      Nuevo Lote
                    </button>
                  ) : (
                    <h6 className="text-xl text-gray-500 font-bold py-2">
                      Lotes de Piezas
                    </h6>
                  )}
                </div>
                <div className="max-h-[700px] overflow-y-auto pb-4 px-2 custom-scrollbar">
                  <Accordion allowMultiple>
                    {batches.map((batch) => (
                      <Accordion.Item
                        key={batch.batchNumber}
                        header={<LoteAccordionHeader />}
                        batchNumber={batch.batchNumber}
                        startDate={batch.startDate}
                        endDate={batch.endDate}
                        status={batch.status}
                        totalItems={batch.totalItems}
                      >
                        {batch.piezas.map((pieza) => (
                          <p key={pieza}>{pieza}</p>
                        ))}
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              </div>
              <div className="w-1/2">
                <div className="my-4">
                  <h6 className="text-xl text-gray-500 font-bold py-2">
                    Piezas sin Lote
                  </h6>
                </div>
                <div className="max-h-[700px] overflow-y-auto pb-4 px-2 custom-scrollbar">
                  <div className="space-y-2">
                    {pieces.map((piece) => (
                      <PieceAccordionItem
                        key={piece.code}
                        code={piece.code}
                        references={piece.references}
                        description={piece.description}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
      <CreatePieceForm
        pieceData={pieceData}
        setPieceData={setPieceData}
        fetchTissues={fetchTissues}
      />
    </>
  );
}
