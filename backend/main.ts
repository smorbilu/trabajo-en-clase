import http from "http";
import { app } from "./src/app";
import { connectDB, sequelize } from "./src/infrastructure/database/sequelize";
import "./src/infrastructure/models";
import { initSocket } from "./src/infrastructure/realtime/socket";
import { startDatabaseEventListener } from "./src/infrastructure/listeners/databaseEventListener";

const PORT = process.env.PORT || 3000;

async function start() {
  await connectDB();
  await sequelize.sync({ alter: true });
  console.log("Tablas sincronizadas con PostgreSQL");

  const server = http.createServer(app);

  initSocket(server);
  await startDatabaseEventListener();

  server.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

start();