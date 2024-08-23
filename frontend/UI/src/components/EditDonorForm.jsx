import { useEffect } from "react";

import { useForm } from "react-hook-form";

import Modal from "./Modal.jsx";
import DonorFormControls from "./DonorFormControls.jsx";
import { notifySuccess, notifyError } from "../utils/notifyToast.js";
import { updateDonor } from "../services/donors.service.js";

export default function EditDonorForm({
  editDonorData,
  setEditDonorData,
  fetchDonors,
}) {
  const { showEditDonorModal, donor } = editDonorData;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    setEditDonorData({
      showEditDonorModal: false,
      donor: {},
    });
    reset();
  };

  useEffect(() => {
    setValue("id", donor.id);
    setValue("names", donor.names);
    setValue("surnames", donor.surnames);
    setValue("dni", donor.dni);
    setValue("dateOfBirth", donor.dateOfBirth);
  }, [editDonorData]);

  const onSubmit = async (donorData) => {
    const {
      state,
      data,
      details: detailsError,
      message: messageError,
    } = await updateDonor(donorData);

    if (state === "Error") {
      notifyError(messageError);
    }
    if (state == "Success") {
      const updateDonorMessage = `Informacion de donador '${data.names} ${data.surnames}' actualizada con exito`;
      notifySuccess(updateDonorMessage);
      handleClose(); //Reiniciamos los controles de formulario y cerramos el modal
      fetchDonors(); //Hacemos un fetching de los donadores para ver el nuevo tejido en el donador
    }
  };

  return (
    <Modal
      title={`Actualizar informacion de ${donor.names} ${donor.surnames}`}
      showModal={showEditDonorModal}
      handleClose={handleClose}
    >
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <DonorFormControls register={register} errors={errors} />
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Actualizar
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
