import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "../context/AuthContext";
import UsersCard from "../components/UsersCard";
import UserForm from "../components/UserForm";
import {
  getUsers,
  deleteUserById,
  addUser,
  updateUser,
} from "../services/user.service";

export default function AdminLayout() {
  const [users, setUsers] = useState([]);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [idUserEditing, setIdUserEditing] = useState(0);

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
    }
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res);
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
        <div className="bg-slate-200 row-span-1 rounded-xl"></div>
      </div>
    </div>
  );
}
