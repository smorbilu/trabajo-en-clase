"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaController = void 0;
const CategoriaModel_1 = require("../../infrastructure/models/CategoriaModel");
class CategoriaController {
    static async getAll(_req, res) {
        try {
            const categorias = await CategoriaModel_1.CategoriaModel.findAll({
                order: [["id", "ASC"]],
            });
            res.status(200).json(categorias);
        }
        catch (error) {
            console.error("Error al obtener categorías:", error);
            res.status(500).json({ mensaje: "Error al obtener categorías" });
        }
    }
    static async create(req, res) {
        try {
            const { nombre, descripcion } = req.body;
            if (!nombre || !nombre.trim()) {
                res.status(400).json({ mensaje: "El nombre es obligatorio" });
                return;
            }
            const existe = await CategoriaModel_1.CategoriaModel.findOne({
                where: { nombre },
            });
            if (existe) {
                res.status(400).json({ mensaje: "La categoría ya existe" });
                return;
            }
            const nuevaCategoria = await CategoriaModel_1.CategoriaModel.create({
                nombre,
                descripcion,
            });
            res.status(201).json(nuevaCategoria);
        }
        catch (error) {
            console.error("Error al crear categoría:", error);
            res.status(500).json({ mensaje: "Error al crear categoría" });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, descripcion } = req.body;
            const categoria = await CategoriaModel_1.CategoriaModel.findByPk(Number(id));
            if (!categoria) {
                res.status(404).json({ mensaje: "Categoría no encontrada" });
                return;
            }
            await categoria.update({
                nombre,
                descripcion,
            });
            res.status(200).json(categoria);
        }
        catch (error) {
            console.error("Error al actualizar categoría:", error);
            res.status(500).json({ mensaje: "Error al actualizar categoría" });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const categoria = await CategoriaModel_1.CategoriaModel.findByPk(Number(id));
            if (!categoria) {
                res.status(404).json({ mensaje: "Categoría no encontrada" });
                return;
            }
            await categoria.destroy();
            res.status(200).json({ mensaje: "Categoría eliminada correctamente" });
        }
        catch (error) {
            console.error("Error al eliminar categoría:", error);
            res.status(500).json({
                mensaje: "No se pudo eliminar la categoría",
            });
        }
    }
}
exports.CategoriaController = CategoriaController;
