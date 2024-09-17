import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { TestResults } from "../constants/results";
import { useEffect } from "react";
import { updateInfectiousTest } from "../services/infectiousTest.service.js";
import { notifySuccess, notifyError } from "../utils/notifyToast.js";
import { userRoles } from "../constants/user.roles.js";

export default function CreateInfectiousForm({
  infectiousTestsData,
  setInfectiousTestsData,
  fetchDonors,
  user,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setValue("tissueId", infectiousTestsData.tissueId);
  }, [setValue, infectiousTestsData]);

  const tittleModal = "Agregar resultado de prueba infecciosa";

  const filteredTests =
    user.role === userRoles.ADMIN
      ? infectiousTestsData.infectiousTests
      : infectiousTestsData.infectiousTests.filter(
          (test) => test.result === TestResults.NO_REALIZADO
        );

  const handleClose = () => {
    setInfectiousTestsData({
      showCreateInfectiousTests: false,
      infectiousTests: [],
      tissueId: 0,
    });
    reset();
  };

  const onSubmit = async (payload) => {
    try {
      const {
        state,
        data,
        details: detailsError,
        message: messageError,
      } = await updateInfectiousTest(payload);

      if (state === "Error") {
        notifyError(messageError);
      }

      if (state == "Success") {
        const testMessage = `Informacion de prueba infecciosa '${data.testName}' actualizada con exito a ${data.result}`;

        notifySuccess(testMessage);
        handleClose(); //Reiniciamos los controles de formulario y cerramos el modal
        fetchDonors(); //Hacemos un fetching de los donadores para ver el nuevo tejido en el donador
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <Modal
      title={tittleModal}
      showModal={infectiousTestsData.showCreateInfectiousTests}
      handleClose={handleClose}
    >
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className=" text-gray-100 space-y-4">
            <input type="hidden" {...register("tissueId")} />
            <div className="space-y-4">
              <div className="space-y-4">
                <label>Pruebas</label>
                <select
                  className="bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4  block w-full p-2.5 focus:ring-slate-500"
                  {...register("testId", {
                    required: "Debes seleccionar una prueba",
                  })}
                >
                  <option value=""> Selecciona una opción </option>
                  {filteredTests.map((test) => (
                    <option key={test.id} value={test.id}>
                      {test.testName}
                    </option>
                  ))}
                </select>
                {errors.testId && (
                  <p className="text-red-400 text-sm">
                    {errors.testId.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                {user.role === userRoles.ADMIN ? (
                  <div>
                    <label className="w-full py-2 text-sm font-medium text-gray-100 flex items-center gap-2">
                      <input
                        className="w-4 h-4"
                        type="radio"
                        value="No Realizado"
                        {...register("result", {
                          required: "Debes seleccionar una opción",
                        })}
                      />
                      No Realizado
                    </label>
                  </div>
                ) : null}
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
              </div>
            </div>

            {errors.result && (
              <p className="text-red-400 text-sm">{errors.result.message}</p>
            )}
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
