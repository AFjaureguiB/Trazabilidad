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
import CreatePieceBatchForm from "../components/CreatePieceBatchForm.jsx";
import { getPieceBatch } from "../services/piecebatch.service.js";
import { getPiecesWithoutBatch } from "../services/piece.service.js";
import AddPieceToBathcForm from "../components/AddPieceToBathcForm.jsx";

export default function TissueProcessing() {
  const { user } = useAuth();

  const [tissues, setTissues] = useState([]);
  const [piecesBatches, setPiecesBatches] = useState([]);
  const [piecesWithoutBatch, setPiecesWithoutBatch] = useState([]);
  const [pieceData, setPieceData] = useState({
    showCreatePiece: false,
    tissue: undefined,
    pieceToEdit: undefined,
  });

  const [batchData, setBatchData] = useState({ showCreatePieceBatch: false });

  useEffect(() => {
    fetchTissues();
    fetchPiecesBatches();
    fetchPiecesWithoutBatch();
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

  const fetchPiecesBatches = async () => {
    const {
      state,
      data,
      details: detailsError,
      message: messageError,
    } = await getPieceBatch();
    setPiecesBatches(data);
  };

  const fetchPiecesWithoutBatch = async () => {
    const {
      state,
      data,
      details: detailsError,
      message: messageError,
    } = await getPiecesWithoutBatch();
    setPiecesWithoutBatch(data);
  };

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
                            piece={piece}
                            tissue={tissue}
                            setPieceData={setPieceData}
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
                      onClick={() =>
                        setBatchData({ showCreatePieceBatch: true })
                      }
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
                    {piecesBatches.map((batch) => (
                      <Accordion.Item
                        key={batch.id}
                        header={<LoteAccordionHeader />}
                        batchNumber={batch.id}
                        startDate={batch.startdate}
                        endDate={batch.enddate}
                        status={batch.status}
                        totalPieces={batch.pieces.length}
                      >
                        <div className="space-y-2 mt-2">
                          {batch.pieces.map((pieza) => (
                            <p
                              key={pieza.id}
                              className="border border-gray-200 p-2 rounded-md"
                            >
                              {pieza.description} {pieza.references}
                            </p>
                          ))}
                        </div>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              </div>
              <div className="w-1/2">
                <AddPieceToBathcForm
                  piecesWithoutBatch={piecesWithoutBatch}
                  fetchPiecesBatches={fetchPiecesBatches}
                  fetchPiecesWithoutBatch={fetchPiecesWithoutBatch}
                />
              </div>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
      <CreatePieceForm
        pieceData={pieceData}
        setPieceData={setPieceData}
        fetchTissues={fetchTissues}
        fetchPiecesWithoutBatch={fetchPiecesWithoutBatch}
      />
      <CreatePieceBatchForm
        batchData={batchData}
        setBatchData={setBatchData}
        fetchPiecesBatches={fetchPiecesBatches}
      />
    </>
  );
}
