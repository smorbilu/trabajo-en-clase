"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
class RegisterUser {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async execute(user) {
        return await this.usuarioRepository.create(user);
    }
}
exports.RegisterUser = RegisterUser;
