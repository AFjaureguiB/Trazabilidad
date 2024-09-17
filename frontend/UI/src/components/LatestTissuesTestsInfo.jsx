import { useEffect, useState } from "react";
import { getDonorsTissuesInfectiousTests } from "../services/donors.service";
import { TissueStatus } from "../constants/results";
export default function LatestTissuesTestsInfo({}) {
  const [donors, setDonors] = useState([]);

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
    <ul role="list" className="divide-y divide-gray-200">
      {donors.map((donor) => {
        const { Tissues } = donor;
        return (
          <li className="py-3 sm:py-4 space-y-4" key={donor.id}>
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
                <p className="font-semibold text-gray-900 truncate">
                  {`${donor.names} ${donor.surnames}`}
                </p>
                <p>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                    {Tissues.length} Tejidos
                  </span>
                </p>
              </div>
            </div>
            <div>
              <ul className="space-y-2">
                {Tissues.map((tissue) => {
                  const resultCounts = tissue.infectiousTests.reduce(
                    (acc, test) => {
                      const { result } = test;
                      acc[result] = (acc[result] || 0) + 1;
                      return acc;
                    },
                    {}
                  );

                  return (
                    <li
                      className=" text-gray-500 bg-gray-50 py-2 px-4 rounded-lg space-y-2"
                      key={tissue.id}
                    >
                      <p>
                        <span className="font-semibold">
                          {tissue.tissuetype}{" "}
                        </span>
                      </p>
                      <p>
                        <span className="block">
                          Pruebas:
                          <span className="mx-2 text-sm font-normal px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                            No Realizado:{" "}
                            {resultCounts["No Realizado"]
                              ? resultCounts["No Realizado"]
                              : 0}
                          </span>
                          <span className="me-2 text-sm font-normal px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                            No Reactivo:{" "}
                            {resultCounts["No Reactivo"]
                              ? resultCounts["No Reactivo"]
                              : 0}
                          </span>
                          <span className="me-2 text-sm font-normal px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                            Reactivo:{" "}
                            {resultCounts["Reactivo"]
                              ? resultCounts["Reactivo"]
                              : 0}
                          </span>
                        </span>
                      </p>
                      <p>
                        Estado:
                        <span
                          className={`text-sm font-normal px-1.5 py-0.5 rounded lowercase mx-2
                              ${
                                tissue.status === TissueStatus.QUARANTINE
                                  ? "bg-blue-100 text-blue-800"
                                  : tissue.status === TissueStatus.IN_TESTING
                                  ? "bg-yellow-100 text-yellow-800"
                                  : tissue.status === TissueStatus.ACCEPTED
                                  ? "bg-green-100 text-green-800"
                                  : tissue.status === TissueStatus.REJECTED
                                  ? "bg-red-100 text-red-800"
                                  : ""
                              }`}
                        >
                          {tissue.status}
                        </span>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
