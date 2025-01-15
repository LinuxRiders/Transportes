import { User } from '../models/user.model.js';
import { UserRole } from '../models/user.model.js';
import { RefreshToken } from '../models/token.model.js';
import { comparePassword } from '../../../utils/password.js';
import { generateAccessToken, generateRefreshToken } from '../../../utils/token.js';
import logger from '../../../utils/logger.js';
import dotenv from 'dotenv';
dotenv.config();

const MAX_REFRESH_COUNT = parseInt(process.env.MAX_REFRESH_COUNT, 10) || 10;

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const match = await comparePassword(password, user.password_hash);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Obtener roles
        const roles = await UserRole.getRolesByUser(user.user_id);
        const roleNames = roles.map(r => r.name);

        // Generar tokens
        const accessToken = generateAccessToken({ sub: user.user_id, roles: roleNames });

        const refreshTokenValue = generateRefreshToken();
        const refreshTokenExpiresAt = new Date(Date.now() + parseDuration(process.env.JWT_REFRESH_EXPIRES_IN));
        const sessionStart = new Date();

        // Guardar el refresh token en la base de datos
        await RefreshToken.create({
            user_id: user.user_id,
            token: refreshTokenValue,
            expires_at: refreshTokenExpiresAt,
            session_start: sessionStart
        });

        logger.info(`AuthController:login User ${user.user_id} logged in, tokens issued`);
        res.json({
            access_token: accessToken,
            refresh_token: refreshTokenValue
        });
    } catch (error) {
        logger.error(`AuthController:login Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const refresh = async (req, res, next) => {
    try {
        const { refresh_token } = req.body;
        if (!refresh_token) {
            // logger.warn(`AuthController:refresh Missing refresh_token`);
            return res.status(400).json({ error: 'Missing refresh_token' });
        }

        // Buscar el refresh token en la base de datos
        const storedRefreshToken = await RefreshToken.findByToken(refresh_token);
        if (!storedRefreshToken) {
            // logger.warn(`AuthController:refresh Invalid or revoked refresh_token`);
            return res.status(401).json({ error: 'Invalid or revoked refresh token' });
        }

        const user = await User.findById(storedRefreshToken.user_id);
        if (!user) {
            // logger.warn(`AuthController:refresh User not found for refresh_token`);
            return res.status(404).json({ error: 'User not found' });
        }

        // Verificar la vigencia de la sesión
        const sessionStart = storedRefreshToken.session_start;
        const sessionMaxAge = parseDuration(process.env.JWT_SESSION_MAX_AGE); // en ms
        if (Date.now() - sessionStart.getTime() > sessionMaxAge) {
            // La sesión ha excedido el tiempo máximo permitido
            await RefreshToken.revoke(refresh_token);
            logger.warn(`AuthController:refresh Session expired for user_id=${user.user_id}`);
            return res.status(401).json({ error: 'Session expired. Please login again.' });
        }

        // Verificar el límite de renovaciones
        if (storedRefreshToken.refresh_count >= MAX_REFRESH_COUNT) {
            // Excedió el número máximo de renovaciones
            await RefreshToken.revoke(refresh_token);
            logger.warn(`AuthController:refresh Maximum refresh attempts exceeded for user_id=${user.user_id}`);
            return res.status(401).json({ error: 'Maximum session renewals exceeded. Please login again.' });
        }


        // Obtener roles
        const roles = await UserRole.getRolesByUser(user.user_id);
        const roleNames = roles.map(r => r.name);

        // Generar nuevos tokens
        const newAccessToken = generateAccessToken({ sub: user.user_id, roles: roleNames });

        // Rotar refresh token: revocar el viejo, crear uno nuevo
        const newRefreshTokenValue = generateRefreshToken();
        const newRefreshTokenExpiresAt = new Date(Date.now() + parseDuration(process.env.JWT_REFRESH_EXPIRES_IN));

        // Crear nuevo refresh token con refresh_count incrementado
        await RefreshToken.create({
            user_id: user.user_id,
            token: newRefreshTokenValue,
            expires_at: newRefreshTokenExpiresAt,
            session_start: sessionStart,
            refresh_count: storedRefreshToken.refresh_count + 1
        });

        // Revocar el refresh token antiguo
        await RefreshToken.revoke(refresh_token);

        logger.info(`AuthController:refresh Tokens refreshed for user_id=${user.user_id}`);
        res.json({
            access_token: newAccessToken,
            refresh_token: newRefreshTokenValue
        });
    } catch (error) {
        logger.error(`AuthController:refresh Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        const { refresh_token } = req.body;

        if (!refresh_token) {
            // logger.warn(`AuthController:logout Missing refresh_token`);
            return res.status(400).json({ error: 'Missing refresh_token' });
        }

        const storedToken = await RefreshToken.findByToken(refresh_token);
        if (!storedToken) {
            logger.warn(`AuthController:logout Attempt to revoke a non-existent or already revoked token`);
            return res.status(401).json({ error: 'Logout Attempt to revoke a non-existent or already revoked token.' });
        }

        // Revocar el refresh token
        await RefreshToken.revoke(refresh_token);
        logger.info(`AuthController:logout Refresh token revoked: ${refresh_token}`);

        res.status(204).json({ message: 'Logged out successfully' });
    } catch (error) {
        logger.error(`AuthController:logout Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

/**
 * Helper function to parse duration strings like '15m', '7d' into milliseconds.
 */
function parseDuration(durationStr) {
    const regex = /^(\d+)([smhd])$/;
    const match = durationStr.match(regex);
    if (!match) throw new Error(`Invalid duration format: ${durationStr}`);

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case 's':
            return value * 1000;
        case 'm':
            return value * 60 * 1000;
        case 'h':
            return value * 60 * 60 * 1000;
        case 'd':
            return value * 24 * 60 * 60 * 1000;
        default:
            throw new Error(`Unknown duration unit: ${unit}`);
    }
}
