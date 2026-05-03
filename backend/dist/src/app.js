"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./interfaces/routes/authRoutes"));
const categoriaRoutes_1 = __importDefault(require("./interfaces/routes/categoriaRoutes"));
const productoRoutes_1 = __importDefault(require("./interfaces/routes/productoRoutes"));
const proveedorRoutes_1 = __importDefault(require("./interfaces/routes/proveedorRoutes"));
const movimientoInventarioRoutes_1 = __importDefault(require("./interfaces/routes/movimientoInventarioRoutes"));
const myFriendRoutes_1 = __importDefault(require("./interfaces/routes/myFriendRoutes"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json({ limit: "10mb" }));
exports.app.get("/", (_req, res) => {
    res.send("Backend funcionando");
});
exports.app.use(authRoutes_1.default);
exports.app.use("/categorias", categoriaRoutes_1.default);
exports.app.use("/productos", productoRoutes_1.default);
exports.app.use("/proveedores", proveedorRoutes_1.default);
exports.app.use("/movimientos-inventario", movimientoInventarioRoutes_1.default);
exports.app.use("/my-friends", myFriendRoutes_1.default);
