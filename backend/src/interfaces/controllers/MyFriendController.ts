import { Request, Response } from "express";
import { MyFriendModel } from "../../infrastructure/models/MyFriendModel";

export class MyFriendController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const friends = await MyFriendModel.findAll({
        order: [["id", "ASC"]],
      });

      res.status(200).json(friends);
    } catch (error) {
      console.error("Error al obtener my_friends:", error);
      res.status(500).json({
        mensaje: "Error al obtener los datos de my_friends",
      });
    }
  }
}