import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';
import Axios from './utils/Axios';
import checkAuthCookie from './hooks/checkCookies';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAppContext();
  const { checkIfCookieExists, logUserIn, getUserData } = checkAuthCookie();

  if (checkIfCookieExists()) {
    return <Navigate to="/" />;
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const foundUser = await Axios('/api/user/login', {
        method: 'post',
        data: { username, password },
        withCredentials: true,
        credentials: true,
      });
      dispatch({
        type: 'LOGIN',
        payload: {
          username: foundUser.data.username,
          email: foundUser.data.email,
          id: foundUser.data._id,
        },
      });
      getUserData(foundUser.data._id);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '90vh', 
        fontFamily: '"Montserrat", sans-serif',
        color: '#FFF',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.8)', 
          padding: '2vh 2vw',
          borderRadius: '25px',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)', 
          border: '1px solid rgba(144, 6, 161, 0.3)',
          width: 'clamp(300px, 65vw, 500px)', 
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontWeight: '800',
            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
            letterSpacing: '1px',
            color: 'rgb(255, 102, 0)', 
            textShadow: '0 0 10px rgba(255, 102, 0, 0.7)',
            marginBottom: '3vh',
          }}
        >
          Login to Your Account
        </h2>
        <form
          onSubmit={handleOnSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <div
            style={{
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgb(0, 212, 255)', 
                textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                fontSize: '1.2rem',
              }}
            >
              👤 
            </span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#FFF',
                fontFamily: '"Montserrat", sans-serif',
                border: '1px solid rgba(0, 212, 255, 0.7)', 
                borderRadius: '5px',
                padding: '10px 10px 10px 35px', 
                width: '100%',
                boxShadow: '0 0 5px rgba(0, 212, 255, 0.2)',
                fontSize: 'clamp(0.9rem, 1vw, 1rem)',
              }}
            />
          </div>
          <div
            style={{
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgb(0, 212, 255)', 
                textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                fontSize: '1.2rem',
              }}
            >
              🔒 
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#FFF',
                fontFamily: '"Montserrat", sans-serif',
                border: '1px solid rgba(0, 212, 255, 0.7)', 
                borderRadius: '5px',
                padding: '10px 10px 10px 35px',
                width: '100%',
                boxShadow: '0 0 5px rgba(0, 212, 255, 0.2)',
                fontSize: 'clamp(0.9rem, 1vw, 1rem)',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              background: 'rgba(144, 6, 161, 0.2)',
              color: 'rgb(144, 6, 161)',
              textShadow: '0 0 5px rgba(144, 6, 161, 0.7)',
              border: '1px solid rgba(144, 6, 161, 0.7)',
              boxShadow: '0 0 5px rgba(144, 6, 161, 0.3)',
              padding: '10px 20px',
              borderRadius: '25px',
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: '600',
              fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Login
          </button>
        </form>
        <div
          style={{
            marginTop: '2vh',
            fontSize: 'clamp(0.8rem, 1vw, 1rem)',
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          New to us?{' '}
          <Link
            to="/signup"
            style={{
              color: 'rgb(0, 212, 255)', 
              textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
              textDecoration: 'none',
            }}
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}