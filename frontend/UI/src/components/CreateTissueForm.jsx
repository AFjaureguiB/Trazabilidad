import { useForm } from "react-hook-form";
import Modal from "./Modal.jsx";
import TissueFormControls from "./TissueFormControls.jsx";
import { addTissueToDonor } from "../services/donors.service.js";
import { notifySuccess, notifyError } from "../utils/notifyToast.js";
import { useEffect } from "react";
import { updateTissue } from "../services/tissue.service.js";

export default function CreateTissue({
  addTissueData,
  setAddTissueData,
  fetchDonors,
}) {
  const { showAddTissueModal, donorId, donorFullName, tissue } = addTissueData;
  const tittleModal = tissue
    ? `Editar tejido de ${donorFullName}`
    : `Agregar tejido a ${donorFullName}`;

  const isEditing = tissue !== undefined;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!tissue) return; //If we do not have information about a tissue, we terminate the execution immediately

    setValue("ips", tissue.ips);
    setValue("specialistname", tissue.specialistname);
    setValue("code", tissue.code);
    setValue("collectedAt", tissue.collectedAt);
    setValue("tissuetype", tissue.tissuetype);
    setValue("description", tissue.description);
    setValue("location", tissue.location);
  }, [tissue]);

  const handleClose = () => {
    reset();
    setAddTissueData({
      showAddTissueModal: false,
      donorId: 0,
      donorFullName: "",
      tissue: undefined, //we use undefined value because the value litera `{}` is truty in js
    });
  };

  const onSubmit = async (tissueData) => {
    try {
      const formData = new FormData();

      // Añadir información del Tissue
      formData.append("ips", tissueData.ips);
      formData.append("specialistname", tissueData.specialistname);
      formData.append("collectedAt", tissueData.collectedAt);
      formData.append("tissuetype", tissueData.tissuetype);
      formData.append("location", tissueData.location);
      formData.append("code", tissueData.code);

      if (tissueData.description)
        formData.append("description", tissueData.description);
      // Añadir el archivo PDF

      //Si no se adjunta un archivo, no se debe enviar este field en el formData, de lo contrario no pasara la validacion en el backend
      if (tissueData.consentimiento.length > 0)
        formData.append("consentimiento-pdf", tissueData.consentimiento[0]); // Acceder al archivo subido

      const {
        state,
        data,
        details: detailsError,
        message: messageError,
      } = tissue
        ? await updateTissue(tissue.id, formData)
        : await addTissueToDonor(donorId, formData);

      if (state === "Error") {
        notifyError(messageError);
      }

      if (state == "Success") {
        const tissueMessage = isEditing
          ? `Informacion de tejido '${data.tissuetype}' actualizada con exito`
          : `Registro de tejido '${data.tissuetype}' con estado '${data.status}', para el donador '${donorFullName}' realizado con exito`;

        notifySuccess(tissueMessage);
        handleClose(); //Reiniciamos los controles de formulario y cerramos el modal
        fetchDonors(); //Hacemos un fetching de los donadores para ver el nuevo tejido en el donador
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <Modal
      title={tittleModal}
      showModal={showAddTissueModal}
      handleClose={handleClose}
    >
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <TissueFormControls
            register={register}
            errors={errors}
            isEditing={isEditing}
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {tissue ? "Actualizar" : "Registrar"}
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
