import React, { useState } from 'react';
// import { NativeRouter, Route, Link } from "react-router-native";
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

// navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// components
import { Navbar } from './components/navbar/Navbar';
import { HomePage } from './pages/home/HomePage';
import { AdminPage } from './pages/admin/AdminPage';
import { ParentPage } from './pages/parent/ParentPage';
import { StudentPage } from './pages/student/StudentPage';
import { AppContext } from './lib/AppContext';

const Stack = createStackNavigator();

export const AppRoot: React.FC = () => {
  const insets = useSafeArea()

  return (
    <View style={{ flex: 1, marginTop: insets.top }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ animationEnabled: true, header: props => <Navbar {...props} /> }}>
          <Stack.Screen name="Admin" component={AdminPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Parent" component={ParentPage} />
          <Stack.Screen name="Student" component={StudentPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}