import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginInput, RegisterInput } from "./auth.schema";
import { StatusCodes } from "http-status-codes";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body as RegisterInput;
      const sessionId = req.headers['x-session-id'] as string;

      if (!sessionId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Session ID required"
        });
      }

      const { status, success, data, message } = await AuthService.registerUser(name, email, password, sessionId);

      return res.status(status).json({
        success, message, data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body as LoginInput;
    const sessionId = req.headers['x-session-id'] as string;

    if (!sessionId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Session ID required"
      })
    }

    const { status, success, data, message } = await AuthService.login(email, password, sessionId);

    return res.status(status).json({
      success, message, data
    })
  }
}
