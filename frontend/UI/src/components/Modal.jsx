import CloseX from "./icons/CloseX";

export default function Modal({ title, showModal, handleClose, children }) {
  return (
    <div
      tabIndex="-1"
      className={`overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 justify-center items-center w-full inset-0  max-h-full bg-black/20 ${
        showModal ? "" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="relative bg-slate-900 rounded-lg shadow overflow-y-auto max-h-[720px] custom-scrollbar">
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-700 rounded-t">
            <h3 className="text-xl font-semibold text-gray-100 ">{title}</h3>
            <button
              type="button"
              className="end-2.5 text-gray-100 bg-transparent hover:bg-slate-700 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              onClick={handleClose}
            >
              <CloseX />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
