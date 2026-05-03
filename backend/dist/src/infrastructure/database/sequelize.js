"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "mssql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialectOptions: {
        options: {
            encrypt: false,
            trustServerCertificate: true
        }
    },
    logging: false
});
const connectDB = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log("Conexión a SQL Server exitosa");
    }
    catch (error) {
        console.error("Error conectando a la base de datos:", error);
    }
};
exports.connectDB = connectDB;
