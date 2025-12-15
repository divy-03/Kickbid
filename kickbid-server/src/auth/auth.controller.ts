import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const { status, data, message } = await AuthService.registerUser(name, email, password);

    return res.status(status).json({
      message: message,
      data: data,
    });
  }
}
