/* eslint-disable react/prop-types */
import LogoFundonemos from "../icons/Logo";
import Accordion from "./Accordion";
import Pencil from "./icons/Pencil";
import UserAccordionHeader from "./UserAccordionHeader";

export default function Header({
  user,
  handleLogout,
  setShowUpdatePasswordForm,
}) {
  return (
    <nav className="bg-[#183254] p-4">
      <div className="max-w-screen-2xl mx-auto flex justify-between">
        <a href="/">
          <LogoFundonemos />
        </a>
        <div className="flex items-center gap-8">
          <Accordion>
            <Accordion.Item
              key={user.id}
              header={<UserAccordionHeader />}
              user={user}
            >
              <div className="relative flex justify-center">
                <div
                  id="dropdown"
                  className="absolute top-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow border"
                >
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <button
                        className="flex gap-2 px-4 py-2 hover:bg-gray-100 items-center whitespace-nowrap  w-full"
                        onClick={() => setShowUpdatePasswordForm(true)}
                      >
                        <Pencil />
                        Cambiar Contraseña
                      </button>
                    </li>
                    <li>
                      <button
                        className="px-4 py-2 hover:bg-gray-100 flex gap-2 items-center w-full"
                        onClick={handleLogout}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5 rotate-180"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                          />
                        </svg>
                        Cerrar Sesion
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </nav>
  );
}
