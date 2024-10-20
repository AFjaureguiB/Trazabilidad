/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import BatchFormControls from "./BatchFormControls";
import { useAuth } from "../context/AuthContext";
import { notifyError, notifySuccess } from "../utils/notifyToast";
import { createSterilizationBatch } from "../services/sterilizationBatch.service";
import { useEffect } from "react";

export default function CreateSterilizationBatchFrom({
  batchData,
  setBatchData,
  fetchSterilizationBatches,
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
    setBatchData({
      showCreateStBatch: false,
      stBatch: undefined,
    });
    reset();
  };

  const onSubmit = async (payload) => {
    const { batchId1, batchId2, batchId3, ...stBatchData } = payload;
    const newPayload = {
      piecesBatchIds: [batchId1, batchId2, batchId3],
      ...stBatchData,
    };
    console.log(newPayload);

    const {
      state,
      data,
      details: detailsError,
      message: messageError,
    } = !batchData.stBatch
      ? await createSterilizationBatch(newPayload)
      : console.log("Another function call :C");

    if (state === "Error") {
      notifyError(messageError);
    }

    if (state == "Success") {
      const message = `Lote de esterilizacion  ${
        !batchData.stBatch ? "creado" : "actualizado"
      }  con exito, fecha inicial: ${data.startdate}, fecha final: ${
        data.enddate
      }, status: ${data.status}`;

      notifySuccess(message);
      handleClose(); //Reiniciamos los controles de formulario y cerramos el modal
      fetchSterilizationBatches();
    }
  };
  const modalTitle = !batchData.stBatch
    ? "Crear Lote de Esterilizacion"
    : "Editar Lote de Esterilizacion";
  return (
    <Modal
      title={modalTitle}
      showModal={batchData.showCreateStBatch}
      handleClose={handleClose}
    >
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <BatchFormControls register={register} errors={errors} user={user} />
          <div className="flex justify-between">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-100 ">
                Lote 1
              </label>
              <input
                className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block p-2.5 ${
                  errors.batchId1
                    ? "focus:ring-red-400 border border-red-400"
                    : "focus:ring-slate-500"
                }`}
                type="text"
                placeholder="23"
                {...register("batchId1", {
                  required: "El codigo del lote es necesario",
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: "El código debe ser un número",
                  },
                })}
              />
              {errors.batchId1 && (
                <p className="text-red-400 text-sm">
                  {errors.batchId1.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-100 ">
                Lote 2
              </label>
              <input
                className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block p-2.5 ${
                  errors.batchId2
                    ? "focus:ring-red-400 border border-red-400"
                    : "focus:ring-slate-500"
                }`}
                type="text"
                id="batchId"
                placeholder="24"
                {...register("batchId2", {
                  required: "El codigo del lote es necesario",
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: "El código debe ser un número",
                  },
                })}
              />
              {errors.batchId2 && (
                <p className="text-red-400 text-sm">
                  {errors.batchId2.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-100 ">
                Lote 3
              </label>
              <input
                className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block p-2.5 ${
                  errors.batchId3
                    ? "focus:ring-red-400 border border-red-400"
                    : "focus:ring-slate-500"
                }`}
                type="text"
                placeholder="25"
                {...register("batchId3", {
                  required: "El codigo del lote es necesario",
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: "El código debe ser un número",
                  },
                })}
              />
              {errors.batchId3 && (
                <p className="text-red-400 text-sm">
                  {errors.batchId3.message}
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
