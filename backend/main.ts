import { app } from "./src/app";
import { connectDB } from "./src/infrastructure/database/sequelize";
import "./src/infrastructure/models/UsuarioModel";

const PORT = process.env.PORT || 3000;

async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

start();