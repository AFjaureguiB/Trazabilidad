/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { useEffect } from "react";
import { addAdminUser, updateAdminUser } from "../services/user.service.js";
import { notifyError, notifySuccess } from "../utils/notifyToast.js";

export default function AdminUserForm({
  userAdminData,
  setUserAdminData,
  fetchUsers,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    setUserAdminData({
      showUserAdminModal: false,
      userAdmin: undefined,
    });
    reset();
  };

  useEffect(() => {
    if (!userAdminData.userAdmin) return;
    setValue("id", userAdminData.userAdmin.id);
    setValue("firstname", userAdminData.userAdmin.firstname);
    setValue("lastname", userAdminData.userAdmin.lastname);
    setValue("username", userAdminData.userAdmin.username);
    setValue("email", userAdminData.userAdmin.email);
    setValue("process", userAdminData.userAdmin.Process.name);
  }, [userAdminData.userAdmin, setValue]);

  const onSubmit = async (payload) => {
    const {
      state,
      data,
      message: messageError,
    } = !userAdminData.userAdmin
      ? await addAdminUser(payload)
      : await updateAdminUser(payload);

    if (state === "Error") notifyError(messageError);

    if (state == "Success") {
      const message = `Usuario ${data.firstname} ${data.lastname}, ${
        !userAdminData.userAdmin ? "creado" : "actualizado"
      }  con exito`;
      notifySuccess(message);
      fetchUsers();
      handleClose();
    }
  };

  return (
    <Modal
      title={"Nuevo Usuario Admin"}
      showModal={userAdminData.showUserAdminModal}
      handleClose={handleClose}
    >
      <div className="p-4 col-span-2 md:col-span-1">
        <form
          className="space-y-4 max-w-lg mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="firstname"
              className={`block mb-2 text-sm font-medium ${
                errors.firstname ? "text-red-700" : "text-gray-100"
              }`}
            >
              Nombre
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              className={`border text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2
              ${
                errors.firstname
                  ? "bg-red-50  border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              }`}
              placeholder="John"
              {...register("firstname", { required: true })}
            />
            <span
              className={`block mt-2 text-sm text-red-600 ${
                errors.firstname ? "" : "invisible"
              }`}
            >
              El nombre o nombres son requeridos
            </span>
          </div>
          <div>
            <label
              htmlFor="lastname"
              className={`block mb-2 text-sm font-medium ${
                errors.lastname ? "text-red-700" : "text-gray-100"
              }`}
            >
              Apellido
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Doe"
              className={`border text-sm rounded-lg  block w-full p-2.5 focus:outline-none focus:ring-2 ${
                errors.lastname
                  ? "bg-red-50  border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              }`}
              {...register("lastname", { required: true })}
            />
            <span
              className={`block mt-2 text-sm text-red-600 ${
                errors.lastname ? "" : "invisible"
              }`}
            >
              Los apellidos son requeridos
            </span>
          </div>
          <div>
            <label
              htmlFor="username"
              className={`block mb-2 text-sm font-medium ${
                errors.username ? "text-red-700" : "text-gray-100"
              }`}
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="@john_doe"
              className={`border text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2
              ${
                errors.username
                  ? "bg-red-50  border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                  : "bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500"
              }`}
              {...register("username", { required: true })}
            />
            <span
              className={`block mt-2 text-sm text-red-600 ${
                errors.username ? "" : "invisible"
              }`}
            >
              El nombre de usuario es requerido
            </span>
          </div>
          {!userAdminData.userAdmin && (
            <div>
              <label
                htmlFor="password"
                className={`block mb-2 text-sm font-medium ${
                  errors.plainpassword ? "text-red-700" : "text-gray-100"
                }`}
              >
                Contraseña
              </label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="$john_doe1234"
                className={`border text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2
                ${
                  errors.plainpassword
                    ? "bg-red-50  border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                    : "bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500"
                }`}
                {...register("plainpassword", { required: true })}
              />
              <span
                className={`block mt-2 text-sm text-red-600 ${
                  errors.plainpassword ? "" : "invisible"
                }`}
              >
                La contraseña es requerida
              </span>
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className={`block mb-2 text-sm font-medium ${
                errors.email ? "text-red-700" : "text-gray-100"
              }`}
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="johndoe@mail.com"
              className={`border text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2
              ${
                errors.email
                  ? "bg-red-50  border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                  : "bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500"
              }`}
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Direccion de correo no valida",
                },
              })}
            />

            <span
              className={`block mt-2 text-sm text-red-600 ${
                errors.email ? "" : "invisible"
              }`}
            >
              {errors.email ? errors.email.message : "no errors"}
            </span>
          </div>
          <div>
            <select
              className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4  block w-full p-2.5  custom-scrollbar 
                    ${
                      errors.process
                        ? "focus:ring-red-400 border border-red-400"
                        : "focus:ring-slate-500"
                    }`}
              {...register("process", {
                required: "El proceso es obligatorio",
              })}
            >
              <option value=""> Selecciona una opción </option>
              <option value="Donantes y tejidos">Donantes y tejidos</option>
              <option value="Control de pruebas infecciosas">
                Control de pruebas infecciosas
              </option>
              <option value="Producción y creación de referencias de injertos óseos">
                Producción y creación de referencias de injertos óseos
              </option>
              <option value="Control de calidad de producto terminado">
                Control de calidad de producto terminado
              </option>
              <option value="Logística de distribución y trazabilidad de implantación">
                Logística de distribución y trazabilidad de implantación
              </option>
            </select>
            {errors.process && (
              <p className="text-red-400 text-sm mt-2">
                {errors.process.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
            >
              {userAdminData.userAdmin
                ? "Actualizar usuario"
                : "Agregar usuario"}
            </button>
            <button
              type="button"
              className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
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
