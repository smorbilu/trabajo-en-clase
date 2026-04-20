import express from "express";
import cors from "cors";
import authRoutes from "./interfaces/routes/authRoutes";
import categoriaRoutes from "./interfaces/routes/categoriaRoutes";
import productoRoutes from "./interfaces/routes/productoRoutes";
import proveedorRoutes from "./interfaces/routes/proveedorRoutes";
import movimientoInventarioRoutes from "./interfaces/routes/movimientoInventarioRoutes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/categorias", categoriaRoutes);
app.use("/productos", productoRoutes);
app.use("/proveedores", proveedorRoutes);
app.use("/movimientos-inventario", movimientoInventarioRoutes);

app.get("/", (_req, res) => {
  res.send("Backend funcionando");
});

app.use(authRoutes);