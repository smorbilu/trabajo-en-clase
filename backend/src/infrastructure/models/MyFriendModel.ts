import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class MyFriendModel extends Model {
  public id!: number;
  public name!: string;
  public gender!: string;
}

MyFriendModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "my_friends",
    timestamps: false,
  }
);