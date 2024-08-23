import { useState, useEffect } from "react";

import { getDonors } from "../services/donors.service";
import { useAuth } from "../context/AuthContext";
import DonorTableRow from "../components/DonorTableRow";
import LeftArrow from "../components/icons/LeftArrow";
import Plus from "../components/icons/Plus.jsx";
import { userRoles } from "../constants/user.roles.js";
import CreateDonorForm from "../components/CreateDonorForm.jsx";
import CreateTissueForm from "../components/CreateTissueForm.jsx";
import EditDonorForm from "../components/EditDonorForm.jsx";

export default function AdminUsers() {
  const [donors, setDonors] = useState([]);

  const [showCreateDonorModal, setShowCreateDonorModal] = useState(false);

  const [addTissueData, setAddTissueData] = useState({
    showAddTissueModal: false,
    donorId: 0,
    donorFullName: "",
  });

  const [editDonorData, setEditDonorData] = useState({
    showEditDonorModal: false,
    donor: {},
  });

  const { user } = useAuth();

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    const donors = await getDonors();
    setDonors(donors);
  };

  return (
    <>
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
                <Plus className={"size-6"} />
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
                  <DonorTableRow
                    donor={donor}
                    key={donor.id}
                    user={user}
                    setAddTissueData={setAddTissueData}
                    setEditDonorData={setEditDonorData}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {user.role === userRoles.ASSISTANT ? (
        <CreateDonorForm
          showCreateDonorModal={showCreateDonorModal}
          setShowCreateDonorModal={setShowCreateDonorModal}
          fetchDonors={fetchDonors}
        />
      ) : null}

      {user.role === userRoles.ASSISTANT ? (
        <CreateTissueForm
          addTissueData={addTissueData}
          setAddTissueData={setAddTissueData}
          fetchDonors={fetchDonors}
        />
      ) : null}

      {user.role === userRoles.ADMIN ? (
        <EditDonorForm
          editDonorData={editDonorData}
          setEditDonorData={setEditDonorData}
          fetchDonors={fetchDonors}
        />
      ) : null}
    </>
  );
}
