/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { SterilizationPieceTest } from "../constants/results"; // Primeras pruebas que se le hacen a una pieza
import { useEffect } from "react";
import {
  addChemicalTestToPiece,
  updateChemicalTest,
} from "../services/piece.service";
import { notifyError, notifySuccess } from "../utils/notifyToast";
import { useAuth } from "../context/AuthContext";
import { userRoles } from "../constants/user.roles";

export default function CreatePieceTestSterilizationForm({
  pieceTestSterilizationData,
  setPieceTestSterilizationData,
  fetchSterilizationBatches,
  fetchPiecesBatches,
  sterilizationBatches,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useAuth();

  const handleClose = () => {
    setPieceTestSterilizationData({
      showCreatePieceTestSte: false,
      pieceId: 0,
      steBatchId: 0,
      chemicalTest: undefined,
    });
    reset();
  };

  useEffect(() => {
    setValue("pieceId", pieceTestSterilizationData.pieceId);
    setValue("sterilizationbatchId", pieceTestSterilizationData.steBatchId);

    if (pieceTestSterilizationData.chemicalTest) {
      setValue("id", pieceTestSterilizationData.chemicalTest.id);
      setValue("testname", pieceTestSterilizationData.chemicalTest.testname);
      setValue("result", pieceTestSterilizationData.chemicalTest.result);
      setValue("comment", pieceTestSterilizationData.chemicalTest.comment);
    }
  }, [setValue, pieceTestSterilizationData]);

  const onSubmit = async (payload) => {
    console.log(payload);

    const {
      state,
      data,
      details: detailsError,
      message: messageError,
    } = pieceTestSterilizationData.chemicalTest
      ? await updateChemicalTest(payload)
      : await addChemicalTestToPiece(payload);

    if (state === "Error") {
      notifyError(messageError);
    }

    if (state == "Success") {
      const message = `Prueba quimica: ${data.testname}  ${
        !pieceTestSterilizationData.chemicalTest ? "creada" : "actualizada"
      } con exito, resultado: ${data.result}`;

      notifySuccess(message);
      handleClose(); //Reiniciamos los controles de formulario y cerramos el modal
      fetchSterilizationBatches();
      fetchPiecesBatches();
    }
  };

  const currentPiecesBatch = sterilizationBatches?.find(
    (batch) => batch.id === pieceTestSterilizationData.steBatchId
  );
  const chemicalTests = currentPiecesBatch?.pieces.flatMap(
    (piece) => piece.chemicalTests
  );
  const chemicalTestsNames = chemicalTests?.map(
    (chemTest) => chemTest.testname
  );
  const filteredPieceTest = SterilizationPieceTest.filter(
    (test) => !chemicalTestsNames?.includes(test)
  );

  return (
    <Modal
      title={
        !pieceTestSterilizationData.chemicalTest
          ? "Agregar Prueba"
          : "Actualizar Prueba"
      }
      showModal={pieceTestSterilizationData.showCreatePieceTestSte}
      handleClose={handleClose}
    >
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className=" text-gray-100 space-y-4">
            <div className="space-y-4">
              {user.role === userRoles.ADMIN ? (
                <div className="space-y-4">
                  <label>Pieza a la que se le realizo la prueba</label>
                  <select
                    className="bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4  block w-full p-2.5 focus:ring-slate-500"
                    {...register("pieceId", {
                      required: "Debes seleccionar una pieza",
                    })}
                  >
                    <option value="">Selecciona una opción </option>
                    {currentPiecesBatch &&
                      currentPiecesBatch.pieces.map((piece) => (
                        <option key={piece.id} value={piece.id}>
                          {piece.code} - {piece.references} -{" "}
                          {piece.description}
                        </option>
                      ))}
                  </select>
                  {errors.pieceId && (
                    <p className="text-red-400 text-sm">
                      {errors.pieceId.message}
                    </p>
                  )}
                </div>
              ) : null}
              <div className="space-y-4">
                <label>Pruebas</label>
                <select
                  className="bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4  block w-full p-2.5 focus:ring-slate-500"
                  {...register("testname", {
                    required: "Debes seleccionar una prueba",
                  })}
                >
                  <option value="">Selecciona una opción </option>
                  {user.role === userRoles.ADMIN
                    ? SterilizationPieceTest.map((test) => (
                        <option key={test} value={test}>
                          {test}
                        </option>
                      ))
                    : filteredPieceTest.map((test) => (
                        <option key={test} value={test}>
                          {test}
                        </option>
                      ))}
                </select>
                {errors.testname && (
                  <p className="text-red-400 text-sm">
                    {errors.testname.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <div>
                  <label className="w-full py-2 text-sm font-medium text-gray-100 flex items-center gap-2">
                    <input
                      className="w-4 h-4"
                      type="radio"
                      value="No Reactivo"
                      {...register("result", {
                        required: "Debes seleccionar una opción",
                      })}
                    />
                    No Reactivo
                  </label>
                </div>
                <label className="w-full py-2 text-sm font-medium text-gray-100 flex items-center gap-2">
                  <input
                    className="w-4 h-4"
                    type="radio"
                    value="Reactivo"
                    {...register("result", {
                      required: "Debes seleccionar un resultado",
                    })}
                  />
                  Reactivo
                </label>
                {errors.result && (
                  <p className="text-red-400 text-sm">
                    {errors.result.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label>
                Comentarios
                <textarea
                  className="bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5 focus:ring-slate-500 resize-none mt-2"
                  {...register("comment")}
                />
              </label>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Registrar
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
