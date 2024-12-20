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
import {
  getPieceBatch,
  updatedPieceBatch,
} from "../services/piecebatch.service.js";
import { getPiecesWithoutBatch } from "../services/piece.service.js";
import AddPieceToBathcForm from "../components/AddPieceToBathcForm.jsx";
import { notifyError, notifySuccess } from "../utils/notifyToast.js";

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

  const [batchData, setBatchData] = useState({
    showCreatePieceBatch: false,
    batch: undefined,
  });

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

  const closePieceBatch = async (piecebatchData) => {
    piecebatchData.status = "Closed";
    const {
      state,
      data,
      details: detailsError,
      message: messageError,
    } = await updatedPieceBatch(piecebatchData);

    if (state === "Error") {
      notifyError(messageError);
    }

    if (state == "Success") {
      const message = `Lote de piezas con numero ${data.id}, actualizado a estado: ${data.status}`;
      notifySuccess(message);
      fetchPiecesBatches();
    }
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
                  {tissues ? (
                    tissues.map((tissue) => (
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
                    ))
                  ) : (
                    <p>Aún no hay tejidos...</p>
                  )}
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
                        setBatchData({
                          showCreatePieceBatch: true,
                          batch: undefined,
                        })
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
                    {piecesBatches ? (
                      piecesBatches.map((batch) => (
                        <Accordion.Item
                          key={batch.id}
                          header={<LoteAccordionHeader />}
                          batch={batch}
                          setBatchData={setBatchData}
                          className={
                            "border border-gray-300 rounded-lg overflow-hidden"
                          }
                          closePieceBatch={closePieceBatch}
                        >
                          <div className="space-y-2 mt-2 p-4">
                            {batch.pieces.map((pieza) => (
                              <div
                                key={pieza.id}
                                className="bg-blue-50/50 border border-blue-200  py-4 px-6 rounded-md flex justify-between items-center gap-2 flex-wrap"
                              >
                                <div className="space-y-2">
                                  <p>
                                    Codigo:
                                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                      {pieza.code}
                                    </span>
                                  </p>

                                  <p>
                                    Referencia:
                                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                      {pieza.references}{" "}
                                    </span>
                                  </p>
                                </div>
                                <p>
                                  Descripcion:{" "}
                                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                    {pieza.description}
                                  </span>
                                </p>
                              </div>
                            ))}
                          </div>
                        </Accordion.Item>
                      ))
                    ) : (
                      <p className="text-xl text-gray-500 font-bold pl-5">
                        No existen lotes de piezas
                      </p>
                    )}
                  </Accordion>
                </div>
              </div>
              <div className="w-1/2">
                {user.role === userRoles.ADMIN ? (
                  <>
                    <div className="my-4">
                      <h6 className="text-xl text-gray-500 font-bold pt-3">
                        Piezas sin Lote
                      </h6>
                    </div>
                    <div className="max-h-[700px] overflow-y-auto pb-4 px-2 custom-scrollbar">
                      <div className="space-y-2">
                        {piecesWithoutBatch.map((pieza) => (
                          <div
                            key={pieza.id}
                            className="bg-blue-50/50 border border-blue-200  py-4 px-6 rounded-md flex justify-between items-center gap-2 flex-wrap"
                          >
                            <div className="space-y-2">
                              <p>
                                Codigo:
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                  {pieza.code}
                                </span>
                              </p>

                              <p>
                                Referencia:
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                  {pieza.references}{" "}
                                </span>
                              </p>
                            </div>
                            <p>
                              Descripcion:{" "}
                              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {pieza.description}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <AddPieceToBathcForm
                    piecesWithoutBatch={piecesWithoutBatch}
                    fetchPiecesBatches={fetchPiecesBatches}
                    fetchPiecesWithoutBatch={fetchPiecesWithoutBatch}
                  />
                )}
              </div>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
      <CreatePieceForm
        pieceData={pieceData}
        setPieceData={setPieceData}
        fetchTissues={fetchTissues}
        fetchPiecesBatches={fetchPiecesBatches}
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
