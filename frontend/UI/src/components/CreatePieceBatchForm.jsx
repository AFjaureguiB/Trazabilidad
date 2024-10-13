/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Modal from "./Modal.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { userRoles } from "../constants/user.roles.js";
import {
  savePieceBatch,
  updatedPieceBatch,
} from "../services/piecebatch.service.js";
import { notifyError, notifySuccess } from "../utils/notifyToast.js";
import { useEffect } from "react";

export default function CreatePieceBatchForm({
  batchData,
  setBatchData,
  fetchPiecesBatches,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useAuth();

  useEffect(() => {
    if (!batchData.batch) return;
    const { batch } = batchData;

    setValue("id", batch.id);
    setValue("startdate", batch.startdate);
    setValue("enddate", batch.enddate);
    setValue("status", batch.status);
  }, [setValue, batchData]);

  const handleClose = () => {
    setBatchData({
      showCreatePieceBatch: false,
      batch: undefined,
    });
    reset();
  };

  const modalTitle = !batchData.batch
    ? "Crear Lote de Piezas"
    : "Editar Lote de Piezas";

  const onSubmit = async (payload) => {
    console.log(payload);
    const {
      state,
      data,
      details: detailsError,
      message: messageError,
    } = !batchData.batch
      ? await savePieceBatch(payload)
      : await updatedPieceBatch(payload);

    if (state === "Error") {
      notifyError(messageError);
    }

    if (state == "Success") {
      const message = `Lote de piezas ${
        !batchData.batch ? "creado" : "actualizado"
      }  con exito, fecha inicial: ${data.startdate}, fecha final: ${
        data.enddate
      }, status: ${data.status}`;

      notifySuccess(message);
      handleClose(); //Reiniciamos los controles de formulario y cerramos el modal
      fetchPiecesBatches();
    }
  };

  return (
    <Modal
      title={modalTitle}
      showModal={batchData.showCreatePieceBatch}
      handleClose={handleClose}
    >
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-gray-100 space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="code"
                  className="block mb-2 text-sm font-medium text-gray-100 "
                >
                  Fecha Inicial
                </label>
                <input
                  type="date"
                  name="startdate"
                  id="startdate"
                  className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5 
                        ${
                          errors.startdate
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
                  {...register("startdate", {
                    required: "La fecha inicial es obligatoria",
                  })}
                />
                {errors.startdate && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.startdate.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="code"
                  className="block mb-2 text-sm font-medium text-gray-100 "
                >
                  Fecha Final
                </label>
                <input
                  type="date"
                  name="enddate"
                  id="enddate"
                  className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5 
                        ${
                          errors.enddate
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
                  {...register("enddate", {
                    required: "La fecha final es obligatoria",
                  })}
                />
                {errors.enddate && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.enddate.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm mb-2 font-medium text-gray-100 "
              >
                Status
              </label>
              <select
                className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4  block w-full p-2.5  custom-scrollbar 
                    ${
                      errors.status
                        ? "focus:ring-red-400 border border-red-400"
                        : "focus:ring-slate-500"
                    }`}
                {...register("status", {
                  required: "El status es obligatorio",
                })}
              >
                <option value=""> Selecciona una opción </option>
                <option value="Stand By">Stand By</option>
                {user.role === userRoles.ADMIN ? (
                  <option value="Closed">Cerrado</option>
                ) : null}
              </select>
              {errors.status && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {!batchData.batch ? "Registrar" : "Actulizar"}
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
