"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MyFriendController_1 = require("../controllers/MyFriendController");
const router = (0, express_1.Router)();
router.get("/", MyFriendController_1.MyFriendController.getAll);
exports.default = router;
