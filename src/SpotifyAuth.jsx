import React from 'react'
import { Button } from 'react-bootstrap'

const CLIENT_ID='b3c2ec986d6b481793bad1372b1445fd'

const REDIRECT_URI = 'http://localhost:5173'

const SCOPES = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'streaming', 'user-read-playback-position', 'user-top-read', 'user-read-recently-played', 'user-library-read', 'user-read-private', 'user-follow-read', 'playlist-read-private', 'user-read-email', 'ugc-image-upload'];

const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join('%20')}&response_type=code`;



export default function SpotifyAuth() {
    function handleLogin(){
        window.location.href = authorizationUrl
    }
  return (
    <div className='d-flex align-items-center justify-content-center' style={{backgroundColor: 'black', height: '100vh', width: '100vw'}}>
    <Button onClick={handleLogin} className='btn btn-outline-success btn-dark'>Login with Spotify</Button>
    </div>
  )
}
