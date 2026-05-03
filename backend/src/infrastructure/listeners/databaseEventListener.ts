import { Client, Notification } from "pg";
import { getIO } from "../realtime/socket";

export const startDatabaseEventListener = async (): Promise<void> => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await client.connect();
  await client.query("LISTEN my_friends_changes");

  console.log("Escuchando cambios en my_friends via PostgreSQL LISTEN/NOTIFY...");

  client.on("notification", (msg: Notification) => {
    try {
      const payload = JSON.parse(msg.payload || "{}");
      console.log("Evento recibido desde PostgreSQL:", payload);
      getIO().emit("database-change", payload);
    } catch (error) {
      console.error("Error procesando notificación de PostgreSQL:", error);
    }
  });

  client.on("error", (err: Error) => {
    console.error("Error en cliente PostgreSQL LISTEN:", err);
  });
};
