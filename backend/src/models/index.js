import Role from "./role.model.js";
import User from "./user.model.js";
import Process from "./process.model.js";

//Un role lo tienen varios usuarios
Role.hasMany(User);
//un usuario pertenece a un role
User.belongsTo(Role);

//Un proceso lo tienen varios usuarios
Process.hasMany(User);
//un usuario pertenece a un proceso
User.belongsTo(Process);

export { User, Role, Process };
