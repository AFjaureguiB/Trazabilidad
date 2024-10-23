import Chevron from "./icons/Chevron";

export default function InventoryAccordionHeader({
  isActive,
  references,
  quantity,
}) {
  return (
    <div className={`${isActive ? "border-b border-gray-300" : ""}`}>
      <div
        className={`flex justify-between items-center hover:bg-gray-100 p-4 ${
          isActive ? "bg-gray-100" : "bg-gray-50"
        }`}
      >
        <p className="text-2xl font-semibold flex items-center gap-2 text-gray-700">
          Referencia:{" "}
          <span className="bg-blue-100 text-blue-800 text-xl font-semibold me-2 px-2.5 py-0.5 rounded">
            {references}
          </span>
        </p>
        <p className="text-2xl font-semibold flex items-center gap-2 text-gray-700">
          Cantidad:{" "}
          <span className="bg-blue-100 text-blue-800 text-xl font-semibold me-2 px-2.5 py-0.5 rounded">
            {quantity}
          </span>
        </p>
        <div className="px-6 py-4">
          <div>
            <Chevron className={`size-6 ${isActive ? "rotate-180" : ""}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
