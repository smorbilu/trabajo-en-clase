"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = require("./src/app");
const sequelize_1 = require("./src/infrastructure/database/sequelize");
require("./src/infrastructure/models");
const socket_1 = require("./src/infrastructure/realtime/socket");
const databaseEventListener_1 = require("./src/infrastructure/listeners/databaseEventListener");
const PORT = process.env.PORT || 3000;
async function start() {
    await (0, sequelize_1.connectDB)();
    const server = http_1.default.createServer(app_1.app);
    (0, socket_1.initSocket)(server);
    (0, databaseEventListener_1.startDatabaseEventListener)();
    server.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });
}
start();
