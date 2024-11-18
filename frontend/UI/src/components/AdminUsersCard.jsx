/* eslint-disable react/prop-types */
import Pencil from "./icons/Pencil";
import Trash from "./icons/Trash";

export default function AdminUsersCard({ users }) {
  return (
    <div className="mt-4 w-full p-4 bg-white border border-gray-200 rounded-lg shadow">
      <div>
        {!users ? (
          <div
            className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50"
            role="alert"
          >
            <span className="font-medium">Hey!</span> No tienes usuarios
            creados.
          </div>
        ) : (
          <ul role="list" className="divide-y divide-gray-200 ">
            {users.map((user) => (
              <li
                className="py-3 sm:py-4 divide-y divide-gray-200"
                key={user.id}
              >
                <div className={`flex items-center px-4 py-3 rounded-lg`}>
                  <div className="flex-shrink-0">
                    <span className="relative size-9 overflow-hidden bg-gray-100 rounded-full block">
                      <svg
                        className="absolute w-11 h-10 text-gray-400 -left-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-base font-medium text-gray-900 truncate ">
                      {user.firstname} {user.lastname}
                    </p>
                    <p className="text-sm text-gray-500 truncate ">
                      {user.email}
                    </p>
                    <p className="text-sm text-gray-500 truncate ">
                      {user.username}
                    </p>
                  </div>
                  <div className="flex  gap-3">
                    <button
                      className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      title="Editar informacion de usuario"
                      onClick={() => console.log("")}
                    >
                      <Pencil />
                    </button>
                    <button
                      className="px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
                      title="Eliminar usuario"
                      onClick={() => console.log("")}
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
