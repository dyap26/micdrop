import React, { useState } from 'react';
import { View, TextInput, Button, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../utils/supabase';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error(error.message);
      setErrorMsg(error.message);
    } else {
      setErrorMsg('');
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-6">Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border-b border-gray-300 mb-4 py-2 px-2"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border-b border-gray-300 mb-6 py-2 px-2"
      />

      <Button title="Login" onPress={handleLogin} />

      {errorMsg ? <Text className="text-red-500 text-center mt-2">{errorMsg}</Text> : null}

      <Pressable onPress={() => navigation.navigate('Signup')}>
        <Text className="text-blue-500 mt-4 text-center">Don't have an account? Sign up</Text>
      </Pressable>
    </View>
  );
}