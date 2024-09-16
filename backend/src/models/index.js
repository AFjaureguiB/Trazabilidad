import Role from "./role.model.js";
import User from "./user.model.js";
import Process from "./process.model.js";
import Donor from "./donor.model.js";
import Tissue from "./tissues.model.js";
import InfectiousTests from "./Infectioustests.model.js";

//Un role lo tienen varios usuarios
Role.hasMany(User);
//un usuario pertenece a un role
User.belongsTo(Role);

//Un proceso lo tienen varios usuarios
Process.hasMany(User);
//un usuario pertenece a un proceso
User.belongsTo(Process);

//un donador puede donar varias piezas
Donor.hasMany(Tissue);
//una pieza previene de un donador
Tissue.belongsTo(Donor);

// Definir la relación en el modelo `Tissue`
Tissue.hasMany(InfectiousTests, {
  foreignKey: "tissueId",
  as: "infectiousTests", // Alias para acceder a las pruebas desde el tejido
});

InfectiousTests.belongsTo(Tissue, {
  foreignKey: "tissueId",
  as: "tissue", // Alias para acceder al tejido desde la prueba
});

export { User, Role, Process, Donor, Tissue, InfectiousTests };
