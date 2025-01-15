import pool from '../../../config/db.js';
import logger from '../../../utils/logger.js';

export const User = {
    create: async ({ username, email, password_hash }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                'INSERT INTO USER (username, email, password_hash, status) VALUES (?, ?, ?, "active")',
                [username, email, password_hash]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:User:create Error inserting user: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT user_id, username, status, created_at, updated_at FROM USER WHERE user_id = ? AND deleted_at IS NULL',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:User:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findByEmail: async (email, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM USER WHERE email = ? AND deleted_at IS NULL',
                [email]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:User:findByEmail Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    update: async (id, fields, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);
            const setClause = keys.map(k => `${k} = ?`).join(', ');
            values.push(id);
            await connection.execute(
                `UPDATE USER SET ${setClause}, updated_at = NOW() WHERE user_id = ?`, values
            );
        } catch (error) {
            logger.error(`[Model]:User:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    softDelete: async (id, connection = pool) => {
        try {
            await connection.execute('UPDATE USER SET deleted_at = NOW() WHERE user_id = ?', [id]);
        } catch (error) {
            logger.error(`[Model]:User:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT user_id, username, status, created_at, updated_at FROM USER WHERE deleted_at IS NULL'
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:User:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },
};


export const Role = {
    create: async ({ name, description }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                'INSERT INTO ROLE (name, description) VALUES (?, ?)', [name, description]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Role:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT role_id, name, description, created_at, updated_at FROM ROLE WHERE role_id = ? AND deleted_at IS NULL',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Role:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findByName: async (name, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT role_id, name FROM ROLE WHERE name = ? AND deleted_at IS NULL',
                [name]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Role:findByName Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    update: async (id, fields, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);
            const setClause = keys.map(k => `${k} = ?`).join(', ');
            values.push(id);
            await connection.execute(
                `UPDATE ROLE SET ${setClause}, updated_at = NOW() WHERE role_id = ?`, values
            );
        } catch (error) {
            logger.error(`[Model]:Role:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    softDelete: async (id, connection = pool) => {
        try {
            await connection.execute('UPDATE ROLE SET deleted_at = NOW() WHERE role_id = ?', [id]);
        } catch (error) {
            logger.error(`[Model]:Role:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT role_id, name, description, created_at, updated_at FROM ROLE WHERE deleted_at IS NULL'
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:Role:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const UserRole = {
    assignRole: async (user_id, role_id, connection = pool) => {
        try {
            await connection.execute(
                'INSERT INTO USER_ROLE (user_id, role_id) VALUES (?, ?)',
                [user_id, role_id]
            );
        } catch (error) {
            logger.error(`[Model]:UserRole:assignRole Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    removeRole: async (user_id, role_id, connection = pool) => {
        try {
            await connection.execute(
                'UPDATE USER_ROLE SET deleted_at = NOW() WHERE user_id = ? AND role_id = ? AND deleted_at IS NULL',
                [user_id, role_id]
            );
        } catch (error) {
            logger.error(`[Model]:UserRole:removeRole Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getRolesByUser: async (user_id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT r.role_id, r.name, r.description
           FROM USER_ROLE ur
           JOIN ROLE r ON ur.role_id = r.role_id
           WHERE ur.user_id = ? AND ur.deleted_at IS NULL AND r.deleted_at IS NULL`,
                [user_id]
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:UserRole:getRolesByUser Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};


export const Persona = {
    // Crea un registro en la tabla 'persona'
    create: async (
        {
            nombre,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento,
            celular,
            direccion,
            user_id,
            created_by = null // opcional, si tienes tracking de quién lo creó
        },
        connection = pool
    ) => {
        try {
            const query = `
                INSERT INTO persona (
                  nombre,
                  apellido_paterno,
                  apellido_materno,
                  fecha_nacimiento,
                  celular,
                  direccion,
                  user_id,
                  created_by
                )
                VALUES (?,?,?,?,?,?,?,?)
            `;
            const values = [
                nombre,
                apellido_paterno,
                apellido_materno,
                fecha_nacimiento,
                celular,
                direccion,
                user_id,
                created_by
            ];

            const [result] = await connection.execute(query, values);
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Persona:create Error inserting persona: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // Busca por ID (ignora los que tengan deleted_at != NULL)
    findById: async (id, connection = pool) => {
        try {
            const query = `
                SELECT *
                FROM persona
                WHERE idPersona = ?
                  AND deleted_at IS NULL
            `;
            const [rows] = await connection.execute(query, [id]);
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Persona:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // Actualiza campos de persona dinámicamente
    update: async (id, fields, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);

            if (keys.length === 0) return; // Nada que actualizar

            // Genera dinámicamente el SET
            const setClause = keys.map(k => `${k} = ?`).join(', ');
            values.push(id);

            const query = `
                UPDATE persona
                SET ${setClause},
                    updated_at = NOW()
                WHERE idPersona = ?
                  AND deleted_at IS NULL
            `;
            await connection.execute(query, values);

        } catch (error) {
            logger.error(`[Model]:Persona:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // Soft delete (pone la fecha en deleted_at)
    softDelete: async (id, connection = pool) => {
        try {
            const query = `
                UPDATE persona
                SET deleted_at = NOW()
                WHERE idPersona = ?
                  AND deleted_at IS NULL
            `;
            await connection.execute(query, [id]);
        } catch (error) {
            logger.error(`[Model]:Persona:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // Retorna todas las 'personas' activas (deleted_at = NULL)
    getAll: async (connection = pool) => {
        try {
            const query = `
                SELECT *
                FROM persona
                WHERE deleted_at IS NULL
            `;
            const [rows] = await connection.execute(query);
            return rows;
        } catch (error) {
            logger.error(`[Model]:Persona:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const GuiaTuristico = {
    create: async (
        {
            idGuia_turistico, // Debe ser el mismo ID de persona
            numero_licencia_turismo,
            idioma_materno,
            created_by = null
        },
        connection = pool
    ) => {
        try {
            const query = `
                INSERT INTO guia_turistico (
                  idGuia_turistico,
                  numero_licencia_turismo,
                  idioma_materno,
                  created_by
                )
                VALUES (?,?,?,?)
            `;
            const values = [
                idGuia_turistico,
                numero_licencia_turismo,
                JSON.stringify(idioma_materno), // si está en objeto JS
                created_by
            ];
            const [result] = await connection.execute(query, values);
            return result.insertId; // Realmente debería devolver idGuia_turistico
        } catch (error) {
            logger.error(`[Model]:GuiaTuristico:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findById: async (id, connection = pool) => {
        try {
            const query = `
                SELECT *
                FROM guia_turistico
                WHERE idGuia_turistico = ?
                  AND deleted_at IS NULL
            `;
            const [rows] = await connection.execute(query, [id]);
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:GuiaTuristico:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    update: async (id, fields, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);

            if (keys.length === 0) return;

            // Si uno de los campos a actualizar es 'idioma_materno' (tipo JSON),
            // conviene stringificarlo antes.
            // Ejemplo:
            // if ('idioma_materno' in fields) {
            //   fields.idioma_materno = JSON.stringify(fields.idioma_materno);
            // }

            const setClause = keys.map(k => `${k} = ?`).join(', ');
            values.push(id);

            const query = `
                UPDATE guia_turistico
                SET ${setClause},
                    updated_at = NOW()
                WHERE idGuia_turistico = ?
                  AND deleted_at IS NULL
            `;

            await connection.execute(query, values);

        } catch (error) {
            logger.error(`[Model]:GuiaTuristico:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    softDelete: async (id, connection = pool) => {
        try {
            const query = `
                UPDATE guia_turistico
                SET deleted_at = NOW()
                WHERE idGuia_turistico = ?
                  AND deleted_at IS NULL
            `;
            await connection.execute(query, [id]);
        } catch (error) {
            logger.error(`[Model]:GuiaTuristico:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getAll: async (connection = pool) => {
        try {
            const query = `
                SELECT *
                FROM guia_turistico
                WHERE deleted_at IS NULL
            `;
            const [rows] = await connection.execute(query);
            return rows;
        } catch (error) {
            logger.error(`[Model]:GuiaTuristico:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const Pasajero = {
    create: async (
        {
            idPasajero, // coincide con persona.idPersona
            foto_pasajero,
            created_by = null
        },
        connection = pool
    ) => {
        try {
            const query = `
                INSERT INTO pasajero (
                  idPasajero,
                  foto_pasajero,
                  created_by
                )
                VALUES (?,?,?)
            `;
            const values = [
                idPasajero,
                foto_pasajero,
                created_by
            ];
            const [result] = await connection.execute(query, values);
            return result.insertId; // Realmente es el idPasajero
        } catch (error) {
            logger.error(`[Model]:Pasajero:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findById: async (id, connection = pool) => {
        try {
            const query = `
                SELECT *
                FROM pasajero
                WHERE idPasajero = ?
                  AND deleted_at IS NULL
            `;
            const [rows] = await connection.execute(query, [id]);
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Pasajero:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    update: async (id, fields, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);

            if (keys.length === 0) return;

            const setClause = keys.map(k => `${k} = ?`).join(', ');
            values.push(id);

            const query = `
                UPDATE pasajero
                SET ${setClause},
                    updated_at = NOW()
                WHERE idPasajero = ?
                  AND deleted_at IS NULL
            `;

            await connection.execute(query, values);
        } catch (error) {
            logger.error(`[Model]:Pasajero:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    softDelete: async (id, connection = pool) => {
        try {
            const query = `
                UPDATE pasajero
                SET deleted_at = NOW()
                WHERE idPasajero = ?
                  AND deleted_at IS NULL
            `;
            await connection.execute(query, [id]);
        } catch (error) {
            logger.error(`[Model]:Pasajero:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getAll: async (connection = pool) => {
        try {
            const query = `
                SELECT *
                FROM pasajero
                WHERE deleted_at IS NULL
            `;
            const [rows] = await connection.execute(query);
            return rows;
        } catch (error) {
            logger.error(`[Model]:Pasajero:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const Conductor = {
    create: async (
        {
            idConductor,
            foto_conductor,
            celular_contacto,
            created_by = null
        },
        connection = pool
    ) => {
        try {
            const query = `
                INSERT INTO conductor (
                  idConductor,
                  foto_conductor,
                  celular_contacto,
                  created_by
                )
                VALUES (?,?,?,?)
            `;
            const values = [
                idConductor,
                foto_conductor,
                celular_contacto,
                created_by
            ];
            const [result] = await connection.execute(query, values);
            return result.insertId; // Realmente es idConductor
        } catch (error) {
            logger.error(`[Model]:Conductor:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findById: async (id, connection = pool) => {
        try {
            const query = `
                SELECT *
                FROM conductor
                WHERE idConductor = ?
                  AND deleted_at IS NULL
            `;
            const [rows] = await connection.execute(query, [id]);
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Conductor:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    update: async (id, fields, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);

            if (keys.length === 0) return;

            const setClause = keys.map(k => `${k} = ?`).join(', ');
            values.push(id);

            const query = `
                UPDATE conductor
                SET ${setClause},
                    updated_at = NOW()
                WHERE idConductor = ?
                  AND deleted_at IS NULL
            `;

            await connection.execute(query, values);
        } catch (error) {
            logger.error(`[Model]:Conductor:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    softDelete: async (id, connection = pool) => {
        try {
            const query = `
                UPDATE conductor
                SET deleted_at = NOW()
                WHERE idConductor = ?
                  AND deleted_at IS NULL
            `;
            await connection.execute(query, [id]);
        } catch (error) {
            logger.error(`[Model]:Conductor:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getAll: async (connection = pool) => {
        try {
            const query = `
                SELECT *
                FROM conductor
                WHERE deleted_at IS NULL
            `;
            const [rows] = await connection.execute(query);
            return rows;
        } catch (error) {
            logger.error(`[Model]:Conductor:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};