import React, { createContext, useReducer, useContext } from 'react';


export const AppContext = createContext({});


const initialState = {
  
  user: null,
  playlists: [],
  favoriteSongs: [],
  trackUris: [],
  accessToken: '',
  searchToken: '',
  refreshToken: '',
  autoplay: false
  
};

const SET_USER = 'SET_USER';
const ADD_PLAYLIST = 'ADD_PLAYLIST';
const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST';
const ADD_FAVORITE_SONG = 'ADD_FAVORITE_SONG';
const REMOVE_FAVORITE_SONG = 'REMOVE_FAVORITE_SONG';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case ADD_PLAYLIST:
      return {
        ...state,
        playlists: [...state.playlists, action.payload],
      };
    case REMOVE_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.filter(playlist => playlist.id !== action.payload),
      };
    case ADD_FAVORITE_SONG:
      return {
        ...state,
        favoriteSongs: [...state.favoriteSongs, action.payload],
      };
    case REMOVE_FAVORITE_SONG:
      return {
        ...state,
        favoriteSongs: state.favoriteSongs.filter(song => song.id !== action.payload),
      };
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        playlists: [],
        favoriteSongs: []
      };
    case 'ADD_SONG_TO_PLAYER':
      return {
        ...state,
        trackUris: [action.payload]
      };
    case 'SET_ACCESS_TOKEN' :
      return {
        ...state,
        accessToken: action.payload
      };
    case 'SET_SEARCH_TOKEN' :
      return {
        ...state,
        searchToken: action.payload
      };
    case 'AUTOPLAY': 
      return {
        ...state,
        autoplay: true
      }
    
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export function AuthContextConsumer(){
  return useContext(AppContext)
}
