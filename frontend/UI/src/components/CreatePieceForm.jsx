/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal.jsx";
import { referencias } from "../constants/referencias.js";
import { savePiece, updatePiece } from "../services/piece.service.js";
import { notifyError, notifySuccess } from "../utils/notifyToast.js";

export default function CreatePieceForm({
  pieceData,
  setPieceData,
  fetchTissues,
  fetchPiecesBatches,
  fetchPiecesWithoutBatch,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!pieceData.tissue) return;
    setValue("code", pieceData.tissue.code);
    setValue("tissueId", pieceData.tissue.id);

    if (!pieceData.pieceToEdit) return;
    const [, letter] = pieceData.pieceToEdit.code.split("-");
    setValue("letter", letter);
    setValue("references", pieceData.pieceToEdit.references);
    setValue("id", pieceData.pieceToEdit.id);
  }, [setValue, pieceData]);

  const handleClose = () => {
    setPieceData({
      showCreatePiece: false,
      tissue: undefined,
      pieceToEdit: undefined,
    });
    reset();
  };

  const onSubmit = async (payload) => {
    const {
      state,
      data,
      details: detailsError,
      message: messageError,
    } = pieceData.pieceToEdit
      ? await updatePiece(payload)
      : await savePiece(payload);

    if (state === "Error") {
      notifyError(messageError);
    }
    if (state == "Success") {
      const testMessage = pieceData.pieceToEdit
        ? `Pieza con codigo '${data.code}' actualizada con exito`
        : `Pieza con codigo '${data.code}' creada con exito`;

      notifySuccess(testMessage);
      handleClose(); //Reiniciamos los controles de formulario y cerramos el modal
      fetchTissues();
      fetchPiecesBatches();
      fetchPiecesWithoutBatch();
    }
  };

  const modalTitle = pieceData.pieceToEdit ? "Editar Pieza" : "Crear Pieza";
  return (
    <Modal
      title={modalTitle}
      showModal={pieceData.showCreatePiece}
      handleClose={handleClose}
    >
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className=" text-gray-100 space-y-4">
            <input type="hidden" {...register("tissueId")} />
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="code"
                  className="block mb-2 text-sm font-medium text-gray-100 "
                >
                  Codigo Unico Pieza
                </label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  disabled
                  className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5 
                        ${
                          errors.code
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
                  {...register("code", {
                    required: "El codigo unico de pieza es obligatorio",
                  })}
                />
                {errors.code && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.code.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="letter"
                  className="block mb-2 text-sm font-medium text-gray-100 "
                >
                  Letra
                </label>
                <input
                  type="text"
                  name="letter"
                  id="letter"
                  placeholder="A, B, C, D ..."
                  className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5 
                        ${
                          errors.letter
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
                  {...register("letter", {
                    required:
                      "La letra del codigo unico de pieza es obligatoria",
                  })}
                />
                {errors.letter && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.letter.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="">
                <label
                  htmlFor="references"
                  className="block text-sm mb-2 font-medium text-gray-100 "
                >
                  Referencia
                </label>
                <select
                  className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4  block w-full p-2.5  custom-scrollbar 
                    ${
                      errors.references
                        ? "focus:ring-red-400 border border-red-400"
                        : "focus:ring-slate-500"
                    }`}
                  {...register("references", {
                    required: "Debes seleccionar una referencia",
                  })}
                >
                  <option value=""> Selecciona una opción </option>
                  {Object.keys(referencias).map((key) => (
                    <option key={key} value={key}>
                      {key} : {referencias[key]}
                    </option>
                  ))}
                </select>
                {errors.references && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.references.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {pieceData.pieceToEdit ? "Actulizar" : "Registrar"}
            </button>
            <button
              type="button"
              className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
