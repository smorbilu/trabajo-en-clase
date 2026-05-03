"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const UsuarioModel_1 = require("../models/UsuarioModel");
class UsuarioRepository {
    async create(user) {
        return await UsuarioModel_1.UsuarioModel.create(user);
    }
    async findByUsuario(usuario) {
        return await UsuarioModel_1.UsuarioModel.findOne({
            where: { usuario }
        });
    }
    async findById(id) {
        return await UsuarioModel_1.UsuarioModel.findByPk(id);
    }
}
exports.UsuarioRepository = UsuarioRepository;
