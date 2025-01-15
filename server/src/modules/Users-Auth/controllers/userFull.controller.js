import { Role, User, UserRole } from '../models/user.model.js';
import { hashPassword } from '../../../utils/password.js';
import logger from '../../../utils/logger.js';
import pool from '../../../config/db.js';

export const createFullUser = async (req, res, next) => {
    const { username, password, email, roles } = req.body;

    const connection = await pool.getConnection(); // Obtener una conexión de la pool
    try {
        await connection.beginTransaction(); // Iniciar la transacción

        // Verificar si existe el usuario
        const existing = await User.findByEmail(email, connection);
        if (existing)
            return res.status(409).json({ error: 'Email already exists' });

        // Crear usuario
        const password_hash = await hashPassword(password);
        const userId = await User.create({ username, email, password_hash }, connection);

        console.log(userId);

        // Asignación de roles
        const newRoles = [...new Set(roles)]; // Eliminamos duplicados con SET
        for (const roleName of newRoles) {
            const role = await Role.findByName(roleName, connection);
            if (!role) {
                // Si un rol no existe, revertimos la transacción
                await connection.rollback();
                return res.status(400).json({ error: `Role not found: ${roleName}` });
            }
            await UserRole.assignRole(userId, role.role_id, connection);
        }

        // Confirmar la transacción si todo es exitoso
        await connection.commit();

        // Recuperar la info final del usuario y perfil para devolver
        const user = await User.findById(userId, connection);
        const userRoles = await UserRole.getRolesByUser(userId, connection);

        logger.info(`UserFullController:createFullUser User created with full data user_id=${userId}`);
        res.status(201).json({
            data: {
                user,
                roles: userRoles.map(r => r.name)
            }
        });

    } catch (error) {
        // Si ocurre un error, revertimos la transacción
        await connection.rollback();
        logger.error(`UserFullController:createFullUser Error: ${error.message}`, { stack: error.stack });
        next(error);
    } finally {
        connection.release(); // Liberar la conexión
    }
};


//  {
//     "username": "jdoe",
//     "password": "secret123",
//     "email": "john.doe@example.com",
//     "profile": {
//       "dni": "12345678",
//       "first_name": "John",
//       "last_name": "Doe",
//       "phone": "555-1234"
//     },
//     "roles": ["Admin", "Staff"]
//   }