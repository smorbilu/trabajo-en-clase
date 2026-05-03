import { Router } from "express";
import { MyFriendController } from "../controllers/MyFriendController";

const router = Router();

router.get("/", MyFriendController.getAll);

export default router;