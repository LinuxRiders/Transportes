import { Router } from 'express';
import {
    createMarca,
    showMarca,
    updateMarca,
    softDeleteMarca,
    getAllMarcas
} from '../controllers/marcaVehiculo.controller.js';

const router = Router();

router.post('/', createMarca);
router.get('/', getAllMarcas);
router.get('/:id', showMarca);
router.put('/:id', updateMarca);
router.delete('/:id', softDeleteMarca);

export default router;
