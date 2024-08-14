import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "../context/AuthContext";
import UsersCard from "../components/UsersCard";
import UserForm from "../components/UserForm";
import Gear from "./icons/Gear";
import {
  getUsers,
  deleteUserById,
  addUser,
  updateUser,
} from "../services/user.service";

import { getDonors } from "../services/donors.service";
import { getAgeFromDate } from "../utils/getAgeFromDate";

export default function AdminLayout() {
  const [users, setUsers] = useState([]);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [idUserEditing, setIdUserEditing] = useState(0);

  //Esto se movera a otro sitio, ya que no siempre el adminlayout sera de un admin que sea de donantes y tejidos
  const [donors, setDonors] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm();

  const { user } = useAuth();

  useEffect(() => {
    if (user.role === "ADMIN") {
      fetchUsers();

      //Esto es temporal
      fetchDonors();
    }
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res);
  };

  //Esto se movera a otro sitio, ya que no siempre el adminlayout sera de un admin que sea de donantes y tejidos
  const fetchDonors = async () => {
    const donors = await getDonors();
    setDonors(donors);
  };

  const onSubmit = async (data) => {
    setIsBeingEdited(false);
    setIdUserEditing(0); //Cero es un valor tomado como falso, y ademas en la DB no habra un registro de usuario con id = 0.
    //setValue("userId", "");
    setValue("firstname", "");
    setValue("lastname", "");
    setValue("username", "");
    setValue("email", "");
    setValue("plainpassword", "");

    if (idUserEditing && !data.plainpassword) {
      const respponse = await updateUser(data, idUserEditing);
      console.log(respponse);
    }

    if (!idUserEditing && data.plainpassword) {
      const response = await addUser(data);
      console.log(response); //Maybe colocar el mensaje de la respuesta en un toast o algo asi.
    }

    fetchUsers();
  };

  /*podriamos usar un input type=hidden, pero para resaltar el usuario que se esta editando en UsersCard, 
    necesitamos el id del usuario, por ello manejamos directamente el id del usuario que se esta editando 
    directamente aqui, en este componente.
  */
  const handleCancelar = () => {
    setIsBeingEdited(false);
    setIdUserEditing(0);
    //setValue("userId", "");
    setValue("firstname", "");
    setValue("lastname", "");
    setValue("username", "");
    setValue("email", "");
    setValue("plainpassword", "");
    clearErrors();
  };

  const handleEdit = (user) => {
    setIsBeingEdited(true);
    clearErrors();
    const { firstname, lastname, username, email, id } = user;
    setIdUserEditing(id);
    setValue("firstname", firstname);
    setValue("lastname", lastname);
    setValue("username", username);
    setValue("email", email);
    setValue("plainpassword", "");
  };

  //Maybe colocar un mensaje de confirmacion para borrar a un usuario
  const handleDelete = async (id) => {
    const response = await deleteUserById(id);
    console.log(response); //Maybe colocar el mensaje de la respuesta en un toast o algo asi.
    fetchUsers();
  };

  return (
    <div className="w-full grid grid-cols-2 auto-rows-auto gap-8 p-8 max-w-screen-xl mx-auto">
      <UserForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        handleCancelar={handleCancelar}
        errors={errors}
        isBeingEdited={isBeingEdited}
      />
      <div className="col-span-2 md:col-span-1 grid grid-rows-2 gap-8">
        <div className="row-span-1 rounded-xl">
          <UsersCard
            users={users}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            idUserEditing={idUserEditing}
          />
        </div>

        {/** Este elemento sera cambiante respecto el proceso al que el admin pertenece, asi esto es para el proceso  `Donantes y tejidos`
         * pero ya no aplicaria para el proceso pruebas `infecciones`
         */}
        <div className="row-span-1 rounded-xl">
          <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 h-full max-h-[410px] md:overflow-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900">
                Últimos donadores
              </h5>
              <a
                href="/donors"
                className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
              >
                <Gear />
                Administrar
              </a>
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200">
                {donors.map((donor) => (
                  <li className="py-3 sm:py-4" key={donor.id}>
                    <div className="flex items-center">
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
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {`${donor.names} ${donor.surnames}`}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          DNI: {donor.dni}
                        </p>
                        <p>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                            {getAgeFromDate(donor.dateOfBirth)} años
                          </span>
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        {donor.dateOfBirth}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
