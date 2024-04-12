import { AuthContextConsumer } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";


const client_id='b3c2ec986d6b481793bad1372b1445fd'

const client_secret = '4f7c4b046c014f25adf7bb82fb8489e9'
const grantType = `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`

const TOKEN_URL = 'https://accounts.spotify.com/api/token?'


function checkTokens(){
    const {state, dispatch} = AuthContextConsumer()
    const navigate = useNavigate()
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const access_token = window.localStorage.getItem('access_token');
    const refresh_token = window.localStorage.getItem('refresh_token');
    const search_token = window.localStorage.getItem('search_token');
    const search_token_expiration = window.localStorage.getItem('search_token_expiration');
    const accessTokenExpiration = window.localStorage.getItem('expires_in');
    
    function checkIfCodeExists(){
        
        return code ? true : false
    }
    const grabSpotifyToken=async ()=>{
        let token = await axios.post('https://accounts.spotify.com/api/token?', grantType, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        window.localStorage.setItem('search_token', token.data.access_token)
        const issuedAt = Math.floor(Date.now() / 1000)
        window.localStorage.setItem
        ('search_token_expiration', issuedAt + 3600)
        dispatch({type: 'SET_SEARCH_TOKEN', payload: token.data.access_token})
        dispatch({type: 'SET_SEARCH_TOKEN_EXPIRATION', payload: issuedAt + 3600})
      }
    function checkIfAccessTokenExists(){
        return access_token ? true : false
    }
    function checkIfSearchTokenExists(){
        
        return search_token ? true : false
    }
    function checkIfRefreshTokenExists(){
        
        return refresh_token ? true : false
    }
    function checkIfSearchTokenIsExpired(){
        
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime > search_token_expiration

    }
    function checkIfAccessTokenIsExpired(){
        
        const currentTime = Math.floor(Date.now() / 1000)
        return currentTime > accessTokenExpiration
    }
    const refreshAccessToken = async () => {
        try {
          const response = await axios.post(
              TOKEN_URL,
              new URLSearchParams({
                
                grant_type: 'refresh_token',
                refresh_token: window.localStorage.getItem('refresh_token'),
                client_id,
                client_secret
                
              }),
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
              }
            );
            const { access_token, refresh_token
            } = response.data;
            dispatch({type: 'SET_ACCESS_TOKEN', payload: access_token})
            dispatch({type: 'SET_REFRESH_TOKEN', payload: refresh_token})
            window.localStorage.setItem('access_token', access_token)
            window.localStorage.setItem('refresh_token', refresh_token)
            const issuedAt = Math.floor(Date.now()/1000)
            window.localStorage.setItem('expires_in', issuedAt + 3600)
            
          
        } catch (error) {
          console.error('Error exchanging code for tokens:', error);
        }
    }
    
    const redirect_uri = 'http://localhost:5173' ;
    const fetchAccessToken = async () => {
        try {
          const response = await axios.post(
              TOKEN_URL,
              new URLSearchParams({
                client_id,
                grant_type: 'authorization_code',
                code,
                redirect_uri,
                client_secret
                
              }),
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
              }
            );
            const { access_token, refresh_token
            } = response.data;
            const issuedAt = Math.floor(Date.now()/1000)
            dispatch({type: 'SET_ACCESS_TOKEN', payload: access_token})
            dispatch({type: 'SET_REFRESH_TOKEN', payload: refresh_token})
            window.localStorage.setItem('access_token', access_token)
            window.localStorage.setItem('refresh_token', refresh_token)
            window.localStorage.setItem('expires_in', issuedAt + 3600)
            navigate('/')
          
        } catch (error) {
          console.error('Error exchanging code for tokens:', error);
        }
      
      }
    function handleTokens(){
      if(checkIfAccessTokenExists() && checkIfAccessTokenIsExpired()){
        refreshAccessToken()
      }
      if(checkIfCodeExists() && !checkIfAccessTokenExists()){
        fetchAccessToken()
      }
      if(checkIfSearchTokenExists() && checkIfSearchTokenIsExpired()){
        grabSpotifyToken()
      }
      if(!checkIfSearchTokenExists()){
        grabSpotifyToken()
      }
      if(checkIfSearchTokenExists() && !checkIfSearchTokenIsExpired()){
        dispatch({type: 'SET_SEARCH_TOKEN', payload: search_token})

      }
      if(checkIfAccessTokenExists() && !checkIfAccessTokenIsExpired()){
        dispatch({type: 'SET_ACCESS_TOKEN', payload: access_token})
      }
      if(checkIfCodeExists() &&checkIfAccessTokenExists() && !checkIfAccessTokenIsExpired()){
        navigate('/')
      }
      
        

    }
    return {checkIfAccessTokenExists, checkIfAccessTokenIsExpired, checkIfCodeExists, checkIfRefreshTokenExists, checkIfSearchTokenExists, checkIfSearchTokenIsExpired,
      handleTokens, refreshAccessToken, fetchAccessToken
    }
}

export default checkTokens