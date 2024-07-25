import LogoFundonemos from "../icons/Logo";

export default function Header({ user, handleLogout }) {
  return (
    <nav className="bg-slate-900 flex justify-between items-center p-4">
      <LogoFundonemos />
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          <span className="relative size-10 overflow-hidden bg-gray-100 rounded-full block">
            <svg
              className="absolute w-15 h-12 text-gray-400 -left-1"
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
          <div className="flex flex-col gap-1">
            <span className="text-white text-lg">{user.username}</span>
            <span className="text-xs text-gray-200">
              {user.process}, <span className="lowercase">{user.role} </span>
            </span>
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          onClick={handleLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 rotate-180 text-gray-100/80 hover:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
          Logout
        </button>
      </div>
    </nav>
  );
}
