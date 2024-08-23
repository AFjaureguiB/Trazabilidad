import { useForm } from "react-hook-form";
import Modal from "./Modal.jsx";
import TissueFormControls from "./TissueFormControls.jsx";
import { addTissueToDonor } from "../services/donors.service.js";
import { notifySuccess, notifyError } from "../utils/notifyToast.js";

export default function CreateTissue({
  addTissueData,
  setAddTissueData,
  fetchDonors,
}) {
  const { showAddTissueModal, donorId, donorFullName } = addTissueData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    reset();
    setAddTissueData({
      showAddTissueModal: false,
      donorId: 0,
      donorFullName: "",
    });
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Añadir información del Tissue
      formData.append("ips", data.ips);
      formData.append("specialistname", data.specialistname);
      formData.append("collectedAt", data.collectedAt);
      formData.append("tissuetype", data.tissuetype);
      formData.append("location", data.location);
      formData.append("code", data.code);
      if (data.description) formData.append("description", data.description);
      // Añadir el archivo PDF
      formData.append("consentimiento-pdf", data.consentimiento[0]); // Acceder al archivo subido

      const {
        state,
        data,
        details: detailsError,
        message: messageError,
      } = await addTissueToDonor(donorId, formData);

      if (state === "Error") {
        notifyError(messageError);
      }

      if (state == "Success") {
        const newTissueMessage = `Registro de tejido '${data.tissuetype}' con estado '${data.status}', para el donador '${donorFullName}' realizado con exito`;
        notifySuccess(newTissueMessage);
        handleClose(); //Reiniciamos los controles de formulario y cerramos el modal
        fetchDonors(); //Hacemos un fetching de los donadores para ver el nuevo tejido en el donador
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <Modal
      title={`Agregar tejido a ${donorFullName}`}
      showModal={showAddTissueModal}
      handleClose={handleClose}
    >
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
