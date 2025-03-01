import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AuthContext';
import Axios from './utils/Axios';

export default function Track({ track, playSong, albumImage }) {
  const { state, dispatch } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [playlistSelection, setPlaylistSelection] = useState('Choose Playlist');
  const [playlistInput, setPlaylistInput] = useState('');
  const [inputtingPlaylist, setInputtingPlaylist] = useState(false);
  const [playlistIDtoAdd, setPlaylistIDtoAdd] = useState('');

  useEffect(() => {
    if (state && state.favorites) {
      const favoriteInclude = state.favorites.some((obj) => obj.songId === track.id);
      setIsFavorite(favoriteInclude);
    }
  }, [state]);

  const handlePlay = () => {
    dispatch({
      type: 'ADD_SONG_TO_PLAYER',
      payload: track.uri
    });
  };

  async function addToFavorites() {
    try {
      const newFavorite = await Axios.post(`/api/user/add-favorite/${state.user.id}`, {
        songId: track.id,
        title: track.name,
        uri: track.uri,
        artist: track.artists[0].name,
        imageURL: albumImage,
      });
      dispatch({ type: 'ADD_FAVORITE_SONG', payload: newFavorite.data.song });
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFavoriteSong(id) {
    try {
      const remove = await Axios.post(`/api/user/delete-favorite/${state.user.id}/${id}`);
      dispatch({ type: 'REMOVE_FAVORITE_SONG', payload: remove.data.song._id });
      setIsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function addPlaylist() {
    try {
      const newPlaylist = await Axios.post(`/api/user/add-playlist/${state.user.id}`, {
        playlistName: playlistInput,
      });
      dispatch({ type: 'ADD_PLAYLIST', payload: newPlaylist.data.playlist });
      setPlaylistInput('');
      setInputtingPlaylist(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddSongToPlaylist() {
    if (playlistIDtoAdd) {
      try {
        const addSong = await Axios.post(`/api/user/add-song-playlist/${playlistIDtoAdd}/${track.id}`, {
          songId: track.id,
          title: track.name,
          uri: track.uri,
          artist: track.artists[0].name,
          imageURL: albumImage,
        });
        dispatch({
          type: 'ADD_SONG_TO_PLAYLIST',
          payload: { playlistId: playlistIDtoAdd, song: addSong.data.song },
        });
        setPlaylistSelection('Choose Playlist');
        setPlaylistIDtoAdd('');
        setShowModal(false);
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
        setPlaylistSelection('Choose Playlist');
        setPlaylistIDtoAdd('');
      }
    }
  }

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 15px',
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
          margin: '5px 0',
          transition: '0.3s all',
          border: '1px solid rgba(144, 6, 161, 0.3)', 
          boxShadow: '0 0 5px rgba(0, 212, 255, 0.2)', 
          fontFamily: '"Montserrat", sans-serif',
        }}
      >
        <span
          onClick={handlePlay}
          style={{
            color: 'rgb(255, 102, 0)',
            textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
            marginRight: '10px',
            cursor: 'pointer',
            fontSize: '1.5rem',
          }}
        >
          ▶
        </span>
        <span
          style={{
            flex: 1,
            color: '#FFF',
            fontWeight: '600',
            fontSize: 'clamp(0.8rem, 1vw, 1rem)',
            letterSpacing: '1px',
            textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {track.name}
        </span>
        <span
          style={{
            marginRight: '15px',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 'clamp(0.8rem, 1vw, 1rem)',
          }}
        >
          {formatDuration(track.duration_ms)}
        </span>
        <span
          onClick={isFavorite ? () => removeFavoriteSong(track.id) : addToFavorites}
          style={{
            color: 'rgb(255, 102, 0)', 
            textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
            marginRight: '15px',
            cursor: 'pointer',
            fontSize: '1.2rem',
          }}
        >
         {isFavorite ? '♥' : '♡'}
        </span>
        <span
          onClick={() => setShowModal(true)}
          style={{
            color: 'rgb(0, 212, 255)', 
            textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
            cursor: 'pointer',
            fontSize: '1.2rem',
          }}
        >
          +
        </span>
      </div>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 5000,
          }}
        >
          <div
            style={{
              background: 'rgba(20, 20, 40, 0.95)',
              border: '1px solid rgba(0, 212, 255, 0.7)', 
              borderRadius: '10px',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)', 
              width: 'clamp(300px, 80vw, 600px)',
              maxHeight: '60vh',
              overflowY: 'auto',
              padding: '20px',
              fontFamily: '"Montserrat", sans-serif',
              color: '#FFF',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                borderBottom: '1px solid rgba(144, 6, 161, 0.3)',
                paddingBottom: '15px',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  fontWeight: '800',
                  fontSize: 'clamp(1.2rem, 1.5vw, 1.5rem)',
                  letterSpacing: '1px',
                  color: '#FFF',
                  textShadow: '0 0 10px rgba(144, 6, 161, 0.7)',
                }}
              >
                Select Playlist
              </span>
              <p
                style={{
                  fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginTop: '10px',
                }}
              >
                {track.name}
              </p>
              <span
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  color: 'rgb(255, 102, 0)', 
                  textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                }}
              >
                ×
              </span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setInputtingPlaylist(true)}
                style={{
                  background: 'rgba(144, 6, 161, 0.2)',
                  color: 'rgb(144, 6, 161)',
                  textShadow: '0 0 5px rgba(144, 6, 161, 0.7)',
                  border: '1px solid rgba(144, 6, 161, 0.7)',
                  boxShadow: '0 0 5px rgba(144, 6, 161, 0.3)',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Create New Playlist
              </button>
            </div>

            {inputtingPlaylist && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addPlaylist();
                }}
                style={{
                  marginTop: '20px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 212, 255, 0.3)', 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <input
                  value={playlistInput}
                  onChange={(e) => setPlaylistInput(e.target.value)}
                  placeholder="New Playlist Name"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#FFF',
                    fontFamily: '"Montserrat", sans-serif',
                    border: '1px solid rgba(0, 212, 255, 0.7)',
                    borderRadius: '5px',
                    padding: '8px',
                    width: 'clamp(200px, 50%, 300px)',
                  }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setInputtingPlaylist(false)}
                    style={{
                      background: 'rgba(255, 102, 0, 0.2)',
                      color: 'rgb(255, 102, 0)',
                      textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
                      border: '1px solid rgba(255, 102, 0, 0.7)',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      fontFamily: '"Montserrat", sans-serif',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: 'rgba(0, 212, 255, 0.2)', 
                      color: 'rgb(0, 212, 255)',
                      textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                      border: '1px solid rgba(0, 212, 255, 0.7)',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      fontFamily: '"Montserrat", sans-serif',
                      cursor: 'pointer',
                    }}
                  >
                    Save
                  </button>
                </div>
              </form>
            )}

            <div
              style={{
                padding: '20px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {state && state.playlists.length > 0 ? (
                state.playlists.map((e) => (
                  <button
                    key={e._id}
                    onClick={() => {
                      setPlaylistSelection(e.name);
                      setPlaylistIDtoAdd(e._id);
                    }}
                    style={{
                      width: 'clamp(200px, 40vw, 400px)',
                      background: 'rgba(0, 212, 255, 0.2)', 
                      color: 'rgb(0, 212, 255)',
                      textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                      border: '1px solid rgba(0, 212, 255, 0.7)',
                      boxShadow: '0 0 5px rgba(0, 212, 255, 0.3)',
                      padding: '8px 15px',
                      borderRadius: '5px',
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    {e.name}
                  </button>
                ))
              ) : (
                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontFamily: '"Montserrat", sans-serif',
                  }}
                >
                  No playlists available
                </p>
              )}
            </div>

            <div
              style={{
                padding: '20px',
                textAlign: 'center',
                borderTop: '1px solid rgba(144, 6, 161, 0.3)',
              }}
            >
              <span
                style={{
                  color: 'rgb(255, 102, 0)', 
                  textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
                  marginRight: '10px',
                }}
              >
                Playlist Selection:
              </span>
              <span
                style={{
                  color: 'rgb(0, 212, 255)', 
                  textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                }}
              >
                {playlistSelection}
              </span>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    background: 'rgba(255, 102, 0, 0.2)', 
                    color: 'rgb(255, 102, 0)',
                    textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
                    border: '1px solid rgba(255, 102, 0, 0.7)',
                    padding: '8px 15px',
                    borderRadius: '5px',
                    fontFamily: '"Montserrat", sans-serif',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSongToPlaylist}
                  style={{
                    background: 'rgba(144, 6, 161, 0.2)', 
                    color: 'rgb(144, 6, 161)',
                    textShadow: '0 0 5px rgba(144, 6, 161, 0.7)',
                    border: '1px solid rgba(144, 6, 161, 0.7)',
                    padding: '8px 15px',
                    borderRadius: '5px',
                    fontFamily: '"Montserrat", sans-serif',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}