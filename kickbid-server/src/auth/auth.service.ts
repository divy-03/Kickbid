import { BCRYPT_SALT_ROUNDS } from "@src/common/config";
import { ResApi } from "@src/common/utils/resApi";
import { UserRepo } from "@src/users/user.repo";
import bcrypt from "bcrypt";
import { User } from "generated/prisma/client";
import { StatusCodes } from "http-status-codes"
import { RegisterInput, LoginResponse, RegisterResponse } from "./auth.schema";
import { generateTokens } from "@src/common/utils/jwtHandler";
import { SessionRepo } from "./session.repo";

export class AuthService {
  static async registerUser(
    name: string,
    email: string,
    password: string,
    sessionId: string
  ): Promise<RegisterResponse | ResApi> {
    try {
      const existingUser: RegisterInput | null = await UserRepo.getUserByEmail(email);

      if (existingUser) {
        return ResApi.error("Email already registered", StatusCodes.CONFLICT);
      }

      const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createdUser: User = await UserRepo.createUser(name, email, hashedPassword);
      if (!createdUser) return ResApi.error("Unable to create user", StatusCodes.CONFLICT);

      const { accessToken, refreshToken } = generateTokens({ userId: createdUser.userId });

      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await SessionRepo.createSession(sessionId, createdUser.userId, refreshToken, expiresAt)

      return ResApi.success(
        {
          name: createdUser.name,
          email: createdUser.email,
          accessToken
        },
        "User successfully created"
      );
    } catch (error) {
      throw Error("User not created: auth.service.ts");
    }
  }

  static async login(email: string, password: string, sessionId: string): Promise<LoginResponse | ResApi> {
    try {
      const user: User | null = await UserRepo.getUserByEmail(email);

      if (!user) return ResApi.error("User not found", StatusCodes.NOT_FOUND);

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) return ResApi.error("Invalid Credentials", StatusCodes.FORBIDDEN);

      const { accessToken, refreshToken } = generateTokens({ userId: user.userId });

      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 1000); // 7 days

      try {
        await SessionRepo.deleteSession(sessionId);
      } catch (err) {
        console.log(err);
      }

      await SessionRepo.createSession(sessionId, user.userId, refreshToken, expiresAt);

      return ResApi.success({
        accessToken,
        name: user.name,
        email: user.email,
      }, `Welcome to Kickbid ${user.name}`);
    } catch (err) {
      return ResApi.error("Unable to login");
    }
  }
}
