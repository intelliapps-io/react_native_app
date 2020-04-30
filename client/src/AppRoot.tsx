// UI Packages
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

// Navigation
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation, NavigationState, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

// GraphQL
import { useMeQuery } from './lib/codegen';

// Components
import { Navbar } from './components/navbar/Navbar';
import { HomePage } from './pages/home/HomePage';
import { LoginForm } from './components/auth/LoginForm';
import { SignUpForm } from './components/auth/SignUpForm';
import { WelcomeLanding } from './components/auth/Welcome';
import { AppContext } from './lib/AppContext';
import { GroupPage, GroupSubpage } from './pages/group/GroupPage';
import { AccountPage } from './pages/account/AccountPage';
import { MeetingPage } from './pages/meeting/MeetingPage';

export type RouteParams = {
  Welcome: undefined,
  Login: undefined,
  SignUp: undefined,
  Home: undefined,
  Meeting: {
    activeId?: string
  },
  Account: undefined,
  Group: {
    subpage: GroupSubpage,
    activeId?: string
  },
}

export interface RouteChildProps<params> {
  navigation: StackNavigationProp<RouteParams>,
  route: {
    key: string,
    name: string,
    params: params
  }
}

const Stack = createStackNavigator<RouteParams>();

export const AppRoot: React.FC = () => {
  const insets = useSafeArea(),
    meQuery = useMeQuery({ onError: (err) => { console.log(err.message) } }),
    me = meQuery.data && meQuery.data.me ? meQuery.data.me : undefined
  
  return (
    <AppContext.Provider value={{ me, meQuery }}>
      <View style={{ flex: 1, marginTop: insets.top }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={me ? "Home" : "Welcome"}
            screenOptions={{
              animationEnabled: true,
              header: props => <>{props.scene.route.name !== "Welcome" && <Navbar {...props} />}</>
            }}>

            {/* Unauthenticated Routes */}
            <Stack.Screen name="Welcome" component={WelcomeLanding} />
            <Stack.Screen name="Login" component={LoginForm} />
            <Stack.Screen name="SignUp" component={SignUpForm} />

            {/* Authenticated Routes */}
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Account" component={AccountPage} />
            <Stack.Screen name="Meeting" initialParams={{ activeId: undefined }} component={MeetingPage} />
            <Stack.Screen name="Group" initialParams={{ subpage: GroupSubpage['default'] }} component={GroupPage} />

          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AppContext.Provider>

  );
}