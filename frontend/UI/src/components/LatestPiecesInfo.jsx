import { useEffect, useState } from "react";
import { getTissuesWithPieces } from "../services/tissue.service";

export default function LatestTissuesTestsInfo() {
  const [pieces, setPieces] = useState([]);

  const fetchPieces = async () => {
    const {
      state,
      data,
      details: detailsError,
      message: messageError,
    } = await getTissuesWithPieces();
    const onlyPieces = data.flatMap((tissue) => tissue.pieces);
    setPieces(onlyPieces);
  };

  useEffect(() => {
    fetchPieces();
  }, []);

  return (
    <div className="space-y-4">
      {pieces.map((piece) => (
        <div key={piece.id}>
          <div className="flex gap-4 items-center bg-gray-50 rounded-xl px-2 py-3">
            <div className="flex flex-col gap-2 text-left text-sm">
              <div className="ps-3 space-y-1">
                <div className="text-base font-semibold">Codigo de Pieza</div>
                <div>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                    {piece.code}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-500">
                <span>Referencia: </span>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                  {piece.references}
                </span>
              </p>
              <p className={" text-gray-500"}>
                <span>Descripcion: </span>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded whitespace-nowrap">
                  {piece.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
