/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { PieceTest } from "../constants/results"; // Primeras pruebas que se le hacen a una pieza
import { useEffect } from "react";

export default function CreatePieceTestForm({
  pieceTestData,
  setPieceTestData,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    setPieceTestData({
      showCreatePieceTest: false,
      pieceId: 0,
      batchId: 0,
    });
    reset();
  };

  useEffect(() => {
    setValue("pieceId", pieceTestData.pieceId);
    setValue("batchId", pieceTestData.batchId);
  }, [setValue, pieceTestData]);

  const onSubmit = async (payload) => {
    console.log(payload);
  };

  return (
    <Modal
      title={"Agregar prueba"}
      showModal={pieceTestData.showCreatePieceTest}
      handleClose={handleClose}
    >
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className=" text-gray-100 space-y-4">
            <div className="space-y-4">
              <div className="space-y-4">
                <label>Pruebas</label>
                <select
                  className="bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4  block w-full p-2.5 focus:ring-slate-500"
                  {...register("test", {
                    required: "Debes seleccionar una prueba",
                  })}
                >
                  <option value=""> Selecciona una opción </option>
                  {PieceTest.map((test) => (
                    <option key={test} value={test}>
                      {test}
                    </option>
                  ))}
                </select>
                {errors.test && (
                  <p className="text-red-400 text-sm">{errors.test.message}</p>
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
