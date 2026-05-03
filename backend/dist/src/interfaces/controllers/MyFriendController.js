"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyFriendController = void 0;
const MyFriendModel_1 = require("../../infrastructure/models/MyFriendModel");
class MyFriendController {
    static async getAll(_req, res) {
        try {
            const friends = await MyFriendModel_1.MyFriendModel.findAll({
                order: [["id", "ASC"]],
            });
            res.status(200).json(friends);
        }
        catch (error) {
            console.error("Error al obtener my_friends:", error);
            res.status(500).json({
                mensaje: "Error al obtener los datos de my_friends",
            });
        }
    }
}
exports.MyFriendController = MyFriendController;
