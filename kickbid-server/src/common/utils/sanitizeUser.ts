import { UserType } from "@src/users/user.schema";

const sanitizeUser = (user: UserType) => {
  return {
    userId: user.userId,
    name: user.name,
    email: user.email
  }
}

export default sanitizeUser;
