
import React, { useState, useEffect } from 'react';
import SpotifyAuth from './SpotifyAuth';
import UserPlaylists from './UserPlaylists';
import SpotifyPlayer from 'react-spotify-web-playback';
import axios from 'axios';
const client_id = 'b3c2ec986d6b481793bad1372b1445fd'
const client_secret = '4f7c4b046c014f25adf7bb82fb8489e9'
const TOKEN_URL = 'https://accounts.spotify.com/api/token'

const REDIRECT_URI = 'http://localhost:5173'

const SCOPES = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'streaming', 'user-read-playback-position', 'user-top-read', 'user-read-recently-played', 'user-library-read', 'user-read-private', 'user-follow-read', 'playlist-read-private', 'user-read-email', 'ugc-image-upload'];
function App() {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState('');
  const [trackUris, setTrackUris] = useState([]);
  const [play, setPlay] = useState(false)

  const refreshTokenIfNeeded = async () => {
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id,
        client_secret
      });

      const newAccessToken = response.data.access_token;
      setAccessToken(newAccessToken);
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    console.log(code);
    const axstkn = localStorage.getItem('access_token')
    const fetchData = async () => {
      try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token?',
            new URLSearchParams({
              client_id: client_id,
              grant_type: 'authorization_code',
              code,
              redirect_uri: REDIRECT_URI,
              client_secret
              
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            }
          );
          const { access_token, refresh_token } = response.data;
          console.log(response);
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('refresh_token', refresh_token)
          
        
      } catch (error) {
        console.error('Error exchanging code for tokens:', error);
      }
    
    }
    
    if(code){
    fetchData();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshTokenIfNeeded();
    }, 1000 * 60 * 30); 
    return () => clearInterval(interval);
  }, [refreshToken]);

  const handlePlayPlaylist = async (playlistId) => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const uris = response.data.items.map(item => item.track.uri);
      setTrackUris(uris);
      setPlay(true)
    } catch (error) {
      console.error('Error fetching playlist tracks:', error);
    }
  };

  return (
    <div>
      {!accessToken && <SpotifyAuth setRefreshToken={setRefreshToken} setAccessToken={setAccessToken} />}
      {accessToken && ( 
      <div>
      <UserPlaylists accessToken={accessToken} handlePlayPlaylist={handlePlayPlaylist} />
      <div style={{width: '100vw', position: 'absolute', bottom: 0}}>
      <SpotifyPlayer
            styles={{bgColor: 'black', color: 'white'}}
            play={play}
            token={accessToken}
            uris={trackUris} 
            callback={(state) => console.log(state)}
          />
          </div>
      </div> )}
    </div>
  );
}

export default App;