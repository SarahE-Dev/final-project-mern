import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AuthContext';
import { Icon } from 'semantic-ui-react';

export default function SpotifyPlayer() {
  const { state, dispatch } = useAppContext();
  const [currentTrackId, setCurrentTrackId] = useState('');

  useEffect(() => {
    if (state.trackUris && state.trackUris.length > 0 && state.currentTrackIndex < state.trackUris.length) {
      const uri = state.trackUris[state.currentTrackIndex];
      setCurrentTrackId(uri.split(':')[2] || uri);
      // Autoplay when new track is added
      dispatch({ type: 'PLAY' });
    } else if (state.song) {
      setCurrentTrackId(state.song.split(':')[2] || state.song);
    } else {
      setCurrentTrackId('');
    }
  }, [state.trackUris, state.currentTrackIndex, state.song]);

  const handleNext = () => {
    if (state.trackUris.length > state.currentTrackIndex + 1) {
      dispatch({ type: 'NEXT_TRACK' });
    }
  };

  const handlePrevious = () => {
    if (state.currentTrackIndex > 0) {
      dispatch({ type: 'PREVIOUS_TRACK' });
    }
  };

  const handlePlayPause = () => {
    dispatch({ type: state.isPlaying ? 'PAUSE' : 'PLAY' });
  };

  if (!state.user) return null;

  return (
    <div
      style={{
        width: '100%',
        padding: '10px 20px',
        background: 'rgba(0, 0, 0, 0.8)',
        borderTop: '1px solid rgba(0, 212, 255, 0.3)',
        boxShadow: '0 -4px 20px rgba(0, 212, 255, 0.3)',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 2000,
        fontFamily: '"Montserrat", sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <button
          onClick={handlePrevious}
          disabled={state.currentTrackIndex === 0}
          style={{
            background: 'rgba(0, 212, 255, 0.2)',
            color: state.currentTrackIndex > 0 ? 'rgb(0, 212, 255)' : 'rgba(0, 212, 255, 0.5)',
            textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
            border: '1px solid rgba(0, 212, 255, 0.7)',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '1.2rem',
            cursor: state.currentTrackIndex > 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
          }}
        >
          ⏮
        </button>
        <button
          onClick={handlePlayPause}
          disabled={!currentTrackId}
          style={{
            background: 'rgba(0, 212, 255, 0.2)',
            color: currentTrackId ? 'rgb(0, 212, 255)' : 'rgba(0, 212, 255, 0.5)',
            textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
            border: '1px solid rgba(0, 212, 255, 0.7)',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '1.2rem',
            cursor: currentTrackId ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
          }}
        >
          {state.isPlaying ? '⏸' : '▶'}
        </button>
        <button
          onClick={handleNext}
          disabled={state.currentTrackIndex >= state.trackUris.length - 1}
          style={{
            background: 'rgba(0, 212, 255, 0.2)',
            color: state.currentTrackIndex < state.trackUris.length - 1 ? 'rgb(0, 212, 255)' : 'rgba(0, 212, 255, 0.5)',
            textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
            border: '1px solid rgba(0, 212, 255, 0.7)',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '1.2rem',
            cursor: state.currentTrackIndex < state.trackUris.length - 1 ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
          }}
        >
          ⏭
        </button>
      </div>
      {currentTrackId ? (
        <iframe
          src={`https://open.spotify.com/embed/track/${currentTrackId}?utm_source=generator&theme=0&autoplay=1`}
          key={`${currentTrackId}-${state.isPlaying}`}
          width="100%"
          height="90"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          style={{
            borderRadius: '8px',
            border: '1px solid rgba(144, 6, 161, 0.3)',
            boxShadow: '0 0 10px rgba(144, 6, 161, 0.2)',
            flex: 1,
          }}
          title="Spotify Player"
        />
      ) : (
        <div
          style={{
            flex: 1,
            height: '90px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '8px',
            border: '1px solid rgba(144, 6, 161, 0.3)',
            boxShadow: '0 0 10px rgba(144, 6, 161, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            color: 'rgb(0, 212, 255)',
            textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
          }}
        >
          <Icon name="music" size="large" />
          <span style={{ fontSize: '1.1rem', letterSpacing: '1px' }}>
            Select a track to play
          </span>
        </div>
      )}
    </div>
  );
}