"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../database/sequelize");
class ProductoModel extends sequelize_1.Model {
}
exports.ProductoModel = ProductoModel;
ProductoModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    precio: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    imagen: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    categoria_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "productos",
    timestamps: false,
});
