export default function CreateDonorModal({
  onSubmit,
  handleSubmit,
  handleCancelar,
  register,
  errors,
}) {
  const isPdf = (fileList) => {
    if (!fileList || fileList.length === 0) return false;
    return (
      fileList[0].type === "application/pdf" || "El archivo debe ser un PDF"
    );
  };

  const isSingleFile = (fileList) => {
    return fileList.length === 1 || "Solo se permite un archivo";
  };

  return (
    <div
      tabIndex="-1"
      className=" overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 justify-center items-center w-full inset-0  max-h-full bg-black/20"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="relative bg-slate-900 rounded-lg shadow overflow-y-auto max-h-[720px] custom-scrollbar">
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-700 rounded-t">
            <h3 className="text-xl font-semibold text-gray-100 ">
              Nuevo registro
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-100 bg-transparent hover:bg-slate-700 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              onClick={handleCancelar}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="border border-slate-700 p-5 text-gray-100 rounded-lg space-y-4">
                <legend>Donador</legend>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="names"
                      className="block mb-2 text-sm font-medium text-gray-100 "
                    >
                      Nombre{"(s)"}
                    </label>
                    <input
                      type="text"
                      name="names"
                      id="names"
                      className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5 
                        ${
                          errors.names
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
                      {...register("names", {
                        required: "El nombre o nombres son obligatorios",
                      })}
                    />
                    {errors.names && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.names.message}
                      </p>
                    )}
                  </div>

                  <div className="w-1/2">
                    <label
                      htmlFor="surnames"
                      className="block mb-2 text-sm font-medium text-gray-100 "
                    >
                      Apellido{"(s)"}
                    </label>
                    <input
                      type="text"
                      name="surnames"
                      id="surnames"
                      className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5
                        ${
                          errors.surnames
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
                      {...register("surnames", {
                        required: "El apellido o apellidos son obligatorios",
                      })}
                    />
                    {errors.surnames && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.surnames.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="dni"
                      className="block mb-2 text-sm font-medium text-gray-100 "
                    >
                      DNI/Cédula
                    </label>
                    <input
                      type="text"
                      name="dni"
                      id="dni"
                      className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5
                        ${
                          errors.dni
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
                      {...register("dni", {
                        required: "El DNI/Cédula es obligatorio",
                        pattern: {
                          value: /^[1-9][0-9]*$/,
                          message:
                            "El DNI debe corresponder con el formato adecuado",
                        },
                      })}
                    />
                    {errors.dni && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.dni.message}
                      </p>
                    )}
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="dateOfBirth"
                      className="block mb-2 text-sm font-medium text-gray-100 "
                    >
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5
                        ${
                          errors.dateOfBirth
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
                      {...register("dateOfBirth", {
                        required: "La fecha de nacimiento es obligatoria",
                      })}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                </div>
              </fieldset>

              <fieldset className="border border-slate-700 p-5 text-gray-100 rounded-lg space-y-4">
                <legend>Tejido</legend>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="ips"
                      className="block mb-2 text-sm font-medium text-gray-100 "
                    >
                      IPS Generadora
                    </label>
                    <input
                      type="text"
                      name="ips"
                      id="ips"
                      className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5
                         ${
                           errors.ips
                             ? "focus:ring-red-400 border border-red-400"
                             : "focus:ring-slate-500"
                         }`}
                      {...register("ips", {
                        required:
                          "El nombre de la institucion prestadora de salud es obligatorio",
                      })}
                    />
                    {errors.ips && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.ips.message}
                      </p>
                    )}
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="specialistname"
                      className="block mb-2 text-sm font-medium text-gray-100 "
                    >
                      Nombre Especialista
                    </label>
                    <input
                      type="text"
                      name="specialistname"
                      id="specialistname"
                      className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5
                        ${
                          errors.specialistname
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
                      {...register("specialistname", {
                        required: "El nombre del especialista es obligatorio",
                      })}
                    />
                    {errors.specialistname && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.specialistname.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="code"
                      className="block mb-2 text-sm font-medium text-gray-100 "
                    >
                      Código FUNDONEMOS
                    </label>
                    <input
                      type="text"
                      name="code"
                      id="code"
                      className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5
                        ${
                          errors.code
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
                      {...register("code", {
                        required:
                          "El codigo unico que identifica a este tejido es obligatorio",
                        pattern: {
                          value: /^[1-9][0-9]*$/,
                          message:
                            "El código debe ser un número positivo, comenzando por un dígito entre 1 y 9",
                        },
                      })}
                    />
                    {errors.code && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.code.message}
                      </p>
                    )}
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="collectedAt"
                      className="block mb-2 text-sm font-medium text-gray-100 "
                    >
                      Fecha de Recolección
                    </label>
                    <input
                      type="date"
                      name="collectedAt"
                      id="collectedAt"
                      className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5
                        ${
                          errors.collectedAt
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
                      {...register("collectedAt", {
                        required:
                          "La fecha de recoleccion del tejido es obligatoria",
                      })}
                    />
                    {errors.collectedAt && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.collectedAt.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="tissuetype"
                      className="block mb-2 text-sm font-medium text-gray-100 "
                    >
                      Tipo
                    </label>
                    <input
                      type="text"
                      name="tissuetype"
                      id="tissuetype"
                      className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5
                        ${
                          errors.tissuetype
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
                      {...register("tissuetype", {
                        required: "El tipo del tejido es obligatorio",
                      })}
                    />
                    {errors.tissuetype && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.tissuetype.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-100"
                    >
                      Descripcion o Detalles
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 focus:ring-slate-500 block w-full p-2.5"
                      {...register("description")}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="">
                    <label
                      htmlFor="location"
                      className="block mb-2 text-sm font-medium text-gray-100 "
                    >
                      Código Congelador
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5
                        ${
                          errors.location
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
                      {...register("location", {
                        required: "El codigo del congelador es obligatorio",
                      })}
                    />
                    {errors.location && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="consentimiento"
                      className="block mb-2 text-sm font-medium text-gray-100"
                    >
                      Consentimiento Informado {"(PDF)"}
                    </label>
                    <input
                      type="file"
                      name="consentimiento"
                      id="consentimiento"
                      accept=".pdf"
                      className={`block w-full rounded-lg text-sm focus:outline-none focus:ring-4 bg-neutral-900 text-neutral-400
                      file:border-0
                      file:me-4
                      file:py-3 file:px-4
                    file:bg-neutral-700 
                    file:text-neutral-400
                    ${
                      errors.consentimiento
                        ? "focus:ring-red-400 border border-red-400"
                        : "focus:ring-slate-500"
                    }`}
                      {...register("consentimiento", {
                        required:
                          "El archivo PDF del consentimiento es obligatorio",
                        validate: {
                          isPdf,
                          isSingleFile,
                        },
                      })}
                    />
                    {errors.consentimiento && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.consentimiento.message}
                      </p>
                    )}
                  </div>
                </div>
              </fieldset>
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
                  onClick={handleCancelar}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
