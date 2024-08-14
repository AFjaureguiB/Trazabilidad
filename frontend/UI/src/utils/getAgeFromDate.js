export const getAgeFromDate = (dateOfBirth) => {
  const today = new Date(); // Fecha actual
  const dob = new Date(dateOfBirth); // Convertir la cadena a una fecha

  let age = today.getFullYear() - dob.getFullYear(); // Restar los años

  // Ajustar si la fecha de cumpleaños de este año aún no ha pasado
  const month = today.getMonth() - dob.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
};
