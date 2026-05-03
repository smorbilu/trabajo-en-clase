import { CategoriaModel } from "./CategoriaModel";
import { ProductoModel } from "./ProductoModel";
import { MovimientoInventarioModel } from "./MovimientoInventarioModel";
import { UsuarioModel } from "./UsuarioModel";
import { UserProfile } from "./UserProfileModel";
import { MyFriendModel } from "./MyFriendModel";
import { DatabaseEventModel } from "./DatabaseEventModel";

CategoriaModel.hasMany(ProductoModel, {
  foreignKey: "categoria_id",
  as: "productos",
});

ProductoModel.belongsTo(CategoriaModel, {
  foreignKey: "categoria_id",
  as: "categoria",
});

ProductoModel.hasMany(MovimientoInventarioModel, {
  foreignKey: "producto_id",
  as: "movimientos",
});

MovimientoInventarioModel.belongsTo(ProductoModel, {
  foreignKey: "producto_id",
  as: "producto",
});

UsuarioModel.hasOne(UserProfile, {
  foreignKey: "user_id",
  as: "perfil",
});

UserProfile.belongsTo(UsuarioModel, {
  foreignKey: "user_id",
  as: "usuario",
});

export {
  CategoriaModel,
  ProductoModel,
  MovimientoInventarioModel,
  UsuarioModel,
  UserProfile,
  MyFriendModel,
  DatabaseEventModel,
};