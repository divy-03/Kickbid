import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginInput, RegisterInput } from "./auth.schema";
import { StatusCodes } from "http-status-codes";
import { SessionRepo } from "./session.repo";

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

  static async refresh(req: Request, res: Response) {
    const sessionId = req.headers['x-session-id'] as string;

    if (!sessionId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Session ID required"
      })
    }

    const session = await SessionRepo.getSession(sessionId);

    if (!session) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Session Expired",
      })
    }

    const { status, success, data, message } = await AuthService.refresh(session.refreshToken, session.userId);

    return res.status(status).json({
      success, message, data
    })
  }

  static async logout(req: Request, res: Response) {
    const sessionId = req.headers['x-session-id'] as string;

    if (sessionId) {
      try {
        await SessionRepo.deleteSession(sessionId);
      } catch (err) {
        // NOTE: Session might not exist
      }
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Logged out successfully",
    })
  }
}
