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
import { getSterilizationBatches } from "../services/sterilizationBatch.service.js";
import Plus from "../components/icons/Plus.jsx";
import CreateSterilizationBatchFrom from "../components/CreateSterilizationBatchFrom.jsx";
import CreatePieceTestSterilizationForm from "../components/CreatePieceTestSterilizationForm.jsx";

export default function QualityControl() {
  const [piecesBatches, setPiecesBatches] = useState([]);
  const [sterilizationBatches, setSterilizationBatches] = useState([]);

  const [pieceTestData, setPieceTestData] = useState({
    showCreatePieceTest: false,
    pieceId: 0,
    batchId: 0,
    chemicalTest: undefined,
  });

  const [pieceTestSterilizationData, setPieceTestSterilizationData] = useState({
    showCreatePieceTestSte: false,
    pieceId: 0,
    steBatchId: 0,
    chemicalTest: undefined,
  });

  const [batchData, setBatchData] = useState({
    showCreateStBatch: false,
    stBatch: undefined,
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

  const fetchSterilizationBatches = async () => {
    const {
      state,
      data,
      details: detailsError,
      message: messageError,
    } = await getSterilizationBatches();
    setSterilizationBatches(data);
  };

  useEffect(() => {
    fetchPiecesBatches();
    fetchSterilizationBatches();
  }, []);

  const preAprobedPiecesBatches = piecesBatches.filter(
    (pieceBatch) => pieceBatch.status === "Pre-Aprobado"
  );

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
                                      if (userRoles.ADMIN === user.role) {
                                        const [chemicalTest] =
                                          pieza.chemicalTests;
                                        setPieceTestData({
                                          showCreatePieceTest: true,
                                          pieceId: pieza.id,
                                          batchId: batch.id,
                                          chemicalTest,
                                        });
                                      } else {
                                        setPieceTestData({
                                          showCreatePieceTest: true,
                                          pieceId: pieza.id,
                                          batchId: batch.id,
                                          chemicalTest: undefined,
                                        });
                                      }
                                    }}
                                  >
                                    {userRoles.ADMIN === user.role &&
                                    pieza.chemicalTests.length !== 0 ? (
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
            <div className="flex gap-8">
              <div className="w-1/2">
                <div className="my-4">
                  <h6 className="text-xl text-gray-500 font-bold py-2">
                    Lotes de Piezas Pre-Aprobados
                  </h6>
                </div>
                <div className="max-h-[700px] overflow-y-auto pb-4 px-2 custom-scrollbar">
                  <Accordion allowMultiple>
                    {preAprobedPiecesBatches ? (
                      preAprobedPiecesBatches.map((batch) => (
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
                                </div>
                              </div>
                            ))}
                          </div>
                        </Accordion.Item>
                      ))
                    ) : (
                      <p className="text-xl text-gray-500 font-bold pl-5">
                        No existen lotes pre-aprobados de piezas
                      </p>
                    )}
                  </Accordion>
                </div>
              </div>
              <div className="w-1/2">
                <div className="my-4 flex justify-between items-center">
                  <h6 className="text-xl text-gray-500 font-bold py-2">
                    Lotes de Esterilizacion
                  </h6>
                  <div>
                    {user.role === userRoles.ASSISTANT ? (
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 flex gap-2 items-center"
                        onClick={() =>
                          setBatchData({
                            showCreateStBatch: true,
                            stBatch: undefined,
                          })
                        }
                      >
                        <Plus className={"size-6"} />
                        Nuevo Lote
                      </button>
                    ) : null}
                  </div>
                </div>
                <div className="max-h-[700px] overflow-y-auto pb-4 px-2 custom-scrollbar">
                  {sterilizationBatches ? (
                    <Accordion allowMultiple>
                      {sterilizationBatches.map((batch) => {
                        const chemicalTests = batch.pieces.flatMap(
                          (piece) => piece.chemicalTests
                        );
                        const allSterilizationTestsDone =
                          chemicalTests.length === 11;

                        return (
                          <Accordion.Item
                            key={batch.id}
                            header={<LoteQualityAccordionHeader />}
                            batch={batch}
                            setBatchData={setBatchData}
                            className={
                              "border border-gray-300 rounded-lg overflow-hidden"
                            }
                          >
                            <div className="space-y-2 mt-2 p-4">
                              {batch.pieces.map((pieza) => (
                                <div
                                  key={pieza.id}
                                  className="bg-blue-50/50 border border-blue-200  py-4 px-6 rounded-md space-y-6"
                                >
                                  <div className="flex gap-2 justify-between">
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
                                    <div>
                                      <p>
                                        Descripcion:{" "}
                                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                          {pieza.description}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-start">
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
                                                  chemTest.result ===
                                                  "No Reactivo"
                                                    ? "bg-indigo-100 text-indigo-800"
                                                    : chemTest.result ===
                                                      "Reactivo"
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

                                    <button
                                      className="font-medium text-blue-600 flex gap-1 hover:underline items-center"
                                      title="Agregar resultados"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (userRoles.ADMIN === user.role) {
                                          const [chemicalTest] =
                                            pieza.chemicalTests;
                                          setPieceTestSterilizationData({
                                            showCreatePieceTestSte: true,
                                            pieceId: pieza.id,
                                            steBatchId: batch.id,
                                            chemicalTest,
                                          });
                                        } else {
                                          setPieceTestSterilizationData({
                                            showCreatePieceTestSte: true,
                                            pieceId: pieza.id,
                                            steBatchId: batch.id,
                                            chemicalTest: undefined,
                                          });
                                        }
                                      }}
                                    >
                                      {userRoles.ADMIN === user.role &&
                                      pieza.chemicalTests.length !== 0 &&
                                      pieza.chemicalTests[0]
                                        .sterilizationbatchId ? (
                                        <div className="flex items-center gap-2">
                                          <Pencil />
                                          <span>Editar resultados</span>
                                        </div>
                                      ) : pieza.chemicalTests.length === 0 &&
                                        !allSterilizationTestsDone &&
                                        batch.status !== "Rechazado" &&
                                        userRoles.ASSISTANT === user.role ? (
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
                      })}
                    </Accordion>
                  ) : (
                    <p className="text-xl text-gray-500 font-bold pl-5">
                      No existen lotes pre-aprobados de piezas
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
      <CreatePieceTestForm
        pieceTestData={pieceTestData}
        setPieceTestData={setPieceTestData}
        fetchPiecesBatches={fetchPiecesBatches}
        piecesBatches={piecesBatches}
      />
      <CreateSterilizationBatchFrom
        batchData={batchData}
        setBatchData={setBatchData}
        fetchSterilizationBatches={fetchSterilizationBatches}
      />
      <CreatePieceTestSterilizationForm
        pieceTestSterilizationData={pieceTestSterilizationData}
        setPieceTestSterilizationData={setPieceTestSterilizationData}
        sterilizationBatches={sterilizationBatches}
        fetchSterilizationBatches={fetchSterilizationBatches}
        fetchPiecesBatches={fetchPiecesBatches}
      />
    </>
  );
}
