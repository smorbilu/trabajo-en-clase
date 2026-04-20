import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class MovimientoInventarioModel extends Model {
  public id!: number;
  public producto_id!: number;
  public tipo_movimiento!: string;
  public cantidad!: number;
  public fecha!: Date;
  public observacion!: string | null;
}

MovimientoInventarioModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_movimiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    observacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "movimientos_inventario",
    timestamps: false,
    hasTrigger: true
  }
);