/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { useState } from "react";
import { updatePassword } from "../services/user.service";
import { notifyError, notifySuccess } from "../utils/notifyToast";
export default function UpdatePasswordForm({
  showUpdatePasswordForm,
  setShowUpdatePasswordForm,
}) {
  const [matchPasswordError, setMatchPasswordError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    setShowUpdatePasswordForm(false);
    reset();
    setMatchPasswordError(false);
  };

  const onSubmit = async (payload) => {
    console.log(payload);
    if (payload.newpassword !== payload.confirmplainpassword) {
      setMatchPasswordError(true);
      return;
    } else {
      setMatchPasswordError(false);
    }
    const {
      state,
      data,
      message: messageError,
    } = await updatePassword(payload);

    if (state === "Error") {
      notifyError(messageError);
    }

    if (state == "Success") {
      notifySuccess(data);
      handleClose();
    }
  };

  return (
    <Modal
      title={"Actulizar Contraseña"}
      showModal={showUpdatePasswordForm}
      handleClose={handleClose}
    >
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="px-8">
            <label className="block mb-2 text-sm font-medium text-gray-100 ">
              Contraseña Actual
            </label>
            <input
              className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block p-2.5 w-full ${
                errors.plainpassword
                  ? "focus:ring-red-400 border border-red-400"
                  : "focus:ring-slate-500"
              }`}
              type="password"
              placeholder="My-4w3som3-p4ssw0rd"
              {...register("plainpassword", {
                required: "La contraseña es requerida",
              })}
            />
            {errors.plainpassword && (
              <p className="text-red-400 text-sm">
                {errors.plainpassword.message}
              </p>
            )}
          </div>
          <div className="px-8">
            <label className="block mb-2 text-sm font-medium text-gray-100 ">
              Contraseña Nueva
            </label>
            <input
              className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block p-2.5 w-full ${
                errors.newpassword || matchPasswordError
                  ? "focus:ring-red-400 border border-red-400"
                  : "focus:ring-slate-500"
              }`}
              type="password"
              placeholder="My-n3w-4w3som3-p4ssw0rd"
              {...register("newpassword", {
                required: "La nueva contraseña es requerida",
              })}
            />
            {errors.newpassword && (
              <p className="text-red-400 text-sm">
                {errors.newpassword.message}
              </p>
            )}
          </div>
          <div className="px-8">
            <label className="block mb-2 text-sm font-medium text-gray-100 ">
              Confirmar Contraseña Nueva
            </label>
            <input
              className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block p-2.5 w-full ${
                errors.confirmplainpassword || matchPasswordError
                  ? "focus:ring-red-400 border border-red-400"
                  : "focus:ring-slate-500"
              }`}
              type="password"
              placeholder="My-n3w-4w3som3-p4ssw0rd"
              {...register("confirmplainpassword", {
                required: "Es necesario confirmar la contraseña",
              })}
            />
            {errors.confirmplainpassword && (
              <p className="text-red-400 text-sm">
                {errors.confirmplainpassword.message}
              </p>
            )}
            {matchPasswordError ? (
              <p className="text-red-400 text-sm">
                Las contraseñas no coinciden
              </p>
            ) : null}
          </div>

          <div className="flex gap-4 px-8">
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Actulizar
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
