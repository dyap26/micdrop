// AppNavigator.tsx or AppNavigator.jsx (TypeScript assumed)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import AlbumDetailScreen from '../screens/AlbumDetailScreen';
import LoginScreen from '../screens/LoginScreen';

type AppNavigatorProps = {
  isLoggedIn: boolean;
};

const Stack = createNativeStackNavigator();

export default function AppNavigator({ isLoggedIn }: AppNavigatorProps) {
  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AlbumDetail" component={AlbumDetailScreen} />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
