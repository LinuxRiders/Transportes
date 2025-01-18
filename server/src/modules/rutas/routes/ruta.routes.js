import { Router } from "express";
import {
  createRuta,
  getAllRutas,
  getRuta,
  updateRuta,
  deleteRuta,
  getDataRuta,
} from "../controllers/ruta.controller.js";
import { validateResults } from "../../../middlewares/validationResult.js";
import {
  createRutaValidation,
  updateRutaValidation,
} from "../validations/ruta.validation.js";
import { idParamValidation } from "../../../validations/validations.js";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";
import { authorize } from "../../../middlewares/authorize.middleware.js";

const router = Router();

// Crear una ruta
router.post(
  "/",
  authMiddleware,
  createRutaValidation,
  validateResults,
  createRuta
);

// Obtener todas las rutas
router.get("/", authMiddleware, authorize(["Admin"]), getAllRutas);

// Obtener una ruta y lugares por ID
router.get("/:id", idParamValidation, validateResults, getDataRuta);

// Actualizar una ruta por ID
router.put(
  "/:id",
  authMiddleware,
  ...idParamValidation,
  ...updateRutaValidation,
  validateResults,
  updateRuta
);

// Eliminar una ruta (borrado lógico)
router.delete(
  "/:id",
  authMiddleware,
  idParamValidation,
  validateResults,
  deleteRuta
);

export default router;
