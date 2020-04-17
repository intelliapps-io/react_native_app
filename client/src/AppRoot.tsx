// UI Packages
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

// Navigation
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation, NavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// GraphQL
import { useMeQuery } from './lib/codegen';

// Components
import { Navbar } from './components/navbar/Navbar';
import { HomePage } from './pages/home/HomePage';
import { AdminPage } from './pages/admin/AdminPage';
import { ParentPage } from './pages/parent/ParentPage';
import { StudentPage } from './pages/student/StudentPage';
import { LoginForm } from './components/auth/LoginForm';
import { SignUpForm } from './components/auth/SignUpForm';
import { WelcomeLanding } from './components/auth/Welcome';
import { AppContext } from './lib/AppContext';

const Stack = createStackNavigator();

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
            <Stack.Screen name="Admin" component={AdminPage} />
            <Stack.Screen name="Parent" component={ParentPage} />
            <Stack.Screen name="Student" component={StudentPage} />

          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AppContext.Provider>

  );
}