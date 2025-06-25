import { useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { supabase } from '../../utils/supabase';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [albums, setAlbums] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    // Search albums
    const { data: albumData } = await supabase
      .from('albums')
      .select('*')
      .ilike('title', `%${query}%`)
      .limit(10);
    setAlbums(albumData || []);
    // Search artists
    const { data: artistData } = await supabase
      .from('artists')
      .select('*')
      .ilike('name', `%${query}%`)
      .limit(10);
    setArtists(artistData || []);
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-white dark:bg-black px-4 pt-8">
      <TextInput
        placeholder="Search albums or artists..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        className="border-b border-gray-300 py-2 px-2 text-lg text-black dark:text-white mb-4"
        returnKeyType="search"
      />
      <Pressable onPress={handleSearch} className="bg-orange-400 py-2 rounded-xl mb-4">
        <Text className="text-center text-white font-bold">Search</Text>
      </Pressable>
      {loading ? (
        <ActivityIndicator size="large" color="#FFA500" />
      ) : (
        <ScrollView>
          {searched && albums.length === 0 && artists.length === 0 && (
            <Text className="text-gray-500 mt-8 text-center">No results found.</Text>
          )}
          {albums.length > 0 && (
            <>
              <Text className="text-xl font-bold mt-4 mb-2 text-orange-400 dark:text-orange-300">Albums</Text>
              {albums.map((album) => (
                <View key={album.id} className="flex-row items-center mb-3 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Image
                    source={{ uri: album.cover_url || 'https://via.placeholder.com/60' }}
                    className="w-16 h-16 rounded-lg mr-3 bg-gray-200"
                  />
                  <View>
                    <Text className="font-semibold text-black dark:text-white">{album.title}</Text>
                    <Text className="text-gray-500 text-sm dark:text-gray-400">{album.artist_name}</Text>
                  </View>
                </View>
              ))}
            </>
          )}
          {artists.length > 0 && (
            <>
              <Text className="text-xl font-bold mt-6 mb-2 text-orange-400 dark:text-orange-300">Artists</Text>
              {artists.map((artist) => (
                <View key={artist.id} className="flex-row items-center mb-3 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Image
                    source={{ uri: artist.avatar_url || 'https://via.placeholder.com/60' }}
                    className="w-16 h-16 rounded-full mr-3 bg-gray-200"
                  />
                  <View>
                    <Text className="font-semibold text-black dark:text-white">{artist.name}</Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}
