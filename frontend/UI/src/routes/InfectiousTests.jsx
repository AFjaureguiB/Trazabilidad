import { useAuth } from "../context/AuthContext";
import { userRoles } from "../constants/user.roles.js";
import LeftArrow from "../components/icons/LeftArrow";

import { getDonorsTissuesInfectiousTests } from "../services/donors.service";
import { useEffect, useState } from "react";
import InfectiousTableRow from "../components/InfectiousTableRow.jsx";
import CreateInfectiousForm from "../components/CreateInfectiousForm.jsx";

export default function InfectiousTests() {
  const [donors, setDonors] = useState([]);

  const [infectiousTestsData, setInfectiousTestsData] = useState({
    showCreateInfectiousTests: false,
    infectiousTests: [],
    tissueId: 0,
  });

  const { user } = useAuth();

  const fetchDonors = async () => {
    const {
      state,
      data,
      details: detailsError,
      message: messageError,
    } = await getDonorsTissuesInfectiousTests();
    setDonors(data);
  };

  useEffect(() => {
    fetchDonors();
  }, []);

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
                  <InfectiousTableRow
                    donor={donor}
                    key={donor.id}
                    user={user}
                    setInfectiousTestsData={setInfectiousTestsData}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CreateInfectiousForm
        infectiousTestsData={infectiousTestsData}
        setInfectiousTestsData={setInfectiousTestsData}
        fetchDonors={fetchDonors}
        user={user}
      />
    </>
  );
}
