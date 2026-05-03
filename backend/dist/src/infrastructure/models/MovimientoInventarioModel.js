"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovimientoInventarioModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../database/sequelize");
class MovimientoInventarioModel extends sequelize_1.Model {
}
exports.MovimientoInventarioModel = MovimientoInventarioModel;
MovimientoInventarioModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    producto_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    tipo_movimiento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    observacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "movimientos_inventario",
    timestamps: false,
    hasTrigger: true
});
