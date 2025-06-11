import React, { useState } from 'react';
import { View, TextInput, Button, Text, Pressable } from 'react-native';
import { supabase } from '../utils/supabase.js';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) console.error(error.message);
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-6">Sign Up</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border-b border-gray-300 mb-4 py-2 px-2"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border-b border-gray-300 mb-6 py-2 px-2"
      />

      <Button title="Sign Up" onPress={handleSignup} />

      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text className="text-blue-500 mt-4 text-center">Already have an account? Log in</Text>
      </Pressable>
    </View>
  );
}
