import { Request, Response } from "express";
import { UserRole } from "../entities/User";

export interface Req extends Request {
  userId?: string
  role?: UserRole
}

export interface MyContext {
  req: Req
  res: Response
}