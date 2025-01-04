import { Router } from 'express';
import {
    createCombustible,
    showCombustible,
    updateCombustible,
    softDeleteCombustible,
    getAllCombustibles
} from '../controllers/combustible.controller.js';

const router = Router();

router.post('/', createCombustible);
router.get('/con', getAllCombustibles);
router.get('/:id', showCombustible);
router.put('/:id', updateCombustible);
router.delete('/:id', softDeleteCombustible);

export default router;
