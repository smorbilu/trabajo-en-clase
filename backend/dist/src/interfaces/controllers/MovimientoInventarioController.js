"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovimientoInventarioController = void 0;
const MovimientoInventarioModel_1 = require("../../infrastructure/models/MovimientoInventarioModel");
const ProductoModel_1 = require("../../infrastructure/models/ProductoModel");
class MovimientoInventarioController {
    static async getAll(_req, res) {
        try {
            const movimientos = await MovimientoInventarioModel_1.MovimientoInventarioModel.findAll({
                include: [
                    {
                        model: ProductoModel_1.ProductoModel,
                        as: "producto",
                    },
                ],
                order: [["id", "DESC"]],
            });
            res.status(200).json(movimientos);
        }
        catch (error) {
            console.error("Error al obtener movimientos:", error);
            res.status(500).json({ mensaje: "Error al obtener movimientos" });
        }
    }
    static async create(req, res) {
        try {
            const { producto_id, tipo_movimiento, cantidad, fecha, observacion } = req.body;
            if (!producto_id) {
                res.status(400).json({ mensaje: "El producto es obligatorio" });
                return;
            }
            if (!tipo_movimiento || !String(tipo_movimiento).trim()) {
                res.status(400).json({ mensaje: "El tipo de movimiento es obligatorio" });
                return;
            }
            if (!cantidad || Number(cantidad) <= 0) {
                res.status(400).json({ mensaje: "La cantidad debe ser mayor que 0" });
                return;
            }
            if (!fecha) {
                res.status(400).json({ mensaje: "La fecha es obligatoria" });
                return;
            }
            const tipo = String(tipo_movimiento).toLowerCase();
            if (tipo !== "entrada" && tipo !== "salida") {
                res.status(400).json({ mensaje: "Tipo de movimiento inválido" });
                return;
            }
            const producto = await ProductoModel_1.ProductoModel.findByPk(Number(producto_id));
            if (!producto) {
                res.status(400).json({ mensaje: "El producto seleccionado no existe" });
                return;
            }
            const movimiento = await MovimientoInventarioModel_1.MovimientoInventarioModel.create({
                producto_id: Number(producto_id),
                tipo_movimiento: tipo,
                cantidad: Number(cantidad),
                fecha: String(fecha),
                observacion: observacion || null,
            });
            res.status(201).json(movimiento);
        }
        catch (error) {
            console.error("Error al crear movimiento:", error);
            res.status(500).json({ mensaje: "Error al crear movimiento" });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { producto_id, tipo_movimiento, cantidad, fecha, observacion } = req.body;
            const movimiento = await MovimientoInventarioModel_1.MovimientoInventarioModel.findByPk(Number(id));
            if (!movimiento) {
                res.status(404).json({ mensaje: "Movimiento no encontrado" });
                return;
            }
            if (!producto_id) {
                res.status(400).json({ mensaje: "El producto es obligatorio" });
                return;
            }
            if (!tipo_movimiento || !String(tipo_movimiento).trim()) {
                res.status(400).json({ mensaje: "El tipo de movimiento es obligatorio" });
                return;
            }
            if (!cantidad || Number(cantidad) <= 0) {
                res.status(400).json({ mensaje: "La cantidad debe ser mayor que 0" });
                return;
            }
            if (!fecha) {
                res.status(400).json({ mensaje: "La fecha es obligatoria" });
                return;
            }
            const tipo = String(tipo_movimiento).toLowerCase();
            if (tipo !== "entrada" && tipo !== "salida") {
                res.status(400).json({ mensaje: "Tipo de movimiento inválido" });
                return;
            }
            const producto = await ProductoModel_1.ProductoModel.findByPk(Number(producto_id));
            if (!producto) {
                res.status(400).json({ mensaje: "El producto seleccionado no existe" });
                return;
            }
            await movimiento.update({
                producto_id: Number(producto_id),
                tipo_movimiento: tipo,
                cantidad: Number(cantidad),
                fecha: String(fecha),
                observacion: observacion || null,
            });
            res.status(200).json(movimiento);
        }
        catch (error) {
            console.error("Error al actualizar movimiento:", error);
            res.status(500).json({ mensaje: "Error al actualizar movimiento" });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const movimiento = await MovimientoInventarioModel_1.MovimientoInventarioModel.findByPk(Number(id));
            if (!movimiento) {
                res.status(404).json({ mensaje: "Movimiento no encontrado" });
                return;
            }
            await movimiento.destroy();
            res.status(200).json({ mensaje: "Movimiento eliminado correctamente" });
        }
        catch (error) {
            console.error("Error al eliminar movimiento:", error);
            res.status(500).json({ mensaje: "Error al eliminar movimiento" });
        }
    }
}
exports.MovimientoInventarioController = MovimientoInventarioController;
