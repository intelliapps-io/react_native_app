import react from 'react'
import { StackNavigationOptions } from '@react-navigation/stack'
import { User, MeQuery, MeQueryVariables } from './codegen'
import { QueryResult } from '@apollo/react-common'

export interface IAppContext {
  me: User | undefined
  meQuery: QueryResult<MeQuery, MeQueryVariables>
}

export const AppContext = react.createContext<IAppContext>({
  me: undefined,
  meQuery: undefined as any
})