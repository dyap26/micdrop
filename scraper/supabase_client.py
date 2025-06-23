import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase = create_client(url, key)

def get_or_create_artist(name):
    result = supabase.table("artists").select("*").eq("name", name).execute()
    if result.data:
        return result.data[0]
    return supabase.table("artists").insert({"name": name}).execute().data[0]

def upload_album_data(album_data):
    album = supabase.table("albums").insert({
        "title": album_data["title"],
        "release_date": album_data["release_date"],
        "cover_url": album_data["cover_url"]
    }).execute().data[0]

    # Handle album -> artists
    for artist_name in album_data["artists"]:
        artist = get_or_create_artist(artist_name)
        supabase.table("album_artists").insert({
            "album_id": album["id"],
            "artist_id": artist["id"]
        }).execute()

    # Handle tracks and song -> artists
    for track in album_data["tracks"]:
        song = supabase.table("songs").insert({
            "title": track["title"],
            "album_id": album["id"],
            "duration_seconds": track["duration_seconds"]
        }).execute().data[0]

        for artist_name in track["artists"]:
            artist = get_or_create_artist(artist_name)
            supabase.table("song_artists").insert({
                "song_id": song["id"],
                "artist_id": artist["id"]
            }).execute()
