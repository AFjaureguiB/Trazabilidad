export const getFileName = (dni, names, surnames) => {
  const processedNames = names.split(" ").join("-");
  const processedSurnames = surnames.split(" ").join("-");
  return `${dni}-${processedNames}-${processedSurnames}`;
};
