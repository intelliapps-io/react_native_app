// account
import { CreateAccountResolver } from "./account/CreateAccount"
import { LoginResolver } from './account/Login'
import { LogoutResolver } from './account/Logout'
import { MeQueryResolver } from "./account/MeQuery"
// student
import { StudentResolver } from "./student/StudentResolver"
// parent
import { ParentResolver } from "./parent/ParentResolver"
// group
import { GroupResolver } from "./group/GroupResolver"

export const resolvers = [
  // account
  MeQueryResolver,
  CreateAccountResolver,
  LoginResolver,
  LogoutResolver,
  // student
  StudentResolver,
  // parent
  ParentResolver,
  // group
  GroupResolver,
]
