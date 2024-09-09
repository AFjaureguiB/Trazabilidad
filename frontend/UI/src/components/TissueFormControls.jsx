import { isPdf, isSingleFile } from "../utils/pdfValidations.js";
export default function TissueForm({ register, errors, isEditing }) {
  return (
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
            className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5 ${
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
            <p className="text-red-400 text-sm mt-2">{errors.ips.message}</p>
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
            className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5 ${
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
            Código único donante
          </label>
          <input
            type="text"
            name="code"
            id="code"
            className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5 ${
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
            <p className="text-red-400 text-sm mt-2">{errors.code.message}</p>
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
            className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5 ${
              errors.collectedAt
                ? "focus:ring-red-400 border border-red-400"
                : "focus:ring-slate-500"
            }`}
            {...register("collectedAt", {
              required: "La fecha de recoleccion del tejido es obligatoria",
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
          <select
            name="tissuetype"
            id="tissuetype"
            className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5 ${
              errors.tissuetype
                ? "focus:ring-red-400 border border-red-400"
                : "focus:ring-slate-500"
            }`}
            {...register("tissuetype", {
              required: "El tipo del tejido es obligatorio",
            })}
          >
            <option value="" disabled>Selecciona el tipo</option>
            <option value="Cabeza femoral derecha">Cabeza femoral derecha</option>
            <option value="Cabeza femoral izquierda">Cabeza femoral izquierda</option>
            <option value="Fragmento de rodilla derecha">Fragmento de rodilla derecha</option>
            <option value="Fragmento de rodilla izquierda">Fragmento de rodilla izquierda</option>
          </select>
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
            className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5 ${
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
              required: isEditing
                ? false
                : "El archivo PDF del consentimiento es obligatorio",
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
  );
}
