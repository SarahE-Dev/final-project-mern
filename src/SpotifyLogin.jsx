import React from 'react'
import axios from 'axios'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
export default function Login() {

    
  return (
    <div>
        <header>
            <a href='http://localhost:5000/auth/login'>
            <button >Login with Spotify</button>
            </a>
        </header>
    </div>
  )
}
