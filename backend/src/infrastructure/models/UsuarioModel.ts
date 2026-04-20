import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class UsuarioModel extends Model {
  public id!: number;
  public nombre!: string;
  public usuario!: string;
  public email!: string;
  public password!: string;
}

UsuarioModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "usuarios",
    timestamps: false
  }
);