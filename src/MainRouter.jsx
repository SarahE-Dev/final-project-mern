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

import { Sidebar, SidebarPusher, Menu, MenuItem, SidebarPushable, Segment, Grid, GridColumn, Container } from 'semantic-ui-react'

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





export default function MainRouter() {
    const [accessToken, setAccessToken] = useState();
    const [showPlayer, setShowPlayer] = useState(false)
    const [trackUris, setTrackUris] = useState([]);
    const {checkIfCookieExists} = checkAuthCookie()
    const {state} = AuthContextConsumer()
    useEffect(() => {
      if(state && state.user){
        setShowPlayer(true)
      }
    }, [state])
    
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
        {checkIfCookieExists() &&
        <SpotifyWebPlayer
        
        token={state.accessToken}
        uris={state.trackUris}
        play={state.autoplay}
        styles={{bgColor: 'black', color: 'white', loaderColor: 'blueviolet', activeColor: 'deeppink', height: '15vh'}}  />}
        
        
        </div>
        
        
        
        
        </>
  )
}
