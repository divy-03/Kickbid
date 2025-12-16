import { parse } from "date-fns";
import { Request } from "express";

export const getUserFromRequestBody = (req: Request) => {
  const userId: string = req?.user?.userId || "";
  const userRole: string = req?.user?.role || "";

  return { userId, userRole }
}

export const parseDate = (input: string) => {
  const parsedDate = parse(input, "dd/MM/yyyy", new Date());
  return new Date(
    Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate())
  )
}
