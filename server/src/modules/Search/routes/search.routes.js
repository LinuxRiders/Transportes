import { Router } from "express";
import { search, searchLugares } from "../controllers/search.controller.js";
import { searchLugaresValidation, searchValidation } from "../validations/search.validation.js";
import { validateResults } from "../../../middlewares/validationResult.js";

const router = Router();

// Endpoint de búsqueda con validaciones
router.get("/search", searchValidation, validateResults, search);

router.get("/searchLugares", searchLugaresValidation, validateResults, searchLugares);

export default router;
