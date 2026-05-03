"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseEventModel = exports.MyFriendModel = exports.UserProfile = exports.UsuarioModel = exports.MovimientoInventarioModel = exports.ProductoModel = exports.CategoriaModel = void 0;
const CategoriaModel_1 = require("./CategoriaModel");
Object.defineProperty(exports, "CategoriaModel", { enumerable: true, get: function () { return CategoriaModel_1.CategoriaModel; } });
const ProductoModel_1 = require("./ProductoModel");
Object.defineProperty(exports, "ProductoModel", { enumerable: true, get: function () { return ProductoModel_1.ProductoModel; } });
const MovimientoInventarioModel_1 = require("./MovimientoInventarioModel");
Object.defineProperty(exports, "MovimientoInventarioModel", { enumerable: true, get: function () { return MovimientoInventarioModel_1.MovimientoInventarioModel; } });
const UsuarioModel_1 = require("./UsuarioModel");
Object.defineProperty(exports, "UsuarioModel", { enumerable: true, get: function () { return UsuarioModel_1.UsuarioModel; } });
const UserProfileModel_1 = require("./UserProfileModel");
Object.defineProperty(exports, "UserProfile", { enumerable: true, get: function () { return UserProfileModel_1.UserProfile; } });
const MyFriendModel_1 = require("./MyFriendModel");
Object.defineProperty(exports, "MyFriendModel", { enumerable: true, get: function () { return MyFriendModel_1.MyFriendModel; } });
const DatabaseEventModel_1 = require("./DatabaseEventModel");
Object.defineProperty(exports, "DatabaseEventModel", { enumerable: true, get: function () { return DatabaseEventModel_1.DatabaseEventModel; } });
CategoriaModel_1.CategoriaModel.hasMany(ProductoModel_1.ProductoModel, {
    foreignKey: "categoria_id",
    as: "productos",
});
ProductoModel_1.ProductoModel.belongsTo(CategoriaModel_1.CategoriaModel, {
    foreignKey: "categoria_id",
    as: "categoria",
});
ProductoModel_1.ProductoModel.hasMany(MovimientoInventarioModel_1.MovimientoInventarioModel, {
    foreignKey: "producto_id",
    as: "movimientos",
});
MovimientoInventarioModel_1.MovimientoInventarioModel.belongsTo(ProductoModel_1.ProductoModel, {
    foreignKey: "producto_id",
    as: "producto",
});
UsuarioModel_1.UsuarioModel.hasOne(UserProfileModel_1.UserProfile, {
    foreignKey: "user_id",
    as: "perfil",
});
UserProfileModel_1.UserProfile.belongsTo(UsuarioModel_1.UsuarioModel, {
    foreignKey: "user_id",
    as: "usuario",
});
