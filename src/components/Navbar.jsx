import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { useAppContext } from '../context/AuthContext';
import Cookies from 'js-cookie';
import checkAuthCookie from './hooks/checkCookies';

export default function Navbar() {
  const { dispatch, state } = useAppContext();
  const { checkIfCookieExists, logUserIn } = checkAuthCookie();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    Cookies.remove('music-app-cookie');
    window.localStorage.clear();
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: '8px',
    background: 'rgba(0, 0, 0, 0.2)',
    transition: '0.3s all',
    cursor: 'pointer',
    textDecoration: 'none', 
  };

  const iconStyle = (color, name) => (
    <div
      style={{
        width: '24px',
        height: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '8px',
        flexShrink: 0, 
      }}
    >
      <Icon
        name={name}
        style={{
          color,
          textShadow: `0 0 5px ${color}`,
          fontSize: '1.2rem',
          display: 'block',
          margin: '0 auto', 
          padding: 0, 
          lineHeight: '24px', 
          width: '100%', 
          textAlign: 'center', 
          marginBottom: 8,
          marginLeft: 10
        }}
      />
    </div>
  );

  return (
    <nav
      style={{
        background: 'linear-gradient(90deg, rgb(9, 9, 121) 0%, rgb(20, 20, 40) 100%)',
        color: '#FFF',
        height: '10vh',
        width: '100vw',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        borderBottom: '1px solid rgba(205, 10, 231, 0.87)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 1001,
        fontFamily: '"Montserrat", sans-serif',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        transition: '0.3s all',
      }}
    >
      <Link
        to="/"
        style={{
          ...menuItemStyle,
          textDecoration: 'none',
          height: '7vh',
        }}
      >
        {iconStyle('rgb(255, 102, 0)', 'fire')} 
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

          }}
        >
          <span
            style={{
              fontWeight: '800',
              fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
              letterSpacing: '1px',
              color: '#FFF',
              textShadow: '0 0 10px rgba(144, 6, 161, 0.7)', 
              lineHeight: '1.1',
            }}
          >
            FYRE
          </span>
          <span
            style={{
              fontWeight: '600',
              fontSize: 'clamp(0.6rem, 0.9vw, 0.9rem)',
              letterSpacing: '4px',
              color: 'rgb(0, 212, 255)', 
              textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
              marginLeft: 3
            }}
          >
            TUNES
          </span>
        </div>
      </Link>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(5px, 1vw, 10px)',
        }}
      >
        {state && state.user ? (
          <>
            <div
              style={{
                display: window.innerWidth < 768 ? 'none' : 'flex',
                alignItems: 'center',
                gap: 'clamp(5px, 1vw, 10px)',
              }}
            >
              <Link
                to="/profile"
                style={{
                  ...menuItemStyle,
                  color: 'rgb(144, 6, 161)',
                  fontWeight: '600',
                  fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                  letterSpacing: '1px',
                  textShadow: '0 0 5px rgba(144, 6, 161, 0.5)',
                  boxShadow:
                    window.location.pathname === '/profile'
                      ? '0 0 10px rgba(0, 212, 255, 0.2)'
                      : 'none',
                }}
              >
                {iconStyle('rgb(144, 6, 161)', 'user')}
                {state.user.username}
              </Link>
              <div
                onClick={handleLogout}
                style={{
                  ...menuItemStyle,
                  color: 'rgb(255, 102, 0)', 
                  fontWeight: '600',
                  fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                  letterSpacing: '1px',
                  textShadow: '0 0 5px rgba(255, 102, 0, 0.5)',
                }}
              >
                {iconStyle('rgb(255, 102, 0)', 'sign out')} 
                Logout
              </div>
            </div>

            <div
              style={{
                display: window.innerWidth < 768 ? 'flex' : 'none',
                alignItems: 'center',
                position: 'relative',
              }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span
                style={{
                  ...menuItemStyle,
                  color: 'rgb(0, 212, 255)', 
                  textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                  padding: '10px',
                }}
              >
                {iconStyle('rgb(0, 212, 255)', 'bars')} 
              </span>
              {dropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    background: 'rgba(20, 20, 40, 0.95)',
                    border: '1px solid rgba(0, 212, 255, 0.7)', 
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
                    marginTop: '10px',
                    padding: '10px 0',
                    zIndex: 1002,
                    minWidth: '150px',
                  }}
                >
                  <Link
                    to="/profile"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 15px',
                      color: 'rgb(144, 6, 161)', 
                      fontWeight: '700',
                      fontSize: '1rem',
                      letterSpacing: '1px',
                      textShadow: '0 0 8px rgba(144, 6, 161, 0.8)',
                      textDecoration: 'none',
                    }}
                    onClick={() => setDropdownOpen(false)}
                  >
                    {iconStyle('rgb(144, 6, 161)', 'user')} 
                    {state.user.username}
                  </Link>
                  <div
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 15px',
                      color: 'rgb(255, 102, 0)',
                      fontWeight: '700',
                      fontSize: '1rem',
                      letterSpacing: '1px',
                      textShadow: '0 0 8px rgba(255, 102, 0, 0.8)', 
                      cursor: 'pointer',
                    }}
                  >
                    {iconStyle('rgb(255, 102, 0)', 'sign out')}
                    Logout
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: window.innerWidth < 768 ? 'none' : 'flex',
                alignItems: 'center',
                gap: 'clamp(5px, 1vw, 10px)',
              }}
            >
              <Link
                to="/login"
                style={{
                  ...menuItemStyle,
                  color: 'rgb(0, 212, 255)', 
                  fontWeight: '600',
                  fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                  letterSpacing: '1px',
                  textShadow: '0 0 5px rgba(0, 212, 255, 0.5)',
                  boxShadow:
                    window.location.pathname === '/login'
                      ? '0 0 10px rgba(0, 212, 255, 0.2)'
                      : 'none',
                }}
              >
                {iconStyle('rgb(0, 212, 255)', 'sign in')}
                Login
              </Link>
              <Link
                to="/signup"
                style={{
                  ...menuItemStyle,
                  color: 'rgb(0, 212, 255)', 
                  fontWeight: '600',
                  fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                  letterSpacing: '1px',
                  textShadow: '0 0 5px rgba(0, 212, 255, 0.5)',
                  boxShadow:
                    window.location.pathname === '/signup'
                      ? '0 0 10px rgba(0, 212, 255, 0.2)'
                      : 'none',
                }}
              >
                {iconStyle('rgb(0, 212, 255)', 'user plus')} 
                Signup
              </Link>
            </div>

            <div
              style={{
                display: window.innerWidth < 768 ? 'flex' : 'none',
                alignItems: 'center',
                position: 'relative',
              }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span
                style={{
                  ...menuItemStyle,
                  color: 'rgb(0, 212, 255)', 
                  textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                  padding: '10px',
                }}
              >
                {iconStyle('rgb(0, 212, 255)', 'bars')}
              </span>
              {dropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    background: 'rgba(20, 20, 40, 0.95)',
                    border: '1px solid rgba(0, 212, 255, 0.7)',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)', 
                    marginTop: '10px',
                    padding: '10px 0',
                    zIndex: 1002,
                    minWidth: '150px',
                  }}
                >
                  <Link
                    to="/login"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 15px',
                      color: 'rgb(0, 212, 255)', 
                      fontWeight: '700',
                      fontSize: '1rem',
                      letterSpacing: '1px',
                      textShadow: '0 0 8px rgba(0, 212, 255, 0.8)', 
                      textDecoration: 'none',
                    }}
                    onClick={() => setDropdownOpen(false)}
                  >
                    {iconStyle('rgb(0, 212, 255)', 'sign in')} 
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 15px',
                      color: 'rgb(0, 212, 255)', 
                      fontWeight: '700',
                      fontSize: '1rem',
                      letterSpacing: '1px',
                      textShadow: '0 0 8px rgba(0, 212, 255, 0.8)', 
                      textDecoration: 'none',
                    }}
                    onClick={() => setDropdownOpen(false)}
                  >
                    {iconStyle('rgb(0, 212, 255)', 'user plus')} 
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}