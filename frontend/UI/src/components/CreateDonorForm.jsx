import { useForm } from "react-hook-form";

import Modal from "./Modal.jsx";
import TissueFormControls from "./TissueFormControls.jsx";
import DonorFormControls from "./DonorFormControls.jsx";

import { createDonorWithTissue } from "../services/donors.service.js";
import { notifySuccess, notifyError } from "../utils/notifyToast.js";

export default function CreateDonorModal({
  showCreateDonorModal,
  setShowCreateDonorModal,
  fetchDonors,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  const handleClose = () => {
    setShowCreateDonorModal(false);
    reset();
  };

  const onSubmit = async (donorData) => {
    try {
      const formData = new FormData();

      // Añadir campos del formulario a formData
      formData.append("names", donorData.names);
      formData.append("surnames", donorData.surnames);
      formData.append("dni", donorData.dni);
      formData.append("dateOfBirth", donorData.dateOfBirth);

      // Añadir información del Tissue
      formData.append("tissue[ips]", donorData.ips);
      formData.append("tissue[specialistname]", donorData.specialistname);
      formData.append("tissue[collectedAt]", donorData.collectedAt);
      formData.append("tissue[tissuetype]", donorData.tissuetype);
      formData.append("tissue[location]", donorData.location);
      formData.append("tissue[code]", donorData.code);

      if (donorData.description)
        formData.append("tissue[description]", donorData.description);

      // Añadir el archivo PDF
      formData.append("consentimiento-pdf", donorData.consentimiento[0]); // Acceder al archivo subido

      // Enviar la información mediante axios
      //Siempre vendra `state`
      //si la request fue `success,201` data, es el objeto newDorno, details, y message son undefined.
      //si la request fue respondida con `error,400`, data es undefined, details, y message contienen informacion del error.

      const {
        state,
        data,
        details: detailsError,
        message: messageError,
      } = await createDonorWithTissue(formData);
  
      if (state === "Error") {
        notifyError(messageError);
      }

      if (state == "Success") {
        const newDonorMessage = `Registro de donante '${data.names} ${data.surnames}' y su tejido '${data.tissue.tissuetype}' realizado con exito`;
        notifySuccess(newDonorMessage);
        handleClose(); //Reiniciamos los controles de formulario y cerramos el modal
        fetchDonors(); //Hacemos un fetching de los donadores para ver el nuevo tejido en el donador
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <Modal
      title={"Nuevo registro"}
      showModal={showCreateDonorModal}
      handleClose={handleClose}
    >
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <DonorFormControls register={register} errors={errors} />
          <TissueFormControls register={register} errors={errors} />
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
              onClick={handleClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
