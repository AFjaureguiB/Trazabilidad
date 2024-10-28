/* eslint-disable react/prop-types */
import { useForm, useFieldArray } from "react-hook-form";
import Plus from "../components/icons/Plus";
import Trash from "../components/icons/Trash";
import { saveShipment } from "../services/shipment.service";
import { notifyError, notifySuccess } from "../utils/notifyToast";

export default function ShipmentForm({
  inventory,
  fetchInventory,
  fetchShipments,
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      pieces: [{ reference: "", ids: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pieces",
  });

  const onSubmit = async (payload) => {
    const totalPieces = payload.pieces.reduce(
      (sum, item) => sum + item.ids.length,
      0
    );

    const formattedShipmentData = {
      ...payload,
      quantity: totalPieces,
    };

    console.log("Datos del envío:", formattedShipmentData);

    const {
      state,
      data,
      message: messageError,
    } = await saveShipment(formattedShipmentData);

    if (state === "Error") {
      notifyError(messageError);
    }
    if (state == "Success") {
      const shipmentMessage = `Envio ${data.id} con ${data.quantity} piezas, creado con exito`;
      notifySuccess(shipmentMessage);
      reset(); //Reiniciamos los controles de formulario
      fetchInventory();
      fetchShipments();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          IPS Receptora *
        </label>
        <input
          type="text"
          className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none
            ${
              errors.receivingips
                ? "focus:ring-red-400 border border-red-400 bg-red-50"
                : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
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
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Sede *
        </label>
        <input
          type="text"
          className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none
            ${
              errors.sede
                ? "focus:ring-red-400 border border-red-400 bg-red-50"
                : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            }`}
          {...register("sede", { required: "La sede es requerida" })}
        />
        {errors.sede && (
          <p className="text-red-400 text-sm mt-2">{errors.sede.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Nombre del Receptor
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none"
          {...register("receivername")}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Fecha del Envio *
        </label>
        <input
          className={`border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 focus:outline-none
            ${
              errors.shippingdate
                ? "focus:ring-red-400 border border-red-400 bg-red-50"
                : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
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
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nombre Paciente *
          </label>
          <input
            type="text"
            className={`border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5
                ${
                  errors.patientname
                    ? "focus:ring-red-400 border border-red-400 bg-red-50"
                    : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
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
          <label className="block mb-2 text-sm font-medium text-gray-900">
            DNI Paciente *
          </label>
          <input
            type="text"
            className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none
                ${
                  errors.patientdni
                    ? "focus:ring-red-400 border border-red-400 bg-red-50"
                    : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
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
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Especilista *
          </label>
          <input
            type="text"
            className={`border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-none
                ${
                  errors.specialistname
                    ? "focus:ring-red-400 border border-red-400 bg-red-50"
                    : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
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
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Indicacion *
          </label>
          <input
            type="text"
            className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none
                ${
                  errors.indication
                    ? "focus:ring-red-400 border border-red-400 bg-red-50"
                    : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
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

      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">Piezas</h3>
        {errors.pieces && (
          <p className="text-red-400 text-sm my-2">
            Debes seleccionar al menos una pieza
          </p>
        )}
        {fields.map((field, index) => (
          <div key={field.id} className="mb-6 border p-4 rounded-lg">
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Referencia
              </label>
              <div className="flex items-center gap-4">
                <select
                  {...register(`pieces.${index}.reference`, {
                    required: true,
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="">Selecciona una referencia</option>
                  {inventory.map((item) => (
                    <option key={item.references} value={item.references}>
                      {item.references} - {item.pieces[0]?.description || ""}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  <Trash />
                </button>
              </div>
              <div></div>
            </div>

            <div className="grid grid-cols-1 gap-2 p-2.5">
              {inventory
                .find(
                  (item) =>
                    item.references === watch(`pieces.${index}.reference`)
                )
                ?.pieces.map((piece) => (
                  <label key={piece.id} className="flex items-center">
                    <input
                      type="checkbox"
                      value={piece.id}
                      {...register(`pieces.${index}.ids`, { required: true })}
                      className="mr-2"
                    />
                    {piece.code} - {piece.description}
                  </label>
                ))}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ reference: "", ids: [] })}
          className="text-blue-600  hover:underline font-medium text-sm text-center flex items-center gap-2"
        >
          <Plus className={"size-6"} /> Referencia
        </button>
      </div>

      <div className="mt-8 w-full">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Registrar Envio
        </button>
      </div>
    </form>
  );
}
