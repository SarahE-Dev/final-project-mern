import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AuthContext';
import Axios from './utils/Axios';
import Track from './Track';

export default function Album() {
  const [albumTracks, setAlbumTracks] = useState([]);
  const [albumImage, setAlbumImage] = useState('');
  const [albumDate, setAlbumDate] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [albumArtist, setAlbumArtist] = useState('');
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useAppContext();

  const getAlbumData = async () => {
    try {
      const searchParameters = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.searchToken}`,
        },
      };
      const path = window.location.pathname.split('/');
      const id = path[path.length - 1];
      const album = await Axios.get(`https://api.spotify.com/v1/albums/${id}`, searchParameters);
      const actualAlbum = album.data;
      setAlbumArtist(actualAlbum.artists[0].name);
      setAlbumImage(actualAlbum.images[1].url);
      setAlbumName(actualAlbum.name);
      setAlbumTracks(actualAlbum.tracks.items);
      const albumDate = new Date(actualAlbum.release_date);
      setAlbumDate(albumDate.toDateString());
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let searchToken = localStorage.getItem('search_token');
    let access_token = localStorage.getItem('access_token');
    if (searchToken) {
      dispatch({ type: 'SET_SEARCH_TOKEN', payload: searchToken });
    }
    if (access_token) {
      dispatch({ type: 'SET_ACCESS_TOKEN', payload: access_token });
    }
    getAlbumData();
  }, []);

  const playSong = (song) => {
    dispatch({ type: 'ADD_SONG_TO_PLAYER', payload: song });
    dispatch({ type: 'AUTOPLAY' });
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '1.5rem',
            color: 'rgb(0, 212, 255)',
            textShadow: '0 0 10px rgba(0, 212, 255, 0.7)',
            height: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        padding: '3vh 2vw',
        fontFamily: '"Montserrat", sans-serif',
        color: '#FFF',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.8)', 
          width: 'clamp(300px, 80vw, 1000px)',
          borderRadius: '20px',
          padding: '5vw',
          margin: '0 auto', 
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)', 
          border: '1px solid rgba(144, 6, 161, 0.3)', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxHeight: '84vh', 
          overflowY: 'auto',
        }}
      >
        <img
          src={albumImage}
          alt={`${albumName} cover`}
          style={{
            height: '200px',
            borderRadius: '10px',
            border: '2px solid rgba(0, 212, 255, 0.7)', 
            boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
            marginBottom: '20px',
          }}
        />
        <h2
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: '800',
            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
            letterSpacing: '1px',
            color: '#FFF',
            textShadow: '0 0 10px rgba(144, 6, 161, 0.7)', 
            margin: '0 0 10px',
            textAlign: 'center',
          }}
        >
          {albumName}
        </h2>
        <h4
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: '600',
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            letterSpacing: '1px',
            color: 'rgb(0, 212, 255)', 
            textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
            margin: '0 0 5px',
            textAlign: 'center',
          }}
        >
          {albumArtist}
        </h4>
        <p
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: 'clamp(0.8rem, 1vw, 1rem)',
            letterSpacing: '1px',
            color: 'rgba(255, 255, 255, 0.8)',
            margin: '0 0 20px',
            textAlign: 'center',
          }}
        >
          {albumDate}
        </p>
        <div
          style={{
            width: '100%',
            paddingBottom: '20px',
          }}
        >
          {albumTracks.map((track) => (
            <Track
              key={track.id}
              track={track}
              playSong={playSong}
              albumImage={albumImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}