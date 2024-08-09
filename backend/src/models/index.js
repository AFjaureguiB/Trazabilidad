import Role from "./role.model.js";
import User from "./user.model.js";
import Process from "./process.model.js";
import Donor from "./donor.model.js";
import Tissue from "./tissues.model.js";

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

export { User, Role, Process, Donor, Tissue };
