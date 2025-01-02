import { Router } from 'express';
import {
    createCarroceria,
    showCarroceria,
    updateCarroceria,
    softDeleteCarroceria,
    getAllCarrocerias
} from '../controllers/carroceria.controller.js';

const router = Router();

router.post('/', createCarroceria);
router.get('/', getAllCarrocerias);
router.get('/:id', showCarroceria);
router.put('/:id', updateCarroceria);
router.delete('/:id', softDeleteCarroceria);

export default router;
