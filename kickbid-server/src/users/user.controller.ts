import { getUserFromRequestBody } from "@src/common/utils/utils";
import { Request, Response } from "express";
import { UserService } from "./user.service";


export class UserController {
  static async profile(req: Request, res: Response) {
    const { userId } = getUserFromRequestBody(req);

    const { status, success, data, message } = await UserService.profile(userId);

    return res.status(status).json({
      success, message, data
    });

  }

  static async getUsers(_req: Request, res: Response) {
    const { status, success, data, message } = await UserService.getUsers();

    return res.status(status).json({
      success, message, data
    });
  }
}
