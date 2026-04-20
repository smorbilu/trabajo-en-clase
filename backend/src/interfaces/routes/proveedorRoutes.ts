import { Router } from "express";
import { ProveedorController } from "../controllers/ProveedorController";

const router = Router();

router.get("/", ProveedorController.getAll);
router.post("/", ProveedorController.create);
router.put("/:id", ProveedorController.update);
router.delete("/:id", ProveedorController.delete);

export default router;