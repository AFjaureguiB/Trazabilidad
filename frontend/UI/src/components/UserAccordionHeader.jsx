import Chevron from "./icons/Chevron";

/* eslint-disable react/prop-types */
export default function UserAccordionHeader({ user, isActive }) {
  return (
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

      <Chevron
        className={`text-gray-200 size-6 ${isActive ? "rotate-180" : ""}`}
      />
    </div>
  );
}
