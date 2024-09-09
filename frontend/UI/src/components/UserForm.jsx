export default function UserForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isBeingEdited,
  handleCancelar,
}) {
  return (
    <div className="p-4 md:p-8 col-span-2 md:col-span-1 border rounded-xl shadow">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 max-w-sm mx-auto">
        {isBeingEdited ? "Actualizar usuario" : "Registrar usuario"}
      </h2>
      <form
        className="space-y-4 max-w-sm mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <input
          type="hidden"
          name="userId"
          id="userId"
          {...register("userId")}
        /> */}
        <div>
          <label
            htmlFor="firstname"
            className={`block mb-2 text-sm font-medium ${
              errors.firstname ? "text-red-700" : "text-gray-900"
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
              errors.lastname ? "text-red-700" : "text-gray-900"
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
              errors.username ? "text-red-700" : "text-gray-900"
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
        {!isBeingEdited && (
          <div>
            <label
              htmlFor="password"
              className={`block mb-2 text-sm font-medium ${
                errors.plainpassword ? "text-red-700" : "text-gray-900"
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
              errors.email ? "text-red-700" : "text-gray-900"
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
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
          >
            {isBeingEdited ? "Actualizar usuario" : "Agregar usuario"}
          </button>
          <button
            type="button"
            className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
            onClick={handleCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
