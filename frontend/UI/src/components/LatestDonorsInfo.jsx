import { useEffect, useState } from "react";
import { getDonors } from "../services/donors.service";
import { getAgeFromDate } from "../utils/getAgeFromDate";

export default function LatestDonorsInfo() {
  //Esto se movera a otro sitio, ya que no siempre el adminlayout sera de un admin que sea de donantes y tejidos
  const [donors, setDonors] = useState([]);

  //Esto se movera a otro sitio, ya que no siempre el adminlayout sera de un admin que sea de donantes y tejidos
  const fetchDonors = async () => {
    const donors = await getDonors();
    setDonors(donors);
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
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
              <p className="text-sm text-gray-500 truncate">DNI: {donor.dni}</p>
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
  );
}
