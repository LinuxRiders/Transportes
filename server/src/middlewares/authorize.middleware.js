import logger from '../utils/logger.js';

export const authorize = (...requiredRoles) => {
    return (req, res, next) => {
        const userRoles = req.user?.roles || [];
        const hasRole = requiredRoles.some(role => userRoles.includes(role));

        if (!hasRole) {
            logger.warn(`AuthorizeMiddleware: Access denied for user_id=${req.user?.sub}, requiredRoles=${requiredRoles}, userRoles=${userRoles}`);
            return res.status(403).json({ error: 'Forbidden: insufficient role' });
        }

        logger.info(`AuthorizeMiddleware: Access granted for user_id=${req.user?.sub} roles=${userRoles}`);
        next();
    };
};


export const authorizeOwnerOrRole = (paramName, ...roles) => {
    return (req, res, next) => {
        // Se asume que el middleware auth ya se ejecutó y tenemos req.user
        const userId = req.user.sub; // El ID del usuario autenticado
        const requestedId = parseInt(req.params[paramName], 10);

        // Verificar roles
        const userRoles = req.user.roles || [];
        const hasRole = roles.some(role => userRoles.includes(role));

        // Verificar si el usuario autenticado es el mismo que el solicitado
        if (hasRole || userId === requestedId) {
            return next();
        }

        return res.status(403).json({ error: 'Forbidden' });
    };
};

export const authorizeUserOrAdmin = (getResourceOwnerId) => {
    return async (req, res, next) => {
        try {
            const resourceOwnerId = await getResourceOwnerId(req);
            if (req.user.roles.includes('Admin') || resourceOwnerId === req.user.sub) {
                return next();
            }
            return res.status(403).json({ error: 'Forbidden: permisos insuficientes' });
        } catch (error) {
            return next(error);
        }
    };
};