import { Search } from '../models/search.model.js';
import logger from '../../utils/logger.js';

export const search = async (req, res, next) => {
    try {
        const results = await Search.find(req.query);

        logger.info(`SearchController:search Retrieved ${results.length} results`);
        res.json({ data: results });
    } catch (error) {
        logger.error(`SearchController:search Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};
