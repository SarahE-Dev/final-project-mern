import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPlaylists = ({ accessToken, handlePlayPlaylist }) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPlaylists(response.data.items);
        console.log(response.data.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    if (accessToken) {
      fetchPlaylists();
    }
  }, [accessToken]);

  return (
    <div>
      <h2>Playlists</h2>
      <ul>
        {playlists.map(playlist => (
          <li onClick={()=>handlePlayPlaylist(playlist.id)} key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPlaylists;