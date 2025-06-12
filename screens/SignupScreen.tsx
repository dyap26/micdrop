import React, { useState } from 'react';
import { View, TextInput, Button, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../utils/supabase';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

export default function SignupScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setErrorMsg(error.message);
      setSuccessMsg('');
    } else {
      setSuccessMsg('Check your email to confirm signup.');
      setErrorMsg('');
      // Optionally redirect after a delay:
      // setTimeout(() => navigation.navigate('Login'), 2000);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-6">Sign Up</Text>

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

      <Button title="Sign Up" onPress={handleSignup} />

      {errorMsg ? <Text className="text-red-500 mt-2 text-center">{errorMsg}</Text> : null}
      {successMsg ? <Text className="text-green-600 mt-2 text-center">{successMsg}</Text> : null}

      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text className="text-blue-500 mt-4 text-center">Already have an account? Log in</Text>
      </Pressable>
    </View>
  );
}