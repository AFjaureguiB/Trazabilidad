const compareAndLogChanges = (previousData, newData) => {
  if (
    !previousData ||
    typeof previousData !== "object" ||
    !newData ||
    typeof newData !== "object"
  ) {
    throw new Error("Invalid data for comparison");
  }

  const updatedInfo = {};

  for (const key in previousData) {
    if (Object.prototype.hasOwnProperty.call(previousData, key)) {
      const prevValue = previousData[key];
      const newValue = newData[key];

      // Comparar fechas
      if (prevValue instanceof Date && newValue instanceof Date) {
        if (prevValue.getTime() !== newValue.getTime()) {
          updatedInfo[key] = {
            prevValue: prevValue.toISOString(),
            newValue: newValue.toISOString(),
          };
        }
      } else if (prevValue !== newValue) {
        updatedInfo[key] = {
          prevValue: prevValue,
          newValue: newValue,
        };
      }
    }
  }

  return updatedInfo;
};

export default compareAndLogChanges;
