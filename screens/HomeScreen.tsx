import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center bg-white px-4">
      <Text className="text-3xl font-semibold mb-6">Welcome to Music Rater</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}