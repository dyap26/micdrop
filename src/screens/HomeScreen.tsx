// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';



function SectionHeader({ title }: { title: string }) {
  return <Text className="text-xl font-bold mt-6 mb-2 px-4 text-orange-400 dark:text-orange-300">{title}</Text>;
}

function AlbumRow({ albums }: { albums: any[] }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
      {albums.map((album) => (
        <View key={album.id} className="w-36 mr-4">
          <Image
            source={{ uri: album.cover_url }}
            className="w-36 h-36 rounded-xl mb-2 bg-gray-200 dark:bg-gray-700"
          />
          <Text numberOfLines={1} className="font-semibold text-black dark:text-white">
            {album.title}
          </Text>
          <Text numberOfLines={1} className="text-gray-500 text-sm dark:text-gray-400">
            {album.artist_name}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, isLoggedIn } = useAuth();
  const colorScheme = useColorScheme();

  const [hotAlbums, setHotAlbums] = useState<any[]>([]);
  const [newAlbums, setNewAlbums] = useState<any[]>([]);
  const [topWeekAlbums, setTopWeekAlbums] = useState<any[]>([]);
  const [topAllAlbums, setTopAllAlbums] = useState<any[]>([]);
  const [topArtists, setTopArtists] = useState<any[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetch = async (query: string, setter: (data: any[]) => void) => {
        const { data, error } = await supabase.from(query).select('*').limit(10);
        if (!error && data) setter(data);
      };

      await Promise.all([
        fetch('hot_albums', setHotAlbums),
        fetch('new_albums', setNewAlbums),
        fetch('top_week_albums', setTopWeekAlbums),
        fetch('top_all_albums', setTopAllAlbums),
        fetch('top_artists', setTopArtists),
      ]);

      if (isLoggedIn && user) {
        const { data } = await supabase
          .from('recently_viewed')
          .select('*, album:album_id(*)')
          .eq('user_id', user.id)
          .order('viewed_at', { ascending: false })
          .limit(10);
        if (data) setRecentlyViewed(data.map((entry) => entry.album));
      }
    };

    fetchData();
  }, [isLoggedIn]);

  return (
    <ScrollView className="bg-white dark:bg-black">
      {/* Header Row */}
      <View className="flex-row justify-between items-center p-4">
        <Pressable
          onPress={() => navigation.navigate('Search')}
          className="flex-1 bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-xl mr-3"
        >
          <Text className="text-gray-600 dark:text-gray-300">Search albums...</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            isLoggedIn ? navigation.navigate('Profile') : navigation.navigate('Login')
          }
          className="w-10 h-10 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700"
        >
          {isLoggedIn ? (
            <Image
              source={{ uri: user?.user_metadata?.avatar_url || 'https://via.placeholder.com/100' }}
              className="w-full h-full"
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Ionicons name="person" size={24} color={colorScheme === 'dark' ? 'white' : 'gray'} />
            </View>
          )}
        </Pressable>
      </View>

      {/* Sections */}
      <SectionHeader title="🔥 Hot Albums" />
      <AlbumRow albums={hotAlbums} />

      <SectionHeader title="🆕 New Albums" />
      <AlbumRow albums={newAlbums} />

      <SectionHeader title="📈 Top 10 This Week" />
      <AlbumRow albums={topWeekAlbums} />

      <SectionHeader title="🏆 All-Time Top Albums" />
      <AlbumRow albums={topAllAlbums} />

      <SectionHeader title="🎤 Top Artists" />
      <AlbumRow albums={topArtists} />

      {isLoggedIn && (
        <>
          <SectionHeader title="🕓 Recently Viewed" />
          <AlbumRow albums={recentlyViewed} />
        </>
      )}
    </ScrollView>
  );
}
