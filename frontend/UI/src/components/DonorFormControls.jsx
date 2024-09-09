export default function DonorFormControls({ register, errors }) {
  return (
    <fieldset className="border border-slate-700 p-5 text-gray-100 rounded-lg space-y-4">
      <legend>Donante</legend>

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
            <p className="text-red-400 text-sm mt-2">{errors.names.message}</p>
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
                message: "El DNI debe corresponder con el formato adecuado",
              },
            })}
          />
          {errors.dni && (
            <p className="text-red-400 text-sm mt-2">{errors.dni.message}</p>
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
  );
}
