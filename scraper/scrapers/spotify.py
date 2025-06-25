import os
import time
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from spotipy.exceptions import SpotifyException

load_dotenv()

# Authenticate
auth_manager = SpotifyClientCredentials(
    client_id=os.getenv("SPOTIFY_CLIENT_ID"),
    client_secret=os.getenv("SPOTIFY_CLIENT_SECRET")
)
sp = spotipy.Spotify(auth_manager=auth_manager)

# === 🛡️ Rate-limited call wrapper ===
def rate_limited_call(fn, *args, **kwargs):
    while True:
        try:
            return fn(*args, **kwargs)
        except SpotifyException as e:
            if e.http_status == 429:
                wait_time = int(e.headers.get("Retry-After", 5))
                print(f"🕒 Rate limited. Waiting {wait_time} seconds...")
                time.sleep(wait_time + 1)
            else:
                raise e

# === 🧠 Spotify API wrappers with safety ===

def get_album_details(album_id: str):
    album = rate_limited_call(sp.album, album_id)
    tracks = rate_limited_call(sp.album_tracks, album_id)

    album_data = {
        "title": album["name"],
        "release_date": album["release_date"],
        "cover_url": album["images"][0]["url"],
        "artists": [a["name"] for a in album["artists"]],
        "tracks": []
    }

    for track in tracks["items"]:
        album_data["tracks"].append({
            "title": track["name"],
            "duration_seconds": int(track["duration_ms"] / 1000),
            "artists": [a["name"] for a in track["artists"]]
        })

    return album_data

def get_artist_albums(artist_id: str):
    albums = []
    results = rate_limited_call(sp.artist_albums, artist_id, album_type='album')
    albums.extend(results['items'])

    while results['next']:
        results = rate_limited_call(sp.next, results)
        albums.extend(results['items'])

    return albums

def get_playlist_tracks(playlist_id: str):
    tracks = []
    results = rate_limited_call(sp.playlist_tracks, playlist_id)
    tracks.extend(results['items'])

    while results['next']:
        results = rate_limited_call(sp.next, results)
        tracks.extend(results['items'])

    return [item['track'] for item in tracks if item.get('track')]

def get_track_artist_ids(track):
    return [artist["id"] for artist in track.get("artists", [])]