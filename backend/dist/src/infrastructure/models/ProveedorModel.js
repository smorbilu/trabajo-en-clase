"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../database/sequelize");
class ProveedorModel extends sequelize_1.Model {
}
exports.ProveedorModel = ProveedorModel;
ProveedorModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "proveedores",
    timestamps: false,
});
