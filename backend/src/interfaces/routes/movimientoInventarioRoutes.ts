import { Router } from "express";
import { MovimientoInventarioController } from "../controllers/MovimientoInventarioController";

const router = Router();

router.get("/", MovimientoInventarioController.getAll);
router.post("/", MovimientoInventarioController.create);
router.put("/:id", MovimientoInventarioController.update);
router.delete("/:id", MovimientoInventarioController.delete);

export default router;