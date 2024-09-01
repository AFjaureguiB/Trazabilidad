export const isPdf = (fileList) => {
  if (!fileList || fileList.length === 0) return true;
  return fileList[0].type === "application/pdf" || "El archivo debe ser un PDF";
};

export const isSingleFile = (fileList) => {
  if (!fileList || fileList.length === 0) return true;
  return fileList.length === 1 || "Solo se permite un archivo";
};
