import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv

load_dotenv()

auth_manager = SpotifyClientCredentials(
    client_id=os.getenv("SPOTIFY_CLIENT_ID"),
    client_secret=os.getenv("SPOTIFY_CLIENT_SECRET"),
)
sp = spotipy.Spotify(auth_manager=auth_manager)

def get_album_details(album_id: str):
    album = sp.album(album_id)
    tracks = sp.album_tracks(album_id)

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
