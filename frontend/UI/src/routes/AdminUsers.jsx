import { useAuth } from "../context/AuthContext";
import { deleteUserById, getUsers } from "../services/user.service";

export default function AdminUsers() {
  const { users, setUsers } = useAuth();

  const handleClickBorrar = async (userId) => {
    console.log("Click borrar!" + userId);
    const data = await deleteUserById(userId);
    console.log(data);
    const res = await getUsers();
    setUsers(res);
  };

  return (
    <div>
      <a
        href="/"
        className="inline-flex items-center text-lg text-blue-600 gap-2 mt-2 ml-2"
      >
        <svg
          className="w-3.5 h-3.5 ms-2 rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
        Regresar
      </a>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 mx-2 border">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Proceso
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="bg-white border-b  hover:bg-gray-50" key={user.id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {user.firstname} {user.lastname}
                </th>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.Process.name}</td>
                <td className="px-6 py-4 text-right flex gap-2">
                  <button
                    className="px-3 py-2 text-xs font-medium text-center  text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-300 focus:outline-none rounded-lg"
                    onClick={() => console.log("Click borrar!")}
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-2 text-xs font-medium text-center  text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none rounded-lg"
                    onClick={() => handleClickBorrar(user.id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
