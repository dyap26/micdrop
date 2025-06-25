from scrapers.spotify import (
    get_playlist_tracks,
    get_artist_albums,
    get_album_details,
    get_track_artist_ids
)
from supabase_client import (
    upload_album_data,
    already_scraped_album,
    already_scraped_artist,
    mark_album_scraped,
    mark_artist_scraped
)

def crawl_from_playlist(playlist_id):
    track_items = get_playlist_tracks(playlist_id)
    artist_ids = set()

    for track in track_items:
        artist_ids.update(get_track_artist_ids(track))

    for artist_id in artist_ids:
        if already_scraped_artist(artist_id):
            print(f"⚠️ Skipping artist {artist_id}")
            continue

        try:
            albums = get_artist_albums(artist_id)
            for album in albums:
                album_id = album["id"]
                if already_scraped_album(album_id):
                    print(f"⏭️  Album already scraped: {album_id}")
                    continue

                details = get_album_details(album_id)
                upload_album_data(details, album_id)
                mark_album_scraped(album_id)

            mark_artist_scraped(artist_id)
            print(f"✅ Crawled artist {artist_id}")

        except Exception as e:
            print(f"❌ Failed for artist {artist_id}: {e}")

