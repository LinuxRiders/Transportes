import { Router } from 'express';
import {
    createTransmision,
    showTransmision,
    updateTransmision,
    softDeleteTransmision,
    getAllTransmisiones
} from '../controllers/transmision.controller.js';

const router = Router();

router.post('/', createTransmision);
router.get('/', getAllTransmisiones);
router.get('/:id', showTransmision);
router.put('/:id', updateTransmision);
router.delete('/:id', softDeleteTransmision);

export default router;
