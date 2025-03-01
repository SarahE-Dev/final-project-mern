import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AuthContext';
import { isAlphanumeric, isEmail } from 'validator';
import Axios from './utils/Axios';

export default function Profile() {
  const { state, dispatch } = useAppContext();
  const [isEditable, setIsEditable] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  useEffect(() => {
    if (state && state.user) {
      setEmail(state.user.email);
      setUsername(state.user.username);
    }
  }, [state]);

  useEffect(() => {
    handleErrors();
  }, [username, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameError || emailError) {
      return;
    }
    if (
      usernameError === '' &&
      emailError === '' &&
      username &&
      email &&
      !(username === state.user.username && email === state.user.email)
    ) {
      try {
        const updatedUser = await Axios(`/api/user/update-user-info/${state.user.id}`, {
          method: 'post',
          data: { username, email },
          withCredentials: true,
          credentials: true,
        });
        dispatch({
          type: 'LOGIN',
          payload: {
            username: updatedUser.data.username,
            email: updatedUser.data.email,
            id: updatedUser.data._id,
          },
        });
        setIsEditable(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleErrors = () => {
    if (!isAlphanumeric(username)) {
      setUsernameError('Username must contain only letters and numbers');
    } else {
      setUsernameError('');
    }
    if (!isEmail(email)) {
      setEmailError('Must be a valid email address');
    } else {
      setEmailError('');
    }
  };

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
      <div
        style={{
          width: 'clamp(300px, 50vw, 600px)', 
          margin: '0 auto',
          paddingTop: '5vh',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            background: 'rgba(46, 2, 52, 0.2)',
            color: 'rgb(217, 8, 244)',
            textShadow: '0 0 10px rgb(217, 8, 244)',
            border: '2px solid rgb(217, 8, 244)',
            boxShadow: '0 0 10px rgb(217, 8, 244)',
            padding: '10px 20px',
            borderRadius: '10px',
            fontWeight: '800',
            fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            letterSpacing: '1px',
            marginBottom: '5vh',
          }}
        >
          Profile Info
        </h1>
        <div
          style={{
            padding: '3vh',
            background: 'rgba(0, 0, 0, 0.8)', 
            border: '2px solid rgb(0, 212, 255)', 
            borderRadius: '20px',
            boxShadow: '0 0 20px rgb(0, 212, 255)', 
          }}
        >
          <div
            style={{
              marginBottom: '20px',
            }}
          >
            {isEditable ? (
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Username"
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#FFF',
                  fontFamily: '"Montserrat", sans-serif',
                  border: '1px solid rgb(0, 212, 255)',
                  borderRadius: '5px',
                  padding: '10px',
                  width: '100%',
                  boxShadow: '0 0 5px rgb(0, 212, 255)',
                  fontSize: 'clamp(0.9rem, 1vw, 1rem)',
                }}
              />
            ) : (
              <h3
                style={{
                  fontWeight: '600',
                  fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                  letterSpacing: '1px',
                  color: '#FFF',
                  textShadow: '0 0 5px rgba(144, 6, 161, 0.7)',
                  margin: 0,
                }}
              >
                {state && state.user && state.user.username}
              </h3>
            )}
            {usernameError && (
              <span
                style={{
                  display: 'block',
                  color: 'rgb(255, 102, 0)', 
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
              marginBottom: '20px',
            }}
          >
            {isEditable ? (
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#FFF',
                  fontFamily: '"Montserrat", sans-serif',
                  border: '1px solid rgb(0, 213, 255)', 
                  borderRadius: '5px',
                  padding: '10px',
                  width: '100%',
                  boxShadow: '0 0 5px rgb(0, 212, 255)',
                  fontSize: 'clamp(0.9rem, 1vw, 1rem)',
                }}
              />
            ) : (
              <p
                style={{
                  fontSize: 'clamp(0.9rem, 1vw, 1rem)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: 0,
                }}
              >
                {state && state.user && state.user.email}
              </p>
            )}
            {emailError && (
              <span
                style={{
                  display: 'block',
                  color: 'rgb(255, 102, 0)', 
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
              display: 'flex',
              justifyContent: 'center',
              marginTop: '5vh',
            }}
          >
            {!isEditable ? (
              <button
                onClick={() => setIsEditable(true)}
                style={{
                  background: 'rgba(0, 212, 255, 0.2)', 
                  color: 'rgb(0, 212, 255)',
                  textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                  border: '1px solid rgba(0, 212, 255, 0.7)',
                  boxShadow: '0 0 5px rgba(0, 212, 255, 0.3)',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: '600',
                  fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                  cursor: 'pointer',
                }}
              >
                Edit Profile
              </button>
            ) : (
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <button
                  onClick={() => setIsEditable(false)}
                  style={{
                    background: 'rgba(255, 102, 0, 0.2)', 
                    color: 'rgb(255, 102, 0)',
                    textShadow: '0 0 5px rgba(255, 102, 0, 0.7)',
                    border: '1px solid rgba(255, 102, 0, 0.7)',
                    padding: '8px 15px',
                    borderRadius: '5px',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: '600',
                    fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                    cursor: 'pointer',
                  }}
                >
                  ✕ 
                </button>
                <button
                  onClick={handleSubmit}
                  style={{
                    background: 'rgba(0, 212, 255, 0.2)', 
                    color: 'rgb(0, 212, 255)',
                    textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                    border: '1px solid rgba(0, 212, 255, 0.7)',
                    padding: '8px 15px',
                    borderRadius: '5px',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: '600',
                    fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}