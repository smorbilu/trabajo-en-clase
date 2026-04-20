import { Router } from "express";
import { ProductoController } from "../controllers/ProductoController";

const router = Router();

router.get("/", ProductoController.getAll);
router.post("/", ProductoController.create);
router.put("/:id", ProductoController.update);
router.delete("/:id", ProductoController.delete);

export default router;