"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDatabaseEventListener = void 0;
const DatabaseEventModel_1 = require("../models/DatabaseEventModel");
const socket_1 = require("../realtime/socket");
const startDatabaseEventListener = () => {
    console.log("Listener de SQL Server iniciado...");
    setInterval(async () => {
        try {
            const events = await DatabaseEventModel_1.DatabaseEventModel.findAll({
                where: {
                    processed: false,
                },
                order: [["id", "ASC"]],
                limit: 20,
            });
            for (const event of events) {
                const payload = {
                    id: event.id,
                    tableName: event.table_name,
                    operation: event.operation,
                    columnName: event.column_name,
                    oldValue: event.old_value,
                    newValue: event.new_value,
                    createdAt: event.created_at,
                };
                console.log("Evento detectado desde SQL Server:", payload);
                (0, socket_1.getIO)().emit("database-change", payload);
                await event.update({
                    processed: true,
                });
            }
        }
        catch (error) {
            console.error("Error escuchando eventos de SQL Server:", error);
        }
    }, 1000);
};
exports.startDatabaseEventListener = startDatabaseEventListener;
