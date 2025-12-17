import { ResApi } from "@src/common/utils/resApi";
import { UserRepo } from "@src/users/user.repo";
import bcrypt from "bcrypt";
import { User } from "generated/prisma/client";
import { StatusCodes } from "http-status-codes"

export class AuthService {
  static async registerUser(
    name: string,
    email: string,
    password: string,
  ) {
    try {
      // const existingUser = await UserRepo.getUserByEmail(email);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createdUser: User = await UserRepo.createUser(name, email, hashedPassword);
      if (!createdUser) return ResApi.error("Unable to create user", StatusCodes.CONFLICT);

      return { status: StatusCodes.OK, data: { name: createdUser.name, email: createdUser.email }, message: "User successfully created" }
    } catch (error) {
      console.log(error);
      throw Error("User not created: auth.service.ts");
    }
  }
}
