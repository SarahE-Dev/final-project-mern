import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import App from './App'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'

import Navbar from './components/Navbar'
import PrivateRoute from './PrivateRoute'
import { ToastContainer } from 'react-toastify'
import SpotifyWebPlayer from 'react-spotify-web-playback'

import { Sidebar, SidebarPusher, Menu, MenuItem, SidebarPushable, Segment, Grid, GridColumn, Container, Button, Icon } from 'semantic-ui-react'

import { SideBarContext } from './context/SidebarContext';
import { PlayerContext } from './context/PlayerContext'
import { AuthContextConsumer } from './context/AuthContext'
import SidebarComponent from './components/SidebarComponent'
import { HomeContext } from './context/HomeContext'
import checkAuthCookie from './components/hooks/checkCookies'
import Playlists from './components/Playlists'
import Favorites from './components/Favorites'
import Album from './components/Album'
import Track from './components/Track'


const client_id='b3c2ec986d6b481793bad1372b1445fd'

const client_secret = '4f7c4b046c014f25adf7bb82fb8489e9'
const TOKEN_URL = 'https://accounts.spotify.com/api/token'

const redirect_uri = 'http://localhost:5173'

const SCOPES = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'streaming', 'user-read-playback-position', 'user-top-read', 'user-read-recently-played', 'user-library-read', 'user-read-private', 'user-follow-read', 'playlist-read-private', 'user-read-email', 'ugc-image-upload'];

const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${SCOPES.join('%20')}&response_type=code`;


export default function MainRouter() {
    const [accessToken, setAccessToken] = useState();
    const [showPlayer, setShowPlayer] = useState(false)
    const [trackUris, setTrackUris] = useState([]);
    const {checkIfCookieExists} = checkAuthCookie()
    const {state, dispatch} = AuthContextConsumer()
    
    function handleLogin(){
      window.location.href = authorizationUrl
  }
  const location = window.location
  console.log(location);
  const fetchData = async () => {
    try {
      const response = await axios.post(
          'https://accounts.spotify.com/api/token?',
          new URLSearchParams({
            client_id: client_id,
            grant_type: 'authorization_code',
            code,
            redirect_uri:redirect_uri,
            client_secret
            
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          }
        );
        const { access_token, refresh_token } = response.data;
        
        dispatch({type: 'SET_ACCESS_TOKEN', payload: access_token})
        dispatch({type: 'SET_REFRESH_TOKEN', payload: access_token})
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        
      
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
    }
  
  }

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if(access_token){
      dispatch({type: 'SET_ACCESS_TOKEN', payload: access_token})
    }
  }, [])
  
    
  return (
    <>
        <ToastContainer/>
        <Navbar/>
        
        
        {checkIfCookieExists() && <SidebarComponent/>}
        
        
          
        <Routes>
            <Route path='/' element={<PrivateRoute>
              <Home />
              </PrivateRoute>}/>
            <Route path='/signup' element={<Signup/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/playlists' element={<PrivateRoute><Playlists/></PrivateRoute>} />
            <Route path='/favorites' element={<PrivateRoute><Favorites/></PrivateRoute>} />
            <Route path='/album/:albumID' element={<PrivateRoute><Album/></PrivateRoute>} />
            <Route path='/track/:trackID' element={<PrivateRoute><Track/></PrivateRoute>} />
        </Routes>
        
        <div style={{position: 'absolute', bottom: 0, width: '100vw'}}>
        {state.accessToken &&
        <SpotifyWebPlayer
        
        token={state.accessToken}
        uris={state.trackUris}
        play={state.autoplay}
        styles={{bgColor: 'black', color: 'white', loaderColor: 'blueviolet', activeColor: 'deeppink', height: '15vh'}}  />}
        {!state.accessToken && <div style={{height: '15vh', backgroundColor: 'black', borderTop: '1px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button onClick={handleLogin} inverted style={{borderRadius: '20px'}}><Icon name='headphones' />Connect Spotify Player</Button>
          </div>}
        
        </div>
        
        
        
        
        </>
  )
}
