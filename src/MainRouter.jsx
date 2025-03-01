import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import SidebarComponent from './components/SidebarComponent';
import PrivateRoute from './PrivateRoute';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Playlists from './components/Playlists';
import Favorites from './components/Favorites';
import Album from './components/Album';
import Track from './components/Track';
import Profile from './components/Profile';
import SpotifyPlayer from './components/Player'; 

import { useAppContext } from './context/AuthContext';
import checkAuthCookie from './components/hooks/checkCookies';
import checkTokens from './components/hooks/tokenCheck';

export default function MainRouter() {
  const { checkIfCookieExists, logUserIn } = checkAuthCookie();
  const { state } = useAppContext();
  const { handleTokens } = checkTokens();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsCollapsed(mobile); 
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (checkIfCookieExists()) logUserIn();
    handleTokens();
  }, []);

  const sidebarWidth = isCollapsed ? '70px' : 'clamp(200px, 15vw, 250px)';

  return (
    <div style={{  minHeight: '100%', display: 'flex', flexDirection: 'column',  }}>
      <ToastContainer />
      <Navbar />

      <div style={{ display: 'flex', flex: 1, marginTop: '10vh' }}>
        {state.user && (
          <SidebarComponent
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            isMobile={isMobile}
          />
        )}

        <div
          style={{
            flex: 1,
            marginLeft: state.user ? sidebarWidth : '0',
            transition: 'margin-left 0.3s ease-in-out',
            background: 'linear-gradient(135deg, rgb(9, 9, 121) 0%, rgb(144, 6, 161) 50%, rgb(0, 212, 255) 100%)', 
            overflow: 'auto',
            zIndex: 1,
            paddingBottom: 100
            
          }}
        >
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/playlists" element={<PrivateRoute><Playlists /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
            <Route path="/album/:albumID" element={<PrivateRoute><Album /></PrivateRoute>} />
            <Route path="/track/:trackID" element={<PrivateRoute><Track /></PrivateRoute>} />
          </Routes>
        </div>
      </div>

      <SpotifyPlayer />
    </div>
  );
}