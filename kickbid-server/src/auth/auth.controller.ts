import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { RegisterInput } from "./auth.schema";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body as RegisterInput;

      const { status, data, message } = await AuthService.registerUser(name, email, password);

      return res.status(status).json({
        message: message,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }
}
