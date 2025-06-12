import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type AlbumDetailParams = {
  AlbumDetail: { albumId: string };
};

export default function AlbumDetailScreen() {
  const route = useRoute<RouteProp<AlbumDetailParams, 'AlbumDetail'>>();
  const { albumId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Album Details</Text>
      <Text>ID: {albumId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
});