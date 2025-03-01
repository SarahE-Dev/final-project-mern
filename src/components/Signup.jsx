import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';
import { isAlphanumeric, isStrongPassword, isEmail } from 'validator';
import Axios from './utils/Axios';
import checkAuthCookie from './hooks/checkCookies';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const { checkIfCookieExists } = checkAuthCookie();
  const { state, dispatch } = useAppContext();

  if (checkIfCookieExists()) {
    return <Navigate to="/" />;
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!isAlphanumeric(username)) {
      setUsernameError('Username must contain only letters and numbers');
    }
    if (!isEmail(email)) {
      setEmailError('Must be a valid email address');
    }
    if (!isStrongPassword(password)) {
      setPasswordError('Must be a strong password');
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords must match');
    }
    if (
      isEmail(email) &&
      isStrongPassword(password) &&
      isAlphanumeric(username) &&
      password === confirmPassword
    ) {
      setUsernameError('');
      setPasswordError('');
      setConfirmPasswordError('');
      setEmailError('');
      try {
        const newUser = await Axios('/api/user/signup', {
          method: 'post',
          data: { username, password, email },
          withCredentials: true,
          credentials: true,
        });
        dispatch({
          type: 'LOGIN',
          payload: {
            username: newUser.data.username,
            email: newUser.data.email,
            id: newUser.data._id,
          },
        });
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '90vh', // Matches MainRouter content area
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
          background: 'rgba(0, 0, 0, 0.8)', // Dark overlay
          padding: '2vh 2vw',
          borderRadius: '25px',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)', // Cyan glow
          border: '1px solid rgba(144, 6, 161, 0.3)', // Purple border
          width: 'clamp(300px, 65vw, 500px)', // Responsive width
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontWeight: '800',
            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
            letterSpacing: '1px',
            color: 'rgb(144, 6, 161)', // Purple (matching original)
            textShadow: '0 0 10px rgba(144, 6, 161, 0.7)',
            marginBottom: '3vh',
          }}
        >
          Create New Account
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
                color: 'rgb(0, 212, 255)', // Cyan
                textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                fontSize: '1.2rem',
              }}
            >
              ✉️ {/* Unicode envelope */}
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#FFF',
                fontFamily: '"Montserrat", sans-serif',
                border: '1px solid rgba(0, 212, 255, 0.7)', // Cyan border
                borderRadius: '5px',
                padding: '10px 10px 10px 35px', // Extra left padding for icon
                width: '100%',
                boxShadow: '0 0 5px rgba(0, 212, 255, 0.2)',
                fontSize: 'clamp(0.9rem, 1vw, 1rem)',
              }}
            />
            {emailError && (
              <span
                style={{
                  display: 'block',
                  color: 'rgb(255, 102, 0)', // Orange
                  textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
                  fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                  marginTop: '5px',
                }}
              >
                {emailError}
              </span>
            )}
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
                color: 'rgb(0, 212, 255)', // Cyan
                textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                fontSize: '1.2rem',
              }}
            >
              @ {/* Unicode at */}
            </span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#FFF',
                fontFamily: '"Montserrat", sans-serif',
                border: '1px solid rgba(0, 212, 255, 0.7)', // Cyan border
                borderRadius: '5px',
                padding: '10px 10px 10px 35px', // Extra left padding for icon
                width: '100%',
                boxShadow: '0 0 5px rgba(0, 212, 255, 0.2)',
                fontSize: 'clamp(0.9rem, 1vw, 1rem)',
              }}
            />
            {usernameError && (
              <span
                style={{
                  display: 'block',
                  color: 'rgb(255, 102, 0)', // Orange
                  textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
                  fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                  marginTop: '5px',
                }}
              >
                {usernameError}
              </span>
            )}
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
                color: 'rgb(0, 212, 255)', // Cyan
                textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                fontSize: '1.2rem',
              }}
            >
              🔒 {/* Unicode lock */}
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#FFF',
                fontFamily: '"Montserrat", sans-serif',
                border: '1px solid rgba(0, 212, 255, 0.7)', // Cyan border
                borderRadius: '5px',
                padding: '10px 10px 10px 35px', // Extra left padding for icon
                width: '100%',
                boxShadow: '0 0 5px rgba(0, 212, 255, 0.2)',
                fontSize: 'clamp(0.9rem, 1vw, 1rem)',
              }}
            />
            {passwordError && (
              <span
                style={{
                  display: 'block',
                  color: 'rgb(255, 102, 0)', // Orange
                  textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
                  fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                  marginTop: '5px',
                }}
              >
                {passwordError}
              </span>
            )}
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
                color: 'rgb(0, 212, 255)', // Cyan
                textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                fontSize: '1.2rem',
              }}
            >
              🔑 {/* Unicode key */}
            </span>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              type="password"
              required
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#FFF',
                fontFamily: '"Montserrat", sans-serif',
                border: '1px solid rgba(0, 212, 255, 0.7)', // Cyan border
                borderRadius: '5px',
                padding: '10px 10px 10px 35px', // Extra left padding for icon
                width: '100%',
                boxShadow: '0 0 5px rgba(0, 212, 255, 0.2)',
                fontSize: 'clamp(0.9rem, 1vw, 1rem)',
              }}
            />
            {confirmPasswordError && (
              <span
                style={{
                  display: 'block',
                  color: 'rgb(255, 102, 0)', // Orange
                  textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
                  fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                  marginTop: '5px',
                }}
              >
                {confirmPasswordError}
              </span>
            )}
          </div>
          <button
            onClick={handleOnSubmit}
            style={{
              background: 'rgba(144, 6, 161, 0.2)', // Purple
              color: 'rgb(144, 6, 161)',
              textShadow: '0 0 5px rgba(144, 6, 161, 0.7)',
              border: '1px solid rgba(144, 6, 161, 0.7)',
              padding: '10px 20px',
              borderRadius: '25px',
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: '600',
              fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
              cursor: 'pointer',
              width: '100%',
              marginTop: '2vh',
            }}
          >
            <span
              style={{
                marginRight: '10px',
                fontSize: '1.2rem',
                color: 'rgb(144, 6, 161)', // Purple
                textShadow: '0 0 5px rgba(144, 6, 161, 0.7)',
              }}
            >
              💾 {/* Unicode save */}
            </span>
            Submit
          </button>
        </form>
        <div
          style={{
            marginTop: '2vh',
            fontSize: 'clamp(0.8rem, 1vw, 1rem)',
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          Already have an account?{' '}
          <Link
            to="/login"
            style={{
              color: 'rgb(0, 212, 255)', // Cyan
              textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
              textDecoration: 'none',
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}