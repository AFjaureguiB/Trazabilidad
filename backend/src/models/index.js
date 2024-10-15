import Role from "./role.model.js";
import User from "./user.model.js";
import Process from "./process.model.js";
import Donor from "./donor.model.js";
import Tissue from "./tissues.model.js";
import InfectiousTests from "./Infectioustests.model.js";
import Piece from "./piece.model.js";
import PieceBatch from "./piecebatch.model.js";
import ChemicalTests from "./chemicaltests.model.js";
import SterilizationBatch from "./sterilizationbatch.model.js";

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

Tissue.hasMany(Piece, {
  foreignKey: "tissueId",
  as: "pieces", // Alias para las piezas relacionadas con un tejido
});

Piece.belongsTo(Tissue, {
  foreignKey: "tissueId",
  as: "tissue", // Alias para acceder al tejido desde la pieza
});

// Relación Many-to-Many entre LotePiezas y Pieza a través de la tabla de unión lote_pieza
PieceBatch.belongsToMany(Piece, {
  through: "pieces_piecesbatches",
  foreignKey: "piecesbatchId",
  as: "pieces",
});

Piece.belongsToMany(PieceBatch, {
  through: "pieces_piecesbatches",
  foreignKey: "pieceId",
  as: "batches",
});

Piece.hasMany(ChemicalTests, {
  foreignKey: "pieceId",
  as: "chemicalTests",
});

ChemicalTests.belongsTo(Piece, {
  foreignKey: "pieceId",
  as: "pieces",
});

SterilizationBatch.belongsToMany(Piece, {
  through: "pieces_sterilizationbatch",
  foreignKey: "sterilizationbatchId",
  as: "pieces",
});

Piece.belongsToMany(SterilizationBatch, {
  through: "pieces_sterilizationbatch",
  foreignKey: "pieceId",
  as: "sterilizationBatch",
});

export {
  User,
  Role,
  Process,
  Donor,
  Tissue,
  InfectiousTests,
  Piece,
  PieceBatch,
  SterilizationBatch,
  ChemicalTests,
};
