import LeftArrow from "../components/icons/LeftArrow";
import { userRoles } from "../constants/user.roles";
import { useAuth } from "../context/AuthContext";
import Tabs from "../components/Tabs.jsx";
import { useEffect, useState } from "react";
import { getPieceBatch } from "../services/piecebatch.service.js";
import Accordion from "../components/Accordion.jsx";
import LoteQualityAccordionHeader from "../components/LoteQualityAccordionHeader.jsx";
import Pencil from "../components/icons/Pencil.jsx";
import CreatePieceTestForm from "../components/CreatePieceTestForm.jsx";

export default function QualityControl() {
  const [piecesBatches, setPiecesBatches] = useState([]);

  const [pieceTestData, setPieceTestData] = useState({
    showCreatePieceTest: false,
    pieceId: 0,
    batchId: 0,
  });

  const { user } = useAuth();

  const fetchPiecesBatches = async () => {
    const {
      state,
      data,
      details: detailsError,
      message: messageError,
    } = await getPieceBatch();
    setPiecesBatches(data);
  };

  useEffect(() => {
    fetchPiecesBatches();
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
          <Tabs.Item title="Lote de Piezas">
            <div>
              <div className="my-4">
                <h6 className="text-xl text-gray-500 font-bold py-2">
                  Piezas y Pruebas
                </h6>
              </div>
              <div className="max-h-[700px] overflow-y-auto pb-4 px-2 custom-scrollbar">
                <Accordion allowMultiple>
                  {piecesBatches ? (
                    piecesBatches.map((batch) => {
                      const chemicalTests = batch.pieces.flatMap(
                        (piece) => piece.chemicalTests
                      );

                      const allChemicalTestsDone = chemicalTests.length === 3;
                      return (
                        <Accordion.Item
                          key={batch.id}
                          header={<LoteQualityAccordionHeader />}
                          batch={batch}
                          className={
                            "border border-gray-300 rounded-lg overflow-hidden"
                          }
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
                                {pieza.chemicalTests.length !== 0
                                  ? pieza.chemicalTests.map((chemTest) => (
                                      <div key={chemTest.id}>
                                        <p>
                                          Prueba Quimica:
                                          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {chemTest.testname}
                                          </span>
                                        </p>
                                        <p>
                                          Resultado:
                                          <span
                                            className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                                              chemTest.result === "No Reactivo"
                                                ? "bg-indigo-100 text-indigo-800"
                                                : chemTest.result === "Reactivo"
                                                ? "bg-red-100 text-red-800"
                                                : ""
                                            }`}
                                          >
                                            {chemTest.result}
                                          </span>
                                        </p>
                                      </div>
                                    ))
                                  : null}
                                <div className="flex flex-col items-end">
                                  <p>
                                    Descripcion:{" "}
                                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                      {pieza.description}
                                    </span>
                                  </p>
                                  <button
                                    className="font-medium text-blue-600 flex gap-1 hover:underline items-center"
                                    title="Agregar resultados"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPieceTestData({
                                        showCreatePieceTest: true,
                                        pieceId: pieza.id,
                                        batchId: batch.id,
                                      });
                                    }}
                                  >
                                    {userRoles.ADMIN === user.role ? (
                                      <div className="flex items-center gap-2">
                                        <Pencil />
                                        <span>Editar resultados</span>
                                      </div>
                                    ) : pieza.chemicalTests.length === 0 &&
                                      !allChemicalTestsDone &&
                                      batch.status !== "Rechazado" ? (
                                      <div className="flex items-center gap-2">
                                        <Pencil />
                                        <span>Agregar resultados</span>
                                      </div>
                                    ) : null}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Accordion.Item>
                      );
                    })
                  ) : (
                    <p className="text-xl text-gray-500 font-bold pl-5">
                      No tenemos lotes de piezas ...
                    </p>
                  )}
                </Accordion>
              </div>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Lote Esterilizacion">
            <p>conteindo del lote de esterilizacion</p>
          </Tabs.Item>
        </Tabs>
      </div>
      <CreatePieceTestForm
        pieceTestData={pieceTestData}
        setPieceTestData={setPieceTestData}
        fetchPiecesBatches={fetchPiecesBatches}
        piecesBatches={piecesBatches}
      />
    </>
  );
}
