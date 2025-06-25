import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import React from 'react';

import AlbumDetailScreen from '../screens/AlbumDetailScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/SearchScreen';

type AppNavigatorProps = {
  isLoggedIn: boolean;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator({ isLoggedIn }: AppNavigatorProps) {
  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined} initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* Auth Screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        {/* Protected screen */}
        {isLoggedIn && (
          <Stack.Screen name="AlbumDetail" component={AlbumDetailScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}