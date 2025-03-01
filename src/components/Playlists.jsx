import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react'; 
import { useAppContext } from '../context/AuthContext';
import Axios from './utils/Axios';

export default function Playlists() {
  const { state, dispatch } = useAppContext();
  const [activeIndex, setActiveIndex] = useState(-1); 
  const [playlistInput, setPlaylistInput] = useState('');
  const [inputtingPlaylist, setInputtingPlaylist] = useState(false);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  function playMusic(uri) {
    dispatch({ type: 'ADD_SONG_TO_PLAYER', payload: uri });
    dispatch({ type: 'AUTOPLAY' });
  }

  function playPlaylist(playlist) {
    const songs = playlist.map((e) => e.uri);
    dispatch({ type: 'ADD_PLAYLIST_TO_PLAYER', payload: songs });
    dispatch({ type: 'AUTOPLAY' });
  }

  async function removePlaylistSong(playlistId, id) {
    try {
      const remove = await Axios.post(`/api/user/remove-playlist-song/${playlistId}/${id}`);
      dispatch({ type: 'REMOVE_SONG_FROM_PLAYLIST', payload: { playlistId, id } });
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
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmitNewPlaylist = (e) => {
    e.preventDefault();
    addPlaylist();
    setPlaylistInput('');
    setInputtingPlaylist(false);
  };

  async function removePlaylist(id) {
    try {
      const updatedUser = await Axios.post(`/api/user/remove-playlist/${state.user.id}/${id}`);
      dispatch({ type: 'REMOVE_PLAYLIST', payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh', 
        paddingTop: '4vh',
        fontFamily: '"Montserrat", sans-serif',
        color: '#FFF',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2vh',
        }}
      >
        <button
          onClick={() => setInputtingPlaylist(true)}
          style={{
            background: 'rgba(0, 0, 0, 0.5)', 
            color: 'rgb(217, 8, 244)',
            textShadow: '0 0 5px rgb(217, 8, 244)',
            border: '1px solid rgb(217, 8, 244)',
            boxShadow: '0 0 5px rgb(217, 8, 244)',
            padding: '8px 15px',
            borderRadius: '5px',
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '1vh'
          }}
        >
          Create Playlist
        </button>
        {inputtingPlaylist && (
          <form
            onSubmit={handleSubmitNewPlaylist}
            style={{
              marginTop: '10px',
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
                width: 'clamp(200px, 30vw, 300px)',
                boxShadow: '0 0 5px rgba(0, 212, 255, 0.2)',
              }}
            />
            <div
              style={{
                display: 'flex',
                gap: '10px',
              }}
            >
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
                <Icon name="remove circle" style={{ marginRight: '5px' }} />
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
                <Icon name="save" style={{ marginRight: '5px' }} />
                Save
              </button>
            </div>
          </form>
        )}
      </div>

      <div
        style={{
          background: 'rgba(0, 0, 0, 0.8)', 
          width: 'clamp(300px, 70vw, 800px)', 
          margin: '0 auto',
          borderRadius: '20px',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)', 
          border: '1px solid rgba(144, 6, 161, 0.3)', 
          padding: '20px',
          marginBottom: 20
        }}
      >
        {state && state.playlists && state.playlists.length > 0 ? (
          state.playlists.map((e, i) => (
            <div key={e._id}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 15px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '8px',
                  margin: '5px 0',
                  cursor: 'pointer',
                  border: '1px solid rgba(144, 6, 161, 0.3)',
                  boxShadow:
                    activeIndex === i ? '0 0 10px rgba(0, 212, 255, 0.5)' : 'none', 
                }}
                onClick={() => handleClick(i)}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    name="dropdown"
                    style={{
                      color: 'rgb(0, 212, 255)', 
                      textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                      marginRight: '10px',
                    }}
                  />
                  <span
                    style={{
                      fontWeight: '600',
                      fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                      letterSpacing: '1px',
                      color: '#FFF',
                      textShadow: '0 0 5px rgba(144, 6, 161, 0.7)', 
                    }}
                  >
                    {e.name}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                  }}
                >
                  <Icon
                    name="play circle outline"
                    size="large"
                    onClick={(evt) => {
                      evt.stopPropagation(); 
                      playPlaylist(e.songs);
                    }}
                    style={{
                      color: 'rgb(0, 212, 255)', 
                      textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                      cursor: 'pointer',
                    }}
                  />
                  <Icon
                    name="remove circle"
                    size="large"
                    onClick={(evt) => {
                      evt.stopPropagation(); 
                      removePlaylist(e._id);
                    }}
                    style={{
                      color: 'rgb(255, 102, 0)',
                      textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              </div>
              {activeIndex === i && (
                <div
                  style={{
                    padding: '10px 15px',
                    background: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '0 0 8px 8px',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                  }}
                >
                  {e.songs && e.songs.length > 0 ? (
                    e.songs.map((s) => (
                      <div
                        key={s._id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Icon
                            name="play circle outline"
                            size="large"
                            onClick={() => playMusic(s.uri)}
                            style={{
                              color: 'rgb(255, 102, 0)', 
                              textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
                              cursor: 'pointer',
                              marginRight: '10px',
                            }}
                          />
                          <span
                            style={{
                              background: 'rgba(0, 0, 0, 0.5)',
                              color: '#FFF',
                              fontFamily: '"Montserrat", sans-serif',
                              fontWeight: '600',
                              fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                              letterSpacing: '1px',
                              textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                              padding: '5px 10px',
                              borderRadius: '5px',
                            }}
                          >
                            {s.title}
                          </span>
                        </div>
                        <Icon
                          name="delete"
                          size="large"
                          onClick={() => removePlaylistSong(e._id, s._id)}
                          style={{
                            color: 'rgb(255, 102, 0)', 
                            textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
                            cursor: 'pointer',
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <p
                      style={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                        textAlign: 'center',
                        padding: '10px 0',
                      }}
                    >
                      This playlist is empty—add some songs!
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p
            style={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: '"Montserrat", sans-serif',
              fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
            }}
          >
            No playlists available
          </p>
        )}
      </div>
    </div>
  );
}