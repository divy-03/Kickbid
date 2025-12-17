import { StatusCodes } from "http-status-codes";
import { INTERNAL_SERVER_ERROR } from "../config";

export class ResApi<Data = any> { // Data is a generic type parameter
  public status: number;
  public success: boolean;
  public data: Data | null;
  public message: string;

  constructor(status?: number, success?: boolean, data?: Data, message?: string) {
    this.status = status || StatusCodes.EXPECTATION_FAILED;
    this.success = success;
    this.data = data || null;
    this.message = message || "Unable to get response";
  }

  static success<Data>(
    data: Data,
    message = "Success",
    status: number = StatusCodes.OK,
  ) {
    return new ResApi(status, true, data, message);
  }

  static error<Data>(
    message = INTERNAL_SERVER_ERROR,
    status: number = StatusCodes.INTERNAL_SERVER_ERROR,
    data?: Data,
  ) {
    return new ResApi(status, false, data, message);
  }
}
