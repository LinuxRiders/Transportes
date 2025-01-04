import { User, Role, UserRole } from '../models/user.model.js';
import logger from '../../../utils/logger.js';

export const assignRoleToUser = async (req, res, next) => {
  try {
    const { user_id, roles } = req.body;

    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Obtener los role_id actuales del usuario
    const currentRoleIds = new Set((await UserRole.getRolesByUser(user_id)).map(role => role.role_id));

    const newRoles = [];
    for (const roleName of roles) {
      // Buscar el rol en la base de datos
      const role = await Role.findByName(roleName);
      if (!role) return res.status(404).json({ error: `One or More Roles not found` });

      // Agregar solo los roles que no están asignados actualmente
      if (!currentRoleIds.has(role.role_id)) newRoles.push(role.role_id);
    }

    // Asignar los nuevos roles en paralelo
    await Promise.all(newRoles.map(roleId => UserRole.assignRole(user_id, roleId)));

    logger.info(`UserRoleController:assignRoles  roles=${newRoles} assigned to user_id=${user_id}`);
    res.status(201).json({ message: 'Role assigned to user', assignedRoles: newRoles });

  } catch (error) {
    logger.error(`UserRoleController:assignRole Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const removeRoleFromUser = async (req, res, next) => {
  try {
    const { user_id, roles } = req.body;

    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Obtener los role_id actuales del usuario
    const currentRoleIds = new Set((await UserRole.getRolesByUser(user_id)).map(role => role.role_id));

    const existingRoles = [];
    for (const roleName of roles) {
      // Buscar el rol en la base de datos
      const role = await Role.findByName(roleName);
      if (!role) return res.status(404).json({ error: `One or More Roles not found` });

      // Conservar solo los roles que ya están en currentRoleIds
      if (currentRoleIds.has(role.role_id)) existingRoles.push(role.role_id);
    }

    // Borrar los roles existentes en paralelo
    await Promise.all(existingRoles.map(roleId => UserRole.removeRole(user_id, roleId)));

    logger.info(`UserRoleController:removeRoles role${existingRoles} removed from user_id=${user_id}`);
    res.status(200).json({ message: 'Role removed from user', removedRoles: existingRoles });

  } catch (error) {
    logger.error(`UserRoleController:removeRole Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const getUserRoles = async (req, res, next) => {
  try {
    const roles = await UserRole.getRolesByUser(req.params.user_id);

    logger.info(`UserRoleController:getUserRoles Retrieved ${roles.length} roles for user_id=${req.params.user_id}`);
    res.json({ data: roles });

  } catch (error) {
    logger.error(`UserRoleController:getUserRoles Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};
