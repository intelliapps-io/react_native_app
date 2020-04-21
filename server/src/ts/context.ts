import { Request, Response } from "express";
import { UserRole } from "../entities/User";
import { AccountType } from "../entities/Account";

export interface Req extends Request {
  accountId?: string
  accountType?: AccountType
}

export interface MyContext {
  req: Req
  res: Response
}