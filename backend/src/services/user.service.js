"use strict";

/** Modelo de datos 'User' */
import { User, Role, Process } from "../models/index.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene todos los usuarios de la base de datos
 * @returns {Promise} Promesa con el objeto de los usuarios
 */
async function getUsers(process) {
  try {
    const usersFromDB = await User.findAll({
      include: ["Role", "Process"],
    });

    if (!usersFromDB) return [null, "No hay usuarios"];

    //recupero todos los usuarios de la DB
    const users = usersFromDB.map((user) => user.toJSON());

    //filtro solo los usuarios que pertenecen al proceso del admin que esta realizando el request
    //de igual manera regreso solo los users con role `ASSISTANT`
    const filteredUsers = users.filter(
      (user) => user.Process.name === process && user.Role.name !== "ADMIN"
    );

    return [filteredUsers, null];
  } catch (error) {
    handleError(error, "user.service -> getUsers");
  }
}

async function getAdminUsers() {
  try {
    const usersFromDB = await User.findAll({
      include: ["Role", "Process"],
    });

    if (!usersFromDB) return [null, "No hay usuarios"];

    //recupero todos los usuarios de la DB
    const users = usersFromDB.map((user) => user.toJSON());

    //filtro solo los usuarios que pertenecen al proceso del admin que esta realizando el request
    //de igual manera regreso solo los users con role `ASSISTANT`
    const filteredUsers = users.filter((user) => user.Role.name === "ADMIN");

    return [filteredUsers, null];
  } catch (error) {
    handleError(error, "user.service -> getAdminUsers");
  }
}

/**
 * Crea un nuevo usuario en la base de datos con el role "ASSISTANT" por defecto, ya que es el unico role que es posible crear desde la UI. Si se desea crear un usuario con el role "ADMIN", se requiere hacer desde la base de datos.
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function createUser(user) {
  try {
    const { firstname, lastname, username, plainpassword, email, process } =
      user;

    const userFound = await User.findOne({
      where: { username },
    });

    if (userFound) return [null, "El usuario ya existe"];

    const roleFound = await Role.findOne({
      where: { name: "ASSISTANT" },
    });

    if (!roleFound) return [null, "El rol no existe"];

    const processFound = await Process.findOne({
      where: { name: process },
    });

    if (!processFound) return [null, "El proceso no existe"];

    //necesitamos verificar cuantos usuarios existen es un proceso con el role de ASSISTANT
    const usersNumber = await User.count({
      where: { roleId: roleFound.id, processId: processFound.id },
    });

    if (usersNumber == processFound.maxusers)
      return [null, "Se alcanzo el numero maximo de usuarios"];

    const newUser = await User.create({
      firstname,
      lastname,
      username,
      plainpassword,
      password: await User.hashPassword(plainpassword),
      email,
      roleId: roleFound.id,
      processId: processFound.id,
    });

    return [newUser.toJSON(), null];
  } catch (error) {
    handleError(error, "user.service -> createUser");
  }
}

async function createAdminUser(user) {
  try {
    const { firstname, lastname, username, plainpassword, email, process } =
      user;

    const userFound = await User.findOne({
      where: { username },
    });

    if (userFound) return [null, "El usuario ya existe"];

    const roleFound = await Role.findOne({
      where: { name: "ADMIN" },
    });

    if (!roleFound) return [null, "El rol no existe"];

    const processFound = await Process.findOne({
      where: { name: process },
    });

    if (!processFound) return [null, "El proceso no existe"];

    const newUser = await User.create({
      firstname,
      lastname,
      username,
      plainpassword,
      password: await User.hashPassword(plainpassword),
      email,
      roleId: roleFound.id,
      processId: processFound.id,
    });
    return [newUser.toJSON(), null];
  } catch (error) {
    handleError(error, "user.service -> createAdminUser");
  }
}

/**
 * Obtiene un usuario por su id de la base de datos
 * @param {string} Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario
 */
async function getUserById(id) {
  try {
    const userFromDB = await User.findByPk(id, {
      include: ["Role", "Process"],
    });

    if (!userFromDB) return [null, "El usuario no existe"];

    const user = userFromDB.toJSON();

    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserById");
  }
}

/**
 * Actualiza un usuario por su id en la base de datos
 * @param {string} id Id del usuario
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario actualizado
 */
async function updateUser(id, user) {
  try {
    const userFound = await User.findByPk(id);
    if (!userFound) return [null, "El usuario no existe"];

    const { firstname, lastname, username, plainpassword, newPassword, email } =
      user;

    if (!plainpassword) {
      await userFound.update({
        firstname,
        lastname,
        username,
        email,
      });
    }

    if (plainpassword) {
      const matchPassword = await User.comparePassword(
        plainpassword,
        userFound.password
      );

      if (!matchPassword) {
        return [null, "La contraseña no coincide"];
      }

      await userFound.update({
        firstname,
        lastname,
        username,
        plainpassword: newPassword,
        password: await User.hashPassword(newPassword || plainpassword),
        email,
      });
    }

    await userFound.save();

    await userFound.reload();

    return [userFound.toJSON(), null];
  } catch (error) {
    console.error(error);
    handleError(error, "user.service -> updateUser");
  }
}

/**
 * Elimina un usuario por su id de la base de datos
 * @param {string} Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario eliminado
 */
async function deleteUser(id) {
  try {
    const userFound = await User.findByPk(id);
    if (!userFound) return [null, "El usuario no existe"];

    const username = userFound.username;

    await userFound.destroy();

    return [`El usuario ${username} ha sido eliminado`, null];
  } catch (error) {
    handleError(error, "user.service -> deleteUser");
  }
}

export default {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAdminUsers,
  createAdminUser,
};
