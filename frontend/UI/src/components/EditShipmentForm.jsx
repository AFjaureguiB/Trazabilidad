/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { useEffect } from "react";
import { updateShipment } from "../services/shipment.service";
import { notifyError, notifySuccess } from "../utils/notifyToast";

export default function EditShipmentForm({
  shipmentToEdit,
  setShipmentToEdit,
  fetchShipments,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    setShipmentToEdit({
      showShimpmentEditForm: false,
      shimpment: undefined,
    });
    reset();
  };

  useEffect(() => {
    if (!shipmentToEdit.shimpment) return;
    setValue("id", shipmentToEdit.shimpment.id);
    setValue("receivingips", shipmentToEdit.shimpment.receivingips);
    setValue("sede", shipmentToEdit.shimpment.sede);
    setValue("receivername", shipmentToEdit.shimpment.receivername);
    setValue("shippingdate", shipmentToEdit.shimpment.shippingdate);
    setValue("patientname", shipmentToEdit.shimpment.patientname);
    setValue("patientdni", shipmentToEdit.shimpment.patientdni);
    setValue("specialistname", shipmentToEdit.shimpment.specialistname);
    setValue("indication", shipmentToEdit.shimpment.indication);
  }, [shipmentToEdit, setValue]);

  const onSubmit = async (payload) => {
    console.log("Datos del envío:", payload);

    const {
      state,
      data,
      message: messageError,
    } = await updateShipment(payload);

    if (state === "Error") {
      notifyError(messageError);
    }
    if (state == "Success") {
      const shipmentMessage = `Envio ${data.id} actualizado con exito`;
      notifySuccess(shipmentMessage);
      handleClose();
      fetchShipments();
    }
  };
  return (
    <Modal
      title={"Editar informacion de envio"}
      showModal={shipmentToEdit.showShimpmentEditForm}
      handleClose={handleClose}
    >
      <div className="p-4 md:p-5 text-gray-100">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              IPS Receptora *
            </label>
            <input
              type="text"
              className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block p-2.5 w-full
            ${
              errors.receivingips
                ? "focus:ring-red-400 border border-red-400"
                : "focus:ring-slate-500"
            }`}
              {...register("receivingips", {
                required: "La IPS Receptora es requerida",
              })}
            />
            {errors.receivingips && (
              <p className="text-red-400 text-sm mt-2">
                {errors.receivingips.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium ">Sede *</label>
            <input
              type="text"
              className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block p-2.5 w-full
            ${
              errors.sede
                ? "focus:ring-red-400 border border-red-400"
                : "focus:ring-slate-500"
            }`}
              {...register("sede", { required: "La sede es requerida" })}
            />
            {errors.sede && (
              <p className="text-red-400 text-sm mt-2">{errors.sede.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              Nombre del Receptor
            </label>
            <input
              type="text"
              className="bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block p-2.5 w-full"
              {...register("receivername")}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              Fecha del Envio *
            </label>
            <input
              className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block p-2.5 w-full
            ${
              errors.shippingdate
                ? "focus:ring-red-400 border border-red-400"
                : "focus:ring-slate-500"
            }
            `}
              type="date"
              {...register("shippingdate", {
                required: "La fecha de envio es requerida",
              })}
            />
            {errors.shippingdate && (
              <p className="text-red-400 text-sm mt-2">
                {errors.shippingdate.message}
              </p>
            )}
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Nombre Paciente *
              </label>
              <input
                type="text"
                className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block p-2.5 w-full
                ${
                  errors.patientname
                    ? "focus:ring-red-400 border border-red-400"
                    : "focus:ring-slate-500"
                }`}
                {...register("patientname", {
                  required: "El nombre del paciente es requerido",
                })}
              />
              {errors.patientname && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.patientname.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium ">
                DNI Paciente *
              </label>
              <input
                type="text"
                className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block p-2.5 w-full
                ${
                  errors.patientdni
                    ? "focus:ring-red-400 border border-red-400"
                    : "focus:ring-slate-500"
                }`}
                {...register("patientdni", {
                  required: "El DNI del paciente es requerido",
                })}
              />
              {errors.patientdni && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.patientdni.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium ">
                Especilista *
              </label>
              <input
                type="text"
                className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block p-2.5 w-full
                ${
                  errors.specialistname
                    ? "focus:ring-red-400 border border-red-400"
                    : "focus:ring-slate-500"
                }
                `}
                {...register("specialistname", {
                  required: "El nombre del especialista es requerido",
                })}
              />
              {errors.specialistname && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.specialistname.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium ">
                Indicacion *
              </label>
              <input
                type="text"
                className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block p-2.5 w-full
                ${
                  errors.indication
                    ? "focus:ring-red-400 border border-red-400"
                    : "focus:ring-slate-500"
                }`}
                {...register("indication", {
                  required: "La indicacion es requerida",
                })}
              />
              {errors.indication && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.indication.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 w-full space-y-4">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
              Actualizar Envio
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
