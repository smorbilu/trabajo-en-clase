import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class UserProfile extends Model {
  public id!: number;
  public user_id!: number;
  public telefono!: string;
  public bio!: string;
}

UserProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "user_profile",
    timestamps: false
  }
);