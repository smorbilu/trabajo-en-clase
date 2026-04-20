import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class ProductoModel extends Model {
  public id!: number;
  public nombre!: string;
  public descripcion!: string;
  public precio!: number;
  public stock!: number;
  public imagen!: string | null;
  public categoria_id!: number;
}

ProductoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    imagen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "productos",
    timestamps: false,
  }
);