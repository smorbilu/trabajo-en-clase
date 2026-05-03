"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const RegisterUser_1 = require("../../application_use_cases/RegisterUser");
const UsuarioRepository_1 = require("../../infrastructure/repositories/UsuarioRepository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuarioRepository = new UsuarioRepository_1.UsuarioRepository();
const registerUser = new RegisterUser_1.RegisterUser(usuarioRepository);
class AuthController {
    static async register(req, res) {
        try {
            const { nombre, usuario, email, password } = req.body;
            const usuarioExistente = await usuarioRepository.findByUsuario(usuario);
            if (usuarioExistente) {
                res.status(400).json({
                    mensaje: "El usuario ya existe"
                });
                return;
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
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
                    email: nuevoUsuario.email
                }
            });
        }
        catch (error) {
            console.error("Error al registrar usuario:", error);
            res.status(500).json({
                mensaje: "Error al registrar usuario"
            });
        }
    }
    static async login(req, res) {
        try {
            const { usuario, password } = req.body;
            const usuarioEncontrado = await usuarioRepository.findByUsuario(usuario);
            if (!usuarioEncontrado) {
                res.status(404).json({
                    mensaje: "Usuario no encontrado"
                });
                return;
            }
            const passwordValido = await bcryptjs_1.default.compare(password, usuarioEncontrado.password);
            if (!passwordValido) {
                res.status(401).json({
                    mensaje: "Contraseña incorrecta"
                });
                return;
            }
            const token = jsonwebtoken_1.default.sign({
                id: usuarioEncontrado.id,
                usuario: usuarioEncontrado.usuario
            }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({
                mensaje: "Login exitoso",
                token,
                usuario: {
                    id: usuarioEncontrado.id,
                    nombre: usuarioEncontrado.nombre,
                    usuario: usuarioEncontrado.usuario,
                    email: usuarioEncontrado.email
                }
            });
        }
        catch (error) {
            console.error("Error al iniciar sesión:", error);
            res.status(500).json({
                mensaje: "Error al iniciar sesión"
            });
        }
    }
    static async profile(req, res) {
        try {
            const user = req.user;
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
                    email: usuarioEncontrado.email
                }
            });
        }
        catch (error) {
            console.error("Error al consultar token:", error);
            res.status(500).json({
                mensaje: "Error al consultar token"
            });
        }
    }
}
exports.AuthController = AuthController;
