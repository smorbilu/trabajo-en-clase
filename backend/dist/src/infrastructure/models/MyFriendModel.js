"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyFriendModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../database/sequelize");
class MyFriendModel extends sequelize_1.Model {
}
exports.MyFriendModel = MyFriendModel;
MyFriendModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "my_friends",
    timestamps: false,
});
