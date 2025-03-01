import React from 'react';
import { useAppContext } from '../context/AuthContext';
import Axios from './utils/Axios';

export default function Favorites() {
  const { state, dispatch } = useAppContext();

  function playMusic(uri) {
    dispatch({ type: 'ADD_SONG_TO_PLAYER', payload: uri });
    dispatch({ type: 'AUTOPLAY' });
  }

  function playAllMusic(songs) {
    const songsToPlay = songs.map((e) => e.uri);
    dispatch({ type: 'ADD_PLAYLIST_TO_PLAYER', payload: songsToPlay });
    dispatch({ type: 'AUTOPLAY' });
  }

  async function removeSongFromFavorites(id) {
    try {
      const remove = await Axios.post(`/api/user/delete-favorite/${state.user.id}/${id}`);
      dispatch({ type: 'REMOVE_FAVORITE_SONG', payload: remove.data.song._id });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '90vh', 
        padding: '3vh 3vw',
        fontFamily: '"Montserrat", sans-serif',
        color: '#FFF',
        overflowY: 'auto',
      }}
    >
      {!state.favorites.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <span
            style={{
              fontSize: '4rem',
              color: 'rgb(255, 102, 0)', 
              textShadow: '0 0 10px rgba(255, 102, 0, 0.7)',
              marginTop: '5vh',
            }}
          >
            ♥ 
          </span>
          <h2
            style={{
              fontWeight: '600',
              fontSize: 'clamp(1.5rem, 2vw, 2rem)',
              letterSpacing: '1px',
              color: '#FFF',
              textShadow: '0 0 10px rgba(144, 6, 161, 0.7)',
              marginTop: '5vh',
              textAlign: 'center',
            }}
          >
            You don't have any favorites yet.
          </h2>
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '3vh',
            }}
          >
            <button
              onClick={() => playAllMusic(state.favorites)}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.5)', 
                color: 'rgb(0, 212, 255)',
                textShadow: '0 0 5px rgb(1, 128, 153))',
                border: '1px solid rgb(0, 212, 255)',
                boxShadow: '0 0 5px rgba(144, 6, 161, 0.3)',
                padding: '10px 20px',
                borderRadius: '25px',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: '600',
                fontSize: '1.25rem',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  marginRight: '10px',
                  fontSize: '1.5rem',
                  color: 'rgb(0, 212, 255)', 
                  textShadow: '0 0 5px rgb(1, 128, 153))',
                }}
              >
                ▶ 
              </span>
              PLAY ALL
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'clamp(10px, 2vw, 20px)',
              padding: '0 10px',
            }}
          >
            {state.favorites.map((e) => (
              <div
                key={e.songId}
                style={{
                  background: 'rgba(0, 0, 0, 0.8)', 
                  borderRadius: '10px',
                  boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)',
                  border: '1px solid rgba(211, 9, 238, 0.3)',
                  width: 'clamp(120px, 15vw, 180px)',
                  textAlign: 'center',
                  overflow: 'hidden', 
                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    overflow: 'hidden', 
                  }}
                >
                  <img
                    src={e.imageURL}
                    alt={`${e.title} cover`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '8px 8px 0 0',
                      borderBottom: '1px solid rgba(5, 206, 246, 0.88)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(0, 0, 0, 0.8)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      borderRadius: '8px 8px 0 0',
                    }}
                    onMouseEnter={(evt) => (evt.currentTarget.style.opacity = '1')}
                    onMouseLeave={(evt) => (evt.currentTarget.style.opacity = '0')}
                  >
                    <p
                      style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: '600',
                        fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                        color: '#FFF',
                        textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                        margin: '5px 0',
                      }}
                    >
                      {e.title}
                    </p>
                    <p
                      style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: 'clamp(0.7rem, 0.9vw, 0.9rem)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        margin: '5px 0',
                      }}
                    >
                      {e.artist}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    padding: '10px',
                    background: 'rgba(0, 0, 0, 0.7)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      onClick={() => playMusic(e.uri)}
                      style={{
                        color: 'rgb(144, 6, 161)', 
                        textShadow: '0 0 5px rgb(121, 6, 136)',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                      }}
                    >
                      ▶
                    </span>
                    <span
                      onClick={() => removeSongFromFavorites(e.songId)}
                      style={{
                        color: 'rgb(255, 102, 0)',
                        textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                      }}
                    >
                      ✕ 
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}