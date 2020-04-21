import { sign } from "jsonwebtoken";
import { Response } from "express";
import { Req, MyContext } from "../ts/context";
import { verify } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import { AccountType, Account } from "../entities/Account";

interface ITokenData {
  accountId: string | null
  authCount?: number | null
  accountType: AccountType | null
}

const REFRESH_TOKEN_SECRET = "SOME_RANDOM_TOKEN!";
const ACCESS_TOKEN_SECRET = "ANOTHER_RANDOM_TOKEN!";

export const ANY_ACCOUNT_TYPE: AccountType[] = [AccountType['admin'], AccountType['student'], AccountType['parent']]

export const createTokens = (account: Account) => {
  const refreshToken = sign(
    { accountId: account.id, authCount: account.authCount, accountType: account.accountType },
    REFRESH_TOKEN_SECRET, { expiresIn: "7d" }
  );
  const accessToken = sign(
    { accountId: account.id, accountType: account.accountType },
    ACCESS_TOKEN_SECRET, { expiresIn: "15min" }
  );

  return { refreshToken, accessToken };
};

export const verifyRefreshToken = (refreshToken: string | null): ITokenData => {
  let data: ITokenData = {
    accountId: null,
    authCount: null,
    accountType: null
  };
  try {
    if (!refreshToken) return data;
    data = verify(refreshToken, REFRESH_TOKEN_SECRET) as ITokenData;
  } catch { }
  return data;
}

export const authMiddleware = async (req: Req, res: Response, next: () => void) => {
  const refreshToken = req.cookies ? req.cookies["refresh-token"] : null;
  const accessToken = req.cookies ? req.cookies["access-token"] : null;

  if (!refreshToken && !accessToken) return next();

  try {
    const data = verify(accessToken, ACCESS_TOKEN_SECRET) as ITokenData;
    if (data.accountId) req.accountId = data.accountId;
    if (data.accountType) req.accountType = data.accountType;
    return next();
  } catch { }

  if (!refreshToken) return next(); // expired access token

  const data = verifyRefreshToken(refreshToken);

  const account = await Account.findOne({ where: { id: data.accountId } });
  if (!account || account.authCount !== data.authCount) return next(); // token has been invalidated

  const tokens = createTokens(account);

  res.cookie("refresh-token", tokens.refreshToken);
  res.cookie("access-token", tokens.accessToken);
  if (data.accountId) req.accountId = data.accountId;
  if (data.accountType) req.accountType = data.accountType;

  next();
}

export const authChecker: AuthChecker<MyContext, AccountType> = (
  { root, args, context, info },
  type,
) => {
  let isAuthorized = false;
  const accountType = context.req.accountType;

  type.forEach(accType => {
    let maybeAuth = false
    switch (accType) {
      case AccountType['admin']:
        // admins have access to all options
        maybeAuth = accountType === 'student' || accountType === 'parent' || accountType === 'admin'
        if (maybeAuth)
          isAuthorized = true
        break;
      case AccountType['parent']:
        maybeAuth = accountType === 'parent'
        if (maybeAuth)
          isAuthorized = true
        break
      case AccountType['student']:
        maybeAuth = accountType === 'student'
        if (maybeAuth)
          isAuthorized = true
    }
  });

  return isAuthorized;
};