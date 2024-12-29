import { Router } from 'express';
import {
    createVehiculo,
    showVehiculo,
    updateVehiculo,
    softDeleteVehiculo,
    getAllVehiculos
} from '../controllers/vehiculo.controller.js';

const router = Router();

router.post('/', createVehiculo);
router.get('/', getAllVehiculos);
router.get('/:id', showVehiculo);
router.put('/:id', updateVehiculo);
router.delete('/:id', softDeleteVehiculo);

export default router;
