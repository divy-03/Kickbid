import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";
// import { ZodTypeAny } from "zod/v3";
import { ApiError } from "../errors/ApiError";
import { StatusCodes } from "http-status-codes";

export const validate = (schema: ZodObject) => (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return next(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          "Validation Error",
          err.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          }))
        )
      )
    }
    next(err);
  }
}
