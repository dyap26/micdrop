# Welcome to MicDrop

MicDrop is an app that allows users to review albums and songs with the aim of creating a community of music lovers. This is currently an ongoing project which aims to improve over time.

# The Stack
The app is built with Expo, TypeScript, Supabase, and Python. All album and artist data is from the Spotify API.

# What's Included
Included is the actual app and the scraper utilized.

# What's Not Included
Spotify API keys and Supabase environment keys are NOT included. If you want to help, please reach out.

# Installation
After downloading, run "npm install" to install the necessary node modules. You will also want to run "pip install spotipy python-dotenv supabase".
Finally, you will also need to download Expo Go on your mobile device of choice.

# Development Environment Variables
There are two places to create .env files.
1. In the root directory, create a `.env` file with the following variables:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_or_service_role_key
```
2. In the scraper directory, create a `.env` file with the following variables:
```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_or_service_role_key
```

# Contributing
Contributions are welcome. Please feel free to submit a pull request or message me!