import { User } from "generated/prisma/client";
import { StatusCodes } from "http-status-codes";
import { UserRepo } from "./user.repo";
import { ResApi } from "@src/common/utils/resApi";
import sanitizeUser from "@src/common/utils/sanitizeUser";

export class UserService {
  static async profile(userId: string) {
    const userRecord: User | null = await UserRepo.getUserById(userId);

    if (!userRecord) {
      return ResApi.error("User not found", StatusCodes.NOT_FOUND, { userId });
    }

    return ResApi.success(sanitizeUser(userRecord), `Hello ${userRecord.name}`)
  }

  static async getUsers() {
    const userRecords: User[] | null = await UserRepo.getAllUsers();

    if (!userRecords) return ResApi.error("User not found", StatusCodes.NOT_FOUND);

    const sanitizedUsers = userRecords.map((user) => sanitizeUser(user));

    return ResApi.success(sanitizedUsers);
  }
}
