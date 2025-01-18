import {
  Conductor,
  GuiaTuristico,
  Persona,
  Role,
  User,
  UserRole,
} from "../models/user.model.js";
import { hashPassword } from "../../../utils/password.js";
import logger from "../../../utils/logger.js";
import pool from "../../../config/db.js";

export const createFullUser = async (req, res, next) => {
  const { username, email, password, profile } = req.body;
  const created_by = req.user?.id ?? null;

  const connection = await pool.getConnection(); // Obtener una conexión de la pool
  try {
    await connection.beginTransaction(); // Iniciar la transacción

    // Verificar si existe el usuario
    const existing = await User.findByEmail(email, connection);
    if (existing)
      return res.status(409).json({ error: "Email already exists" });

    // Crear usuario
    const password_hash = await hashPassword(password);
    const userId = await User.create(
      { username, email, password_hash },
      connection
    );

    console.log(userId);

    // Asignación de rol User por defecto
    const role = await Role.findByName("User", connection);
    if (!role) {
      // Si rol User no existe, revertimos la transacción
      await connection.rollback();
      return res.status(400).json({ error: `Role not found: User` });
    }
    await UserRole.assignRole(userId, role.role_id, connection);

    // Crear perfil de usuario
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      fecha_nacimiento,
      celular,
      direccion,
    } = profile;

    await Persona.create(
      {
        nombre,
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento,
        celular,
        direccion,
        user_id: userId,
        created_by,
      },
      connection
    );

    // Confirmar la transacción si todo es exitoso
    await connection.commit();

    // Recuperar la info final del usuario y perfil para devolver
    const user = await User.findById(userId, connection);
    const userRoles = await UserRole.getRolesByUser(userId, connection);
    const perfil = await Persona.getByUser(userId, connection);

    logger.info(
      `UserFullController:createFullUser User created with full data user_id=${userId}`
    );
    res.status(201).json({
      data: {
        user,
        roles: userRoles.map((r) => r.name),
        persona: perfil,
      },
    });
  } catch (error) {
    // Si ocurre un error, revertimos la transacción
    await connection.rollback();
    logger.error(`UserFullController:createFullUser Error: ${error.message}`, {
      stack: error.stack,
    });
    next(error);
  } finally {
    connection.release(); // Liberar la conexión
  }
};

export const assignGuiaToUser = async (req, res, next) => {
  const { id } = req.params;
  const { numero_licencia_turismo, idioma_materno } = req.body;
  const created_by = req.user?.id ?? null;

  const connection = await pool.getConnection(); // Obtener una conexión de la pool
  try {
    await connection.beginTransaction(); // Iniciar la transacción

    // Verificar si existe Usuario
    const user = await User.findById(id);
    if (!user) res.status(404).json({ error: "User not found" });

    // Verificar si existe Persona
    const persona = await Persona.getByUser(user.user_id, connection);
    if (!persona) return res.status(409).json({ error: "Persona not exists" });

    // Asignación de rol Guia
    const role = await Role.findByName("Guia", connection);
    if (!role) {
      // Si rol Guia no existe, revertimos la transacción
      await connection.rollback();
      return res.status(400).json({ error: `Role not found: Guia` });
    }
    await UserRole.assignRole(user.user_id, role.role_id, connection);

    // Crear perfil de Guia y asignar a persona
    await GuiaTuristico.create(
      {
        idPersona: persona.idPersona,
        numero_licencia_turismo,
        idioma_materno,
        created_by,
      },
      connection
    );

    // Confirmar la transacción si todo es exitoso
    await connection.commit();

    // Recuperar la info final del usuario y perfil para devolver
    const userData = await User.findById(id, connection);
    const userRoles = await UserRole.getRolesByUser(id, connection);
    const perfil = await Persona.getByUser(id, connection);

    logger.info(
      `UserFullController:assignGuiaToUser Guia assign to user_id=${id}`
    );
    res.status(201).json({
      data: {
        user: userData,
        roles: userRoles.map((r) => r.name),
        persona: perfil,
      },
    });
  } catch (error) {
    // Si ocurre un error, revertimos la transacción
    await connection.rollback();
    logger.error(
      `UserFullController:assignGuiaToUser Error: ${error.message}`,
      { stack: error.stack }
    );
    next(error);
  } finally {
    connection.release(); // Liberar la conexión
  }
};

export const assignConductorToUser = async (req, res, next) => {
  const { id } = req.params;
  const { foto_conductor, celular_contacto } = req.body;
  const created_by = req.user?.id ?? null;

  const connection = await pool.getConnection(); // Obtener una conexión de la pool
  try {
    await connection.beginTransaction(); // Iniciar la transacción

    // Verificar si existe Usuario
    const user = await User.findById(id);
    if (!user) res.status(404).json({ error: "User not found" });

    // Verificar si existe Persona
    const persona = await Persona.getByUser(user.user_id, connection);
    if (!persona) return res.status(409).json({ error: "Persona not exists" });

    // Asignación de rol Conductor
    const role = await Role.findByName("Conductor", connection);
    if (!role) {
      // Si rol Guia no existe, revertimos la transacción
      await connection.rollback();
      return res.status(400).json({ error: `Role not found: Conductor` });
    }
    await UserRole.assignRole(user.user_id, role.role_id, connection);

    // Crear perfil de Conductor y asignar a persona
    await Conductor.create(
      {
        idPersona: persona.idPersona,
        foto_conductor,
        celular_contacto,
        created_by,
      },
      connection
    );

    // Confirmar la transacción si todo es exitoso
    await connection.commit();

    // Recuperar la info final del usuario y perfil para devolver
    const userData = await User.findById(id, connection);
    const userRoles = await UserRole.getRolesByUser(id, connection);
    const perfil = await Persona.getByUser(id, connection);

    logger.info(
      `UserFullController:assignConductorToUser Conductor assign to user_id=${id}`
    );
    res.status(201).json({
      data: {
        user: userData,
        roles: userRoles.map((r) => r.name),
        persona: perfil,
      },
    });
  } catch (error) {
    // Si ocurre un error, revertimos la transacción
    await connection.rollback();
    logger.error(
      `UserFullController:assignConductorToUser Error: ${error.message}`,
      { stack: error.stack }
    );
    next(error);
  } finally {
    connection.release(); // Liberar la conexión
  }
};
