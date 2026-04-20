import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class ProveedorModel extends Model {
  public id!: number;
  public nombre!: string;
  public telefono!: string | null;
  public direccion!: string | null;
  public correo!: string | null;
  public activo!: boolean;
}

ProveedorModel.init(
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
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "proveedores",
    timestamps: false,
  }
);