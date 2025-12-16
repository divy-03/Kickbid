import { User } from "generated/prisma/client";
import { StatusCodes } from "http-status-codes";
import { UserRepo } from "./user.repo";
import { ResApi } from "@src/common/utils/resApi";

export class UserService {
  static async profile(userId: string) {
    const userRecord: User | null = await UserRepo.getUserById(userId);

    if (!userRecord) {
      return ResApi.error("User not found", StatusCodes.NOT_FOUND, { userId });
    }

    // TODO: Sanitize user
    return ResApi.success(userRecord, `Hello ${userRecord.name}`)
  }

  static async getUsers() {
    const userRecords: User[] | null = await UserRepo.getAllUsers();

    if (!userRecords) return ResApi.error("User not found", StatusCodes.NOT_FOUND);

    // TODO: Sanitize all users using map
    return ResApi.success(userRecords);
  }
}
