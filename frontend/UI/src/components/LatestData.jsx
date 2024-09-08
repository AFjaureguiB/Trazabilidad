import Gear from "./icons/Gear";

export default function RecentInfo({ title, href, children }) {
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 h-full max-h-[410px] md:overflow-auto custom-scrollbar">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900">
          {title}
        </h5>
        <a
          href={href}
          className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
        >
          <Gear />
          Administrar
        </a>
      </div>
      <div className="flow-root">{children}</div>
    </div>
  );
}
