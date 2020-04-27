// UI Packages
import React, { useEffect } from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry, Spinner } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// App Root
import { AppRoot } from './src/AppRoot'

// GraphQL Packages
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const client = new ApolloClient({
  link: new HttpLink({ 
    credentials: 'include',
    uri: "http://10.0.0.23:3001/graphql",
    headers: {
      "Access-Control-Allow-Origin": "http://10.0.0.23:3001"
    }
  }),
  cache: new InMemoryCache({
    addTypename: true,
    dataIdFromObject: (object) => object.id
  }),
})

export default () => {
  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <ApolloProvider client={client}>
          <AppRoot />
        </ApolloProvider>
      </ApplicationProvider>
    </SafeAreaProvider>
  )
}