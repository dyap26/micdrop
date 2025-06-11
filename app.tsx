// App.tsx
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';

function RootNavigator() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return null; // Or a loading screen
  }

  return <AppNavigator isLoggedIn={isLoggedIn} />;
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}