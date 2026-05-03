"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseEventModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../database/sequelize");
class DatabaseEventModel extends sequelize_1.Model {
}
exports.DatabaseEventModel = DatabaseEventModel;
DatabaseEventModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    table_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    operation: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    column_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    old_value: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    new_value: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    processed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "database_events",
    timestamps: false,
});
