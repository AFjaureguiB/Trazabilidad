import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Bounce, Flip, ToastContainer, toast } from "react-toastify";

import { getDonors, createDonorWithTissue } from "../services/donors.service";
import { useAuth } from "../context/AuthContext";
import DonorTableRow from "../components/DonorTableRow";
import LeftArrow from "../components/icons/LeftArrow";
import Plus from "../components/icons/Plus.jsx";
import { userRoles } from "../constants/user.roles.js";
import CreateDonorModal from "../components/CreateDonorModal.jsx";

export default function AdminUsers() {
  const [donors, setDonors] = useState([]);

  const [showCreateDonorModal, setShowCreateDonorModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  const { user } = useAuth();

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    const donors = await getDonors();
    setDonors(donors);
  };

  const handleCancelar = () => {
    setShowCreateDonorModal(false);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Añadir campos del formulario a formData
      formData.append("names", data.names);
      formData.append("surnames", data.surnames);
      formData.append("dni", data.dni);
      formData.append("dateOfBirth", data.dateOfBirth);

      // Añadir información del Tissue
      formData.append("tissue[ips]", data.ips);
      formData.append("tissue[specialistname]", data.specialistname);
      formData.append("tissue[collectedAt]", data.collectedAt);
      formData.append("tissue[tissuetype]", data.tissuetype);
      formData.append("tissue[location]", data.location);
      formData.append("tissue[code]", data.code);

      if (data.description)
        formData.append("tissue[description]", data.description);

      // Añadir el archivo PDF
      formData.append("consentimiento-pdf", data.consentimiento[0]); // Acceder al archivo subido

      // Enviar la información mediante axios
      const response = await createDonorWithTissue(formData);
      const errorMessage = response.errorDetails || response.errorMessage;
      const newDonorMessage = `Registro de ${response.names} ${response.surnames} realizado con exito`;

      if (errorMessage) {
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.success(newDonorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setShowCreateDonorModal(false);
        reset();
        fetchDonors();
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-screen-2xl mx-auto">
        {user.role === userRoles.ADMIN ? (
          <a
            href="/"
            className="inline-flex items-center text-lg text-blue-600 gap-2 mt-2 ml-2 hover:underline"
          >
            <LeftArrow />
            Regresar
          </a>
        ) : null}

        <div className="p-4">
          {user.role === userRoles.ASSISTANT ? (
            <div className="mb-4">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 flex gap-2 items-center"
                onClick={() => setShowCreateDonorModal(true)}
              >
                <Plus className={"size-6"}/>
                Donador y Tejido
              </button>
            </div>
          ) : null}

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg border">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DNI
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fecha de Nacimiento
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">edit</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">expand</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor) => (
                  <DonorTableRow donor={donor} key={donor.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showCreateDonorModal ? (
        <CreateDonorModal
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          handleCancelar={handleCancelar}
          register={register}
          errors={errors}
        />
      ) : null}
    </>
  );
}
