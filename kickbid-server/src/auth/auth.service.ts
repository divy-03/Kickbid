import { prisma } from "@src/common/utils/prisma";
import bcrypt, { genSalt } from "bcrypt";
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

      const createdUser = await prisma.user.create({
        data: {
          name, email, password: hashedPassword
        }
      })

      if (!createdUser) {
        return { status: StatusCodes.INTERNAL_SERVER_ERROR, data: null, message: "Internal Server Error" }
      }

      return { status: StatusCodes.OK, data: { name: createdUser.name, email: createdUser.email }, message: "User successfully created" }
    } catch (error: any) {
      console.error(error);

      // Helpful message for missing table (Prisma P2021)
      if (error && error.code === 'P2021') {
        return {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          data: null,
          message: "Database table for `User` does not exist. Run `pnpm db:migrate` or `npx prisma db push` to create tables."
        }
      }

      return { status: StatusCodes.INTERNAL_SERVER_ERROR, data: null, message: "Internal Server Error" }
    }
  }
}
