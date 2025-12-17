import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

// Pick only email and password from RegisterSchema
export const LoginSchema = RegisterSchema.pick({
  email: true,
  password: true
});

export type LoginInput = z.infer<typeof LoginSchema>;

export interface LoginResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    refreshToken: string;
    accessToken: string;
  }
}

export interface RegisterResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    refreshToken: string;
    accessToken: string;
  }
}
