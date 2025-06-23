from scrapers.spotify import get_album_details
from supabase_client import upload_album_data

if __name__ == "__main__":
    album_id = ""  # Replace with your album ID
    data = get_album_details(album_id)
    upload_album_data(data)
    print("Uploaded to Supabase")