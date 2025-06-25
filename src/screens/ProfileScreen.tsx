import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.user_metadata?.username || '');
  const [bio, setBio] = useState(user?.user_metadata?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || 'https://via.placeholder.com/100');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    // Fetch user reviews with album info
    const fetchReviews = async () => {
      setLoadingReviews(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*, album:album_id(*)')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      if (!error && data) setReviews(data);
      setLoadingReviews(false);
    };
    if (user) fetchReviews();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    const updates = {
      username,
      bio,
      avatar_url: avatarUrl,
    };
    // Update user metadata in Supabase
    const { error } = await supabase.auth.updateUser({ data: updates });
    setSaving(false);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setEditing(false);
      Alert.alert('Profile updated!');
    }
  };

  // Dummy avatar change handler
  const handleChangeAvatar = () => {
    Alert.alert('Change Avatar', 'Avatar change functionality not implemented.');
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black px-6 py-8">
      <View className="items-center mb-6">
        <Pressable onPress={handleChangeAvatar}>
          <Image
            source={{ uri: avatarUrl }}
            className="w-24 h-24 rounded-full mb-2 bg-gray-200"
          />
          <Text className="text-blue-500 text-center">Change Profile Picture</Text>
        </Pressable>
      </View>
      <View className="mb-4">
        <Text className="text-gray-700 dark:text-gray-200 mb-1">Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          editable={editing}
          className="border-b border-gray-300 py-2 px-2 text-lg text-black dark:text-white"
        />
      </View>
      <View className="mb-4">
        <Text className="text-gray-700 dark:text-gray-200 mb-1">Bio</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          editable={editing}
          multiline
          className="border-b border-gray-300 py-2 px-2 text-base text-black dark:text-white min-h-[60px]"
        />
      </View>
      {editing ? (
        <Button title={saving ? 'Saving...' : 'Save Changes'} onPress={handleSave} disabled={saving} />
      ) : (
        <Button title="Edit Profile" onPress={() => setEditing(true)} />
      )}

      <Text className="text-xl font-bold mt-8 mb-2 text-orange-400 dark:text-orange-300">Your Reviews</Text>
      {loadingReviews ? (
        <ActivityIndicator size="large" color="#FFA500" />
      ) : reviews.length === 0 ? (
        <Text className="text-gray-500 mt-4">You haven't reviewed any albums yet.</Text>
      ) : (
        reviews.map((review) => (
          <View key={review.id} className="flex-row items-center mb-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Image
              source={{ uri: review.album?.cover_url || 'https://via.placeholder.com/60' }}
              className="w-16 h-16 rounded-lg mr-3 bg-gray-200"
            />
            <View className="flex-1">
              <Text className="font-semibold text-black dark:text-white">{review.album?.title}</Text>
              <Text className="text-gray-500 text-sm dark:text-gray-400">{review.album?.artist_name}</Text>
              <Text className="text-orange-500 mt-1">Rating: {review.rating}/5</Text>
              <Text className="text-gray-700 dark:text-gray-300 mt-1" numberOfLines={2}>{review.text}</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}
