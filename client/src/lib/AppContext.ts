import react from 'react'
import { StackNavigationOptions } from '@react-navigation/stack'
import { Account, MeQuery, MeQueryVariables } from './codegen'
import { QueryResult } from '@apollo/react-common'

export interface IAppContext {
  me: Account | undefined
  meQuery: QueryResult<MeQuery, MeQueryVariables>
}

export const AppContext = react.createContext<IAppContext>({
  me: undefined,
  meQuery: undefined as any
})