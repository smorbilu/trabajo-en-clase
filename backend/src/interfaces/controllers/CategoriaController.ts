import { Request, Response } from "express";
import { CategoriaModel } from "../../infrastructure/models/CategoriaModel";

export class CategoriaController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const categorias = await CategoriaModel.findAll({
        order: [["id", "ASC"]],
      });

      res.status(200).json(categorias);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      res.status(500).json({ mensaje: "Error al obtener categorías" });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, descripcion } = req.body;

      if (!nombre || !nombre.trim()) {
        res.status(400).json({ mensaje: "El nombre es obligatorio" });
        return;
      }

      const existe = await CategoriaModel.findOne({
        where: { nombre },
      });

      if (existe) {
        res.status(400).json({ mensaje: "La categoría ya existe" });
        return;
      }

      const nuevaCategoria = await CategoriaModel.create({
        nombre,
        descripcion,
      } as any);

      res.status(201).json(nuevaCategoria);
    } catch (error) {
      console.error("Error al crear categoría:", error);
      res.status(500).json({ mensaje: "Error al crear categoría" });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;

      const categoria = await CategoriaModel.findByPk(Number(id));

      if (!categoria) {
        res.status(404).json({ mensaje: "Categoría no encontrada" });
        return;
      }

      await categoria.update({
        nombre,
        descripcion,
      });

      res.status(200).json(categoria);
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      res.status(500).json({ mensaje: "Error al actualizar categoría" });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const categoria = await CategoriaModel.findByPk(Number(id));

      if (!categoria) {
        res.status(404).json({ mensaje: "Categoría no encontrada" });
        return;
      }

      await categoria.destroy();

      res.status(200).json({ mensaje: "Categoría eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      res.status(500).json({
        mensaje: "No se pudo eliminar la categoría",
      });
    }
  }
}