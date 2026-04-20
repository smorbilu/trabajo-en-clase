import { Request, Response } from "express";
import { MovimientoInventarioModel } from "../../infrastructure/models/MovimientoInventarioModel";
import { ProductoModel } from "../../infrastructure/models/ProductoModel";
import { sequelize } from "../../infrastructure/database/sequelize";

export class MovimientoInventarioController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const movimientos = await MovimientoInventarioModel.findAll({
        order: [["id", "DESC"]],
      });

      res.status(200).json(movimientos);
    } catch (error) {
      console.error("Error al obtener movimientos:", error);
      res.status(500).json({ mensaje: "Error al obtener movimientos" });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
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

      if (Number(cantidad) <= 0) {
        res.status(400).json({ mensaje: "La cantidad debe ser mayor que 0" });
        return;
      }

      if (!fecha) {
        res.status(400).json({ mensaje: "La fecha es obligatoria" });
        return;
      }

      const producto = await ProductoModel.findByPk(Number(producto_id));

      if (!producto) {
        res.status(400).json({ mensaje: "El producto seleccionado no existe" });
        return;
      }

      const movimiento = await MovimientoInventarioModel.create(
        {
          producto_id: Number(producto_id),
          tipo_movimiento: String(tipo_movimiento).toLowerCase(),
          cantidad: Number(cantidad),
          fecha: String(fecha),
          observacion: observacion || null,
        } as any
      );

      res.status(201).json(movimiento);
    } catch (error) {
      console.error("Error al crear movimiento:", error);
      res.status(500).json({ mensaje: "Error al crear movimiento" });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    const transaction = await sequelize.transaction();

    try {
      const { id } = req.params;
      const { producto_id, tipo_movimiento, cantidad, fecha, observacion } = req.body;

      if (!producto_id) {
        await transaction.rollback();
        res.status(400).json({ mensaje: "El producto es obligatorio" });
        return;
      }

      if (!tipo_movimiento || !String(tipo_movimiento).trim()) {
        await transaction.rollback();
        res.status(400).json({ mensaje: "El tipo de movimiento es obligatorio" });
        return;
      }

      if (Number(cantidad) <= 0) {
        await transaction.rollback();
        res.status(400).json({ mensaje: "La cantidad debe ser mayor que 0" });
        return;
      }

      if (!fecha) {
        await transaction.rollback();
        res.status(400).json({ mensaje: "La fecha es obligatoria" });
        return;
      }

      const movimientoActual = await MovimientoInventarioModel.findByPk(Number(id), {
        transaction,
      });

      if (!movimientoActual) {
        await transaction.rollback();
        res.status(404).json({ mensaje: "Movimiento no encontrado" });
        return;
      }

      const productoAnterior = await ProductoModel.findByPk(Number(movimientoActual.get("producto_id")), {
        transaction,
      });

      const productoNuevo = await ProductoModel.findByPk(Number(producto_id), {
        transaction,
      });

      if (!productoAnterior || !productoNuevo) {
        await transaction.rollback();
        res.status(400).json({ mensaje: "Producto no encontrado" });
        return;
      }

      const tipoAnterior = String(movimientoActual.get("tipo_movimiento")).toLowerCase();
      const cantidadAnterior = Number(movimientoActual.get("cantidad"));

      let stockProductoAnterior = Number(productoAnterior.get("stock"));
      let stockProductoNuevo =
        Number(productoNuevo.get("id")) === Number(productoAnterior.get("id"))
          ? stockProductoAnterior
          : Number(productoNuevo.get("stock"));

      // Revertir el movimiento anterior
      if (tipoAnterior === "entrada") {
        stockProductoAnterior -= cantidadAnterior;
      } else if (tipoAnterior === "salida") {
        stockProductoAnterior += cantidadAnterior;
      }

      if (stockProductoAnterior < 0) {
        await transaction.rollback();
        res.status(400).json({ mensaje: "No se puede revertir el movimiento anterior" });
        return;
      }

      // Si es el mismo producto, seguimos sobre el mismo stock ya revertido
      if (Number(productoNuevo.get("id")) === Number(productoAnterior.get("id"))) {
        stockProductoNuevo = stockProductoAnterior;
      }

      const tipoNuevo = String(tipo_movimiento).toLowerCase();
      const cantidadNueva = Number(cantidad);

      // Aplicar el nuevo movimiento
      if (tipoNuevo === "entrada") {
        stockProductoNuevo += cantidadNueva;
      } else if (tipoNuevo === "salida") {
        if (stockProductoNuevo < cantidadNueva) {
          await transaction.rollback();
          res.status(400).json({ mensaje: "Stock insuficiente para registrar la salida" });
          return;
        }
        stockProductoNuevo -= cantidadNueva;
      } else {
        await transaction.rollback();
        res.status(400).json({ mensaje: "Tipo de movimiento inválido" });
        return;
      }

      await productoAnterior.update(
        { stock: stockProductoAnterior },
        { transaction }
      );

      await productoNuevo.update(
        { stock: stockProductoNuevo },
        { transaction }
      );

      await movimientoActual.update(
        {
          producto_id: Number(producto_id),
          tipo_movimiento: tipoNuevo,
          cantidad: cantidadNueva,
          fecha: String(fecha),
          observacion: observacion || null,
        },
        { transaction }
      );

      await transaction.commit();
      res.status(200).json(movimientoActual);
    } catch (error) {
      await transaction.rollback();
      console.error("Error al actualizar movimiento:", error);
      res.status(500).json({ mensaje: "Error al actualizar movimiento" });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const movimiento = await MovimientoInventarioModel.findByPk(Number(id));

      if (!movimiento) {
        res.status(404).json({ mensaje: "Movimiento no encontrado" });
        return;
      }

      await movimiento.destroy();

      res.status(200).json({ mensaje: "Movimiento eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar movimiento:", error);
      res.status(500).json({ mensaje: "Error al eliminar movimiento" });
    }
  }
}