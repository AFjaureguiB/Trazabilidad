/* eslint-disable react/prop-types */
import { userRoles } from "../constants/user.roles";

export default function BatchFormControls({ register, errors, user }) {
  return (
    <div className="text-gray-100 space-y-4">
      <div className="flex gap-4">
        <div className="w-1/2">
          <label
            htmlFor="code"
            className="block mb-2 text-sm font-medium text-gray-100 "
          >
            Fecha Inicial
          </label>
          <input
            type="date"
            name="startdate"
            id="startdate"
            className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5 
                        ${
                          errors.startdate
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
            {...register("startdate", {
              required: "La fecha inicial es obligatoria",
            })}
          />
          {errors.startdate && (
            <p className="text-red-400 text-sm mt-2">
              {errors.startdate.message}
            </p>
          )}
        </div>
        <div className="w-1/2">
          <label
            htmlFor="code"
            className="block mb-2 text-sm font-medium text-gray-100 "
          >
            Fecha Final
          </label>
          <input
            type="date"
            name="enddate"
            id="enddate"
            className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4 block w-full p-2.5 
                        ${
                          errors.enddate
                            ? "focus:ring-red-400 border border-red-400"
                            : "focus:ring-slate-500"
                        }`}
            {...register("enddate", {
              required: "La fecha final es obligatoria",
            })}
          />
          {errors.enddate && (
            <p className="text-red-400 text-sm mt-2">
              {errors.enddate.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="status"
          className="block text-sm mb-2 font-medium text-gray-100 "
        >
          Status
        </label>
        <select
          className={`bg-neutral-700 text-neutral-400 text-sm rounded-lg focus:outline-none focus:ring-4  block w-full p-2.5  custom-scrollbar 
                    ${
                      errors.status
                        ? "focus:ring-red-400 border border-red-400"
                        : "focus:ring-slate-500"
                    }`}
          {...register("status", {
            required: "El status es obligatorio",
          })}
        >
          <option value=""> Selecciona una opción </option>
          <option value="Stand By">Stand By</option>
          {user.role === userRoles.ADMIN ? (
            <option value="Closed">Cerrado</option>
          ) : null}
        </select>
        {errors.status && (
          <p className="text-red-400 text-sm mt-2">{errors.status.message}</p>
        )}
      </div>
    </div>
  );
}
