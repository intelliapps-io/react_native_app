// user
import { CreateUserResolver } from './user/CreateUser'
import { SignUpResolver } from './user/SignUp'
import { MeResolver } from './user/Me'

export const resolvers = [
  // user
  CreateUserResolver,
  SignUpResolver,
  MeResolver
]