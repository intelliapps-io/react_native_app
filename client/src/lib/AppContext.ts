import react from 'react'
import { StackNavigationOptions } from '@react-navigation/stack'

export interface IAppContext {
  navigation: StackNavigationOptions
}

export const AppContext = react.createContext<IAppContext>({
  navigation: null as any
})