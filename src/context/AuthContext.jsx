import React, { createContext, useReducer, useContext } from 'react';

export const AppContext = createContext({});

const initialState = {
  user: null,
  playlists: [],
  favorites: [],
  trackUris: [], 
  currentTrackIndex: 0, 
  isPlaying: false,
  accessToken: '',
  searchToken: '',
  refreshToken: '',
  autoplay: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  const handlers = {
    'SET_PLAYLISTS_AND_FAVORITES': () => ({ ...state, ...payload }),
    'ADD_PLAYLIST': () => ({ ...state, playlists: [...state.playlists, payload] }),
    'REMOVE_PLAYLIST': () => ({
      ...state,
      playlists: state.playlists.filter((playlist) => playlist._id !== payload),
    }),
    'ADD_FAVORITE_SONG': () => ({ ...state, favorites: [...state.favorites, payload] }),
    'REMOVE_FAVORITE_SONG': () => ({
      ...state,
      favorites: state.favorites.filter((song) => song._id !== payload),
    }),
    'ADD_SONG_TO_PLAYLIST': () => ({
      ...state,
      playlists: state.playlists.map((playlist) =>
        playlist._id === payload.playlistId
          ? { ...playlist, songs: [...playlist.songs, payload.song] }
          : playlist
      ),
    }),
    'REMOVE_SONG_FROM_PLAYLIST': () => ({
      ...state,
      playlists: state.playlists.map((playlist) =>
        playlist._id === payload.playlistId
          ? { ...playlist, songs: playlist.songs.filter((song) => song._id !== payload.id) }
          : playlist
      ),
    }),
    'LOGIN': () => ({ ...state, user: payload }),
    'LOGOUT': () => ({ ...initialState }),

    'ADD_SONG_TO_PLAYER': () => ({
      ...state,
      trackUris: [payload, ...state.trackUris],
      currentTrackIndex: 0, 
      isPlaying: true, 
      autoplay: true, 
    }),
    'ADD_PLAYLIST_TO_PLAYER': () => ({
      ...state,
      trackUris: [...payload, ...state.trackUris], 
      currentTrackIndex: 0,
      isPlaying: true,
      autoplay: true, 
    }),
    'PLAY': () => ({ ...state, isPlaying: true, autoplay: true }),
    'PAUSE': () => ({ ...state, isPlaying: false, autoplay: false }),
    'NEXT_TRACK': () => ({
      ...state,
      currentTrackIndex:
        state.currentTrackIndex + 1 < state.trackUris.length
          ? state.currentTrackIndex + 1
          : 0, 
      isPlaying: true, 
      autoplay: true, 
    }),
    'PREVIOUS_TRACK': () => ({
      ...state,
      currentTrackIndex:
        state.currentTrackIndex - 1 >= 0
          ? state.currentTrackIndex - 1
          : state.trackUris.length - 1, 
      isPlaying: true,
      autoplay: true, 
    }),
    'CLEAR_QUEUE': () => ({
      ...state,
      trackUris: [],
      currentTrackIndex: 0,
      isPlaying: false,
      autoplay: false,
    }),
    'SET_ACCESS_TOKEN': () => ({ ...state, accessToken: payload }),
    'SET_REFRESH_TOKEN': () => ({ ...state, refreshToken: payload }),
    'SET_SEARCH_TOKEN': () => ({ ...state, searchToken: payload }),
    'AUTOPLAY': () => ({ ...state, autoplay: true }), 
  };

  return handlers[type] ? handlers[type]() : state;
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);