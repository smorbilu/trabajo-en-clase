import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class DatabaseEventModel extends Model {
  public id!: number;
  public table_name!: string;
  public operation!: string;
  public column_name!: string;
  public old_value!: string | null;
  public new_value!: string | null;
  public processed!: boolean;
  public created_at!: Date;
}

DatabaseEventModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    table_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    operation: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    column_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    old_value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    new_value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    processed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "database_events",
    timestamps: false,
  }
);