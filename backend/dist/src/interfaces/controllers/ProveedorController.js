"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorController = void 0;
const ProveedorModel_1 = require("../../infrastructure/models/ProveedorModel");
class ProveedorController {
    static async getAll(_req, res) {
        try {
            const proveedores = await ProveedorModel_1.ProveedorModel.findAll({
                order: [["id", "ASC"]],
            });
            res.status(200).json(proveedores);
        }
        catch (error) {
            console.error("Error al obtener proveedores:", error);
            res.status(500).json({ mensaje: "Error al obtener proveedores" });
        }
    }
    static async create(req, res) {
        try {
            const { nombre, telefono, direccion, correo, activo } = req.body;
            if (!nombre || !nombre.trim()) {
                res.status(400).json({ mensaje: "El nombre es obligatorio" });
                return;
            }
            const nuevoProveedor = await ProveedorModel_1.ProveedorModel.create({
                nombre,
                telefono: telefono || null,
                direccion: direccion || null,
                correo: correo || null,
                activo: activo !== undefined ? activo : true,
            });
            res.status(201).json(nuevoProveedor);
        }
        catch (error) {
            console.error("Error al crear proveedor:", error);
            res.status(500).json({ mensaje: "Error al crear proveedor" });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, telefono, direccion, correo, activo } = req.body;
            const proveedor = await ProveedorModel_1.ProveedorModel.findByPk(Number(id));
            if (!proveedor) {
                res.status(404).json({ mensaje: "Proveedor no encontrado" });
                return;
            }
            await proveedor.update({
                nombre,
                telefono: telefono || null,
                direccion: direccion || null,
                correo: correo || null,
                activo: activo !== undefined ? activo : proveedor.get("activo"),
            });
            res.status(200).json(proveedor);
        }
        catch (error) {
            console.error("Error al actualizar proveedor:", error);
            res.status(500).json({ mensaje: "Error al actualizar proveedor" });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const proveedor = await ProveedorModel_1.ProveedorModel.findByPk(Number(id));
            if (!proveedor) {
                res.status(404).json({ mensaje: "Proveedor no encontrado" });
                return;
            }
            await proveedor.destroy();
            res.status(200).json({ mensaje: "Proveedor eliminado correctamente" });
        }
        catch (error) {
            console.error("Error al eliminar proveedor:", error);
            res.status(500).json({ mensaje: "Error al eliminar proveedor" });
        }
    }
}
exports.ProveedorController = ProveedorController;
