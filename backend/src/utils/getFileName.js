export const getFileName = (donorDni, tissueCode) => {
  //const processedNames = names.split(" ").join("-");
  //const processedSurnames = surnames.split(" ").join("-");
  return `${donorDni}-${tissueCode}`;
};
