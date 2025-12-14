import { ApiError } from "@common/errors/ApiError";
import { Request, Response, NextFunction } from "express";
import { ValidationError, validationResult } from "express-validator";
import httpStatus from "http-status-codes";

function validationErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new ApiError(
        httpStatus.BAD_REQUEST,
        "Validation Error",
        formatErrors(errors.array())
      )
    );
  }
  
  next();
}

const formatErrors = (errors: ValidationError[]) => {
  return errors.map((e) => ({
    field: e.type === "field" ? e.path : e.type,
    message: e.msg,
  }));
};

export default validationErrorHandler;
