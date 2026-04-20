import { Request, Response } from "express";
import { RegisterUser } from "../../application_use_cases/RegisterUser";
import { UsuarioRepository } from "../../infrastructure/repositories/UsuarioRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const usuarioRepository = new UsuarioRepository();
const registerUser = new RegisterUser(usuarioRepository);

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, usuario, email, password } = req.body;

      const usuarioExistente = await usuarioRepository.findByUsuario(usuario);

      if (usuarioExistente) {
        res.status(400).json({
          mensaje: "El usuario ya existe"
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const nuevoUsuario = await registerUser.execute({
        nombre,
        usuario,
        email,
        password: hashedPassword
      });

      res.status(201).json({
        mensaje: "Usuario registrado correctamente",
        usuario: {
          id: nuevoUsuario.id,
          nombre: nuevoUsuario.nombre,
          usuario: nuevoUsuario.usuario,
          email: (nuevoUsuario as any).email
        }
      });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({
        mensaje: "Error al registrar usuario"
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { usuario, password } = req.body;

      const usuarioEncontrado = await usuarioRepository.findByUsuario(usuario);

      if (!usuarioEncontrado) {
        res.status(404).json({
          mensaje: "Usuario no encontrado"
        });
        return;
      }

      const passwordValido = await bcrypt.compare(password, usuarioEncontrado.password);

      if (!passwordValido) {
        res.status(401).json({
          mensaje: "Contraseña incorrecta"
        });
        return;
      }

      const token = jwt.sign(
        {
          id: usuarioEncontrado.id,
          usuario: usuarioEncontrado.usuario
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        mensaje: "Login exitoso",
        token,
        usuario: {
          id: usuarioEncontrado.id,
          nombre: usuarioEncontrado.nombre,
          usuario: usuarioEncontrado.usuario,
          email: (usuarioEncontrado as any).email
        }
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).json({
        mensaje: "Error al iniciar sesión"
      });
    }
  }

  static async profile(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;

      const usuarioEncontrado = await usuarioRepository.findById(user.id);

      if (!usuarioEncontrado) {
        res.status(404).json({
          mensaje: "Usuario no encontrado"
        });
        return;
      }

      res.status(200).json({
        mensaje: "Token válido",
        usuario: {
          id: usuarioEncontrado.id,
          nombre: usuarioEncontrado.nombre,
          usuario: usuarioEncontrado.usuario,
          email: (usuarioEncontrado as any).email
        }
      });
    } catch (error) {
      console.error("Error al consultar token:", error);
      res.status(500).json({
        mensaje: "Error al consultar token"
      });
    }
  }
}