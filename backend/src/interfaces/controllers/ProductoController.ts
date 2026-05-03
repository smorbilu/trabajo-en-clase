import { Request, Response } from "express";
import { ProductoModel } from "../../infrastructure/models/ProductoModel";
import { CategoriaModel } from "../../infrastructure/models/CategoriaModel";

export class ProductoController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const productos = await ProductoModel.findAll({
        include: [
          {
            model: CategoriaModel,
            as: "categoria",
          },
        ],
        order: [["id", "ASC"]],
      });

      res.status(200).json(productos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ mensaje: "Error al obtener productos" });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, descripcion, precio, stock, imagen, categoria_id } = req.body;

      if (!nombre || !nombre.trim()) {
        res.status(400).json({ mensaje: "El nombre es obligatorio" });
        return;
      }

      if (precio === undefined || precio === null || Number(precio) < 0) {
        res.status(400).json({ mensaje: "El precio es obligatorio y debe ser válido" });
        return;
      }

      if (stock === undefined || stock === null || Number(stock) < 0) {
        res.status(400).json({ mensaje: "El stock es obligatorio y debe ser válido" });
        return;
      }

      if (!categoria_id) {
        res.status(400).json({ mensaje: "La categoría es obligatoria" });
        return;
      }

      const categoria = await CategoriaModel.findByPk(Number(categoria_id));

      if (!categoria) {
        res.status(400).json({ mensaje: "La categoría seleccionada no existe" });
        return;
      }

      const nuevoProducto = await ProductoModel.create({
        nombre: String(nombre).trim(),
        descripcion: descripcion || null,
        precio: Number(precio),
        stock: Number(stock),
        imagen: imagen || null,
        categoria_id: Number(categoria_id),
      } as any);

      res.status(201).json(nuevoProducto);
    } catch (error) {
      console.error("Error al crear producto:", error);
      res.status(500).json({ mensaje: "Error al crear producto" });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, stock, imagen, categoria_id } = req.body;

      const producto = await ProductoModel.findByPk(Number(id));

      if (!producto) {
        res.status(404).json({ mensaje: "Producto no encontrado" });
        return;
      }

      if (!nombre || !nombre.trim()) {
        res.status(400).json({ mensaje: "El nombre es obligatorio" });
        return;
      }

      if (precio === undefined || precio === null || Number(precio) < 0) {
        res.status(400).json({ mensaje: "El precio es obligatorio y debe ser válido" });
        return;
      }

      if (stock === undefined || stock === null || Number(stock) < 0) {
        res.status(400).json({ mensaje: "El stock es obligatorio y debe ser válido" });
        return;
      }

      if (!categoria_id) {
        res.status(400).json({ mensaje: "La categoría es obligatoria" });
        return;
      }

      const categoria = await CategoriaModel.findByPk(Number(categoria_id));

      if (!categoria) {
        res.status(400).json({ mensaje: "La categoría seleccionada no existe" });
        return;
      }

      await producto.update({
        nombre: String(nombre).trim(),
        descripcion: descripcion || null,
        precio: Number(precio),
        stock: Number(stock),
        imagen: imagen || null,
        categoria_id: Number(categoria_id),
      });

      res.status(200).json(producto);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      res.status(500).json({ mensaje: "Error al actualizar producto" });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const producto = await ProductoModel.findByPk(Number(id));

      if (!producto) {
        res.status(404).json({ mensaje: "Producto no encontrado" });
        return;
      }

      await producto.destroy();

      res.status(200).json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      res.status(500).json({ mensaje: "Error al eliminar producto" });
    }
  }
}