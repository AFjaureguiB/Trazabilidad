/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Plus from "./icons/Plus";
import PieceAccordionItem from "./PieceAccordionItem";
import { addPiecesToPieceBatch } from "../services/piecebatch.service.js";

import { useEffect } from "react";
import { notifyError, notifySuccess } from "../utils/notifyToast.js";

export default function AddPieceToBathcForm({
  piecesWithoutBatch,
  fetchPiecesWithoutBatch,
  fetchPiecesBatches,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm();

  const selectedPieces = watch("selectedPieces", []); // Valor inicial vacío
  // Función para manejar el envío del formulario
  const onSubmit = async (payload) => {
    const pieces = piecesWithoutBatch.filter((p) =>
      payload.selectedPieces?.includes(p.id.toString())
    );

    const formData = {
      batchId: payload.batchId,
      pieces,
    };
    console.log("Datos enviados:", formData);
    const {
      state,
      data,
      details: detailsError,
      message: messageError,
    } = await addPiecesToPieceBatch(formData);

    if (state === "Error") {
      notifyError(messageError);
    }

    if (state == "Success") {
      notifySuccess(data);
      reset();
      fetchPiecesBatches();
      fetchPiecesWithoutBatch();
    }
  };

  /* useEffect(() => {
    if (selectedPieces.length === 0) clearErrors();
  }, [selectedPieces, clearErrors]);  */

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-4 flex gap-4 pl-7 pr-2">
        {selectedPieces.length > 0 ? (
          <div className="w-full flex items-center gap-8">
            <div className="space-x-2">
              <label
                htmlFor="batchId"
                className={`text-xl  font-bold ${
                  errors.batchId ? "text-red-400" : "text-gray-500"
                }`}
              >
                Numero de Lote
                {errors.batchId && (
                  <span className="text-red-400 text-sm mt-2 block">
                    {errors.batchId.message}
                  </span>
                )}
              </label>
            </div>
            <input
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5 focus:outline-none ${
                errors.batchId
                  ? "focus:ring-red-400 border border-red-400"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              type="text"
              id="batchId"
              placeholder="461, 18273, 24"
              {...register("batchId", {
                required: "El codigo del lote es necesario",
                pattern: {
                  value: /^[1-9]\d*$/,
                  message: "El código debe ser un número",
                },
              })}
            />
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 flex gap-2 items-center"
              type="submit"
            >
              <Plus className={"size-6"} />
              Agregar a Lote
            </button>
          </div>
        ) : (
          <h6 className="text-xl text-gray-500 font-bold pt-3">
            Piezas sin Lote
          </h6>
        )}
      </div>
      <div className="max-h-[700px] overflow-y-auto pb-4 px-2 custom-scrollbar">
        <div className="space-y-2">
          {piecesWithoutBatch.length === 0 ? (
            <p className="text-xl text-gray-500 font-bold pl-5">
              No existen piezas sin lote ...
            </p>
          ) : (
            piecesWithoutBatch.map((piece) => (
              <div
                key={piece.code}
                className="flex items-center justify-between gap-2"
              >
                <input
                  type="checkbox"
                  value={piece.id}
                  {...register("selectedPieces")}
                />
                <div
                  key={piece.id}
                  className="bg-blue-50/50 border border-blue-200 py-4 px-6 rounded-md flex justify-between w-full items-center gap-2 flex-wrap"
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
                  <p>
                    Descripcion:{" "}
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {piece.description}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </form>
  );
}
